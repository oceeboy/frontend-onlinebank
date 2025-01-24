import {
  AccountType,
  Role,
  AccountStatus,
  CurrencyCode,
} from "../constants/index.enum";

import mongoose, { Schema, Document } from "mongoose";

// Define the schema
export const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    accountType: {
      type: String,
      enum: Object.values(AccountType),
      default: AccountType.SAVINGS,
      required: true,
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    accountNumber: { type: String, unique: true, required: true },
    balance: { type: Number, default: 0 },
    currency: {
      type: String,
      enum: Object.values(CurrencyCode),
      default: CurrencyCode.DEM,
    },
    role: { type: String, enum: Object.values(Role), default: Role.User },
    isFrozen: { type: Boolean, default: false },
    otp: { type: String },

    otpExpiresAt: { type: Date },
    accountStatus: {
      type: String,
      enum: Object.values(AccountStatus),
      default: AccountStatus.ACTIVE,
    },
    kycVerified: { type: Boolean, default: false }, // will use this as a require code to help with thw withdrawal workflow for needing code to withdraw
    code: { type: String, default: "00000" },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Define the document interface
export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  accountType: AccountType;
  email: string;
  password: string;
  accountNumber: string;
  balance: number;
  currency: CurrencyCode;
  role: Role;
  isFrozen: boolean;
  otp?: string;
  otpExpiresAt?: string;
  accountStatus: AccountStatus;
  kycVerified: boolean;
  code?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
