import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTransaction as addTransactionAPI,
  editTransaction as editTransactionAPI,
  deleteTransaction as deleteTransactionAPI,
  getAllTransactions as getAllTransactionsAPI,
} from "./transactionService";
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from "@/app/_types/transaction";

export const getAllTransactions = createAsyncThunk(
  "transaction/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllTransactionsAPI();
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue({
        message: err.response?.data?.message,
        status: err.response?.status,
      });
    }
  },
);

export const addTransaction = createAsyncThunk(
  "transaction/add",
  async (data: CreateTransactionDto, { rejectWithValue }) => {
    try {
      const res = await addTransactionAPI(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue({
        message: err.response?.data?.message,
        status: err.response?.status,
      });
    }
  },
);

export const editTransaction = createAsyncThunk(
  "transaction/edit",
  async (
    { id, data }: { id: string; data: UpdateTransactionDto },
    { rejectWithValue },
  ) => {
    try {
      const res = await editTransactionAPI(id, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue({
        message: err.response?.data?.message,
        status: err.response?.status,
      });
    }
  },
);

export const deleteTransaction = createAsyncThunk(
  "transaction/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteTransactionAPI(id);
      return res.data;
    } catch (err: any) {
      return rejectWithValue({
        message: err.response?.data?.message,
        status: err.response?.status,
      });
    }
  },
);
