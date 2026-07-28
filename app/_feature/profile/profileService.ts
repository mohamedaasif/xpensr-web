import clientApi from "@/app/_lib/axios/client";

export type userTypes = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dob?: string;
};

export const updateProfile = (data: userTypes) => {
  return clientApi.patch("/profile/edit", data);
};
