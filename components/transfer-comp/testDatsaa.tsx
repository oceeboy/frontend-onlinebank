import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/schemas/transaction.schema";
import { useTransactionStore } from "@/store/transaction/transaction-store";

import { useState } from "react";

import { FormField } from "../wrapper/FormField";
import { useCreateTransaction } from "@/hooks/useTransacton";
import { Button } from "../ui/button";
import { CreateTransactionDto } from "@/types/transaction/transaction.dto";
import { CodeInputForm } from "./CodeInputForm";

export function TransactionFormPage() {
  const { transactionData, setTransactionData, clearTransactionData } =
    useTransactionStore();

  const [isCodeModalVisible, setCodeModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    resolver: zodResolver(transactionSchema.omit({ code: true })), // Exclude code field initially
    defaultValues: transactionData,
  });

  const { mutate, isLoading } = useCreateTransaction();

  const handleFormSubmit = (data: CreateTransactionDto) => {
    setTransactionData(data); // Save form data in Zustand

    mutate(data, {
      onError: (error) => {
        if (error instanceof Error) {
          const message = error.message;

          if (
            message ===
            "Transaction code is required because KYC is not completed"
          ) {
            setCodeModalVisible(true); // Show modal for code input
          } else {
            setErrorMessage(message); // Display other errors
          }
        }
      },
    });
  };

  const handleCodeSubmit = (code: string) => {
    const fullData = { ...transactionData, code }; // Combine existing data with code

    mutate(fullData, {
      onError: (error) => {
        if (error instanceof Error) {
          const message = error.message;

          if (
            message === "Invalid transaction code. Please contact bank support"
          ) {
            setErrorMessage(message); // Allow retry for invalid code
          } else {
            setCodeModalVisible(false); // Close modal for other errors
            setErrorMessage(message);
          }
        }
      },
      onSuccess: () => {
        setCodeModalVisible(false);
        clearTransactionData(); // Reset form state
      },
    });
  };

  return (
    <div>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="max-w-lg mx-auto space-y-6 bg-white p-6 rounded-lg shadow"
      >
        {/* Form fields */}
        <FormField
          control={form.control}
          name="type"
          label="Transaction Type"
        />
        <FormField
          control={form.control}
          name="amount"
          label="Amount"
          textParseInt
        />
        <FormField control={form.control} name="narration" label="Narration" />
        <FormField
          control={form.control}
          name="bankAddress"
          label="Bank Address"
        />
        <FormField
          control={form.control}
          name="recipientBankName"
          label="Recipient Bank Name"
        />
        <FormField
          control={form.control}
          name="recipientName"
          label="Recipient Name"
        />
        <FormField control={form.control} name="iban" label="IBAN" />
        <FormField control={form.control} name="bic" label="BIC" />

        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>

        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </form>

      {/* Popup Modal for Code Input */}
      {isCodeModalVisible && (
        // <Modal
        //   title="Enter Transaction Code"
        //   onClose={() => setCodeModalVisible(false)}
        // >
        //   <CodeInputForm onSubmit={handleCodeSubmit} />
        // </Modal>

        <div>
          <CodeInputForm onSubmit={handleCodeSubmit} />
        </div>
      )}
    </div>
  );
}
