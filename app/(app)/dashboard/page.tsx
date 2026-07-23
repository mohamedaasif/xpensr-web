import { Suspense } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSummary from "./DashboardSummary";
import RecentTransaction from "./RecentTransaction";
import DashboardSummarySkeleton from "./DashboardSummarySkeleton";

const Dashboard = () => {
  return (
    <div className="flex h-full flex-col">
      <DashboardHeader />
      <div className="p-5 flex-1 overflow-y-auto">
        <Suspense fallback={<DashboardSummarySkeleton />}>
          <DashboardSummary />
        </Suspense>
        <RecentTransaction />
      </div>
    </div>
  );
};

export default Dashboard;
