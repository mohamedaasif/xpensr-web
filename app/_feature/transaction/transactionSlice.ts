import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "@/app/_types/transaction";
import { ApiError } from "@/app/_utils/constants";
import {
  getAllTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "./transactionThunk";

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: ApiError | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiError;
      })

      // ADD
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.unshift(action.payload);
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiError;
      })

      // UPDATE
      .addCase(editTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.transactions.findIndex(
          (t) => t.id === action.payload.id,
        );

        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiError;
      })

      // DELETE
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload,
        );
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiError;
      });
  },
});

export default transactionSlice.reducer;
