"use client";

import { Account } from "@/app/_types/accounts";
import AccountCard from "./AccountCard";

const AccountsClient = ({ data }: { data: Account[] }) => {
  return (
    <div className="p-5 grid grid-cols-2 gap-5">
      {data?.map((account) => {
        return <AccountCard key={account.id} data={account} />;
      })}
    </div>
  );
};

export default AccountsClient;
