import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Picture } from "../models/Picture";

interface PictureState {
  pictures: Picture[];
}

const initialState: PictureState = {
  pictures: [],
};

export const fetchPicture = createAsyncThunk<Picture>(
  "picture/fetchPicture",
  async (_, thunkAPI) => {
    try {
      return await agent.Data.getPictures();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const PictureSlice = createSlice({
  name: "PictureSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPicture.fulfilled, (state, action: any) => {
      state.pictures = [...action.payload];
    });
  },
});

export const {} = PictureSlice.actions;

export default PictureSlice.reducer;
