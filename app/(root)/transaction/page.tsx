"use client";

import HeaderBox from "@/components/homecomp/HeaderBox";
import { Pagination } from "@/components/transaction/Pagination";
import TransactionsTable from "@/components/transaction/TransactionsTable";

import { useTransaction } from "@/hooks/useTransacton";
import { formatAmount } from "@/lib/utils";
import { Transaction } from "@/types";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // For handling URL query parameters
import { useAccount } from "@/hooks/getUser";
import { exportToCSV } from "@/utils";

const TransactionHistory = () => {
  const searchParams = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page")) || 1; // Get 'page' from URL or default to 1
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const {
    data: UserAccount,
    isLoading: isUserLoading,
    error: useError,
  } = useAccount();

  const {
    data: Transdatat,
    error: transError,
    isLoading: isTransLoading,
  } = useTransaction();

  useEffect(() => {
    setCurrentPage(pageFromUrl); // Sync the state with the URL when the page number changes
  }, [pageFromUrl]);

  if (isUserLoading || isTransLoading) {
    return <div>Loading...</div>;
  }

  if (useError || transError) {
    return <div>Error loading data, please try again later.</div>;
  }

  if (!UserAccount || !Transdatat) return null;

  const accountsData = UserAccount;
  const transactions = Transdatat as Transaction[];

  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = sortedTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
        <button
          onClick={() => exportToCSV(transactions, "transactions.csv")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Export to CSV
        </button>
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">Bank Name</h2>
            <p className="text-14 text-blue-25">{accountsData.accountNumber}</p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {accountsData.accountType}
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(accountsData.balance)}
            </p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionsTable transactions={currentTransactions} />
          {totalPages > 1 && (
            <div className="my-4 w-full">
              <Pagination totalPages={totalPages} page={currentPage} />
            </div>
          )}
        </section>
        {/* <TransactionSideSheet transactionData={transactions} /> */}
        {/* <TransactionSideView transaction={transactions[0]} /> */}
      </div>
    </div>
  );
};

export default TransactionHistory;
