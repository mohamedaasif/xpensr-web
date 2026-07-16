"use client";

import {
  dashboardSummary,
  recentTransaction,
} from "@/app/_feature/dashboard/dashboardThunk";
import { useAppDispatch } from "@/app/_feature/hooks";
import { useEffect } from "react";
import RecentTransaction from "./RecentTransaction";
import DashboardSummary from "./DashboardSummary";
import Header from "@/app/_components/Header/Header";

const DashboardClient = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(dashboardSummary());
    dispatch(recentTransaction());
  }, []);

  const handleAddTransaction = () => {
    console.log("handleAddTransaction");
  };

  return (
    <div>
      <Header
        title={"Dashboard"}
        onClickHandler={handleAddTransaction}
        buttonText="Add transaction"
      />
      <div className="p-5">
        <DashboardSummary />
        <RecentTransaction />
      </div>
    </div>
  );
};

export default DashboardClient;
