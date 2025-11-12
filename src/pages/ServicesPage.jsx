import React from "react";
import ServicesHero from '../components/Services/ServicesHero';
import AudiovisualesSection from '../components/Services/AudiovisualesSection';
import ServiciosCompromisoSection from "../components/Services/ServiciosCompromisoSection";
import RentaForoSection from "../components/Services/RentaForoSection";

const ServicesPage = () => {
  return (
    <>
      <ServicesHero />
      <AudiovisualesSection />
      <ServiciosCompromisoSection />
      <RentaForoSection />
    </>
  );
};

export default ServicesPage;