import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import transactionReducer from "./transaction/transactionSlice";
import profileReducer from "./profile/profileSlice";
import accountReducer from "./account/accountSlice";
import resetPasswordReducer from "./resetPassword/resetPasswordSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
    user: profileReducer,
    account: accountReducer,
    resetPassword: resetPasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
