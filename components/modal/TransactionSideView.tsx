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
}

const TransactionSideView = ({ transaction }: TransactionSideViewProps) => {
  return (
    <section className="w-fulll max-w-[264px]">
      <Sheet>
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
