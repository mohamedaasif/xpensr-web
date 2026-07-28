import { updateProfile, userTypes } from "./profileService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateUserProfile = createAsyncThunk(
  "user/profile",
  async (formData: userTypes, { rejectWithValue }) => {
    try {
      const res = await updateProfile(formData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Signup failed");
    }
  },
);
