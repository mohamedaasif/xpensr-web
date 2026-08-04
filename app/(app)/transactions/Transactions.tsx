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
import { deleteTransaction } from "@/app/_feature/transaction/transactionThunk";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/_feature/hooks";

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
  const router = useRouter();
  const dispatch = useAppDispatch();
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

  const handleEditTransaction = (data: Transaction) => {
    const transactionData = {
      type: data?.type,
      amount: data?.amount,
      description: data?.description,
      notes: data?.notes,
      transactionDate: new Date(data?.transactionDate),
      paymentMethod: data?.paymentMethod,
      referenceNo: data?.referenceNo,
      location: data?.location,
      isRecurring: data?.isRecurring,
      account: data?.accountId,
    };
    setEditTransaction(data);
    form.reset({
      ...transactionData,
    });
    setOpen(true);
  };

  const handleDeleteTransaction = async (id: string) => {
    if (!id) return;
    try {
      const res = await dispatch(deleteTransaction(id));
      if (!res?.payload?.success) {
        toast.error(res?.payload?.message);
      } else {
        toast.success("Transaction deleted");
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message);
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
        <Table
          data={data}
          handleEditTransaction={handleEditTransaction}
          handleDeleteTransaction={handleDeleteTransaction}
        />
      </div>
    </div>
  );
};

export default TransactionClient;
