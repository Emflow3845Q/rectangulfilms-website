// components/HeroSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import FluidDistortionVideo from "../Background/RedDistortionBackground";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <div className="section min-h-[80vh] xs:min-h-[85vh] sm:min-h-[90vh] md:min-h-[95vh] lg:min-h-screen bg-black-pure text-white-pure flex items-center pt-12 xs:pt-14 sm:pt-16 md:pt-20 lg:pt-0 relative overflow-hidden w-full">
      {/* Fondo con efecto de distorsión fluida */}
      <div className="absolute inset-0 w-full">
        <FluidDistortionVideo 
          videoUrl="/leeroy-background.mp4"
          displacementStrength={0.03}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay oscuro para mejor legibilidad del texto - Intensidad responsive */}
        <div className="absolute inset-0 bg-black bg-opacity-30 xs:bg-opacity-25 sm:bg-opacity-20 md:bg-opacity-15 lg:bg-opacity-10 pointer-events-none transition-opacity duration-500"></div>
      </div>
      
      {/* Contenido - ELIMINADO max-width y mx-auto */}
      <div className="px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full relative z-10 pointer-events-none">
        <div className="w-full pointer-events-none"> {/* ELIMINADO: max-w-4xl xs:max-w-5xl sm:max-w-6xl lg:max-w-7xl mx-auto */}
          {/* Título principal - Mejorado para responsive */}
          <motion.h1
            className="font-sans font-black uppercase tracking-tight text-white-pure mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6 pointer-events-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: 'clamp(2.25rem, 8vw, 8rem)',
              lineHeight: 1.1
            }}
          >
            {t("about.title")}
          </motion.h1>

          {/* Grid responsive mejorado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 pointer-events-none">
            {/* Columna izquierda - Texto principal */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pointer-events-none"
            >
              <p 
                className="text-white-pure leading-relaxed xs:leading-loose sm:leading-loose font-gotham font-medium pointer-events-none"
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.875rem)',
                  lineHeight: 1.4
                }}
              >
                {t("about.heroText1")}
              </p>
            </motion.div>

            {/* Columna derecha - Texto secundario */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pointer-events-none"
            >
              <p 
                className="text-white-pure leading-relaxed xs:leading-loose sm:leading-loose font-gotham font-light pointer-events-none"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
                  lineHeight: 1.6
                }}
              >
                {t("about.heroText2")}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Estilos CSS para mejoras adicionales */}
      <style jsx>{`
        /* Mejoras de rendimiento para móviles */
        @media (max-width: 768px) {
          .section {
            transform: translateZ(0);
            backface-visibility: hidden;
          }
        }

        /* Mejoras de legibilidad en móviles pequeños */
        @media (max-width: 360px) {
          .px-3 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        /* Ajustes para tablets en landscape */
        @media (max-width: 1024px) and (orientation: landscape) {
          .min-h-\[80vh\] {
            min-height: 100vh;
          }
        }

        /* Mejoras de accesibilidad para modo reducción de movimiento */
        @media (prefers-reduced-motion: reduce) {
          .absolute > div {
            transition: none;
          }
        }

        /* Optimización de fuentes para mejor rendimiento */
        .font-sans {
          font-feature-settings: "kern" 1;
          text-rendering: optimizeLegibility;
        }

        /* Forzar ancho completo */
        .section {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
        }
      `}</style>
    </div>
  );
};

export default HeroSection;