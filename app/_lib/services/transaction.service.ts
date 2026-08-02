import { getServerApi } from "../axios/server";

export async function getAllTransactions() {
  const api = await getServerApi();

  const { data } = await api.get("/all/transactions");

  return data;
}
