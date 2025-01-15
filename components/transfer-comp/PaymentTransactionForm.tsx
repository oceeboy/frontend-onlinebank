import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormField } from "../wrapper/FormField";
import { CreateTransactionDto } from "@/types/transaction/transaction.dto";
import { useCreateTransaction } from "@/hooks/useTransacton";
import { transactionSchema } from "@/schemas/transaction.schema";
import useAuthStore from "@/store/auth/auth";
import { useState } from "react";
import jsPDF from "jspdf";
import { Button } from "../ui/button";
import { formatAmount } from "@/lib/utils";

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

  const [transactionData, setTransactionData] =
    useState<CreateTransactionDto | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { data: UserDetails } = useAuthStore();

  const { mutate, isLoading } = useCreateTransaction();

  const submit = (data: CreateTransactionDto) => {
    mutate(
      { ...data },
      {
        onSuccess: (data) => {
          console.log(data);
          setTransactionData(data.transaction as CreateTransactionDto);
          setShowModal(true);
        },
      }
    );
  };

  const handleDownload = () => {
    if (transactionData) {
      const doc = new jsPDF();
      // const dateInfo = formatDateTime(transactionData)

      // Bank logo as a Base64 string (replace this with your logo's Base64 value)
      // const bankLogoBase64 = ""; // Add your base64 logo here

      // Add the logo
      //   doc.addImage(bankLogoBase64, "PNG", 10, 10, 50, 20); // x, y, width, height

      // Add bank name and receipt header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Bank of Code", 70, 20);
      doc.setFontSize(14);
      doc.text("Transaction Receipt", 70, 30);

      // Draw a line under the header
      doc.setDrawColor(0, 0, 0);
      doc.line(10, 35, 200, 35); // x1, y1, x2, y2

      // Add transaction details with styles
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

      // Add footer or additional details
      doc.setFontSize(10);
      doc.text(
        "Note: This receipt is auto-generated and does not require a signature.",
        10,
        120
      );
      doc.text("Thank you for banking with us!", 10, 130);

      // Save the PDF
      doc.save(`transaction_${Date.now}.pdf`);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submit)}
        className="max-w-lg mx-auto space-y-8 bg-gray-50 border border-gray-300 rounded-lg p-6 shadow-lg"
      >
        {/* Transaction Type */}
        <div className="mb-4">
          <label htmlFor="fromAccount" className="block text-sm font-medium">
            From Account
          </label>
          <p className="text-sm font-semibold">{UserDetails?.accountNumber}</p>
        </div>

        {/* Bank Adddress */}
        <FormField
          control={control}
          name="bankAddress"
          label="Bank Address"
          placeholder="Enter the Bank Address"
          rules={{ required: "Bank address is required" }}
          errorMessage={errors.bankAddress?.message}
        />
        {/* IBAN (Optional) */}
        <FormField
          control={control}
          name="iban"
          label="IBAN"
          placeholder="Enter IBAN"
          rules={{ required: "IBAN is required" }}
          errorMessage={errors.iban?.message}
        />

        {/* Narration */}
        <FormField
          control={control}
          name="narration"
          label=" Purpose of Transfer"
          placeholder="Enter a short description"
          multiline
          rules={{ required: "Purpose of Transfer is required" }}
          errorMessage={errors.narration?.message}
        />

        {/* Amount */}
        <FormField
          control={control}
          name="recipientBankName"
          label="Recipient Bank Name"
          placeholder="Enter the Bank name"
          rules={{ required: "Recipient Bank Name is required" }}
          errorMessage={errors.recipientBankName?.message}
        />
        {/* Recipient's Name (Optional) */}
        <FormField
          control={control}
          name="recipientName"
          label="Account Name"
          placeholder="Enter Account Name"
          rules={{ required: "Account Name is required" }}
          errorMessage={errors.recipientName?.message}
        />

        {/* BIC (Optional) */}
        <FormField
          control={control}
          name="bic"
          label="BIC / SWIFT Code"
          placeholder="Enter BIC"
          rules={{ required: "BIC is required" }}
          errorMessage={errors.bic?.message}
        />

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

        {/* Submit Button */}
        <div className="payment-transfer_btn-box">
          <Button className="w-full px-4 py-2 text-white bg-bankGradient rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none">
            {isLoading ? "Processing" : " Submit Transaction"}
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
                  // Redirect to transactions page, update this as needed
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
    </div>
  );
}
