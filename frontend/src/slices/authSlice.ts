import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthData, AuthState } from "../types/profile";

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    sub: "",
    email_verified: false,
    id_token: "",
    access_token: "",
    refresh_token: "",
  },
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startAuth(state) {
      state.loading = true;
    },
    login(state, action: PayloadAction<AuthData>) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },

    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { login, startAuth, logout } = authSlice.actions;

export default authSlice.reducer;
