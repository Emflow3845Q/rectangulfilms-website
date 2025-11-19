import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import NoiseGradientBackground from "../../components/Background/NoiseGradientBackground";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <div className="section min-h-[80vh] sm:min-h-[90vh] bg-black-pure text-white-pure flex items-center pt-12 lg:pt-0 relative overflow-hidden">
      {/* Componente de fondo */}
      <NoiseGradientBackground />
      
      {/* Contenido */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-20 w-full relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Título principal */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-accent uppercase tracking-tight text-white-pure mb-3 sm:mb-4 lg:mb-6 font-black"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("about.title")}
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            {/* Columna izquierda */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white-pure leading-relaxed sm:leading-loose font-gotham font-medium">
                {t("about.heroText1")}
              </p>
            </motion.div>

            {/* Columna derecha */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-base sm:text-lg text-white-pure leading-relaxed sm:leading-loose font-gotham font-light">
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