import { getAllAccounts } from "@/app/_lib/services/accounts.service";
import AccountsClient from "./Accounts";
import AccountsHeader from "./AccountsHeader";

const Accounts = async () => {
  const accounts = (await getAllAccounts())?.data;

  return (
    <div className="w-full">
      <AccountsHeader />
      <AccountsClient data={accounts} />
    </div>
  );
};

export default Accounts;
