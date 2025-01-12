"use client";

import HeaderBox from "@/components/homecomp/HeaderBox";
import EditTranactionDetails from "@/components/modal/EditTranactionDetails";
import { Pagination } from "@/components/transaction/Pagination";
import TransactionsTable from "@/components/transaction/TransactionsTable";
import { Button } from "@/components/ui/button";
import { useAdminUserTransactions } from "@/hooks/admin/useAdmin";
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

  const rowsPerPage = 10;
  const totalPages = data ? Math.ceil(data.length / rowsPerPage) : 0;

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = data
    ? data.slice(indexOfFirstTransaction, indexOfLastTransaction)
    : [];

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p>Error loading transactions: {error.message}</p>;

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
      <EditTranactionDetails />
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
