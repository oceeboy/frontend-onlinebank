import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import jsPDF from "jspdf";
const transferSchema = z.object({
  fromAccount: z.string().min(10, "Account number must be at least 10 digits"),
  bankAddress: z.string().min(5, "Bank address is required"),
  iban: z.string().regex(/^MAB\d{10}$/, "Invalid IBAN format"),
  purpose: z.string().min(5, "Purpose of transfer is required"),
  recipientBankName: z.string().min(3, "Recipient bank name is required"),
  accountName: z.string().min(3, "Account name is required"),
  bicSwiftCode: z.string().regex(/^[A-Z]{8}$/, "Invalid BIC/SWIFT Code"),
  amount: z.number().positive("Amount must be greater than 0"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
});

type TransferFormValues = z.infer<typeof transferSchema>;

export default function TransferForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
  });

  const [transactionData, setTransactionData] =
    useState<TransferFormValues | null>(null);
  const [showModal, setShowModal] = useState(false);

  const onSubmit: SubmitHandler<TransferFormValues> = (data) => {
    setTransactionData(data); // Save transaction details
    setShowModal(true); // Show the modal
  };

  //   const handleDownload = () => {
  //     if (transactionData) {
  //       const blob = new Blob([JSON.stringify(transactionData, null, 2)], {
  //         type: "application/json",
  //       });
  //       const url = URL.createObjectURL(blob);
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.download = `transaction_${transactionData.date}.json`;
  //       link.click();
  //       URL.revokeObjectURL(url);
  //     }
  //   };

  {
    /** this is to chnage to pdf */
  }

  const handleDownload = () => {
    if (transactionData) {
      const doc = new jsPDF();

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
      doc.text(`From Account: ${transactionData.fromAccount}`, 10, 50);
      doc.text(
        `Recipient Bank Name: ${transactionData.recipientBankName}`,
        10,
        60
      );
      doc.text(`Account Name: ${transactionData.accountName}`, 10, 70);
      doc.text(`Amount: $${transactionData.amount.toFixed(2)}`, 10, 80);
      doc.text(`Purpose: ${transactionData.purpose}`, 10, 90);
      doc.text(`Date: ${transactionData.date}`, 10, 100);

      // Add footer or additional details
      doc.setFontSize(10);
      doc.text(
        "Note: This receipt is auto-generated and does not require a signature.",
        10,
        120
      );
      doc.text("Thank you for banking with us!", 10, 130);

      // Save the PDF
      doc.save(`transaction_${transactionData.date}.pdf`);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8"
      >
        <h2 className="text-2xl font-semibold mb-6">Transfer Funds</h2>

        {/* From Account */}
        <div className="mb-4">
          <label htmlFor="fromAccount" className="block text-sm font-medium">
            From Account
          </label>
          <input
            type="text"
            id="fromAccount"
            {...register("fromAccount")}
            className={`mt-1 block w-full rounded-md border ${
              errors.fromAccount ? "border-red-500" : "border-gray-300"
            } shadow-sm`}
          />
          {errors.fromAccount && (
            <p className="text-red-500 text-sm">{errors.fromAccount.message}</p>
          )}
        </div>

        {/* Bank Address */}
        <div className="mb-4">
          <label htmlFor="bankAddress" className="block text-sm font-medium">
            Bank Address
          </label>
          <input
            type="text"
            id="bankAddress"
            {...register("bankAddress")}
            className={`mt-1 block w-full rounded-md border ${
              errors.bankAddress ? "border-red-500" : "border-gray-300"
            } shadow-sm`}
          />
          {errors.bankAddress && (
            <p className="text-red-500 text-sm">{errors.bankAddress.message}</p>
          )}
        </div>

        {/* IBAN */}
        <div className="mb-4">
          <label htmlFor="iban" className="block text-sm font-medium">
            IBAN
          </label>
          <input
            type="text"
            id="iban"
            {...register("iban")}
            className={`mt-1 block w-full rounded-md border ${
              errors.iban ? "border-red-500" : "border-gray-300"
            } shadow-sm`}
          />
          {errors.iban && (
            <p className="text-red-500 text-sm">{errors.iban.message}</p>
          )}
        </div>

        {/* Purpose */}
        <div className="mb-4">
          <label htmlFor="purpose" className="block text-sm font-medium">
            Purpose of Transfer
          </label>
          <input
            type="text"
            id="purpose"
            {...register("purpose")}
            className={`mt-1 block w-full rounded-md border ${
              errors.purpose ? "border-red-500" : "border-gray-300"
            } shadow-sm`}
          />
          {errors.purpose && (
            <p className="text-red-500 text-sm">{errors.purpose.message}</p>
          )}
        </div>

        {/* Recipient Bank Name */}
        <div className="mb-4">
          <label
            htmlFor="recipientBankName"
            className="block text-sm font-medium"
          >
            Recipient Bank Name
          </label>
          <input
            type="text"
            id="recipientBankName"
            {...register("recipientBankName")}
            className={`mt-1 block w-full rounded-md border ${
              errors.recipientBankName ? "border-red-500" : "border-gray-300"
            } shadow-sm`}
          />
          {errors.recipientBankName && (
            <p className="text-red-500 text-sm">
              {errors.recipientBankName.message}
            </p>
          )}
        </div>

        {/* Account Name */}
        <div className="mb-4">
          <label htmlFor="accountName" className="block text-sm font-medium">
            Account Name
          </label>
          <input
            type="text"
            id="accountName"
            {...register("accountName")}
            className={`mt-1 block w-full rounded-md border ${
              errors.accountName ? "border-red-500" : "border-gray-300"
            } shadow-sm`}
          />
          {errors.accountName && (
            <p className="text-red-500 text-sm">{errors.accountName.message}</p>
          )}
        </div>

        {/* BIC / Swift Code */}
        <div className="mb-4">
          <label htmlFor="bicSwiftCode" className="block text-sm font-medium">
            BIC / SWIFT Code
          </label>
          <input
            type="text"
            id="bicSwiftCode"
            {...register("bicSwiftCode")}
            className={`mt-1 block w-full rounded-md border ${
              errors.bicSwiftCode ? "border-red-500" : "border-gray-300"
            } shadow-sm`}
          />
          {errors.bicSwiftCode && (
            <p className="text-red-500 text-sm">
              {errors.bicSwiftCode.message}
            </p>
          )}
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            {...register("amount", { valueAsNumber: true })}
            className={`mt-1 block w-full rounded-md border ${
              errors.amount ? "border-red-500" : "border-gray-300"
            } shadow-sm`}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount.message}</p>
          )}
        </div>

        {/* Date */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            {...register("date")}
            className={`mt-1 block w-full rounded-md border ${
              errors.date ? "border-red-500" : "border-gray-300"
            } shadow-sm`}
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Transfer Fund
          </button>
        </div>
      </form>
      {/* Modal */}
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
                <strong>From Account:</strong> {transactionData.fromAccount}
              </p>
              <p>
                <strong>To:</strong> {transactionData.recipientBankName} (
                {transactionData.accountName})
              </p>
              <p>
                <strong>Amount:</strong> ${transactionData.amount}
              </p>
              <p>
                <strong>Purpose:</strong> {transactionData.purpose}
              </p>
              <p>
                <strong>Date:</strong> {transactionData.date}
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
                  window.location.href = "/transactions";
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
