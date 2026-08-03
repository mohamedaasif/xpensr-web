"use client";
import { AppDrawer } from "@/app/_components/AppDrawer/AppDrawer";
import Header from "@/app/_components/Header/Header";
import Table from "@/app/_components/Table/Table";
import { Transaction } from "@/app/_types/transaction";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TransactionForm from "./TransactionForm";
import { Account } from "@/app/_types/accounts";

const transactionSchema = z.object({
  type: z.string().trim().nonempty("Select payment type"),
  paymentMethod: z.string().trim().nonempty("Select payemnt method"),
  description: z.string().trim().nonempty("Enter description"),
  amount: z
    .number({ error: "Enter amount" })
    .nonnegative("Amount cannot be negative"),
  transactionDate: z.date().nonoptional("Select date"),
  notes: z.string().optional(),
  location: z.string().trim().optional(),
  referenceNo: z.string().trim().optional(),
  isRecurring: z.boolean().optional(),
  account: z.string().nonempty("Select bank"),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;

const TransactionClient = ({
  data,
  accountsData,
}: {
  data: Transaction;
  accountsData: Account[] | null;
}) => {
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "",
      amount: undefined,
      description: "",
      notes: "",
      transactionDate: new Date(),
      paymentMethod: "",
      referenceNo: "",
      location: "",
      isRecurring: false,
      account: "",
    },
  });

  const [open, setOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(
    null,
  );

  const handleAddTransaction = () => {
    setOpen(!open);
  };

  const handleDrawerChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset({
        type: "",
        amount: undefined,
        description: "",
        notes: "",
        transactionDate: new Date(),
        paymentMethod: "",
        referenceNo: "",
        location: "",
        isRecurring: false,
        account: "",
      });
      setEditTransaction(null);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <Header
        title={"Transactions"}
        onClickHandler={handleAddTransaction}
        buttonText="Add transaction"
      />
      <AppDrawer
        open={open}
        onOpenChange={handleDrawerChange}
        title={editTransaction?.id ? "Edit transaction" : "Add transaction"}
        footer={
          <div className="flex gap-3">
            <Button form="transaction-form" type="submit" className="flex-2">
              {editTransaction?.id ? "Update transaction" : "Save transaction"}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleDrawerChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        }
      >
        <TransactionForm
          form={form}
          setOpen={setOpen}
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
          accountsData={accountsData}
        />
      </AppDrawer>
      <div className="p-5 flex-1 overflow-y-auto">
        <Table data={data} />
      </div>
    </div>
  );
};

export default TransactionClient;
