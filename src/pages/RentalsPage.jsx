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
        {/* Full-bleed background alta */}
        <div
          className="absolute inset-0 bg-cover bg-center h-[520px] md:h-[640px] lg:h-[760px]"
          style={{ backgroundImage: "url('/bts/bts.jpg')" }}
          aria-hidden
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Contenedor principal con título RENTALS y contenido debajo */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center px-6 h-[520px] md:h-[640px] lg:h-[760px]"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Título RENTALS muy grande centrado en la imagen */}
          <motion.h1
            className="w-full max-w-[1400px] mx-auto text-[5.5rem] md:text-[8rem] lg:text-[10.5rem] leading-[0.8] font-accent uppercase tracking-[-0.01em] text-white font-black text-center mb-8 md:mb-12"
            variants={fadeInUp}
            style={{ WebkitFontSmoothing: 'antialiased' }}
          >
            {t('rentals.title')}
          </motion.h1>

          {/* Descripción debajo del título RENTALS */}
          <motion.p
            className="max-w-2xl mx-auto text-base md:text-lg text-white leading-relaxed mb-8 font-gotham font-light text-center"
            variants={fadeInUp}
          >
            {t('rentals.heroDescription')}
          </motion.p>

          {/* Botón CTA debajo de la descripción */}
          <motion.a
            href="/catalog.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block bg-red-primary hover:bg-red-dark text-white font-accent uppercase tracking-widest px-8 py-3 text-sm md:text-base transition-all duration-200 shadow-lg font-bold"
            variants={fadeInUp}
          >
            {t('rentals.downloadCatalog')}
          </motion.a>
        </motion.div>

        {/* Fade inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/100 via-black/60 to-transparent pointer-events-none" />
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="relative bg-black py-16 md:py-20">
        {/* Línea separadora de ancho reducido */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="w-24 h-px bg-red-primary"></div>
        </div>
        
        <motion.div
          className="max-w-4xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Título de contacto en blanco */}
          <h2 className="text-2xl md:text-3xl font-accent uppercase text-white mb-6 tracking-widest font-bold">
            {t('rentals.contactTitle')}
          </h2>

          {/* Información de contacto directa */}
          <div className="space-y-4">
            <a
              href={`mailto:${t('common.email')}`}
              className="block text-red-primary hover:text-white transition-colors duration-200 text-lg md:text-xl font-gotham font-medium"
            >
              {t('common.email')}
            </a>
            <a
              href={`tel:${t('common.phone')}`}
              className="block text-red-primary hover:text-white transition-colors duration-200 text-lg md:text-xl font-gotham font-medium"
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