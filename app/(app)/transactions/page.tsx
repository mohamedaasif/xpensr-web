import PageTitle from "@/app/_components/PageTitle";
import TransactionClient from "./Transactions";

const Transactions = () => {
  return (
    <div className="w-full">
      <PageTitle
        title={"Transactions"}
        subtitle="View, search and manage all your transactions."
      />
      <TransactionClient />
    </div>
  );
};

export default Transactions;
