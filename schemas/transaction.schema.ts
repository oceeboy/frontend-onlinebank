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
export const transactionSchema = z.object({
  type: TransactionTypeEnum,
  amount: z.number().min(0, { message: "Amount must be a positive number" }),
  code: z
    .string()
    .max(5, { message: "Enter your 5 unique digit pin" })
    .optional(),
  status: TransactionStatusEnum,
  narration: z.string().min(5, { message: "Purpose of transfer is required" }),
  iban: IBANSchema,
  bic: BICSchema,
  bankAddress: z.string().min(5, { message: "Bank address is required" }),
  recipientBankName: z
    .string()
    .min(3, { message: "Recipient bank name is required" }),
  recipientName: z
    .string()
    .min(3, { message: "Account name is required" })
    .optional(),
});
/** testing
 * 
 * 
 * 
 * 
 * 

// Example test data
const validTransactionData = {
  type: "deposit",
  amount: 500,
  status: "pending",
  narration: "Payment for services",
  iban: "DE89370400440532013000", // Valid IBAN
  bic: "COBADEFFXXX", // Valid BIC
  recipientName: "John Doe",
};

const invalidTransactionData = [
  {
    // Missing required fields
    type: "deposit",
    amount: -100, // Invalid: Negative amount
    status: "pending",
    narration: "",
    iban: "DE1234567890", // Invalid: Does not match IBAN regex
    bic: "ABCDEF", // Invalid: Too short
  },
  {
    // Invalid type and status
    type: "invalid-type",
    amount: 100,
    status: "invalid-status",
    narration: "Test narration",
  },
];

const runTests = () => {
  console.log("Validating validTransactionData...");
  try {
    const result = transactionSchema.parse(validTransactionData);
    console.log("✅ Valid Transaction Data Passed:", result);
  } catch (err) {
    console.error("❌ Valid Transaction Data Failed:", err.errors);
  }

  console.log("\nTesting invalidTransactionData...");
  invalidTransactionData.forEach((data, index) => {
    try {
      transactionSchema.parse(data);
      console.log(`❌ Invalid Data Test ${index + 1} Passed Unexpectedly`);
    } catch (err) {
      console.error(
        `✅ Invalid Data Test ${index + 1} Failed as Expected:`,
        err.errors
      );
    }
  });
};
 */
// Transaction Schema using composed fields

// runTests();
