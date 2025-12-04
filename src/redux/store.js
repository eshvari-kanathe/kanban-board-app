import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import boardReducer from "../redux/slices/boardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReducer,
  },
});

export default store;
