import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.2 } }
};

const RentalsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ================= HERO SECTION - IMAGEN ALTA CON RENTALS Y CONTENIDO ENCIMA ================= */}
      <section className="relative w-full overflow-hidden">
        {/* Full-bleed background alta - MEJORADO RESPONSIVE */}
        <div
          className="absolute inset-0 bg-cover bg-center h-[480px] xs:h-[520px] sm:h-[580px] md:h-[640px] lg:h-[760px] xl:h-[800px]"
          style={{ backgroundImage: "url('/bts/bts.jpg')" }}
          aria-hidden
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/50" />

        {/* Contenedor principal con título RENTALS y contenido debajo - MEJORADO RESPONSIVE */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center px-4 xs:px-6 sm:px-8 h-[480px] xs:h-[520px] sm:h-[580px] md:h-[640px] lg:h-[760px] xl:h-[800px]"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Título RENTALS muy grande centrado - MEJORADO RESPONSIVE */}
          <motion.h1
            className="w-full max-w-[1200px] mx-auto text-[3.5rem] xs:text-[4rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[8rem] xl:text-[10.5rem] leading-[0.85] xs:leading-[0.8] font-accent uppercase tracking-[-0.01em] text-white font-black text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12"
            variants={fadeInUp}
            style={{ WebkitFontSmoothing: 'antialiased' }}
          >
            {t('rentals.title')}
          </motion.h1>

          {/* Descripción debajo del título - MEJORADO RESPONSIVE */}
          <motion.p
            className="max-w-[280px] xs:max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto text-sm xs:text-base sm:text-lg md:text-lg leading-relaxed xs:leading-relaxed mb-6 xs:mb-8 sm:mb-10 font-gotham font-light text-center px-2 xs:px-0"
            variants={fadeInUp}
          >
            {t('rentals.heroDescription')}
          </motion.p>

          {/* Botón CTA debajo de la descripción - MEJORADO RESPONSIVE */}
          <motion.a
            href="/catalog.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block bg-red-primary hover:bg-red-dark text-white font-accent uppercase tracking-widest px-6 xs:px-8 py-2 xs:py-3 text-xs xs:text-sm sm:text-base transition-all duration-200 shadow-lg font-bold"
            variants={fadeInUp}
          >
            {t('rentals.downloadCatalog')}
          </motion.a>
        </motion.div>

        {/* Fade inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-8 xs:h-12 bg-gradient-to-t from-black/100 via-black/60 to-transparent pointer-events-none" />
      </section>

      {/* ================= CONTACT SECTION - MEJORADO RESPONSIVE ================= */}
      <section className="relative bg-black py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24">
        {/* Línea separadora de ancho reducido */}
        <div className="flex justify-center mb-10 xs:mb-12 sm:mb-14 md:mb-16">
          <div className="w-20 xs:w-24 h-px bg-red-primary"></div>
        </div>
        
        <motion.div
          className="max-w-[280px] xs:max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 xs:px-6 sm:px-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Título de contacto en blanco - MEJORADO RESPONSIVE */}
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-accent uppercase text-white mb-4 xs:mb-6 sm:mb-8 tracking-widest font-bold">
            {t('rentals.contactTitle')}
          </h2>

          {/* Información de contacto directa - MEJORADO RESPONSIVE */}
          <div className="space-y-3 xs:space-y-4 sm:space-y-5">
            <a
              href={`mailto:${t('common.email')}`}
              className="block text-red-primary hover:text-white transition-colors duration-200 text-base xs:text-lg sm:text-xl md:text-xl font-gotham font-medium break-all xs:break-normal"
            >
              {t('common.email')}
            </a>
            <a
              href={`tel:${t('common.phone')}`}
              className="block text-red-primary hover:text-white transition-colors duration-200 text-base xs:text-lg sm:text-xl md:text-xl font-gotham font-medium"
            >
              {t('common.phone')}
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default RentalsPage;