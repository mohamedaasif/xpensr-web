import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardSummary, getRecentTransactions } from "./dashboardService";
import { AxiosError } from "axios";

export const dashboardSummary = createAsyncThunk(
  "/dashboard/summary",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getDashboardSummary();
      return res?.data?.data;
    } catch (err) {
      const error = err as AxiosError<{
        message: string;
      }>;
      return rejectWithValue({
        message: error?.response?.data?.message,
        status: error?.response?.status,
      });
    }
  },
);

export const recentTransaction = createAsyncThunk(
  "dashboard/recent/transaction",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getRecentTransactions();
      return res?.data?.data;
    } catch (err) {
      const error = err as AxiosError<{
        message: string;
      }>;
      return rejectWithValue({
        message: error?.response?.data?.message,
        status: error?.response?.status,
      });
    }
  },
);
