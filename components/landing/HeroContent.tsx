import Link from "next/link";
import React from "react";

const HeroContent = () => {
  return (
    <section className="bg-gray-100 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to BankApp</h1>
      <p className="text-xl mb-8">Your trusted partner in financial services</p>
      <Link
        className="py-7 px-10 border rounded-md bg-bankGradient text-white hover:bg-black-2 Hover transition duration-300"
        href={"/sign-in"}
      >
        Sign in
      </Link>
    </section>
  );
};

export default HeroContent;
