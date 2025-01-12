"use client";

import MobileNav from "@/components/navigation/MobileNav";
import Sidebar from "@/components/navigation/SideBar";
import useAuthStore from "@/store/auth/auth";
import { ChildrenProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RootLayout: React.FC<ChildrenProps> = ({ children }) => {
  const { status, data } = useAuthStore();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  // Ensure Zustand store is hydrated before rendering
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Redirect users based on authentication status and role
  useEffect(() => {
    if (hydrated) {
      if (status === "unauthenticated") {
        router.replace("/sign-in");
      } else if (status === "authenticated" && data?.role === "admin") {
        router.replace("/admin");
      }
    }
  }, [hydrated, status, data, router]);

  // Show nothing until hydration and role verification are complete
  if (!hydrated || status === "loading") {
    return null; // Render nothing during verification
  }

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <div className="root-layout">
          <Image src="/globe.svg" width={30} height={30} alt="logo" />
          <MobileNav />
        </div>
        {children}
      </div>
    </main>
  );
};

export default RootLayout;
