"use client";

import { Landmark } from "lucide-react";
import styles from "./AccountCard.module.css";
import { formatCurrency } from "@/lib/utils";
import { Account } from "@/app/_types/accounts";

const AccountCard = ({ data }: { data: Account }) => {
  return (
    <div className={styles["stat-card"]}>
      <div className={styles["stat-stripe"] + " " + styles["t-bal"]}></div>
      <div>
        <div className={styles["stat-ico"] + " " + styles["t-bal-ico"]}>
          <Landmark className="text-[var(--color-pos-text)]" size={16} />
        </div>
        <div className={styles["stat-val"]}>
          ₹{formatCurrency(data?.balance || 0)}
        </div>
        <div className={styles["stat-lbl"]}>Total balance</div>
      </div>
    </div>
  );
};

export default AccountCard;
