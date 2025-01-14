"use client";

import { useUpdateUserFreezeStatus } from "@/hooks/admin/useAdmin";
import React, { useState } from "react";

interface FreezeToggleProps {
  userId: string;
  initialFreezeStatus: boolean;
}

const FreezeToggle: React.FC<FreezeToggleProps> = ({
  userId,
  initialFreezeStatus,
}) => {
  const [isFrozen, setIsFrozen] = useState(initialFreezeStatus);

  const {
    mutate: updateFreezeStatus,
    isPending,
    error,
  } = useUpdateUserFreezeStatus();

  const handleToggle = () => {
    updateFreezeStatus(
      { userId, frozen: true },
      {
        onSuccess: () => {
          // Toggle the local state on success
          setIsFrozen((prev) => !prev);
        },
      }
    );
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-lg font-medium">
        User Freeze Status: {isFrozen ? "Frozen" : "Active"}
      </span>
      <button
        className={`px-4 py-2 rounded ${
          isFrozen
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
        onClick={handleToggle}
        disabled={isPending}
      >
        {isPending ? "Updating..." : isFrozen ? "Unfreeze" : "Freeze"}
      </button>
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
};

export default FreezeToggle;
