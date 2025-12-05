import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import RevealText from '../components/RevealText'; // Ajusta la ruta según tu estructura

const RentalsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full overflow-hidden">
        {/* Full-bleed background */}
        <div
          className="absolute inset-0 bg-cover bg-center h-[480px] xs:h-[520px] sm:h-[580px] md:h-[640px] lg:h-[760px] xl:h-[800px]"
          style={{ backgroundImage: "url('https://res.cloudinary.com/dhoyps3vk/image/upload/v1764193442/3_Rentals_itj20q.png')" }}
          aria-hidden
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/50" />

        {/* Contenedor principal */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 xs:px-6 sm:px-8 h-[480px] xs:h-[520px] sm:h-[580px] md:h-[640px] lg:h-[760px] xl:h-[800px]">
          {/* Título RENTALS con RevealText */}
          <RevealText
            as="h1"
            className="w-full max-w-[1200px] mx-auto text-[3.5rem] xs:text-[4rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[8rem] xl:text-[10.5rem] leading-[0.85] xs:leading-[0.8] font-gotham uppercase tracking-[-0.01em] text-white font-black text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12"
          >
            {t('rentals.title')}
          </RevealText>

          {/* Descripción con RevealText */}
          <RevealText
            as="p"
            className="max-w-[280px] xs:max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto text-sm xs:text-base sm:text-lg md:text-lg leading-relaxed xs:leading-relaxed mb-6 xs:mb-8 sm:mb-10 font-gotham font-light text-center px-2 xs:px-0"
          >
            {t('rentals.heroDescription')}
          </RevealText>

          {/* Botón CTA - Usando motion pero con texto RevealText */}
          <motion.a
            href="/catalog.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block bg-red-primary hover:bg-red-dark text-white font-gotham uppercase tracking-widest px-6 xs:px-8 py-2 xs:py-3 text-xs xs:text-sm sm:text-base transition-all duration-200 shadow-lg font-bold"
          >
            <RevealText as="span">
              {t('rentals.downloadCatalog')}
            </RevealText>
          </motion.a>
        </div>

        {/* Fade inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-8 xs:h-12 bg-gradient-to-t from-black/100 via-black/60 to-transparent pointer-events-none" />
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="relative bg-black py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24">
        {/* Línea separadora */}
        <div className="flex justify-center mb-10 xs:mb-12 sm:mb-14 md:mb-16">
          <div className="w-20 xs:w-24 h-px bg-red-primary"></div>
        </div>
        
        <div className="w-full max-w-[320px] xs:max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 text-center">
          {/* Título de contacto con RevealText */}
          <RevealText
            as="h2"
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-gotham uppercase text-white mb-4 xs:mb-6 sm:mb-8 tracking-widest font-bold"
          >
            {t('rentals.contactTitle')}
          </RevealText>

          {/* Información de contacto */}
          <div className="space-y-3 xs:space-y-4 sm:space-y-5">
            <a
              href={`mailto:${t('common.email')}`}
              className="block text-red-primary hover:text-white transition-colors duration-200 text-base xs:text-lg sm:text-xl md:text-xl font-gotham font-medium break-all xs:break-normal"
            >
              <RevealText as="span">
                {t('common.email')}
              </RevealText>
            </a>
            <a
              href={`tel:${t('common.phone')}`}
              className="block text-red-primary hover:text-white transition-colors duration-200 text-base xs:text-lg sm:text-xl md:text-xl font-gotham font-medium"
            >
              <RevealText as="span">
                {t('common.phone')}
              </RevealText>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RentalsPage;