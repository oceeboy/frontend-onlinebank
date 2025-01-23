"use client";
import MobileNav from "@/components/navigation/MobileNav";
import Sidebar from "@/components/navigation/SideBar";
import Toaster from "@/components/toaster/Toaster";
import { ToasterProvider } from "@/context/toast/ToastContext";
import { queryClient } from "@/lib/query";
import useAuthStore from "@/store/auth/auth";
import { ChildrenProps } from "@/types";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
    <>
      <QueryClientProvider client={queryClient}>
        {/* Toaster setup */}
        <ToasterProvider>
          <Toaster />
          <main className="flex h-screen w-full font-inter">
            <Sidebar />
            <div className="flex size-full flex-col">
              <div className="root-layout">
                <Image
                  src="/icons/logo.svg"
                  width={30}
                  height={30}
                  alt="logo"
                />
                <div>
                  <MobileNav />
                </div>
              </div>
              {children}
            </div>
          </main>
        </ToasterProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default RootLayout;
