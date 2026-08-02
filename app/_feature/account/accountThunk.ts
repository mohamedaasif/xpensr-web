import { createAsyncThunk } from "@reduxjs/toolkit";
import { addAccountAPI, editAccountAPI } from "./accountService";
import { CreateAccountDto, UpdateAccountDto } from "@/app/_types/accounts";

export const addAccount = createAsyncThunk(
  "account/add",
  async (data: CreateAccountDto, { rejectWithValue }) => {
    try {
      const res = await addAccountAPI(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue({
        message: err.response?.data?.message,
        status: err.response?.status,
      });
    }
  },
);

export const updateAccount = createAsyncThunk(
  "account/edit",
  async (
    { id, data }: { id: string; data: UpdateAccountDto },
    { rejectWithValue },
  ) => {
    try {
      const res = await editAccountAPI(id, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue({
        message: err.response?.data?.message,
        status: err.response?.status,
      });
    }
  },
);
