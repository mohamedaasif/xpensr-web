import { getServerApi } from "../axios/server";

export async function getAllAccounts() {
  const api = await getServerApi();

  const { data } = await api.get("/account/details");

  return data;
}
