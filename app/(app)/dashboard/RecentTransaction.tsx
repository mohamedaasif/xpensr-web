"use client";
import Table from "@/app/_components/Table/Table";
import styles from "./RecentTransaction.module.css";
import { useAppSelector } from "@/app/_feature/hooks";

const RecentTransaction = () => {
  const { recentTransactionData, recentTransactionLoading } = useAppSelector(
    (state) => state.dashboard,
  );
  return (
    <>
      <div className={styles["sec-row"]}>
        <span className={styles["sec-title"]}>Recent transactions</span>
        <button
          className={styles["sec-link"]}
          // onclick="nav('txns',document.querySelectorAll('.nav-it')[1])"
        >
          View all ↗
        </button>
      </div>
      <Table data={recentTransactionData} loading={recentTransactionLoading} />
    </>
  );
};

export default RecentTransaction;
