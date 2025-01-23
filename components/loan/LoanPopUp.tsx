import React, { useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface LoanPopupProps {
  loanType: string;
  onClose: () => void;
}

const LoanPopup: React.FC<LoanPopupProps> = ({ loanType, onClose }) => {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 4000); // Close popup after 4 seconds
  };

  return (
    <div className="fixed inset-0  bg-gray-500/75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 transition-transform transform scale-100">
        {submitted ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-green-600">
              Application Successful!
            </h2>
            <p className="text-gray-600 mt-2">
              Your loan request has been submitted.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex  justify-between">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Apply for {loanType}
              </h2>
              <div onClick={onClose} className=" items-center mb-4 mt-2">
                <X className="text-red-700 h-[20px] hover:h-7 hover:w-7 w-[20px]" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Amount</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Reason</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Why do you need this loan?"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              ></textarea>
            </div>
            <Button
              type="submit"
              className="w-full bg-bankGradient text-white rounded-lg py-2 font-semibold hover:bg-black-1 transition"
            >
              Submit Application
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoanPopup;
