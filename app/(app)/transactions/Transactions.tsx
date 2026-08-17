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
  data: Transaction[];
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
        buttonText={accountsData?.length ? "Add transaction" : ""}
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
        {accountsData?.length && (
          <Table
            data={data}
            handleEditTransaction={handleEditTransaction}
            handleDeleteTransaction={handleDeleteTransaction}
            isAction={true}
          />
        )}
        {!accountsData?.length && !data?.length && (
          <div className="overflow-hidden rounded-[11px] border-[0.5px] border-[var(--color-bdr)] bg-[var(--color-card)]">
            <div className="px-4 py-[50px]">
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[18px] bg-[var(--color-card-2)] mx-auto">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M4 3.5h8M4 6.5h8M4 9.5h8M1.5 3.5h.5M1.5 6.5h.5M1.5 9.5h.5"
                    stroke="var(--color-ink-3)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="mt-[14px] mb-[5px] font-[var(--font-display)] text-[15px] font-medium tracking-[-0.2px] text-[var(--color-ink)] text-center">
                No transactions
              </div>

              <div className="mx-auto mb-[18px] text-center text-[12px] leading-[1.65] text-[var(--color-ink-3)]">
                Add an account first, then record your <br></br>expenses and
                income here.
              </div>

              <div className="flex justify-center">
                <button
                  className="btn-primary"
                  onClick={() => router.push("/accounts")}
                >
                  Add account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionClient;
