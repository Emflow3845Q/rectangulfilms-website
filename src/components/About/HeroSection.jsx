// components/HeroSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import FluidDistortionVideo from "../Background/NoiseGradientBackground";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <div className="section min-h-[80vh] sm:min-h-[90vh] bg-black-pure text-white-pure flex items-center pt-12 lg:pt-0 relative overflow-hidden">
      {/* Fondo con efecto de distorsión fluida */}
      <div className="absolute inset-0">
        <FluidDistortionVideo 
          videoUrl="/leeroy-background.mp4"
          displacementStrength={0.03}
          className="w-full h-full"
        />
        
        {/* Overlay oscuro para mejor legibilidad del texto */}
        <div className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none"></div>
      </div>
      
      {/* Contenido */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-20 w-full relative z-10 pointer-events-none">
        <div className="max-w-6xl mx-auto pointer-events-none">
          {/* Título principal */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-sans font-black uppercase tracking-tight text-white-pure mb-3 sm:mb-4 lg:mb-6 pointer-events-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("about.title")}
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 pointer-events-none">
            {/* Columna izquierda */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pointer-events-none"
            >
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white-pure leading-relaxed sm:leading-loose font-gotham font-medium pointer-events-none">
                {t("about.heroText1")}
              </p>
            </motion.div>

            {/* Columna derecha */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pointer-events-none"
            >
              <p className="text-base sm:text-lg text-white-pure leading-relaxed sm:leading-loose font-gotham font-light pointer-events-none">
                {t("about.heroText2")}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;