import { getAllTransactions } from "@/app/_lib/services/transaction.service";
import TransactionClient from "./Transactions";

const Transactions = async () => {
  const transactionData = (await getAllTransactions())?.data;

  return <TransactionClient data={transactionData} />;
};

export default Transactions;
