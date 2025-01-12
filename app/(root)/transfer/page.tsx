"use client";
import HeaderBox from "@/components/homecomp/HeaderBox";
import { PaymentTransactionForm } from "@/components/transfer-comp/PaymentTransactionForm";

// import TransactionForm from "@/components/transfer-comp/TransferForm";
// import PaymentTransferForm from "@/components/transfer-comp/PaymentTransactionForm";

import React from "react";

const WithdrawPage: React.FC = () => {
  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer"
      />

      <section className="size-full pt-5">
        <PaymentTransactionForm />

        {/* <TransactionForm /> */}
        {/* <SimpleForm /> */}
      </section>
    </section>
  );
};

export default WithdrawPage;

/*
Visualisation:
- A centered card with a white background and rounded corners.
- The card contains a title "Withdraw Funds" centered at the top.
- Below the title, there are three input fields:
    1. Amount (number input)
    2. Narration (text input)
    3. Select Account (dropdown)
- At the bottom, there is a "Withdraw" button.
- The card has a shadow for a lifted effect.
- The background of the page is light gray.
*/

/**
 * on click if user.kyc === show a popup with a message and and make the code text feild show so client can enter the code and if wrong notify
 */
