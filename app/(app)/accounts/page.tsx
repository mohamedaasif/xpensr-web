import { getAllAccounts } from "@/app/_lib/services/accounts.service";
import AccountsClient from "./Accounts";

const Accounts = async () => {
  const accounts = (await getAllAccounts())?.data;

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <AccountsClient data={accounts} />
      </div>
    </div>
  );
};

export default Accounts;
