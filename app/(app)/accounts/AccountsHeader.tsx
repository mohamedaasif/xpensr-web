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
  const handleAddAccount = () => {
    setOpen(!open);
  };

  return (
    <>
      <Header
        title={"Accounts"}
        onClickHandler={handleAddAccount}
        buttonText="Add account"
      />
    </>
  );
};

export default AccountsHeader;
