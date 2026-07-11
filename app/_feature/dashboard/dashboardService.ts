import axiosInstance from "@/app/_lib/axios";

export const getDashboardSummary = () => {
  return axiosInstance.get("/dashboard/summary");
};

export const getRecentTransactions = () => {
  return axiosInstance.get("/dashboard/recent/transaction");
};
