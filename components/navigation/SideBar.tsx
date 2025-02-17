"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
// import { SiderbarProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./footer";
import useAuthStore from "@/store/auth/auth";
import { bankDetail } from "@/constants/bankdetails";

const Sidebar = () => {
  const pathname = usePathname();
  const user = useAuthStore().data;

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt={bankDetail.bankName}
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo font-ibm-plex-serif">
            {bankDetail.bankName}
          </h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn({
                    "brightness-[3] invert-0": isActive,
                  })}
                />
              </div>
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {item.label}
              </p>
            </Link>
          );
        })}

        {/* <PlaidLink user={user} /> */}
      </nav>

      {user && <Footer user={user} />}
    </section>
  );
};

export default Sidebar;
