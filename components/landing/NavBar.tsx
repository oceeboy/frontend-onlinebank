"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBar = () => {
  const pathname = usePathname();

  const NavLinks = [
    {
      label: "About",
      route: "#about",
    },
    {
      label: "Services",
      route: "#services",
    },
  ];
  return (
    <nav className="bg-bankGradient p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">BankApp</div>
        <div className="flex gap-6  text-white">
          {NavLinks.map((item) => {
            const isActive =
              pathname === item.route || pathname.startsWith(`#${item.route}#`);

            return (
              <Link
                href={item.route}
                key={item.label}
                className={cn(" px-5 rounded-md border", {
                  "bg-bankGradient": isActive,
                })}
              >
                <p
                  className={cn("text-16 font-semibold text-black-2", {
                    "text-white": isActive,
                  })}
                >
                  {item.label}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

// const styles: { [key: string]: React.CSSProperties } = {
//   navbarLinkContainers: {
//     display: "flex",
//     gap: 20,
//   },
//   navbarLinks: {},
// };
