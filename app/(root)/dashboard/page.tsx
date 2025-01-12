"use client";
import HeaderBox from "@/components/homecomp/HeaderBox";
import TotalBalanceBox from "@/components/homecomp/TotalBalanceBox";
import RightSidebar from "@/components/navigation/RightSidebar";
import RecentTransactions from "@/components/transaction/RecentTransactions";
import { useAccount } from "@/hooks/getUser";
import { useTransaction } from "@/hooks/useTransacton";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const DashboardPage = () => {
  const { data: Transdata } = useTransaction();

  const { data: UserAccount } = useAccount();

  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={UserAccount?.firstName}
            subtext="Access and manage your account and transactions efficiently."
          />

          {UserAccount && <TotalBalanceBox accounts={UserAccount} />}
        </header>

        {UserAccount && (
          <RecentTransactions
            transactions={Transdata || []}
            page={currentPage}
            accounts={UserAccount}
          />
        )}
      </div>

      {UserAccount && (
        <RightSidebar user={UserAccount} transactions={Transdata || []} />
      )}
    </section>
  );
};

export default DashboardPage;
