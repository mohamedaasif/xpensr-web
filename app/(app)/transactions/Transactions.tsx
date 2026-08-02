"use client";
import Header from "@/app/_components/Header/Header";
import Table from "@/app/_components/Table/Table";
import { Transaction } from "@/app/_types/transaction";

const TransactionClient = ({ data }: { data: Transaction }) => {
  const handleAddTransaction = () => {
    console.log("handleAddTransaction");
  };
  return (
    <div className="flex h-full flex-col">
      <Header
        title={"Transactions"}
        onClickHandler={handleAddTransaction}
        buttonText="Add transaction"
      />
      <div className="p-5 flex-1 overflow-y-auto">
        <Table data={data} />
      </div>
    </div>
  );
};

export default TransactionClient;
