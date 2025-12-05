import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import RedDistortionBackground from "../Background/RedDistortionBackground";
import RevealText from "../RevealText"; // importa tu componente reutilizable

const ContactSection = () => {
  const { t } = useLanguage();

  const contactData = {
    email: t("common.email"),
    phone: t("common.phone"),
    location: "Guadalajara, Jalisco, México",
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const rightItemVariants = {
    ...itemVariants,
    hidden: { opacity: 0, x: 40 },
  };

  return (
    <section className="section relative w-full">
      {/* FONDO */}
      <div className="absolute inset-0 z-0 w-full">
        <RedDistortionBackground />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="min-h-[50vh] sm:min-h-[70vh] text-white-pure flex items-center relative z-10 w-full">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-20 w-full">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* COLUMNA IZQUIERDA - CONTACTO */}
            <motion.div variants={itemVariants}>
              <RevealText
                as="h3"
                className="text-white-pure text-xl sm:text-2xl mb-3 sm:mb-4 font-bold"
                style={{ fontFamily: "BBH_Sans_Bartle, sans-serif" }}
              >
                {t("about.contactTitle")}
              </RevealText>

              <div className="space-y-3">
                {/* Email Comercial */}
                <div>
                  <RevealText
                    as="a"
                    href={`mailto:${contactData.email}`}
                    className="text-white-pure text-lg sm:text-xl hover:text-red-500 transition-all duration-300 block font-medium relative group"
                    style={{ fontFamily: "GOTHAM, sans-serif" }}
                    aria-label={`Enviar email a ${contactData.email} para proyectos comerciales`}
                  >
                    <span className="relative">
                      {contactData.email}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </RevealText>
                  <RevealText
                    as="p"
                    className="text-white-pure text-xs sm:text-sm font-light mt-1"
                    style={{ fontFamily: "GOTHAM, sans-serif" }}
                  >
                    {t("about.commercialProjects")}
                  </RevealText>
                </div>

                {/* Email Talent */}
                <div>
                  <RevealText
                    as="span"
                    className="text-white-pure text-lg sm:text-xl block font-medium"
                    style={{ fontFamily: "GOTHAM, sans-serif" }}
                  >
                    Talent
                  </RevealText>
                  <RevealText
                    as="p"
                    className="text-white-pure text-xs sm:text-sm font-light mt-1"
                    style={{ fontFamily: "GOTHAM, sans-serif" }}
                  >
                    {t("about.careers")} {t("about.talentSubject")}
                  </RevealText>
                </div>
              </div>
            </motion.div>

            {/* COLUMNA DERECHA - UBICACIÓN */}
            <motion.div variants={rightItemVariants}>
              <RevealText
                as="h3"
                className="text-white-pure text-xl sm:text-2xl mb-3 sm:mb-4 font-bold"
                style={{ fontFamily: "BBH_Sans_Bartle, sans-serif" }}
              >
                {t("about.locationTitle")}
              </RevealText>

              <div className="space-y-2">
                <div>
                  <RevealText
                    as="p"
                    className="text-white-pure text-lg sm:text-xl font-medium"
                    style={{ fontFamily: "GOTHAM, sans-serif" }}
                  >
                    {contactData.location}
                  </RevealText>
                  <RevealText
                    as="a"
                    href={`tel:${contactData.phone}`}
                    className="text-white-pure text-lg sm:text-xl hover:text-red-500 transition-all duration-300 font-medium mt-1 block relative group"
                    style={{ fontFamily: "GOTHAM, sans-serif" }}
                    aria-label={`Llamar al teléfono ${contactData.phone}`}
                  >
                    <span className="relative">
                      {contactData.phone}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </RevealText>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;