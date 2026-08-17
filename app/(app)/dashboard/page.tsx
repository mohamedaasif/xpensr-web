import { Suspense } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSummary from "./DashboardSummary";
import RecentTransaction from "./RecentTransaction";
import DashboardSummarySkeleton from "./DashboardSummarySkeleton";
import WelcomeBanner from "./WelcomeBanner";
import SetupChecklist from "./SetupChecklist";
import { getAllAccounts } from "@/app/_lib/services/accounts.service";
import { getAllTransactions } from "@/app/_lib/services/transaction.service";

const Dashboard = async () => {
  const [accounts, transactions] = await Promise.all([
    getAllAccounts().catch(() => []),
    getAllTransactions().catch(() => []),
  ]);

  const hasAccounts = accounts.length > 0;
  const hasTransactions = transactions.length > 0;
  const isNewUser = !hasAccounts && !hasTransactions;

  return (
    <div className="flex h-full flex-col">
      <DashboardHeader />
      <div className="p-5 flex-1 overflow-y-auto flex flex-col gap-5">
        {isNewUser && <WelcomeBanner />}

        {(!hasAccounts || !hasTransactions) && (
          <SetupChecklist
            hasAccounts={hasAccounts}
            hasTransactions={hasTransactions}
          />
        )}
        <Suspense fallback={<DashboardSummarySkeleton />}>
          <DashboardSummary />
        </Suspense>
        <RecentTransaction />
      </div>
    </div>
  );
};

export default Dashboard;
