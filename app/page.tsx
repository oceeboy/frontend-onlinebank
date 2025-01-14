"use client";
import HeroContent from "@/components/landing/HeroContent";
import NavBar from "@/components/landing/NavBar";
import TestDialogEdit from "@/components/modal/TestDialog";

import React from "react";

const LandingPage = () => {
  return (
    <section className="h-screen w-screen ">
      <div style={{ position: "fixed", width: "100%" }}>
        <NavBar />
      </div>

      {/* here are the contents */}

      <HeroContent />

      <main className="flex-grow">
        {/** hero content */}

        <section id="about" className="py-20 container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg">
            We are committed to providing the best banking services to our
            customers.
          </p>
          <TestDialogEdit />
        </section>

        <section
          id="services"
          className="bg-gray-100 py-20 container mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4 bg-white shadow rounded">
              <h3 className="text-xl font-bold mb-2">Personal Banking</h3>
              <p>Manage your personal finances with ease.</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h3 className="text-xl font-bold mb-2">Business Banking</h3>
              <p>Solutions tailored for your business needs.</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h3 className="text-xl font-bold mb-2">Loans</h3>
              <p>Get the financial support you need.</p>
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="py-20 container mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-4 bg-white shadow rounded">
              <p>
                &quot;BankApp has transformed the way I manage my finances.
                Highly recommend!&quot;
              </p>
              <p className="mt-2 font-bold">- John Doe</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <p>
                &ldquo;Excellent customer service and great banking
                solutions.&ldquo;
              </p>
              <p className="mt-2 font-bold">- Jane Smith</p>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
};

export default LandingPage;

// ` async updateTransactionField(
//     transactionId: string,
//     updates: Partial<ITransaction>,
//   ): Promise<ITransaction> {
//     const transaction = await this.transactionModel.findById(transactionId);
//     if (!transaction) {
//       throw new NotFoundException('Transaction not found');
//     }

//     Object.assign(transaction, updates);
//     return transaction.save();
//   }`;

/**
 *   <div className="min-h-screen flex flex-col">

      <nav className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">BankApp</div>
          <div className="space-x-4">
            <a href="#about" className="hover:underline">
              About
            </a>
            <a href="#services" className="hover:underline">
              Services
            </a>
            <a href="#testimonials" className="hover:underline">
              Testimonials
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </nav>


      <main className="flex-grow">

        <section className="bg-gray-100 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to BankApp</h1>
          <p className="text-xl mb-8">
            Your trusted partner in financial services
          </p>

          <Link
            href="/sign-in"
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Sign In
          </Link>
          <Button onClick={toastUp}>Testing</Button>
        </section>


        <section id="about" className="py-20 container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg">
            We are committed to providing the best banking services to our
            customers.
          </p>
          <TestDialogEdit />
        </section>


        <section
          id="services"
          className="bg-gray-100 py-20 container mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4 bg-white shadow rounded">
              <h3 className="text-xl font-bold mb-2">Personal Banking</h3>
              <p>Manage your personal finances with ease.</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h3 className="text-xl font-bold mb-2">Business Banking</h3>
              <p>Solutions tailored for your business needs.</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h3 className="text-xl font-bold mb-2">Loans</h3>
              <p>Get the financial support you need.</p>
            </div>
          </div>
        </section>

  
        <section
          id="testimonials"
          className="py-20 container mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-4 bg-white shadow rounded">
              <p>
                &quot;BankApp has transformed the way I manage my finances.
                Highly recommend!&quot;
              </p>
              <p className="mt-2 font-bold">- John Doe</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <p>
                &ldquo;Excellent customer service and great banking
                solutions.&ldquo;
              </p>
              <p className="mt-2 font-bold">- Jane Smith</p>
            </div>
          </div>
        </section>
      </main>

   
      <footer className="bg-blue-600 p-4 text-white text-center">
        <p>&copy; 2025 BankApp. All rights reserved.</p>
      </footer>
    </div>
 */
