import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalService from "./goalService";

//Get Goals

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get goals
export const getGoals = createAsyncThunk("goals/getGoals", async (thunkAPI) => {
  try {
    return await goalService.getGoals();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    reset: (state) => initialState, //reset everything to default
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.message;
        state.goals = null;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
