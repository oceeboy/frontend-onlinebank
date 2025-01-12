import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../wrapper/FormField";
import { CreateTransactionDto } from "@/types/transaction/transaction.dto";
import { transactionSchema } from "@/schemas/transaction.schema";
import { useCreateTransaction } from "@/hooks/useTransacton";
import { useAccount } from "@/hooks/getUser";
import { Button } from "../ui/button";

// Your custom form component
const TransactionForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTransactionDto>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "deposit",
      // amount: 0,
      status: "pending",
    },
  });
  const { mutate, isError, isLoading, isSuccess, error } =
    useCreateTransaction();
  const { data: UserData } = useAccount();

  const onSubmit = () => {
    const validTransactionData: CreateTransactionDto = {
      type: "deposit",
      amount: 500,
      status: "pending",
      narration: "Payment for services",
      iban: "DE89370400440532013000", // Valid IBAN
      bic: "COBADEFFXXX", // Valid BIC
      recipientName: "John Doe",
      code: "00000",
    };

    mutate(validTransactionData);
  };

  function handleSend(data: CreateTransactionDto) {
    console.log(data);
  }
  return (
    <>
      <Button onClick={onSubmit}>{isLoading ? "processin" : "send"}</Button>
      <form
        className="max-w-lg mx-auto space-y-8 bg-gray-50 border border-gray-300 rounded-lg p-6 shadow-lg"
        onSubmit={handleSubmit(handleSend)}
      >
        {/* Transaction Type */}
        {/* <FormField
            control={control}
            name="type"
            label="Transaction Type"
            placeholder="Deposit or withdrawal"
            rules={{ required: "Transaction type is required" }}
            errorMessage={errors.type?.message}
          /> */}

        {/* IBAN */}
        <FormField
          control={control}
          name="iban"
          label="IBAN"
          placeholder="Enter IBAN (e.g., DE followed by 20 digits)"
          errorMessage={errors.iban?.message}
        />

        {/* BIC */}
        <FormField
          control={control}
          name="bic"
          label="BIC"
          placeholder="Enter BIC (8 or 11 characters)"
          errorMessage={errors.bic?.message}
        />

        {/* Amount */}
        <FormField
          control={control}
          name="amount"
          label="Amount"
          placeholder="Enter amount"
          rules={{ required: "Amount is required" }}
          errorMessage={errors.amount?.message}
          textParseInt
        />

        {/* Recipient Name */}
        <FormField
          control={control}
          name="recipientName"
          label="Recipient Name"
          placeholder="Enter recipient's name (optional)"
          errorMessage={errors.recipientName?.message}
        />
        {/* Narration */}
        <FormField
          control={control}
          name="narration"
          label="Narration"
          placeholder="Enter a short description"
          rules={{ required: "Narration is required" }}
          errorMessage={errors.narration?.message}
          multiline
        />

        {/** code state requred to show */}
        {!UserData?.kycVerified && (
          <FormField
            control={control}
            name="code"
            label="TaxidCode"
            placeholder="Enter taxid code"
            rules={{ required: "Taxid code is required" }}
            errorMessage={errors.code?.message}
          />
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full px-4 py-2 text-white bg-bankGradient rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none"
        >
          {isLoading ? "Processing" : "Send Money"}
        </Button>
      </form>
      <div className=" py-8 w-full justify-center align-middle bg-black-1 ">
        <p className="text-sm text-gray-500 text-center">
          {isError && (
            <div>
              <p className="text-red-500 text-center">
                Error Occured {error?.message}
              </p>
              <p className="text-red-500 text-center">Please try again</p>
            </div>
          )}

          {isSuccess && <div>wworking fine</div>}
        </p>
      </div>
    </>
  );
};

export default TransactionForm;
