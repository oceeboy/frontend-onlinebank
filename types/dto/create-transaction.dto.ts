import { TransactionStatus, TransactionType } from "@/constants/index.enum";

export interface CreateTransactionDto {
  userId: string; // MongoDB ObjectId is represented as a string in Next.js
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  code?: string;
  narration: string;
  createdAt: Date;
  updatedAt: Date;

  // Optional fields for money transfers in Germany
  iban?: string;
  bic?: string;
  recipientName?: string;
  reference?: string;
  bankAddress?: string;
  recipientBankName?: string;
}
