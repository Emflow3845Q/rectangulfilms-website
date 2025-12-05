import React from "react";
import {
  HeroSection,
  BtsGallery,
  ServicesSection,
  ContactSection,
  TheStage
} from "../components/About";

const AboutPage = ({ fullpageApi }) => {
  return (
    <div className="about-page w-full min-h-screen bg-black overflow-x-hidden">
      {/* Hero Section - Introducción principal */}
      <section className="hero-section w-full">
        <HeroSection />
      </section>

      {/* Behind the Scenes Gallery */}
      <section className="gallery-section w-full">
        <BtsGallery />
      </section>

      {/* Services Section */}
      <section className="services-section w-full">
        <ServicesSection />
      </section>

      {/* Services Section */}
      <section className="services-section w-full">
        <TheStage />
      </section>

      {/* Contact Section */}
      <section className="contact-section w-full">
        <ContactSection />
      </section>

      {/* Estilos específicos para AboutPage */}
      <style jsx>{`
        .about-page {
          background: #000000;
        }
        
        /* Asegurar que todas las secciones ocupen todo el ancho */
        .hero-section,
        .gallery-section,
        .services-section,
        .contact-section {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
        }
        
        /* Mejoras de rendimiento */
        @media (max-width: 768px) {
          .about-page {
            transform: translateZ(0);
            will-change: transform;
          }
        }
        
        /* Prevenir scroll horizontal en todos los dispositivos */
        @media (max-width: 1024px) {
          .about-page {
            overflow-x: hidden;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;