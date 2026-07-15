import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import dashboardReducer from "./dashboard/dashboardSlice";
import transactionReducer from "./transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
