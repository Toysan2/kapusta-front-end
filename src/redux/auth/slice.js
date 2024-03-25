import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./operations";

const initialState = {
  token: localStorage.getItem("authToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("authToken", action.payload.token);
      state.token = action.payload.token;
    });

    builder.addCase(logout.fulfilled, (state) => {
      localStorage.removeItem("authToken");
      state.token = null;
    });
  },
});

export default authSlice.reducer;
