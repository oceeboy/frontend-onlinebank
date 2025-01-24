"use client";

import React from "react";

import { bankDetail } from "@/constants/bankdetails";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-bankGradient text-white">
      <div className="p-5 text-center">
        <p className="mb-2">
          &copy; 2025 {bankDetail.bankName}. All rights reserved.
        </p>
        <p>
          Contact us:{" "}
          <Link href={`mailto:${bankDetail.bankEmail}`} className="underline">
            {bankDetail.bankEmail}
          </Link>{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
