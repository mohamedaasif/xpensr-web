import { createAsyncThunk } from "@reduxjs/toolkit";
import { authTypes, loginAPI, logoutAPI, signupAPI } from "./authService";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (formData: authTypes, { rejectWithValue }) => {
    try {
      const res = await signupAPI(formData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Signup failed");
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData: authTypes, { rejectWithValue }) => {
    try {
      const res = await loginAPI(formData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue({
        message: err.response?.data?.message,
        status: err.response?.status,
      });
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await logoutAPI();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Logout failed");
    }
  },
);
