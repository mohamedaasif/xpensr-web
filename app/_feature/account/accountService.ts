import clientApi from "@/app/_lib/axios/client";
import { CreateAccountDto, UpdateAccountDto } from "@/app/_types/accounts";

export const addAccountAPI = (data: CreateAccountDto) => {
  return clientApi.post("/account/details", data);
};
export const editAccountAPI = (id: string, data: UpdateAccountDto) => {
  return clientApi.patch(`/account/details/${id}`, data);
};
