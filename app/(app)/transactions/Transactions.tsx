"use client";
import Header from "@/app/_components/Header/Header";
import Table from "@/app/_components/Table/Table";
import { useAppDispatch, useAppSelector } from "@/app/_feature/hooks";
import { getAllTransactions } from "@/app/_feature/transaction/transactionThunk";
import { useEffect } from "react";

const TransactionClient = () => {
  const dispatch = useAppDispatch();
  const { transactions, loading } = useAppSelector(
    (state) => state.transaction,
  );

  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);

  const handleAddTransaction = () => {
    console.log("handleAddTransaction");
  };
  return (
    <div>
      <Header
        title={"Transactions"}
        onClickHandler={handleAddTransaction}
        buttonText="Add transaction"
      />
      <div className="p-5">
        <Table data={transactions} loading={loading} />
      </div>
    </div>
  );
};

export default TransactionClient;
