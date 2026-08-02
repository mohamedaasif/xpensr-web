import { createSlice } from "@reduxjs/toolkit";
import { ApiError } from "@/app/_utils/constants";
import { addAccount, updateAccount } from "./accountThunk";
import { Account } from "@/app/_types/accounts";

interface AccountState {
  accounts: Account[];
  loading: boolean;
  error: ApiError | null;
}

const initialState: AccountState = {
  accounts: [],
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ADD
      .addCase(addAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts.unshift(action.payload);
      })
      .addCase(addAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiError;
      })

      // UPDATE
      .addCase(updateAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.accounts.findIndex(
          (t) => t.id === action.payload.id,
        );

        if (index !== -1) {
          state.accounts[index] = action.payload;
        }
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiError;
      });
  },
});

export default accountSlice.reducer;
