import Table from "@/app/_components/Table/Table";
import styles from "./RecentTransaction.module.css";
import { getRecentTransactions } from "@/app/_lib/services/dashboard.service";
import Link from "next/link";

const RecentTransaction = async () => {
  let recentTransactionData = await getRecentTransactions();
  recentTransactionData = recentTransactionData?.data;
  return (
    <>
      <div className={styles["sec-row"]}>
        <span className={styles["sec-title"]}>Recent transactions</span>
        <Link className={styles["sec-link"]} href={"/transactions"}>
          View all ↗
        </Link>
      </div>
      <Table data={recentTransactionData} />
    </>
  );
};

export default RecentTransaction;
