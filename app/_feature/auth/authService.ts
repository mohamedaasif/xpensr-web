import clientApi from "@/app/_lib/axios/client";

export type authTypes = {
  firstName?: string;
  lastName?: string;
  emailId: string;
  password: string;
};

export const signupAPI = (data: authTypes) => {
  return clientApi.post("/signup", data);
};

export const loginAPI = (data: authTypes) => {
  return clientApi.post("/login", data);
};

export const logoutAPI = () => clientApi.post("/logout");
