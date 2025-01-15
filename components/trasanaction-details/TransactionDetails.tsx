import { bankDetail } from "@/constants/bankdetails";
import { useAccount } from "@/hooks/getUser";
import { formatAmount, formatDateTime } from "@/lib/utils";
import { Transaction } from "@/types";
import React from "react";

interface TransactionDetailsProps {
  transaction: Transaction;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  transaction,
}) => {
  const dateInfo = formatDateTime(transaction.createdAt);
  const { data: UserDetails } = useAccount();

  const bankAccountNumber = UserDetails?.accountNumber;
  const fullName = `${UserDetails?.firstName} ${UserDetails?.lastName}`;
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        {/* <div className="flex items-center justify-between mb-4">
          <button className="text-gray-500">&larr; Back</button>
          <h2 className="text-lg font-semibold">Share Receipt</h2>
        </div> */}

        {/* Receipt Card */}
        <div className="border rounded-lg p-6 bg-gray-50">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 flex items-center justify-center rounded-full">
              {/* Replace this div with an <img> tag for the logo */}
              <span className="text-xl font-bold text-blue-600">Logo</span>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="text-center mb-6">
            <h3 className="text-gray-800 text-xl font-semibold">
              {formatAmount(transaction.amount)}
            </h3>
            <p className="text-green-600 font-medium">{transaction.status} </p>
            <p className="text-gray-500 text-sm">{dateInfo.dateOnly}</p>
          </div>

          <hr className="mb-6" />

          {/* Details Section */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Recipient Details
              </p>
              <p className="text-gray-800">I{transaction.recipientName}</p>
              <p className="text-gray-500 text-sm">
                {transaction.recipientBankName} | {transaction.iban}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Sender Details
              </p>
              <p className="text-gray-800"> {fullName}</p>
              <p className="text-gray-500 text-sm">
                {bankDetail.bankName} | {bankAccountNumber}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Transaction Type
              </p>
              <p className="text-gray-800 font-semibold">
                {transaction.type.toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Transaction No.
              </p>
              <p className="text-gray-800">{transaction._id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Session ID</p>
              <p className="text-gray-800">100004250115125151125482649707</p>
            </div>
          </div>

          <hr className="my-6" />

          {/* Support Section */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Support</p>
            <p className="text-green-600 font-medium">{bankDetail.bankEmail}</p>
          </div>

          <hr className="my-6" />

          {/* Footer */}
          <p className="text-xs text-gray-500 text-center">
            Enjoy a better life with {bankDetail.bankName}. Get free transfers,
            withdrawals, bill payments, instant loans, and good annual interest
            on your savings.
            {bankDetail.bankName} is licensed by the Central Bank of Nigeria and
            insured by the NDIC.
          </p>
        </div>

        {/* Share Button */}
        <div className="mt-6">
          <button className="w-full bg-green-500 text-white font-medium py-3 rounded-lg shadow-md hover:bg-green-600">
            Share Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
