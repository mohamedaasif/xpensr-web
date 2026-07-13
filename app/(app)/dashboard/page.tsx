import PageTitle from "@/app/_components/PageTitle";
import DashboardClient from "./Dashboard";

const Dashboard = () => {
  return (
    <div className="w-full">
      <PageTitle
        title={`Hello, username`}
        subtitle="Here's what's happening with your finances today."
      />
      <DashboardClient />
    </div>
  );
};

export default Dashboard;
