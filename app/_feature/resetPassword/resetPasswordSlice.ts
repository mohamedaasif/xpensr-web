import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
  requestOTP,
  resendOTP,
  verifyOTP,
  resetPassword,
} from "./resetPasswordThunk";

type ResetPasswordStep = 1 | 2 | 3 | 4;

type ResetPasswordState = {
  emailId: string;
  step: ResetPasswordStep;

  otpExpiresAt: string | null;
  resendAvailableAt: string | null;

  loading: boolean;
  error: string | null;
  success: boolean;

  resendLoading: boolean;
};

const initialState: ResetPasswordState = {
  emailId: "",
  step: 1,

  otpExpiresAt: null,
  resendAvailableAt: null,

  loading: false,
  error: null,
  success: false,

  resendLoading: false,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,

  reducers: {
    setStep: (state, action: PayloadAction<ResetPasswordStep>) => {
      state.step = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    resetResetPasswordState: () => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(requestOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(requestOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const data = action.payload.data;

        if (data) {
          state.emailId = data.email;
          state.otpExpiresAt = data.otpExpiresAt;
          state.resendAvailableAt = data.resendAvailableAt;

          state.step = 2;
        }
      })

      .addCase(requestOTP.rejected, (state, action) => {
        state.loading = false;

        const payload = action.payload as
          | {
              message?: string;
            }
          | undefined;

        state.error = payload?.message ?? "OTP request failed.";
      });

    builder
      .addCase(resendOTP.pending, (state) => {
        state.resendLoading = true;
        state.error = null;
      })

      .addCase(resendOTP.fulfilled, (state, action) => {
        state.resendLoading = false;
        state.error = null;

        const data = action.payload.data;

        if (data) {
          state.otpExpiresAt = data.otpExpiresAt;
          state.resendAvailableAt = data.resendAvailableAt;
        }
      })

      .addCase(resendOTP.rejected, (state, action) => {
        state.resendLoading = false;

        const payload = action.payload as
          | {
              message?: string;
              data?: {
                resendAvailableAt?: string;
              };
            }
          | undefined;

        state.error = payload?.message ?? "Unable to resend OTP.";

        // Keep the server-provided cooldown if the API
        // rejected the request because of the cooldown.
        if (payload?.data?.resendAvailableAt) {
          state.resendAvailableAt = payload.data.resendAvailableAt;
        }
      });

    builder
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyOTP.fulfilled, (state) => {
        state.loading = false;
        state.error = null;

        state.step = 3;
      })

      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;

        const payload = action.payload as
          | {
              message?: string;
            }
          | undefined;

        state.error = payload?.message ?? "OTP verification failed.";
      });

    // --------------------------------
    // Reset Password
    // --------------------------------

    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;

        state.success = true;
        state.step = 4;
      })

      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;

        const payload = action.payload as
          | {
              message?: string;
            }
          | undefined;

        state.error = payload?.message ?? "Reset password failed.";
      });
  },
});

export const { setStep, clearError, resetResetPasswordState } =
  resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
