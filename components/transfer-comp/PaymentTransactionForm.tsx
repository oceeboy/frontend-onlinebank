import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormField } from "../wrapper/FormField";
import { CreateTransactionDto } from "@/types/transaction/transaction.dto";
import { useCreateTransaction } from "@/hooks/useTransacton";
import { transactionSchema } from "@/schemas/transaction.schema";
// Import the custom FormField component

// Zod validation schema

export function PaymentTransactionForm() {
  const form = useForm<CreateTransactionDto>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "withdrawal",
      // amount: 0,
      status: "pending",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const { mutate, isLoading } = useCreateTransaction();

  const submit = (data: CreateTransactionDto) => {
    mutate({ ...data });
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-lg mx-auto space-y-8 bg-gray-50 border border-gray-300 rounded-lg p-6 shadow-lg"
    >
      {/* Transaction Type */}

      {/* Amount */}
      <FormField
        control={control}
        name="amount"
        label="Amount"
        placeholder="Enter the amount"
        rules={{ required: "Amount is required" }}
        errorMessage={errors.amount?.message}
        textParseInt
      />

      {/* Code (Optional) */}
      <FormField
        control={control}
        name="code"
        label="Code (Optional)"
        placeholder="Optional transaction code"
        errorMessage={errors.code?.message}
      />

      {/* Transaction Status */}

      {/* Narration */}
      <FormField
        control={control}
        name="narration"
        label="Narration"
        placeholder="Enter a short description"
        multiline
        rules={{ required: "Narration is required" }}
        errorMessage={errors.narration?.message}
      />

      {/* IBAN (Optional) */}
      <FormField
        control={control}
        name="iban"
        label="IBAN (Optional)"
        placeholder="Enter IBAN"
        errorMessage={errors.iban?.message}
      />

      {/* BIC (Optional) */}
      <FormField
        control={control}
        name="bic"
        label="BIC (Optional)"
        placeholder="Enter BIC"
        errorMessage={errors.bic?.message}
      />

      {/* Recipient's Name (Optional) */}
      <FormField
        control={control}
        name="recipientName"
        label="Recipient's Name (Optional)"
        placeholder="Enter recipient's name"
        errorMessage={errors.recipientName?.message}
      />

      {/* Submit Button */}
      <div className="payment-transfer_btn-box">
        <button className="w-full px-4 py-2 text-white bg-bankGradient rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none">
          {isLoading ? "Processing" : " Submit Transaction"}
        </button>
      </div>
    </form>
  );
}
