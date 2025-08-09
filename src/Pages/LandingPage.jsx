import React from "react";
import CallToAction from "../components/CallToAction";
import HeroSection from "../components/HeroSection";
import ServicesPreview from "../components/Services";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesPreview />
      <CallToAction />
      <Footer />
    </>
  );
}

export default LandingPage;
