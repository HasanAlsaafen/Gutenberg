import React from "react";
import CallToAction from "../components/CallToAction";
import HeroSection from "../components/HeroSection";
import ServicesPreview from "../components/Services";
import Navbar from "../components/Navbar";

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesPreview />
      <CallToAction />
    </>
  );
}

export default LandingPage;
