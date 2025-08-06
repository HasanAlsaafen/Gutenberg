import React from "react";
import CallToAction from "../components/CallToAction";
import HeroSection from "../components/HeroSection";
import ServicesPreview from "../components/Services";
import Navbar from "../components/Nav";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesPreview />
      <CallToAction />
      <ContactForm />
      <Footer />
    </>
  );
}

export default LandingPage;
