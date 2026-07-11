"use client";

import {
  dashboardSummary,
  recentTransaction,
} from "@/app/_feature/dashboard/dashboardThunk";
import { useAppDispatch, useAppSelector } from "@/app/_feature/hooks";
import { useEffect } from "react";

const DashboardClient = () => {
  const dispatch = useAppDispatch();

  const {
    summaryData,
    summaryLoading,
    recentTransactionData,
    recentTransactionLoading,
  } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(dashboardSummary());
    dispatch(recentTransaction());
  }, []);

  console.log("summaryData", summaryData);
  console.log("recentTransactionData", recentTransactionData);
  return (
    <div>
      <div></div>
    </div>
  );
};

export default DashboardClient;
