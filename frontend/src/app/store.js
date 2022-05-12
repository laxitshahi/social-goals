//load states into react?
//contains all global states?
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; //name on import doesn't seem to matter
import goalReducer from "../features/goals/goalSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
});
export default store;
