import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import NoiseGradientBackground from "../Background/NoiseGradientBackground";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <div className="section relative w-full">
      {/* FONDO CON EL EFECTO DE GRADIENTE Y RUIDO */}
      <div className="absolute inset-0 z-0 w-full">
        <NoiseGradientBackground />
      </div>
      
      {/* CONTENIDO SOBRE EL FONDO */}
      <div className="min-h-[50vh] sm:min-h-[70vh] text-white-pure flex items-center relative z-10 w-full">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-20 w-full">
          <div className="w-full"> {/* ELIMINADO: max-w-6xl mx-auto */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* COLUMNA IZQUIERDA - CONTACTO */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-white-pure text-xl sm:text-2xl mb-1 sm:mb-2 font-accent font-bold">
                  {t("about.contactTitle")}
                </h3>
                
                <div className="space-y-1">
                  <div>
                    <a 
                      href={`mailto:${t("common.email")}`}
                      className="text-red-primary text-lg sm:text-xl hover:text-white-pure transition-colors duration-300 block font-gotham font-medium"
                    >
                      {t("common.email")}
                    </a>
                    <p className="text-white-pure text-xs sm:text-sm font-gotham font-light mt-0.5">
                      {t("about.commercialProjects")}
                    </p>
                  </div>
                  
                  <div className="pt-1">
                    <a 
                      href={`mailto:${t("common.email")}?subject=Talent`}
                      className="text-red-primary text-lg sm:text-xl hover:text-white-pure transition-colors duration-300 block font-gotham font-medium"
                    >
                      Talent
                    </a>
                    <p className="text-white-pure text-xs sm:text-sm font-gotham font-light mt-0.5">
                      {t("about.careers")} {t("about.talentSubject")}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* COLUMNA DERECHA - UBICACIÓN */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-white-pure text-xl sm:text-2xl mb-1 sm:mb-2 font-accent font-bold">
                  {t("about.locationTitle")}
                </h3>
                
                <div className="space-y-1">
                  <div>
                    <p className="text-white-pure text-lg sm:text-xl font-gotham font-medium">
                      Guadalajara, Jalisco, México
                    </p>
                    <a 
                      href={`tel:${t("common.phone")}`}
                      className="text-red-primary text-lg sm:text-xl hover:text-white-pure transition-colors duration-300 font-gotham font-medium mt-0.5 block"
                    >
                      {t("common.phone")}
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;