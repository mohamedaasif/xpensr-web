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
        <div className="flex justify-between mb-2">
          <div className={styles["stat-ico"] + " " + styles["t-bal-ico"]}>
            <Landmark className="text-[var(--color-pos-text)]" size={16} />
          </div>
          <div className="flex items-center gap-3">
            <span className={styles["acc-typ"]}>
              {data?.type.replace("_", " ")}
            </span>
            {data?.isDefault && (
              <span className={styles["default-badge"]}>Default</span>
            )}
          </div>
        </div>
        <div className={styles["acc-name"]}>{data?.name}</div>
        <div className={styles["acc-bank"]}>
          {data?.bankName
            ? data?.bankName + " · " + data?.currency?.toUpperCase()
            : data?.currency?.toUpperCase()}
        </div>
        <div className={styles["stat-val"]}>
          ₹{formatCurrency(data?.balance || 0)}
        </div>
        <div className={styles["stat-lbl"]}>
          Opening balance {formatCurrency(data?.openingBalance || 0)}
        </div>
        <div className={styles["acc-acts"]}>
          <button className={styles["acc-act-btn"] + " " + styles["edit-acc"]}>
            Edit
          </button>
          {data?.isDefault ? (
            <span className={styles["def-acc"]}>Default account</span>
          ) : (
            <button className={styles["acc-act-btn"] + " " + styles["set-def"]}>
              Set Default
            </button>
          )}
          <button
            className={
              styles["acc-act-btn"] + " " + styles["del-acc"] + " ml-auto"
            }
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
