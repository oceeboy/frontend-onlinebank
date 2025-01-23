import React from "react";

interface LoanCardProps {
  title: string;
  content: string;
  logo: React.ReactNode;
  actionClick: () => void;
}

const LoanCard: React.FC<LoanCardProps> = ({
  title,
  content,
  logo,
  actionClick,
}) => {
  return (
    <div
      onClick={actionClick}
      className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
    >
      <div className="flex justify-between items-center pb-2 border-b border-gray-300">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <div className="w-8 h-8">{logo}</div>
      </div>
      <p className="text-gray-600 mt-3">{content}</p>
    </div>
  );
};

export default LoanCard;
