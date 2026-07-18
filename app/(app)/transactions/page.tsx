import { getAllTransactions } from "@/app/_lib/services/transaction.service";
import TransactionClient from "./Transactions";

const Transactions = async () => {
  const transactionData = (await getAllTransactions())?.data;

  return (
    <div className="w-full">
      <TransactionClient data={transactionData} />
    </div>
  );
};

export default Transactions;
