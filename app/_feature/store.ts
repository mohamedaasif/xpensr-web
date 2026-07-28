import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import transactionReducer from "./transaction/transactionSlice";
import profileReducer from "./profile/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
    user: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
