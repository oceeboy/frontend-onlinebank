import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import jsPDF from "jspdf";

import { FormField } from "../wrapper/FormField";
import { CreateTransactionDto } from "@/types/transaction/transaction.dto";
import { useCreateTransaction } from "@/hooks/useTransacton";
import { transactionSchema } from "@/schemas/transaction.schema";
import useAuthStore from "@/store/auth/auth";
import { Button } from "../ui/button";
import { formatAmount } from "@/lib/utils";
import { useTransactionStore } from "@/store/transaction/transaction-store";
import Modal from "../modal/Modal";
import { bankDetail } from "@/constants/bankdetails";

export function PaymentTransactionForm() {
  const {
    transactionData: storeData,
    setTransactionData: setStoreData,
    clearTransactionData,
  } = useTransactionStore();

  const form = useForm<CreateTransactionDto>({
    resolver: zodResolver(transactionSchema.omit({ code: true })),
    defaultValues: storeData,
  });

  const { handleSubmit, control, formState } = form;

  const [transactionData, setTransactionData] =
    useState<CreateTransactionDto | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCodeModalVisible, setCodeModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { data: UserDetails } = useAuthStore();

  const { mutate, isLoading } = useCreateTransaction();

  const handleFormSubmit = (data: CreateTransactionDto) => {
    setStoreData(data);
    mutate(data, {
      onError: (error) => {
        if (error instanceof Error) {
          if (
            error.message ===
            "Transaction code is required because KYC is not completed"
          ) {
            setCodeModalVisible(true);
          }
        }
      },
      onSuccess: (data) => {
        setTransactionData(data.transaction as CreateTransactionDto);
        clearTransactionData();
        setShowModal(true);
      },
    });
  };

  const handleCodeSubmit = (code: string) => {
    const fullData = { ...storeData, code };

    mutate(fullData, {
      onError: (error) => {
        if (error instanceof Error) {
          const message = error.message;
          if (
            message === "Invalid transaction code. Please contact bank support"
          ) {
            setErrorMessage(message);
          } else {
            setCodeModalVisible(false);
          }
        }
      },
      onSuccess: (data) => {
        setTransactionData(data.transaction as CreateTransactionDto);
        setCodeModalVisible(false);
        setShowModal(true);
        clearTransactionData();
      },
    });
  };

  const handleDownload = () => {
    if (transactionData) {
      const doc = new jsPDF();

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text(`${bankDetail.bankName}`, 70, 20);
      doc.setFontSize(14);
      doc.text("Transaction Receipt", 70, 30);

      doc.setDrawColor(0, 0, 0);
      doc.line(10, 35, 200, 35);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`From Account: ${UserDetails?.accountNumber}`, 10, 50);
      doc.text(
        `Recipient Bank Name: ${transactionData.recipientBankName}`,
        10,
        60
      );
      doc.text(`Account Name: ${transactionData.recipientName}`, 10, 70);
      doc.text(`Amount: ${formatAmount(transactionData.amount)}`, 10, 80);
      doc.text(`Purpose: ${transactionData.narration}`, 10, 90);
      doc.text(`Status: ${transactionData.status}`, 10, 100);

      doc.setFontSize(10);
      doc.text(
        "Note: This receipt is auto-generated and does not require a signature.",
        10,
        120
      );
      doc.text("Thank you for banking with us!", 10, 130);

      doc.save(`transaction_${Date.now}.pdf`);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="max-w-lg mx-auto space-y-8 bg-gray-50 border border-gray-300 rounded-lg p-6 shadow-lg"
      >
        <div className="mb-4">
          <label htmlFor="fromAccount" className="block text-sm font-medium">
            From Account
          </label>
          <p className="text-sm font-semibold">{UserDetails?.accountNumber}</p>
        </div>

        <FormField
          control={control}
          name="bankAddress"
          label="Bank Address"
          placeholder="Enter the Bank Address"
          errorMessage={formState.errors.bankAddress?.message}
        />
        <FormField
          control={control}
          name="iban"
          label="IBAN"
          placeholder="Enter IBAN"
          errorMessage={formState.errors.iban?.message}
        />
        <FormField
          control={control}
          name="narration"
          label="Purpose of Transfer"
          placeholder="Enter a short description"
          multiline
          errorMessage={formState.errors.narration?.message}
        />
        <FormField
          control={control}
          name="recipientBankName"
          label="Recipient Bank Name"
          placeholder="Enter the Bank name"
          errorMessage={formState.errors.recipientBankName?.message}
        />
        <FormField
          control={control}
          name="recipientName"
          label="Account Name"
          placeholder="Enter Account Name"
          errorMessage={formState.errors.recipientName?.message}
        />
        <FormField
          control={control}
          name="bic"
          label="BIC / SWIFT Code"
          placeholder="Enter BIC"
          errorMessage={formState.errors.bic?.message}
        />
        <FormField
          control={control}
          name="amount"
          label="Amount"
          placeholder="Enter the amount"
          textParseInt
          errorMessage={formState.errors.amount?.message}
        />

        <div className="payment-transfer_btn-box">
          <Button className="w-full px-4 py-2 text-white bg-bankGradient rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none">
            {isLoading ? "Processing" : "Submit Transaction"}
          </Button>
        </div>
      </form>

      {showModal && transactionData && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Transaction Successful
            </h3>
            <p className="text-sm mb-4">
              The transaction details are as follows:
            </p>
            <div className="mb-4 text-sm">
              <p>
                <strong>From Account:</strong> {UserDetails?.accountNumber}
              </p>
              <p>
                <strong>To:</strong> {transactionData.recipientBankName}
              </p>
              <p>
                <strong>Amount:</strong> {formatAmount(transactionData.amount)}
              </p>
              <p>
                <strong>Purpose:</strong> {transactionData.narration}
              </p>
              <p>
                <strong>Status:</strong> {transactionData.status}
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Download Receipt
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  window.location.href = "/transaction";
                }}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Go to Transactions
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={isCodeModalVisible}
        onSubmit={handleCodeSubmit}
        errorMessage={errorMessage}
      />
    </div>
  );
}
