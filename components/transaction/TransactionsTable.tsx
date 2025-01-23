import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  cn,
  formatAmount,
  formatDateTime,
  removeSpecialCharacters,
} from "@/lib/utils";
import {
  TransactionTableProps,
  Transaction,
  CategoryBadgeProps,
} from "@/types";
import { useState } from "react";
import TransactionSideView from "../modal/TransactionSideView";
import useAuthStore from "@/store/auth/auth";
import TestDialogEdit from "../modal/TestDialog";
import { useDeleteTransaction } from "@/hooks/admin/useAdmin";
import { Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";

export const transactionStatusStyles = {
  approved: {
    borderColor: "border-green-600",
    backgroundColor: "bg-green-500",
    textColor: "text-green-700",
    chipBackgroundColor: "bg-green-100",
  },
  pending: {
    borderColor: "border-yellow-600",
    backgroundColor: "bg-yellow-500",
    textColor: "text-yellow-700",
    chipBackgroundColor: "bg-yellow-100",
  },
  declined: {
    borderColor: "border-red-600",
    backgroundColor: "bg-red-500",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-red-100",
  },
  failed: {
    borderColor: "border-red-600",
    backgroundColor: "bg-red-500",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-red-100",
  },
  default: {
    borderColor: "border-gray-300",
    backgroundColor: "bg-gray-200",
    textColor: "text-gray-500",
    chipBackgroundColor: "bg-gray-100",
  },
};

const CategoryBadge = ({ status }: CategoryBadgeProps) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
    transactionStatusStyles[status as keyof typeof transactionStatusStyles] ||
    transactionStatusStyles.default;

  return (
    <div className={cn("category-badge", borderColor, chipBackgroundColor)}>
      <div className={cn("size-2 rounded-full", backgroundColor)} />
      <p className={cn("text-[12px] font-medium", textColor)}>{status}</p>
    </div>
  );
};

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: UserDetails } = useAuthStore();
  const { mutate, isPending } = useDeleteTransaction();

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  const deleteTransaction = (id: string) => {
    mutate({ transactionId: id });
    closeModal();
  };

  return (
    <>
      <Table>
        <TableHeader className="bg-[#f9fafb]">
          <TableRow>
            <TableHead className="px-2">Type</TableHead>
            <TableHead className="px-2">Amount</TableHead>
            <TableHead className="px-2">Status</TableHead>
            <TableHead className="px-2">Date</TableHead>
            <TableHead className="px-2 max-md:hidden">Narration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t) => (
            <TableRow
              key={t._id}
              className={cn(
                t.type === "withdrawal" || formatAmount(t.amount)[0] === "-"
                  ? "bg-[#FFFBFA]"
                  : "bg-[#F6FEF9]",
                "cursor-pointer !border-b-DEFAULT"
              )}
              onClick={() => handleRowClick(t)}
            >
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <h1 className="text-14 truncate capitalize font-semibold text-[#344054]">
                    {removeSpecialCharacters(t.type)}
                  </h1>
                </div>
              </TableCell>
              <TableCell
                className={cn(
                  "pl-2 pr-10 font-semibold",
                  t.type === "withdrawal" ? "text-[#f04438]" : "text-[#039855]"
                )}
              >
                {t.type === "withdrawal"
                  ? `-${formatAmount(t.amount)}`
                  : formatAmount(t.amount)}
              </TableCell>
              <TableCell className="pl-2 pr-10">
                <CategoryBadge status={t.status} />
              </TableCell>
              <TableCell className="min-w-32 pl-2 pr-10">
                {formatDateTime(new Date(t?.transactionDate as Date)).dateOnly}
              </TableCell>
              <TableCell className="pl-2 pr-10 max-md:hidden">
                <p className="text-14 text-[#344054] text-pretty">
                  {t.narration}
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Conditionally Render the Modal or Side Sheet */}
      {selectedTransaction && UserDetails && (
        <>
          {UserDetails.role === "admin" ? (
            <>
              <TestDialogEdit data={selectedTransaction} />
              <Button
                className="border rounded-md bg-red-600 flex gap-3 justify-center"
                onClick={() => deleteTransaction(selectedTransaction._id)}
              >
                <Trash2Icon fill="red" stroke="white" />
                <span className="text-white font-semibold">
                  {isPending ? `Deleting...` : `Delete`}
                </span>
              </Button>
            </>
          ) : (
            <TransactionSideView
              transaction={selectedTransaction}
              initialState={isModalOpen}
            />
          )}
        </>
      )}
    </>
  );
};

export default TransactionsTable;
