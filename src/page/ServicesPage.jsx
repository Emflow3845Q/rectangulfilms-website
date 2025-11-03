import React from "react";
import ServicesHero from '../components/ServicesHero';
import AudiovisualesSection from '../components/AudiovisualesSection';
import ServiciosCompromisoSection from "../components/ServiciosCompromisoSection";
import RentaForoSection from "../components/RentaForoSection";
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