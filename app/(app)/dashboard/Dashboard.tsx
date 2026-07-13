"use client";

import {
  dashboardSummary,
  recentTransaction,
} from "@/app/_feature/dashboard/dashboardThunk";
import { useAppDispatch, useAppSelector } from "@/app/_feature/hooks";
import { useEffect } from "react";
import RecentTransaction from "./RecentTransaction";

const DashboardClient = () => {
  const dispatch = useAppDispatch();

  const { summaryData, summaryLoading } = useAppSelector(
    (state) => state.dashboard,
  );

  useEffect(() => {
    dispatch(dashboardSummary());
    dispatch(recentTransaction());
  }, []);

  return (
    <div className="p-5">
      <div></div>
      <RecentTransaction />
    </div>
  );
};

export default DashboardClient;
