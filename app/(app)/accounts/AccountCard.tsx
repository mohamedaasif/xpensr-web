"use client";

import {
  Banknote,
  ChartNoAxesCombined,
  Check,
  CreditCard,
  Landmark,
  QrCode,
} from "lucide-react";
import styles from "./AccountCard.module.css";
import { formatCurrency } from "@/lib/utils";
import { Account } from "@/app/_types/accounts";
import { ConfirmDialog } from "@/app/_components/ConfirmDialog/ConfirmDialog";
import { useAppDispatch } from "@/app/_feature/hooks";
import { updateAccount } from "@/app/_feature/account/accountThunk";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AccountCard = ({ data }: { data: Account }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
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

  const handleSetDefault = async () => {
    try {
      const id = data?.id;
      const res = await dispatch(
        updateAccount({ id, data: { isDefault: true } }),
      );
      router.refresh();
      if (!res?.payload?.success) {
        toast.error(
          `Failed to set "${data?.name}" as default. Please try again.`,
        );
      } else {
        toast.success(`"${data?.name}" set as default account`);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

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
            <ConfirmDialog
              trigger={
                <button
                  className={styles["acc-act-btn"] + " " + styles["set-def"]}
                >
                  Set Default
                </button>
              }
              title="Set as default?"
              description={`"${data?.name}" will be used as the default account in all new transactions.`}
              confirmText="Set default"
              onConfirm={handleSetDefault}
              icon={<Check />}
            />
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
