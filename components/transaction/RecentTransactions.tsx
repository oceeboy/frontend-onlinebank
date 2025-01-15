import Link from "next/link";
import { useSearchParams } from "next/navigation";

import BankInfo from "../bankcard/BankInfo";
import TransactionsTable from "./TransactionsTable";
import { Pagination } from "./Pagination";
import { RecentTransactionsProps, Transaction } from "@/types";

const RecentTransactions = ({
  accounts,
  transactions,
}: RecentTransactionsProps) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1 if not present
  const transactionsd = (transactions as Transaction[]) || [];

  const sortedTransactions = [...transactionsd].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  const rowsPerPage = 2;
  const totalPages = Math.ceil(transactionsd.length / rowsPerPage);

  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = sortedTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent transactions</h2>
        <Link href={`/transaction`} className="view-all-btn">
          View all
        </Link>
      </header>

      <BankInfo account={accounts} type="full" />

      <TransactionsTable transactions={currentTransactions} />

      {totalPages > 0 && (
        <div className="my-4 w-full">
          <Pagination totalPages={totalPages} page={page} />
        </div>
      )}
    </section>
  );
};

export default RecentTransactions;
