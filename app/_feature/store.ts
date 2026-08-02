import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import transactionReducer from "./transaction/transactionSlice";
import profileReducer from "./profile/profileSlice";
import accountReducer from "./account/accountSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
    user: profileReducer,
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
