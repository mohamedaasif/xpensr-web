"use client";
import { useForm } from "react-hook-form";
import Profile from "./Profile";
import SettingsHeader from "./SettingsHeader";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileSchema = z.object({
  firstName: z.string().trim().nonempty("First name is required"),

  lastName: z.string().trim().nonempty("Last name is required"),

  email: z.email().nonempty("Email is required"),

  phone: z.string().optional(),

  dob: z.date().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

const SettingsClient = ({ user }: { user: any }) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: undefined,
    },
  });
  return (
    <div>
      <SettingsHeader user={user} form={form} />
      <div className="p-5">
        <Profile user={user} form={form} />
      </div>
    </div>
  );
};

export default SettingsClient;
