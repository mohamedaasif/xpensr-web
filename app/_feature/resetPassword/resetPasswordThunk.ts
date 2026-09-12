import {
  requestOTP as requestOTPApi,
  resendOTP as resendOTPApi,
  resetPassword as resetPasswordApi,
  verifyOTP as verifyOTPApi,
} from "./resetPasswordService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const requestOTP = createAsyncThunk(
  "resetPassword/requestOTP",
  async (formData: { emailId: string }, { rejectWithValue }) => {
    try {
      const res = await requestOTPApi(formData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "OTP request failed");
    }
  },
);

export const resendOTP = createAsyncThunk(
  "resetPassword/resendOTP",
  async (formData: { emailId: string }, { rejectWithValue }) => {
    try {
      const res = await resendOTPApi(formData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue({
        message: err.response?.data?.message,
        status: err.response?.status,
      });
    }
  },
);

export const verifyOTP = createAsyncThunk(
  "resetPassword/verifyOTP",
  async (formData: { emailId: string; otp: string }, { rejectWithValue }) => {
    try {
      const res = await verifyOTPApi(formData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "OTP verification failed");
    }
  },
);

export const resetPassword = createAsyncThunk(
  "resetPassword/resetPassword",
  async (formData: { password: string }, { rejectWithValue }) => {
    try {
      const res = await resetPasswordApi(formData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Reset password failed");
    }
  },
);
