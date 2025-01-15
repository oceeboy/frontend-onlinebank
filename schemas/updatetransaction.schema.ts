import { z } from "zod";

// Define enums for transaction types and statuses
const TransactionTypeEnum = z.enum(["deposit", "withdrawal"]);
const TransactionStatusEnum = z.enum([
  "pending",
  "approved",
  "declined",
  "failed",
]);

// Modular schema for the IBAN and BIC validation
const IBANSchema = z
  .string()
  .regex(/^DE\d{20}$/, { message: "Invalid IBAN format" })
  .optional();
const BICSchema = z
  .string()
  .length(8, { message: "BIC must be 8 characters long" })
  .optional()
  .or(z.string().length(11, { message: "BIC must be 11 characters long" }));

export const updateTransactionInfos = z.object({
  type: TransactionTypeEnum.optional(),
  amount: z
    .number()
    .min(0, { message: "Amount must be a positive number" })
    .optional(),
  code: z
    .string()
    .max(5, { message: "Enter your 5 unique digit pin" })
    .optional(),
  status: TransactionStatusEnum.optional(),
  narration: z
    .string()
    .min(5, { message: "Purpose of transfer is required" })
    .optional(),
  iban: IBANSchema,
  bic: BICSchema,
  bankAddress: z
    .string()
    .min(5, { message: "Bank address is required" })
    .optional(),
  recipientBankName: z
    .string()
    .min(3, { message: "Recipient bank name is required" })
    .optional(),
  recipientName: z
    .string()
    .min(3, { message: "Account name is required" })
    .optional(),
});
