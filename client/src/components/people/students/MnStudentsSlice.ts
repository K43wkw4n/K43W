import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../../api/agent";
import { MetaData } from "../../../models/pagination";
import { StudentParams, Student } from "../../../models/Students";
import { RootState } from "../../../store/configureStore";

interface StudentState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  title: string[];
  status: string[];
  studentParams: StudentParams;
  metaData: MetaData | null;
}

const studentsAdapter = createEntityAdapter<Student>();

function getAxiosParams(studentParams: StudentParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", studentParams.pageNumber.toString());
  params.append("pageSize", studentParams.pageSize.toString());
  params.append("orderBy", studentParams.orderBy);
  if (studentParams.searchTerm)
    params.append("searchTerm", studentParams.searchTerm);
  if (studentParams.title.length > 0)
    params.append("title", studentParams.title.toString());
  if (studentParams.status.length > 0)
    params.append("status", studentParams.status.toString());
  return params;
}

export const fetchProductsAsync = createAsyncThunk<
  Student[],
  void,
  { state: RootState }
>("Student/fetchProductsAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().MnStudent.studentParams);
  try {
    const response = await agent.Student.list();
    thunkAPI.dispatch(setMetaData(response.metaData)); //วิธีเรียก action ภายในตัวเอง
    return response.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchProductAsync = createAsyncThunk<Student, number>(
  "student/fetchProductAsync",
  async (productId, thunkAPI) => {
    try {
      return await agent.Student.details(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data }); //ส่งไปที่ Interceptor
    }
  }
);

export const fetchFilters = createAsyncThunk(
  "student/fetchFilters",
  async (_, thunkAPI) => {
    try {
      return agent.Student.fetchFilters();
      //return ไปให้fetchProductAsync.fulfilled, (state, action) =>{ }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

// brands: [],types: [] เก็บค่าที่ถูกเลือก สำหรับส่งไปให้ฝั่ง API
function initParams(): StudentParams {
  return {
    pageNumber: 1,
    pageSize: 6,
    orderBy: "name",
    title: [],
    status: [],
  };
}

export const StudentSlice = createSlice({
  name: "Student",
  initialState: studentsAdapter.getInitialState<StudentState>({
    productsLoaded: false,
    filtersLoaded: false,
    title: [],
    status: [],
    studentParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setstudentParams: (state, action) => {
      state.productsLoaded = false;
      state.studentParams = {
        ...state.studentParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    resetstudentParams: (state) => {
      state.studentParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    setPageNumber: (state, action) => {
      state.productsLoaded = false;
      state.studentParams = { ...state.studentParams, ...action.payload };
    },
    setStudent: (state, action) => {
      studentsAdapter.upsertOne(state, action.payload);
      state.productsLoaded = false;
    },
    removeStudent: (state, action) => {
      studentsAdapter.removeOne(state, action.payload); //มีไว้ทำอะไร
      state.productsLoaded = false; //state เปลี่ยนไปทำการโหลดข้อมูลมาใหม่ที่ useProduct.tsx
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      studentsAdapter.setAll(state, action.payload);
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
    });
    builder.addCase(fetchProductAsync.pending, (state) => {
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      studentsAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(fetchFilters.pending, (state) => {
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.title = action.payload.name;
      state.status = action.payload.name;
      state.filtersLoaded = true;
    });
    builder.addCase(fetchFilters.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export default StudentSlice.reducer;

export const studentSelectors = studentsAdapter.getSelectors(
  (state: RootState) => state.MnStudent
);

export const {
  setstudentParams,
  resetstudentParams,
  setMetaData,
  setPageNumber,
  setStudent,
  removeStudent,
} = StudentSlice.actions;
