"use client";
import { DatePickerInput } from "@/app/_components/DatePicker/DatePicker";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const ProfileForm = ({ user }: { user: any }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: undefined,
  });

  useEffect(() => {
    if (!user) return;
    setFormData({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.countryCode,
      dob: undefined, // !TODO: add dob and phone
    });
  }, [user]);

  const handleFormData = (type: string, value: string | Date | undefined) => {
    setFormData((prev) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  };
  return (
    <form className="w-full">
      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="firstName" className="form-label">
              First Name*
            </FieldLabel>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter First Name"
              required
              className="form-input"
              value={formData.firstName}
              onChange={(e) => handleFormData("firstName", e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="lastName" className="form-label">
              Last Name*
            </FieldLabel>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter Last Name"
              required
              className="form-input"
              value={formData.lastName}
              onChange={(e) => handleFormData("lastName", e.target.value)}
            />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="email" className="form-label">
            Email*
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Enter Email"
            className="form-input"
            required
            disabled
            value={formData.email}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="phone" className="form-label">
              Phone
            </FieldLabel>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter Phone"
              className="form-input"
              value={formData.phone}
              onChange={(e) => handleFormData("phone", e.target.value)}
            />
          </Field>
          <DatePickerInput
            id="dob"
            label="Date of Birth"
            value={formData?.dob}
            onChange={handleFormData}
            placeholder="MM/DD/YYYY"
          />
        </div>
      </FieldGroup>
    </form>
  );
};

export default ProfileForm;
