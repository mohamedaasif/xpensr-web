import { Suspense } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSummary from "./DashboardSummary";
import RecentTransaction from "./RecentTransaction";
import DashboardSummarySkeleton from "./DashboardSummarySkeleton";

const Dashboard = () => {
  return (
    <div className="w-full">
      <DashboardHeader />
      <div className="p-5">
        <Suspense fallback={<DashboardSummarySkeleton />}>
          <DashboardSummary />
        </Suspense>
        <RecentTransaction />
      </div>
    </div>
  );
};

export default Dashboard;
