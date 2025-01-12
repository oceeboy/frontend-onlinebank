// models/Transaction.ts
import mongoose, { Schema, Document, Types } from "mongoose";
import { TransactionStatus, TransactionType } from "../constants/index.enum";

export interface ITransaction extends Document {
  userId: Types.ObjectId;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  code?: string;
  narration: string;
  createdAt: Date;
  updatedAt: Date;
  iban?: string;
  bic?: string;
  recipientName?: string;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: Object.values(TransactionType),
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(TransactionStatus),
      default: TransactionStatus.PENDING,
      required: true,
    },
    code: { type: String },
    narration: { type: String, required: true },
    iban: { type: String },
    bic: { type: String },
    recipientName: { type: String },
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
