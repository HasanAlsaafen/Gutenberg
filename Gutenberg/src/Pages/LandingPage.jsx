import React from "react";
import CallToAction from "../components/CallToAction";
import HeroSection from "../components/HeroSection";
import ServicesPreview from "../components/Services";

function LandingPage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <CallToAction />
    </>
  );
}

export default LandingPage;
