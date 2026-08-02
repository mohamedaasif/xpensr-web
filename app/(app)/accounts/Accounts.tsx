"use client";

import { Account } from "@/app/_types/accounts";
import AccountCard from "./AccountCard";
import { AppDrawer } from "@/app/_components/AppDrawer/AppDrawer";
import { Button } from "@/components/ui/button";
import AccountForm from "./AccountForm";
import AccountsHeader from "./AccountsHeader";
import { useState } from "react";
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
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div>
      <AccountsHeader open={open} setOpen={setOpen} />

      <AppDrawer
        open={open}
        onOpenChange={setOpen}
        title={isEdit ? "Edit account" : "Add account"}
        footer={
          <div className="flex gap-3">
            <Button form="account-form" type="submit" className="flex-2">
              {isEdit ? "Update account" : "Save account"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        }
      >
        <AccountForm form={form} setOpen={setOpen} />
      </AppDrawer>

      <div className="p-5 grid grid-cols-2 gap-5">
        {data?.map((account) => {
          return <AccountCard key={account.id} data={account} />;
        })}
      </div>
    </div>
  );
};

export default AccountsClient;
