"use client";

import {
  Banknote,
  ChartNoAxesCombined,
  CreditCard,
  Landmark,
  QrCode,
} from "lucide-react";
import styles from "./AccountCard.module.css";
import { formatCurrency } from "@/lib/utils";
import { Account } from "@/app/_types/accounts";

const AccountCard = ({ data }: { data: Account }) => {
  const stripeClass = {
    Savings: styles.sav,
    Credit_Card: styles.neg,
    Cash: styles.cash,
    Investment: styles.invest,
    Current: styles.current,
    Wallet: styles.wallet,
  };
  const iconClass = {
    Savings: styles["sav-ico"],
    Credit_Card: styles["neg-ico"],
    Cash: styles["cash-ico"],
    Investment: styles["invest-ico"],
    Current: styles["current-ico"],
    Wallet: styles["wallet-ico"],
  };
  const iconBgClass = {
    Savings: styles["sav-bg"],
    Credit_Card: styles["neg-bg"],
    Cash: styles["cash-bg"],
    Investment: styles["invest-bg"],
    Current: styles["current-bg"],
    Wallet: styles["wallet-bg"],
  };

  const icons = {
    Savings: Landmark,
    Credit_Card: CreditCard,
    Cash: Banknote,
    Investment: ChartNoAxesCombined,
    Current: Landmark,
    Wallet: QrCode,
  };

  const Icon = icons[data.type] ?? Landmark;

  return (
    <div className={styles["stat-card"]}>
      <div
        className={`${styles["stat-stripe"]} ${stripeClass[data?.type]}`}
      ></div>
      <div>
        <div className="flex justify-between mb-2">
          <div className={`${styles["stat-ico"]} ${iconBgClass[data.type]}`}>
            <Icon className={iconClass[data.type]} size={16} />
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
