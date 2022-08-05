//load states into react?
//contains all global states?
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; //name on import doesn't seem to matter
import goalReducer from "../features/goals/goalSlice";
import globalReducer from "../features/global/globalSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    global: globalReducer,
  },
});
export default store;
