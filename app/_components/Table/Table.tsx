"use client";

import { SquarePen, Trash2 } from "lucide-react";
import styles from "./Table.module.css";
import { ConfirmDialog } from "../ConfirmDialog/ConfirmDialog";

const Table = (props: any) => {
  const { data, loading, handleEditTransaction, handleDeleteTransaction } =
    props;
  return (
    <div className={styles["tbl"]} id="dash-txns">
      <div
        className={styles["tbl-hd"]}
        style={{ gridTemplateColumns: "1fr 68px 62px 76px 62px" }}
      >
        <span>Description</span>
        <span>Type</span>
        <span>Payment</span>
        <span>Amount</span>
        <span>Action</span>
      </div>

      {loading ? (
        <p className={styles["no-data"]}>Loading data...</p>
      ) : data?.length > 0 ? (
        data.map((data: any) => {
          const formattedDate = new Date(
            data?.transactionDate,
          ).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          });
          return (
            <div
              key={data?.id}
              className={styles["tbl-row"]}
              style={{ gridTemplateColumns: "1fr 68px 62px 76px 62px" }}
            >
              <div>
                <div className={styles["txn-d"]}>{data?.description}</div>
                <div className={styles["txn-s"]}>
                  {formattedDate} · {data?.account?.bankName}
                </div>
              </div>
              <span
                className={
                  styles["pill"] +
                  " " +
                  (data?.type === "Income" ? styles["pi"] : styles["pe"])
                }
              >
                {data?.type}
              </span>
              <span
                className={
                  styles["pill"] +
                  " " +
                  (data?.paymentMethod === "UPI"
                    ? styles["pupi"]
                    : data?.paymentMethod === "Cash"
                      ? styles["pcash"]
                      : data?.paymentMethod === "Card"
                        ? styles["pcard"]
                        : styles["pbank"])
                }
              >
                {data?.paymentMethod === "BankTransfer"
                  ? "Bank"
                  : data?.paymentMethod}
              </span>
              <div
                className={
                  styles["amt"] +
                  " " +
                  (data?.type === "Income" ? styles["ap"] : styles["an"])
                }
              >
                {data?.type === "Income" ? "+" : "-"}₹{data?.amount}
              </div>
              <div className="flex gap-2">
                <SquarePen
                  size={16}
                  color="var(--color-ind-light)"
                  onClick={() => handleEditTransaction(data)}
                />
                <ConfirmDialog
                  trigger={
                    <button
                      className={
                        styles["acc-act-btn"] + " " + styles["set-def"]
                      }
                    >
                      <Trash2
                        size={16}
                        color="var(--color-neg)"
                        className="cursor-pointer"
                      />
                    </button>
                  }
                  title="Delete transaction?"
                  description={`"${data?.description}" · ${data?.type === "Income" ? "+" : "-"}₹${data?.amount} will be permanently deleted.`}
                  confirmText="Confirm"
                  onConfirm={() => handleDeleteTransaction(data?.id)}
                  icon={<Trash2 />}
                  isDanger={true}
                />
              </div>
            </div>
          );
        })
      ) : (
        <p className={styles["no-data"]}>No data found</p>
      )}
    </div>
  );
};

export default Table;
