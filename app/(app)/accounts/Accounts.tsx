"use client";

import Header from "@/app/_components/Header/Header";

const AccountsClient = () => {
  const handleAddAccount = () => {
    console.log("handleAddAccount");
  };

  return (
    <div>
      <Header
        title={"Accounts"}
        onClickHandler={handleAddAccount}
        buttonText="Add account"
      />
      <div className="p-5">Account Page</div>
    </div>
  );
};

export default AccountsClient;
