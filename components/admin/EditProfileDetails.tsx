"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../wrapper/FormField";
import { updateProfileSchema } from "@/schemas/updateprofile.schema";
import { UpdateProfile } from "@/types/admin";
import { User } from "@/types";
import { useUpdateUserDetails } from "@/hooks/admin/useAdmin";

export default function UpdateProfileForm({ data }: { data: User }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfile>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      balance: data.balance,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      address: {
        street: data.address.street,
        city: data.address.city,
        state: data.address.state,
        postalCode: data.address.postalCode,
      },
      accountStatus: data.accountStatus,
      accountType: data.accountType,
      currency: data.currency as
        | "USD"
        | "EUR"
        | "GBP"
        | "JPY"
        | "AUD"
        | "CAD"
        | "CHF"
        | "CNY"
        | "SEK"
        | "NZD"
        | "DEM"
        | undefined,
      code: data.code,
    },
  });
  const { mutate } = useUpdateUserDetails();
  const onSubmit = (datad: UpdateProfile) => {
    mutate({ userId: data._id, updateProfile: datad });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Update Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="balance"
          label="Balance"
          placeholder="Enter your an amount"
          required
          errorMessage={errors.balance?.message}
          textParseInt
        />
        <FormField
          control={control}
          name="firstName"
          label="First Name"
          placeholder="Enter your first name"
          required
          errorMessage={errors.firstName?.message}
        />
        <FormField
          control={control}
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          required
          errorMessage={errors.lastName?.message}
        />
        <FormField
          control={control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          required
          errorMessage={errors.email?.message}
        />
        <FormField
          control={control}
          name="dateOfBirth"
          label="Date of Birth"
          placeholder="YYYY-MM-DD"
          required
          errorMessage={errors.dateOfBirth?.message}
        />
        <FormField
          control={control}
          name="address.street"
          label="Street"
          placeholder="Enter your street address"
          required
          errorMessage={errors.address?.street?.message}
        />
        <FormField
          control={control}
          name="address.city"
          label="City"
          placeholder="Enter your city"
          required
          errorMessage={errors.address?.city?.message}
        />
        <FormField
          control={control}
          name="address.state"
          label="State"
          placeholder="Enter your state"
          required
          errorMessage={errors.address?.state?.message}
        />
        <FormField
          control={control}
          name="address.postalCode"
          label="Postal Code"
          placeholder="Enter your postal code"
          required
          errorMessage={errors.address?.postalCode?.message}
        />
        <FormField
          control={control}
          name="accountStatus"
          label="Account Status"
          placeholder="Enter account status"
          required
          errorMessage={errors.accountStatus?.message}
        />
        <FormField
          control={control}
          name="accountType"
          label="Account Type"
          placeholder="Enter account type"
          required
          errorMessage={errors.accountType?.message}
        />
        <FormField
          control={control}
          name="currency"
          label="Currency"
          placeholder="Enter currency"
          required
          errorMessage={errors.currency?.message}
        />
        <FormField
          control={control}
          name="code"
          label="Code"
          placeholder="Enter Code"
          required
          errorMessage={errors.code?.message}
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
