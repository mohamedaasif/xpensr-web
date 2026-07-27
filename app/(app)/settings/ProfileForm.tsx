"use client";
import { DatePickerInput } from "@/app/_components/DatePicker/DatePicker";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

const ProfileForm = ({ user, form }: { user: any; form: any }) => {
  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  useEffect(() => {
    if (!user) return;

    reset({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      dob: user.dob ? new Date(user.dob) : undefined,
    });
  }, [user]);

  const onSubmit = async (data: any) => {
    console.log(data);

    // Call API

    // After successful save
    reset(data);
  };
  return (
    <form
      className="w-full"
      id="profile-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="firstName" className="form-label">
              First Name*
            </FieldLabel>
            <Input
              id="firstName"
              {...register("firstName")}
              type="text"
              placeholder="Enter First Name"
              className="form-input"
            />
            {errors?.firstName && (
              <FieldDescription className="form-error">
                {errors?.firstName?.message}
              </FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="lastName" className="form-label">
              Last Name*
            </FieldLabel>
            <Input
              id="lastName"
              {...register("lastName")}
              type="text"
              placeholder="Enter Last Name"
              className="form-input"
            />
            {errors?.lastName && (
              <FieldDescription className="form-error">
                {errors?.lastName?.message}
              </FieldDescription>
            )}
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="email" className="form-label">
            Email*
          </FieldLabel>
          <Input
            id="email"
            {...register("email")}
            type="email"
            placeholder="Enter Email"
            className="form-input"
            required
            disabled
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="phone" className="form-label">
              Phone
            </FieldLabel>
            <Input
              id="phone"
              {...register("phone")}
              type="tel"
              placeholder="Enter Phone"
              className="form-input"
            />
          </Field>
          <Controller
            control={control}
            name="dob"
            render={({ field }) => (
              <DatePickerInput
                id="dob"
                label="Date of Birth"
                value={field.value}
                onChange={(_, value) => field.onChange(value)}
                placeholder="MM/DD/YYYY"
              />
            )}
          />
        </div>
      </FieldGroup>
    </form>
  );
};

export default ProfileForm;
