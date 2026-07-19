import clientApi from "@/app/_lib/axios/client";
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from "./../../_types/transaction";

export const getAllTransactions = () => {
  return clientApi.get("/all/transactions");
};
export const addTransaction = (data: CreateTransactionDto) => {
  return clientApi.post("/add/transaction", data);
};
export const editTransaction = (id: string, data: UpdateTransactionDto) => {
  return clientApi.patch(`/update/transaction/${id}`, data);
};
export const deleteTransaction = (id: string) => {
  return clientApi.delete(`/delete/transaction/${id}`);
};
