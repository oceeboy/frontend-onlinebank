"use client";

import HeaderBox from "@/components/homecomp/HeaderBox";
import { Pagination } from "@/components/transaction/Pagination";
import TransactionsTable from "@/components/transaction/TransactionsTable";
import { Button } from "@/components/ui/button";
import { useAdminUserTransactions } from "@/hooks/admin/useAdmin";
import { Transaction } from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserTransactionsPage = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const router = useRouter();

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);
  const { data, error, isLoading } = useAdminUserTransactions(userId || "");

  const sortedTransactions = [...(data as Transaction[])].sort((a, b) => {
    return (
      new Date(b.transactionDate as Date).getTime() -
      new Date(a.transactionDate as Date).getTime()
    );
  });

  const rowsPerPage = 10;
  const totalPages = sortedTransactions
    ? Math.ceil(sortedTransactions.length / rowsPerPage)
    : 0;

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = sortedTransactions
    ? sortedTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
    : [];

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center space-y-2">
          <div className="h-8 w-8  animate-spin rounded-full border-4 border-primary-main border-t-bankGradient"></div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center space-y-2">
          <p>Error loading transactions: {error.message}</p>
        </div>
      </div>
    );

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See the transactions each user had perform on the Bank"
        />
      </div>
      <h1 className="font-semibold ">Transactions for User {userId}</h1>
      <Button
        className="bg-bankGradient hover:bg-black-1 text-white max-lg:w-52"
        onClick={() => router.push("/admin")}
      >
        Back to Dashboard
      </Button>
      <div className="space-y-6">
        <section className="flex w-full flex-col gap-6">
          <TransactionsTable transactions={currentTransactions} />
          {totalPages > 1 && (
            <div className="my-4 w-full">
              <Pagination totalPages={totalPages} page={currentPage} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default UserTransactionsPage;
