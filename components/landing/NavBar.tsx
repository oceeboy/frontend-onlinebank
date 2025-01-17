"use client";

import { bankDetail } from "@/constants/bankdetails";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const NavBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = [
    {
      label: "About",
      route: "#about",
    },
    {
      label: "Services",
      route: "#services",
    },
    {
      label: "Contact",
      route: "#contact",
    },
  ];

  return (
    <nav className="bg-gradient-to-r from-bankGradient to-slate-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <div className="text-2xl font-bold">{bankDetail.bankName}</div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
              />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={cn(
            "md:flex md:items-center md:gap-6 text-white transition-all duration-300",
            {
              "hidden md:flex": !isOpen,
              "flex flex-col items-center absolute top-16 left-0 w-full bg-gradient-to-r from-blue-500 to-indigo-500 p-4 md:static md:w-auto md:p-0":
                isOpen,
            }
          )}
        >
          {NavLinks.map((item) => {
            const isActive = pathname === item.route;

            return (
              <Link
                href={item.route}
                key={item.label}
                className={cn(
                  "px-4 py-2 text-base font-semibold transition-colors duration-200 hover:text-gray-200",
                  {
                    "border-b-2 border-white": isActive,
                  }
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
