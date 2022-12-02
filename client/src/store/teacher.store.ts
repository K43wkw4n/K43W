import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Teacher } from "../models/teachers";

interface TeacherState {
  teachers: Teacher[];
}

const initialState: TeacherState = {
  teachers: [],
};

export const fetchTeacher = createAsyncThunk<Teacher>(
  "teacher/fetchTeacher",
  async (_, thunkAPI) => {
    try {
      const teacher = await agent.Data.getTeachers();
      return teacher;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const TeacherSlice = createSlice({
  name: "TeacherSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeacher.fulfilled, (state, action: any) => {
      state.teachers = [...action.payload];
    });
  },
});

export const {} = TeacherSlice.actions;

export default TeacherSlice.reducer;
