import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// Animations
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
    <div className="min-h-screen bg-black text-white pt-20">
      {/* ================= HERO SECTION ================= */}
      <section className="relative py-24 lg:py-40 flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bts/bts.jpg')" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <motion.div
          className="relative z-10 container mx-auto text-center px-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            className="text-6xl lg:text-8xl font-gotham-cond-black uppercase tracking-widest mb-8"
            variants={fadeInUp}
          >
            {t('rentals.title')}
          </motion.h1>

          <motion.p
            className="text-lg lg:text-2xl leading-relaxed max-w-3xl mx-auto mb-10"
            variants={fadeInUp}
          >
            {t('rentals.heroDescription')}
          </motion.p>

          <motion.a
            href="/catalog.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-red-primary hover:bg-red-dark text-white font-gotham-cond-black uppercase tracking-widest px-8 py-4 text-lg transition-all duration-300"
          >
            {t('rentals.downloadCatalog')}
          </motion.a>
        </motion.div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="relative py-28 bg-black overflow-hidden">
        <motion.div
          className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Text side */}
          <div className="relative">
            <motion.h2
              className="text-4xl lg:text-5xl font-gotham-cond-black uppercase tracking-wider text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('rentals.contactTitle')}
            </motion.h2>

            <motion.p
              className="text-gray-400 text-lg leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a
                href={`mailto:${t('common.email')}`}
                className="text-white hover:text-red-primary transition-colors duration-300"
              >
                {t('common.email')}
              </a>
              <br />
              <a
                href={`tel:${t('common.phone')}`}
                className="text-white hover:text-red-primary transition-colors duration-300"
              >
                {t('common.phone')}
              </a>
            </motion.p>

            {/* Subtle accent line */}
            <motion.div
              className="mt-10 w-20 h-[2px] bg-red-primary"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            />
          </div>

          {/* Info side */}
          <div className="text-left lg:text-right space-y-3">
            <motion.p
              className="text-gray-400 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Guadalajara, Jalisco, México
            </motion.p>
          </div>
        </motion.div>

        {/* Background accent element */}
        <motion.div
          className="absolute -bottom-10 right-0 w-[40%] h-[1px] bg-gradient-to-l from-red-primary/60 to-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          viewport={{ once: true }}
        />
      </section>
    </div>
  );
};

export default RentalsPage;
