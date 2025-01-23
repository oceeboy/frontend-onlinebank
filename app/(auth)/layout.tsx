"use client";
import Toaster from "@/components/toaster/Toaster";
import { ToasterProvider } from "@/context/toast/ToastContext";
import { queryClient } from "@/lib/query";
import useAuthStore from "@/store/auth/auth";
import { QueryClientProvider } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { status, data } = useAuthStore();

  if (status === "authenticated") {
    if (data?.role === "admin") {
      redirect("/admin");
    } else {
      redirect("/dashboard");
    }
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* Toaster setup */}
        <ToasterProvider>
          <Toaster />
          <main className="flex min-h-screen w-full justify-between font-inter">
            <section className="flex-center size-full max-sm:px-6">
              {children}
            </section>
            <div className="auth-asset"></div>
          </main>
        </ToasterProvider>
      </QueryClientProvider>
    </>
  );
};

export default AuthLayout;
