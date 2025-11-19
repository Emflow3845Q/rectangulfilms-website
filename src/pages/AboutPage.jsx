import React from "react";
import { 
  HeroSection, 
  BtsGallery, 
  ServicesSection, 
  ContactSection 
} from "../components/About";

const AboutPage = ({ fullpageApi }) => {
  return (
    <div className="relative">
      <HeroSection />
      
      <BtsGallery />
      
      {/* Línea divisora superior */}
      <div className="w-full h-px bg-white/10"></div>
      
      <ServicesSection />
      
      {/* Línea divisora inferior */}
      <div className="w-full h-px bg-white/10"></div>
      
      <ContactSection />
    </div>
  );
};

export default AboutPage;