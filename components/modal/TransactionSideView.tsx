"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import React from "react";
import { Transaction } from "@/types";
import TransactionDetails from "../trasanaction-details/TransactionDetails";

interface TransactionSideViewProps {
  transaction: Transaction;
  initialState?: boolean; // Accepts an initial state for the sheet
}

const TransactionSideView = ({
  transaction,
  initialState = false, // Default to false if no initial state is provided
}: TransactionSideViewProps) => {
  const [open, setOpen] = React.useState<boolean>(initialState);

  return (
    <section className="w-full max-w-[264px]">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <div className="flex items-center justify-between capitalize text-primary-500">
            View Details
          </div>
        </SheetTrigger>
        <SheetContent side="right" className="border-none bg-white">
          <SheetHeader>
            <SheetTitle className="text-16 font-semibold text-black-2">
              <div>Transaction Details</div>
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          <div className="flex items-center justify-between">
            <TransactionDetails transaction={transaction} />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default TransactionSideView;
