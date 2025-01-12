import React from "react";

const LoanServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Loan Services
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Welcome to our Loan Services. We offer a variety of loan options to
          meet your financial needs. Whether you&apos;re looking to buy a new
          home, finance a car, or consolidate debt, we have the right loan for
          you.
        </p>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-blue-600">Home Loans</h2>
            <p className="text-gray-600">
              Get the best rates and terms for your new home. Our home loans are
              designed to make your dream home a reality.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-blue-600">Auto Loans</h2>
            <p className="text-gray-600">
              Drive away with a great deal on your next car. Our auto loans
              offer competitive rates and flexible terms.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-blue-600">
              Personal Loans
            </h2>
            <p className="text-gray-600">
              Consolidate debt, cover unexpected expenses, or finance a major
              purchase with our personal loans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanServicePage;
