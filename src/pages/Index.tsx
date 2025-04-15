
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Benefits from "@/components/landing/Benefits";
import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="flex flex-col">
      <header className="bg-gradient-to-br from-gastro to-gastro-dark min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-6">
          <Navbar />
        </div>
        <div className="flex-1 container mx-auto px-4 flex items-center">
          <Hero />
        </div>
      </header>
      <Features />
      <Benefits />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
