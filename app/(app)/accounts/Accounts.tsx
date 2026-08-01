"use client";

import { Account } from "@/app/_types/accounts";
import AccountCard from "./AccountCard";
import { AppDrawer } from "@/app/_components/AppDrawer/AppDrawer";
import { Button } from "@/components/ui/button";
import AccountForm from "./AccountForm";
import AccountsHeader from "./AccountsHeader";
import { useState } from "react";

const AccountsClient = ({ data }: { data: Account[] }) => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div>
      <AccountsHeader open={open} setOpen={setOpen} />

      <div className="p-5 grid grid-cols-2 gap-5">
        {data?.map((account) => {
          return <AccountCard key={account.id} data={account} />;
        })}
        <AppDrawer
          open={open}
          onOpenChange={setOpen}
          title={isEdit ? "Edit Account" : "Add Account"}
          description="Manage your account information."
          footer={
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>

              <Button form="account-form" type="submit">
                {isEdit ? "Update" : "Create"}
              </Button>
            </>
          }
        >
          <AccountForm id="account-form" />
        </AppDrawer>
      </div>
    </div>
  );
};

export default AccountsClient;
