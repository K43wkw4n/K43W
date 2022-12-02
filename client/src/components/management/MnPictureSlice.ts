import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Routers } from "../../App";
import { MetaData } from "../../models/pagination";
import { Picture } from "../../models/Picture";
import { RootState } from "../../store/configureStore";

interface PictureState {
  productsLoaded: boolean;
  status: string;
  metaData: MetaData | null;
}

const picturesAdapter = createEntityAdapter<Picture>();

export const fetchPicturesAsync = createAsyncThunk<Picture[]>(
  "Picture/fetchPicturesAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.Picture.list();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchPictureAsync = createAsyncThunk<Picture, number>(
  "Picture/fetchPictureAsync",
  async (pictureId, thunkAPI) => {
    try {
      return await agent.Picture.details(pictureId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data }); //ส่งไปที่ Interceptor
    }
  }
);

export const PictureSlice = createSlice({
  name: "Picture",
  initialState: picturesAdapter.getInitialState<PictureState>({
    productsLoaded: false,
    status: "idle",
    metaData: null,
  }),
  reducers: {
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },

    setPicture: (state, action) => {
      picturesAdapter.upsertOne(state, action.payload);
      state.productsLoaded = false;
    },
    removePicture: (state, action) => {
      picturesAdapter.removeOne(state, action.payload); //มีไว้ทำอะไร
      state.productsLoaded = false; //state เปลี่ยนไปทำการโหลดข้อมูลมาใหม่ที่ usePicture.tsx
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPicturesAsync.pending, (state) => {
      state.status = "pendingFetchPictires";
    });
    builder.addCase(fetchPicturesAsync.fulfilled, (state, action) => {
      picturesAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchPicturesAsync.rejected, (state, action) => {
      state.status = "idle";
    });
    builder.addCase(fetchPictureAsync.pending, (state) => {
      state.status = "pendingFetchPicture";
    });
    builder.addCase(fetchPictureAsync.fulfilled, (state, action) => {
      picturesAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchPictureAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
  },
});

export default PictureSlice.reducer;

export const pictureSelectors = picturesAdapter.getSelectors(
  (state: RootState) => state.MnPicture
);

export const { setMetaData, setPicture, removePicture } = PictureSlice.actions;
