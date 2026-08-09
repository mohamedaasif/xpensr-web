"use client";

import Header from "@/app/_components/Header/Header";

const DashboardHeader = () => {
  const handleAddTransaction = () => {
    console.log("handleAddTransaction");
  };

  return (
    <>
      <Header
        title={"Dashboard"}
        // onClickHandler={handleAddTransaction}
        // buttonText="Add transaction"
      />
    </>
  );
};

export default DashboardHeader;
