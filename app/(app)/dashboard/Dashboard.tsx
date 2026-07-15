"use client";

import {
  dashboardSummary,
  recentTransaction,
} from "@/app/_feature/dashboard/dashboardThunk";
import { useAppDispatch } from "@/app/_feature/hooks";
import { useEffect } from "react";
import RecentTransaction from "./RecentTransaction";
import DashboardSummary from "./DashboardSummary";

const DashboardClient = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(dashboardSummary());
    dispatch(recentTransaction());
  }, []);

  return (
    <div className="p-5">
      <DashboardSummary />
      <RecentTransaction />
    </div>
  );
};

export default DashboardClient;
