"use client";

import UpdateProfileForm from "@/components/admin/EditProfileDetails";
import { Button } from "@/components/ui/button";
import {
  useFetchUserById,
  useUpdateUserKycStatus,
} from "@/hooks/admin/useAdmin";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const UserPage = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") as string;
  const router = useRouter();

  const { data: FetchedDatas } = useFetchUserById(userId);

  const { mutate, isPending } = useUpdateUserKycStatus();

  const kycUserId = FetchedDatas?._id as string;
  function onToggle() {
    if (!kycUserId) return;

    const newKycStatus = FetchedDatas ? !FetchedDatas.kycVerified : false;

    mutate({ userId: kycUserId, kycVerified: newKycStatus });
  }

  // to debuggg
  return (
    <div>
      UserPage
      <Button
        className="mx-7 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.back()}
      >
        Go to dashboard
      </Button>
      <div> {userId}</div>
      <div className="mx-7 flex align-middle ">
        <p className="text-center text-2xl font-bold">
          Kyc Status: {FetchedDatas?.kycVerified ? "true" : "false"}
        </p>
        <Button
          onClick={onToggle}
          disabled={isPending}
          className={`mx-7 text-white font-bold py-2 px-4 rounded ${
            FetchedDatas?.kycVerified
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {isPending
            ? "Updating..."
            : FetchedDatas?.kycVerified
            ? "Unverify"
            : "Verify"}
        </Button>
      </div>
      {FetchedDatas && <UpdateProfileForm data={FetchedDatas} />}
    </div>
  );
};

export default UserPage;
