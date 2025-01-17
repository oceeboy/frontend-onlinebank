import About from "@/components/landing/AboutUs";
import CardSection from "@/components/landing/CardSection";
import HeroContent from "@/components/landing/HeroContent";
import NavBar from "@/components/landing/NavBar";
import React from "react";

const LandingPage = () => {
  return (
    <section className="h-screen w-screen">
      {/* NavBar with fixed position */}
      <div style={{ position: "fixed", width: "100%", zIndex: 9999 }}>
        <NavBar />
      </div>

      {/* Spacer div to account for the fixed NavBar height */}
      <div className="h-16"></div>

      {/* Main content */}
      <main className="flex-grow ">
        <HeroContent />

        <section
          id="about"
          className="mt-5 bg-gray-100 overflow-hidden py-10 px-4 sm:px-8"
        >
          <About />
        </section>

        <section
          id="testimonials"
          className="py-20 container mt-40 mx-auto px-4 sm:px-8 text-center"
        >
          <CardSection cards={[]} />
        </section>
      </main>
    </section>
  );
};

export default LandingPage;
