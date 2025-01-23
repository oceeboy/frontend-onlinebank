"use client";

import HeaderBox from "@/components/homecomp/HeaderBox";
import LoanCard from "@/components/loan/LoanCard";
import LoanPopup from "@/components/loan/LoanPopUp";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, Car, HouseIcon, School, User } from "lucide-react";
import React from "react";

const LoanServicePage: React.FC = () => {
  const [isVisible, setVisible] = React.useState<boolean>(false);

  const [selectedLoan, setSelectedLoan] = React.useState<string | null>(null);
  function cX() {
    // Toggle popup visibility
    setVisible(!isVisible);
  }

  React.useEffect(() => {
    // Automatically close the eligibility popup after 4 seconds
    if (isVisible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);

      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, [isVisible]);

  function openPopup(loanType: string) {
    setSelectedLoan(loanType);
  }

  function closePopup() {
    setSelectedLoan(null);
  }

  const loanOptions = [
    {
      id: "home-loan",
      title: "Home Loan",
      content:
        "Make your dream home a reality with our affordable home loan options.",
      icon: <HouseIcon className="text-blue-500" />,
    },
    {
      id: "auto-loan",
      title: "Auto Loan",
      content: "Drive your dream car with flexible auto loan plans.",
      icon: <Car className="text-green-500" />,
    },
    {
      id: "personal-loan",
      title: "Personal Loan",
      content:
        "Meet your financial needs with our customizable personal loans.",
      icon: <User className="text-purple-500" />,
    },
    {
      id: "school-loan",
      title: "School Loan",
      content: "Invest in education with our student-friendly school loans.",
      icon: <School className="text-orange-500" />,
    },
    {
      id: "business-loan",
      title: "Business Loan",
      content: "Empower your business with tailored financial solutions.",
      icon: <BriefcaseBusiness className="text-red-500" />,
    },
  ];

  return (
    <>
      <div className="transactions">
        <div className="transactions-header">
          <HeaderBox
            title="Your Loan Options, Simplified"
            subtext="Explore various loan options tailored to your needs. Start your journey with us today."
          />
          <Button
            onClick={cX}
            className="bg-bankGradient text-white py-2 px-4 rounded-md cursor-pointer"
          >
            Check Eligibility Now
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loanOptions.map((l) => (
            <LoanCard
              key={l.id}
              title={l.title}
              content={l.content}
              logo={l.icon}
              actionClick={() => openPopup(l.title)}
            />
          ))}
        </div>
        {selectedLoan && (
          <LoanPopup loanType={selectedLoan} onClose={closePopup} />
        )}
      </div>

      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:max-w-xs xl:max-w-xs text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Congratulations!
            </h2>
            <p className="mt-2 text-gray-600">
              You are eligible for a loan. Take the next step to explore your
              options and secure the financial support you need.
            </p>
            <Button
              onClick={() => setVisible(false)}
              className="mt-4 bg-bankGradient hover:bg-black-1 text-white py-2 px-4 rounded-md"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoanServicePage;
