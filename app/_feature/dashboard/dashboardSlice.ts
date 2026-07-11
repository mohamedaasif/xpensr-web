import { ApiError } from "@/app/_utils/constants";
import { createSlice } from "@reduxjs/toolkit";
import { dashboardSummary, recentTransaction } from "./dashboardThunk";
import { Transaction } from "@/app/_types/transaction";

interface DashboardSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}

interface DashboardState {
  summaryData: DashboardSummary | null;
  summaryLoading: boolean;
  summaryError: ApiError | null;
  recentTransactionData: Transaction[];
  recentTransactionLoading: boolean;
  recentTransactionError: ApiError | null;
}

const initialState: DashboardState = {
  summaryData: null,
  summaryLoading: false,
  summaryError: null,
  recentTransactionData: [],
  recentTransactionLoading: false,
  recentTransactionError: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(dashboardSummary.pending, (state) => {
        state.summaryLoading = true;
      })
      .addCase(dashboardSummary.fulfilled, (state, action) => {
        state.summaryLoading = false;
        state.summaryData = action.payload;
        state.summaryError = null;
      })
      .addCase(dashboardSummary.rejected, (state, action) => {
        state.summaryLoading = false;
        state.summaryData = null;
        state.summaryError = action.payload || "Something went wrong";
      })
      .addCase(recentTransaction.pending, (state) => {
        state.recentTransactionLoading = true;
      })
      .addCase(recentTransaction.fulfilled, (state, action) => {
        state.recentTransactionLoading = false;
        state.recentTransactionData = action.payload;
        state.recentTransactionError = null;
      })
      .addCase(recentTransaction.rejected, (state, action) => {
        state.recentTransactionLoading = false;
        state.recentTransactionData = [];
        state.recentTransactionError = action.payload || "Something went wrong";
      });
  },
});

export default dashboardSlice.reducer;
