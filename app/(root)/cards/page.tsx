"use client";

import BankCard from "@/components/bankcard/BankCard";
import HeaderBox from "@/components/homecomp/HeaderBox";
import { useAccount } from "@/hooks/getUser";
import React from "react";

const CreateCardPage: React.FC = () => {
  const { data: UserData, isLoading, error } = useAccount(); // Assuming `useAccount` provides these

  if (isLoading) {
    return <p>Loading...</p>; // Show a loading state
  }

  if (error || !UserData) {
    return <p>Failed to load user data.</p>; // Handle error or no data
  }

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activities."
        />

        <div className="space-y-4">
          <h2 className="header-2">Your cards</h2>
          <div className="flex flex-wrap gap-6">
            <BankCard
              account={UserData}
              userName={`${UserData.firstName} ${UserData.lastName}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateCardPage;
