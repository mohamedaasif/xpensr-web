import styles from "./DashboardSummary.module.css";
import { Landmark, PiggyBank, TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { getDashboardSummary } from "@/app/_lib/services/dashboard.service";

const DashboardSummary = async () => {
  let summaryData = await getDashboardSummary();
  summaryData = summaryData?.data;

  return (
    <div className="flex gap-2 my-3">
      <div className={styles["stat-card"]}>
        <div className={styles["stat-stripe"] + " " + styles["t-bal"]}></div>
        <div>
          <div className={styles["stat-ico"] + " " + styles["t-bal-ico"]}>
            <Landmark className="text-[var(--color-pos-text)]" size={16} />
          </div>
          <div className={styles["stat-val"]}>
            ₹{formatCurrency(summaryData?.totalBalance || 0)}
          </div>
          <div className={styles["stat-lbl"]}>Total balance</div>
        </div>
      </div>
      <div className={styles["stat-card"]}>
        <div className={styles["stat-stripe"] + " " + styles["inc"]}></div>
        <div className={styles["stat-ico"] + " " + styles["inc-ico"]}>
          <TrendingUp className="text-[var(--color-pos)]" size={16} />
        </div>
        <div className={styles["stat-val"]}>
          ₹{formatCurrency(summaryData?.currentMonthIncome || 0)}
        </div>
        <div className={styles["stat-lbl"]}>Income this month</div>
      </div>
      <div className={styles["stat-card"]}>
        <div className={styles["stat-stripe"] + " " + styles["exp"]}></div>
        <div className={styles["stat-ico"] + " " + styles["exp-ico"]}>
          <TrendingDown className="text-[var(--color-neg)]" size={16} />
        </div>
        <div className={styles["stat-val"]}>
          ₹{formatCurrency(summaryData?.currentMonthExpense || 0)}
        </div>
        <div className={styles["stat-lbl"]}>Expenses this month</div>
      </div>
      <div className={styles["stat-card"]}>
        <div className={styles["stat-stripe"] + " " + styles["sav"]}></div>
        <div className={styles["stat-ico"] + " " + styles["sav-ico"]}>
          <PiggyBank className="text-[var(--color-sav)]" size={16} />
        </div>
        <div className={styles["stat-val"]}>
          ₹{formatCurrency(summaryData?.netSavings || 0)}
        </div>
        <div className={styles["stat-lbl"]}>Net savings</div>
      </div>
    </div>
  );
};

export default DashboardSummary;
