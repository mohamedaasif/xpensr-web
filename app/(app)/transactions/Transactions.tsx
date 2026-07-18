"use client";
import Header from "@/app/_components/Header/Header";
import Table from "@/app/_components/Table/Table";
import { Transaction } from "@/app/_types/transaction";

const TransactionClient = ({ data }: { data: Transaction }) => {
  const handleAddTransaction = () => {
    console.log("handleAddTransaction");
  };
  return (
    <div>
      <Header
        title={"Transactions"}
        onClickHandler={handleAddTransaction}
        buttonText="Add transaction"
      />
      <div className="p-5">
        <Table data={data} />
      </div>
    </div>
  );
};

export default TransactionClient;
