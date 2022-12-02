import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Student } from "../models/Students";
import { RootState } from "../store/configureStore";

interface StudentState {
  students: Student[];
}

const initialState: StudentState = {
  students: [],
};

export const fetchStudent = createAsyncThunk<Student>(
  "student/fetchStudent",
  async (_, thunkAPI) => {
    try {
      const student = await agent.Data.getStudents();
      return student;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const StudentSlice = createSlice({
  name: "StudentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudent.fulfilled, (state, action: any) => {
      state.students = [...action.payload];
      // console.log("👍", state.students);
      // console.log("🙌", state.students);
    });
  },
});

export const {} = StudentSlice.actions;

export default StudentSlice.reducer;
