"use client";

import Header from "@/app/_components/Header/Header";

const AccountsHeader = () => {
  const handleAddcAccount = () => {
    console.log("handleAddcAccount");
  };

  return (
    <>
      <Header
        title={"Accounts"}
        onClickHandler={handleAddcAccount}
        buttonText="Add Account"
      />
    </>
  );
};

export default AccountsHeader;
