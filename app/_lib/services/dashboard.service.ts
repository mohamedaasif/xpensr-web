import { getServerApi } from "../axios/server";

export async function getDashboardSummary() {
  const api = await getServerApi();

  const { data } = await api.get("/dashboard/summary");

  return data;
}

export async function getRecentTransactions() {
  const api = await getServerApi();

  const { data } = await api.get("/dashboard/recent/transaction");

  return data;
}
