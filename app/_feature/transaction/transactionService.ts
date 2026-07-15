import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from "./../../_types/transaction";
import axiosInstance from "@/app/_lib/axios";

export const getAllTransactions = () => {
  return axiosInstance.get("/all/transactions");
};
export const addTransaction = (data: CreateTransactionDto) => {
  return axiosInstance.post("/add/transaction", data);
};
export const editTransaction = (id: string, data: UpdateTransactionDto) => {
  return axiosInstance.patch(`/update/transaction/${id}`, data);
};
export const deleteTransaction = (id: string) => {
  return axiosInstance.delete(`/delete/transaction/${id}`);
};
