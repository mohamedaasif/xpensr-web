import Table from "@/app/_components/Table/Table";
import styles from "./RecentTransaction.module.css";
import { getRecentTransactions } from "@/app/_lib/services/dashboard.service";

const RecentTransaction = async () => {
  let recentTransactionData = await getRecentTransactions();
  recentTransactionData = recentTransactionData?.data;
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
      <Table data={recentTransactionData} />
    </>
  );
};

export default RecentTransaction;
