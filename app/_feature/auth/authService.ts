import axiosInstance from "@/app/_lib/axios";

export type authTypes = {
  firstName?: string;
  lastName?: string;
  emailId: string;
  password: string;
};

export const signupAPI = (data: authTypes) => {
  return axiosInstance.post("/signup", data);
};

export const loginAPI = (data: authTypes) => {
  return axiosInstance.post("/login", data);
};

export const logoutAPI = () => axiosInstance.post("/logout");
