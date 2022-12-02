import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import agent from "../../api/agent"; 
import { Routers } from "../../App";
import { User } from "../../models/User";

interface AccountState {
  noNavnoFoot: boolean;
  user: User | null;
}

const initialState: AccountState = {
  noNavnoFoot: false,
  user: null,
};

//FieldValues พารามิเตอร์รับหลายค่าที่ส่งเข้ามา เช่น await dispatch(signInUser(data));
export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/fetchCurrentUser",
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.Account.login(data);
      const { basket, ...user } = userDto;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const userDto = await agent.Account.currentUser();
      const { basket, ...user } = userDto;
      // localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    //ถ้าไม่มี user ไม่ต้องส่งการร้องขอ(request) ไปที่ Server
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setScreen: (state) => {
      state.noNavnoFoot = !state.noNavnoFoot;
    },
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      Routers.navigate("/");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      //ดึงเฉพาะ Roles จาก Token
      let claims = JSON.parse(window.atob(action.payload.token.split(".")[1]));
      let roles =
        claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      //ตรวจสอบกรณีมีหลาย Roles = ["Menber","Admin"]
      state.user = {
        ...action.payload,
        roles: typeof roles === "string" ? [roles] : roles,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      // localStorage.removeItem("user");
      // toast.error('Session expired - please login again');
      Routers.navigate("/");
    });
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action: any) => {
        state.user = action.payload;
        // //ดึงเฉพาะ Roles จาก Token
        // let claims = JSON.parse(
        //   window.atob(action.payload.token.split(".")[1])
        // );
        // let roles =
        //   claims[
        //     "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        //   ];
        // //ตรวจสอบกรณีมีหลาย Roles = ["Menber","Admin"]
        // state.user = {
        //   ...action.payload,
        //   roles: typeof roles === "string" ? [roles] : roles,
        // };
      }
    );
    builder.addMatcher(isAnyOf(signInUser.rejected), (_, action) => {
      throw action.payload;
    });
  },
});

export const { setScreen, signOut, setUser } = accountSlice.actions;
