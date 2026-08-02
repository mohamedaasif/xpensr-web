"use client";

import { Account } from "@/app/_types/accounts";
import AccountCard from "./AccountCard";
import { AppDrawer } from "@/app/_components/AppDrawer/AppDrawer";
import { Button } from "@/components/ui/button";
import AccountForm from "./AccountForm";
import AccountsHeader from "./AccountsHeader";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const accountSchema = z.object({
  accountType: z.string().trim().nonempty("Select account type"),

  accountName: z.string().trim().nonempty("Enter account name"),

  bankName: z.string().trim().nonempty("Enter bank name"),

  openingBalance: z
    .number({ error: "Enter opening balance" })
    .nonnegative("Opening balance cannot be negative"),

  currency: z.string().optional(),

  isDefault: z.boolean().optional(),
});

export type AccountFormValues = z.infer<typeof accountSchema>;

const AccountsClient = ({ data }: { data: Account[] }) => {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      accountType: "",
      accountName: "",
      bankName: "",
      openingBalance: undefined,
      currency: "INR",
      isDefault: false,
    },
  });
  const [open, setOpen] = useState(false);
  const [editAccount, setEditAccount] = useState<Account | null>(null);

  useEffect(() => {
    if (!editAccount?.id) return;

    form.reset({
      accountType: editAccount?.type ?? "",
      accountName: editAccount?.name ?? "",
      bankName: editAccount?.bankName ?? "",
      openingBalance: editAccount?.openingBalance ?? undefined,
      currency: editAccount?.currency ?? "INR",
      isDefault: editAccount?.isDefault ?? false,
    });
    setOpen(true);
  }, [editAccount]);

  const handleDrawerChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset({
        accountType: "",
        accountName: "",
        bankName: "",
        openingBalance: "" as any,
        currency: "INR",
        isDefault: false,
      });
      setEditAccount(null);
    }
  };

  return (
    <div>
      <AccountsHeader open={open} setOpen={setOpen} />

      <AppDrawer
        open={open}
        onOpenChange={handleDrawerChange}
        title={editAccount?.id ? "Edit account" : "Add account"}
        footer={
          <div className="flex gap-3">
            <Button form="account-form" type="submit" className="flex-2">
              {editAccount?.id ? "Update account" : "Save account"}
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
        <AccountForm
          form={form}
          setOpen={setOpen}
          editAccount={editAccount}
          setEditAccount={setEditAccount}
        />
      </AppDrawer>

      <div className="p-5 grid grid-cols-2 gap-5">
        {data?.map((account) => {
          return (
            <AccountCard
              key={account.id}
              data={account}
              setEditAccount={setEditAccount}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AccountsClient;
