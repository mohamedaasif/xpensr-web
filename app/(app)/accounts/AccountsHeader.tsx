"use client";

import Header from "@/app/_components/Header/Header";
import { Dispatch, SetStateAction } from "react";

const AccountsHeader = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleAddcAccount = () => {
    setOpen(!open);
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
