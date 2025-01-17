"use client";

import { bankDetail } from "@/constants/bankdetails";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface AboutUsProp {
  title: string;
  subtitle: string;
  content: string;
  mission: string;
  vision: string;
  values: string[];
}

const About = () => {
  const [aboutData, setAboutData] = useState<AboutUsProp>();

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/aboutus.json");
        const data = await response.json();
        setAboutData(data);
      } catch (error) {
        console.error("Failed to fetch about us data:", error);
      }
    };

    fetchAboutData();
  }, []);

  if (!aboutData) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center space-y-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-main border-t-bankGradient"></div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-8 py-10 bg-gray-100">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 max-w-6xl mx-auto font-inter">
        {/* Text Content */}
        <div className="lg:w-2/3">
          <h1 className="text-4xl text-center lg:text-left font-bold text-blue-600">
            {aboutData.title}
          </h1>
          <h2 className="text-xl font-semibold text-gray-700 mt-4 text-center lg:text-left">
            {aboutData.subtitle}
          </h2>
          <p className="text-gray-600 mt-6 leading-7">
            {bankDetail.bankName}
            {aboutData.content}
          </p>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-blue-600">
              Our Mission
            </h3>
            <p className="text-gray-600 mt-2">{aboutData.mission}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-blue-600">Our Vision</h3>
            <p className="text-gray-600 mt-2">{aboutData.vision}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-blue-600">Our Values</h3>
            <ul className="list-disc list-inside mt-2 text-gray-600">
              {aboutData.values.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Image/Asset */}
        <div className="lg:w-1/3 flex justify-center items-center">
          <div className="auth-asset">
            <Image
              src="/icons/aboutus.svg"
              alt="Our Team"
              className="rounded-lg shadow-lg w-full object-cover"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
