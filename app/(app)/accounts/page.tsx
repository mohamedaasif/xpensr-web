import { getAllAccounts } from "@/app/_lib/services/accounts.service";
import AccountsClient from "./Accounts";
import AccountsHeader from "./AccountsHeader";

const Accounts = async () => {
  const accounts = (await getAllAccounts())?.data;

  return (
    <div className="flex h-full flex-col">
      <AccountsHeader />

      <div className="flex-1 overflow-y-auto">
        <AccountsClient data={accounts} />
      </div>
    </div>
  );
};

export default Accounts;
