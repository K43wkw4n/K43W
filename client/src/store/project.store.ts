import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Project } from "../models/Projects";

interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: [],
};

export const fetchproject = createAsyncThunk<Project>(
  "project/fetchproject",
  async (_, thunkAPI) => {
    try {
      const project = await agent.Data.getProjects();
      return project;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const ProjectSlice = createSlice({
  name: "ProjectSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchproject.fulfilled, (state, action: any) => {
      state.projects = [...action.payload];
      // console.log("👌" , state.projects);
    });
  },
});

export const {} = ProjectSlice.actions;

export default ProjectSlice.reducer;
