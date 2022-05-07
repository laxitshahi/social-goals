/*
- File contains reducers and initial states reside here 
*/
//createAsyncThunk --> have async functions to update your state
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { FaBuilding } from "react-icons/fa";
import authService from "./authService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user")); //localStorage will store the JWT
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register", // this string contains the ACTION
  async (user, thunkAPI) => {
    //this user is passed in from the resgister page(component)
    try {
      return await authService.register(user); //returns payload (response.data) from register function(authService)
    } catch (error) {
      //Check all places where an error could exist and assign it to message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message); //this send error msg as payload (after rejection)
    }
  }
);

//Logout user
export const logout = createAsyncThunk("/auth/logout", async (user) => {
  try {
    await authService.logout();
  } catch (e) {
    console.log(e);
  }
});

// Login user
export const login = createAsyncThunk(
  "auth/login", // this string contains the ACTION
  async (user, thunkAPI) => {
    //this user is passed in from the resgister page(component)
    try {
      return await authService.login(user); //returns payload (response.data) from login function(authService)
    } catch (error) {
      //Check all places where an error could exist and assign it to message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message); //this send error msg as payload (after rejection)
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      //reset all values to default
      //these are not async
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    /* extraReducers is an async, therefore you want handle the follow these cases here...
    1. Loading
    2. Success
    3. Rejected
    */
    builder
      //These cases are handled automatically because of redux toolkit
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; // this is the data returned from the register function
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; // this is the data returned from the login function
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
