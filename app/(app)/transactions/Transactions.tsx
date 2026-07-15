"use client";
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
  return (
    <div className="p-5">
      <Table data={transactions} loading={loading} />
    </div>
  );
};

export default TransactionClient;
