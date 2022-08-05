import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { FaBuilding } from "react-icons/fa";
import globalService from "./globalService";

const initialState = {
  globalGoals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get all goals
export const getGlobalGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI) => {
    // if you want only the thunkAPI, you must ADD _,
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await globalService.getGlobalGoals();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const globalSlice = createSlice({
  name: "globalGoal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      /* Cases for getting globalGoals */
      .addCase(getGlobalGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGlobalGoals.fulfilled, (state, action) => {
        //action is data that is sent back from the api on success
        state.isLoading = false;
        state.isSuccess = true;
        state.globalGoals = action.payload;
      })
      .addCase(getGlobalGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = globalSlice.actions;
export default globalSlice.reducer;
