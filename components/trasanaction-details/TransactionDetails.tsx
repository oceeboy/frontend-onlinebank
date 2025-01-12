import { formatDateTime } from "@/lib/utils";
import { Transaction } from "@/types";
import React from "react";

interface TransactionDetailsProps {
  transaction: Transaction;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  transaction,
}) => {
  const dateInfo = formatDateTime(transaction.createdAt);
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="sm:flex sm:items-center px-6 py-4">
        <div className="text-center sm:text-left sm:flex-grow">
          <div className="mb-4">
            <h2 className="text-xl leading-tight">
              {transaction.type.toUpperCase()}
            </h2>
            <p className="text-sm leading-tight text-gray-600">
              {transaction.narration}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-sm leading-tight text-gray-600">
              Amount: ${transaction.amount}
            </p>
            <p className="text-sm leading-tight text-gray-600">
              Status: {transaction.status}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-sm leading-tight text-gray-600">
              date: {dateInfo.dateDay}
            </p>
            {/* <p className="text-sm leading-tight text-gray-600">
              Updated At: {transaction.updatedAt.toLocaleString()}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
