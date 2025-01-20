"use client";
import { bankDetail } from "@/constants/bankdetails";
import React from "react";
import { Button } from "../ui/button";
import { MoveRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { motion } from "framer-motion";
import Typewriter from "../specs/TypeWriter";

const HeroContent = () => {
  const router: AppRouterInstance = useRouter();

  function onClick() {
    router.push("/sign-up");
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-8">
      {/* Hero Content */}
      <div className="max-w-7xl w-full flex flex-col md:flex-row justify-between  items-center md:space-x-8">
        {/* Left Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800 leading-snug">
            Manage Your Banking with {""}
            <span className="text-bankGradient font-ibm-plex-serif">
              {bankDetail.bankName}
            </span>
          </h1>
          <p className="mt-4 text-gray-600">
            <Typewriter
              text={
                " Access your accounts, track transactions, and control your finances anytime, anywhere. Secure and user-friendly"
              }
              typingSpeed={50}
              punctuationPause={500}
              loopDelay={2}
            />
          </p>
          <motion.div
            initial={{ scale: 1 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <Button
              onClick={onClick}
              className="mt-6 bg-bankGradient text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600"
            >
              Open an Account <MoveRightIcon size={20} />
            </Button>
          </motion.div>
        </div>

        {/* Right Section (Carousel) */}
        <div className="flex-1 h-screen mt-8 justify-end md:mt-0"></div>
      </div>
    </div>
  );
};

export default HeroContent;
