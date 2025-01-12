import { AccountStatus, CurrencyCode, Role } from "@/constants/index.enum";

export interface RegisterUserDto {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  email: string;
  password: string;
  accountNumber: string;
  balance?: number;
  currency?: CurrencyCode;
  role?: Role;
  isFrozen?: boolean;
  otp?: string;
  accountStatus?: AccountStatus;
  kycVerified?: boolean;
}
