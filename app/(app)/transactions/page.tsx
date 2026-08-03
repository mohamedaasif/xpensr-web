import { getAllTransactions } from "@/app/_lib/services/transaction.service";
import TransactionClient from "./Transactions";
import { getAllAccounts } from "@/app/_lib/services/accounts.service";

const Transactions = async () => {
  const transactionData = (await getAllTransactions())?.data;
  const accountsData = (await getAllAccounts())?.data;

  return (
    <TransactionClient data={transactionData} accountsData={accountsData} />
  );
};

export default Transactions;
