import { Transaction } from "..";

export type TransactionResponse = {
  transaction: Transaction;
  balance: number;
};
