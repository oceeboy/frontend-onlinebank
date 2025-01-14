"use client";
import useAuthStore from "@/store/auth/auth";
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
    <main className="flex min-h-screen w-full justify-between font-inter">
      <section className="flex-center size-full max-sm:px-6">
        {children}
      </section>
      <div className="auth-asset"></div>
    </main>
  );
};

export default AuthLayout;
