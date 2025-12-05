import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("kanbanUser");
  try {
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Unable to read saved user data", error);
    return null;
  }
};

const getAuthFlag = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("isAuthenticated") === "true";
};

const initialState = {
  user: getStoredUser(),
  isAuthenticated: getAuthFlag(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("kanbanUser", JSON.stringify(action.payload));
      toast.success("Create account Successfully",{
        autoClose:1000}
      )
    },
    login: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", "true");
         toast.success("Login successfully",{
        autoClose:1000}
      )
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated");
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
