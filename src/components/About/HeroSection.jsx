// components/HeroSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import FluidDistortionVideo from "../Background/RedDistortionBackground";

const HeroSection = () => {
  const { t } = useLanguage();

  // Variantes de animación reutilizables
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const rightTextVariants = {
    ...textVariants,
    hidden: { opacity: 0, x: 40 }
  };

  // Configuración responsive centralizada
  const responsiveConfig = {
    padding: {
      mobile: "px-4",
      tablet: "sm:px-6", 
      desktop: "lg:px-12 xl:px-16 2xl:px-20"
    },
    overlay: {
      mobile: "bg-opacity-30",
      tablet: "xs:bg-opacity-25 sm:bg-opacity-20",
      desktop: "md:bg-opacity-15 lg:bg-opacity-10"
    }
  };

  return (
    <section className="relative w-full min-h-[80vh] xs:min-h-[85vh] sm:min-h-[90vh] md:min-h-[95vh] lg:min-h-screen bg-black-pure text-white-pure flex items-center pt-12 xs:pt-14 sm:pt-16 md:pt-20 lg:pt-0 overflow-hidden">
      {/* Fondo con efecto de distorsión */}
      <div className="absolute inset-0 w-full h-full">
        <FluidDistortionVideo 
          videoUrl="/leeroy-background.mp4"
          displacementStrength={0.03}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay responsive */}
        <div 
          className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-500 ${responsiveConfig.overlay.mobile} ${responsiveConfig.overlay.tablet} ${responsiveConfig.overlay.desktop}`}
          aria-hidden="true"
        />
      </div>
      
      {/* Contenido principal */}
      <div className={`relative z-10 w-full ${responsiveConfig.padding.mobile} ${responsiveConfig.padding.tablet} ${responsiveConfig.padding.desktop}`}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          {/* Título principal */}
          <motion.h1
            variants={titleVariants}
            className="font-sans font-black uppercase tracking-tight text-white-pure mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8"
            style={{
              fontSize: 'clamp(2.25rem, 8vw, 8rem)',
              lineHeight: 1.1
            }}
          >
            {t("about.title")}
          </motion.h1>

          {/* Grid de contenido */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10">
            {/* Columna izquierda - Texto principal */}
            <motion.div variants={textVariants}>
              <p 
                className="text-white-pure font-gotham font-medium leading-relaxed"
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.875rem)',
                  lineHeight: 1.4
                }}
              >
                {t("about.heroText1")}
              </p>
            </motion.div>

            {/* Columna derecha - Texto secundario */}
            <motion.div variants={rightTextVariants}>
              <p 
                className="text-white-pure font-gotham font-light leading-relaxed"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
                  lineHeight: 1.6
                }}
              >
                {t("about.heroText2")}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;