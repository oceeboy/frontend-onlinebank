import { CreateTransactionDto } from "@/types/transaction/transaction.dto";
import { TransactionStatus, TransactionType } from "../../constants/index.enum";
import { create } from "zustand";

interface TransactionStore {
  transactionData: CreateTransactionDto;
  setTransactionData: (data: Partial<CreateTransactionDto>) => void;
  clearTransactionData: () => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactionData: {
    type: TransactionType.WITHDRAWAL,
    amount: 0,
    narration: "",
    bankAddress: "",
    recipientBankName: "",
    bic: "",
    iban: "",
    recipientName: "",
    status: TransactionStatus.PENDING,
  },
  setTransactionData: (data) =>
    set((state) => ({
      transactionData: { ...state.transactionData, ...data },
    })),
  clearTransactionData: () =>
    set(() => ({
      transactionData: {
        type: TransactionType.WITHDRAWAL,
        amount: 0,
        narration: "",
        bankAddress: "",
        recipientBankName: "",
        bic: "",
        iban: "",
        recipientName: "",
        status: TransactionStatus.PENDING,
      },
    })),
}));
