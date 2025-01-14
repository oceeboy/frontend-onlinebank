"use client";

import { useUpdateUserKycStatus } from "@/hooks/admin/useAdmin";
import React, { useState } from "react";

interface KycToggleProps {
  userId: string;
  initialKycVerified: boolean;
}

const KycToggle: React.FC<KycToggleProps> = ({
  userId,
  initialKycVerified,
}) => {
  const [kycVerified, setKycVerified] = useState(initialKycVerified);

  const {
    mutate: updateKycStatus,
    isPending,
    error,
  } = useUpdateUserKycStatus();

  const handleToggle = () => {
    updateKycStatus({ userId, kycVerified: kycVerified });
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-lg font-medium">
        KYC Verified: {kycVerified ? "Yes" : "No"}
      </span>
      <button
        className={`px-4 py-2 rounded ${
          kycVerified
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
        onClick={handleToggle}
        disabled={isPending}
      >
        {isPending ? "Updating..." : kycVerified ? "Unverify" : "Verify"}
      </button>
    </div>
  );
};

export default KycToggle;
