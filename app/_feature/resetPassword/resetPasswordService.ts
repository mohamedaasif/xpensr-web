import clientApi from "@/app/_lib/axios/client";

export const requestOTP = (data: { emailId: string }) => {
  return clientApi.post("/request-otp", data);
};

export const resendOTP = (data: { emailId: string }) => {
  return clientApi.post("/resend-otp", data);
};

export const verifyOTP = (data: { emailId: string; otp: string }) => {
  return clientApi.post("/verify-otp", data);
};

export const resetPassword = (data: { password: string }) => {
  return clientApi.post("/reset-password", data);
};
