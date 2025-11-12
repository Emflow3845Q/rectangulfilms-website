import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import ClientLogosCarousel from "../components/ClientLogosCarousel";
import Footer from "../layout/Footer";

const AboutPage = ({ fullpageApi }) => {
  const { t } = useLanguage();
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Galería de fotografías del detrás de cámaras
  const btsImages = [
    { id: 1, image: "/bts/bts1.jpg", alt: "Behind the scenes production 1" },
    { id: 2, image: "/bts/bts2.jpg", alt: "Behind the scenes production 2" },
    { id: 3, image: "/bts/bts3.jpg", alt: "Behind the scenes production 3" },
    { id: 4, image: "/bts/bts4.jpg", alt: "Behind the scenes production 4" },
    { id: 5, image: "/bts/bts5.jpg", alt: "Behind the scenes production 5" },
    { id: 6, image: "/bts/bts6.jpg", alt: "Behind the scenes production 6" },
    { id: 7, image: "/bts/bts7.jpg", alt: "Behind the scenes production 7" },
    { id: 8, image: "/bts/bts8.jpg", alt: "Behind the scenes production 8" },
    { id: 9, image: "/bts/bts9.jpg", alt: "Behind the scenes production 9" },
    { id: 10, image: "/bts/bts10.jpg", alt: "Behind the scenes production 10" },
  ];

  // Manejar arrastre del carrusel
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <>
      {/* SECCIÓN 1: HERO */}
      <div className="section">
        <div className="min-h-[90vh] sm:min-h-screen bg-black-pure text-white-pure flex items-center pt-20 lg:pt-0">
          <div className="px-4 sm:px-6 lg:px-8 xl:px-20 w-full">
            <div className="max-w-6xl mx-auto">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-gotham-cond-black uppercase tracking-tight text-white-pure mb-6 sm:mb-8 lg:mb-10"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {t("about.title")}
              </motion.h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                {/* Columna izquierda */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white-pure leading-relaxed sm:leading-loose font-light">
                    {t("about.heroText1")}
                  </p>
                </motion.div>

                {/* Columna derecha */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <p className="text-base sm:text-lg text-gray-dark leading-relaxed sm:leading-loose">
                    {t("about.heroText2")}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: GALERÍA BTS */}
      <div className="section">
        <div className="py-12 sm:py-16 lg:py-20 bg-black-pure text-white-pure">
          <div className="px-4 sm:px-6 lg:px-8 xl:px-20 mb-8 sm:mb-10 lg:mb-12">
            <motion.h2
              className="text-xl sm:text-2xl text-gray-dark uppercase tracking-widest mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t("about.btsTitle")}
            </motion.h2>
            <motion.p 
              className="text-gray-dark text-base sm:text-lg max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Galería de fotografías del detrás de cámaras de algunas de nuestras producciones, 
              en un carrusel interactivo que puedes recorrer arrastrando el cursor.
            </motion.p>
          </div>

          <motion.div 
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 xl:px-20 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {btsImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="flex-shrink-0 w-64 sm:w-72 md:w-80 h-80 sm:h-88 md:h-96 group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative w-full h-full bg-gray-dark overflow-hidden rounded-lg">
                  <img
                    src={image.image}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Indicador de arrastre - solo en desktop */}
                  <div className="hidden sm:block absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ← Drag →
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Instrucción de arrastre */}
          <motion.div 
            className="px-4 sm:px-6 lg:px-8 xl:px-20 mt-6 sm:mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-gray-dark text-xs sm:text-sm text-center uppercase tracking-widest">
              ← Arrastra para explorar la galería →
            </p>
          </motion.div>
        </div>
      </div>

      {/* SECCIÓN 3: SERVICIOS */}
      <div className="section">
        <div className="py-12 sm:py-16 lg:py-20 bg-black-pure text-white-pure">
          <div className="px-4 sm:px-6 lg:px-8 xl:px-20 w-full">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-gotham-cond-black uppercase tracking-tight text-white-pure mb-8 sm:mb-12 lg:mb-16"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {t("about.servicesTitle")}
              </motion.h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
                {/* Columna 1 */}
                <motion.div 
                  className="space-y-8 sm:space-y-10 lg:space-y-12"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {/* Production */}
                  <div>
                    <h3 className="text-red-primary text-lg sm:text-xl uppercase tracking-widest mb-4 sm:mb-6 font-gotham-cond-black">
                      {t("about.services.production")}
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {t("about.serviceItems.production", { returnObjects: true }).map((service, index) => (
                        <motion.li 
                          key={index} 
                          className="text-gray-dark text-base sm:text-lg"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        >
                          {service}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Live Events */}
                  <div>
                    <h3 className="text-red-primary text-lg sm:text-xl uppercase tracking-widest mb-4 sm:mb-6 font-gotham-cond-black">
                      {t("about.services.liveEvents")}
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {t("about.serviceItems.liveEvents", { returnObjects: true }).map((service, index) => (
                        <motion.li 
                          key={index} 
                          className="text-gray-dark text-base sm:text-lg"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        >
                          {service}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Columna 2 */}
                <motion.div 
                  className="space-y-8 sm:space-y-10 lg:space-y-12"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {/* Photography */}
                  <div>
                    <h3 className="text-red-primary text-lg sm:text-xl uppercase tracking-widest mb-4 sm:mb-6 font-gotham-cond-black">
                      {t("about.services.photography")}
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {t("about.serviceItems.photography", { returnObjects: true }).map((service, index) => (
                        <motion.li 
                          key={index} 
                          className="text-gray-dark text-base sm:text-lg"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        >
                          {service}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Equipment Rental */}
                  <div>
                    <h3 className="text-red-primary text-lg sm:text-xl uppercase tracking-widest mb-4 sm:mb-6 font-gotham-cond-black">
                      {t("about.services.equipment")}
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {t("about.serviceItems.equipment", { returnObjects: true }).map((service, index) => (
                        <motion.li 
                          key={index} 
                          className="text-gray-dark text-base sm:text-lg"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        >
                          {service}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 4: CLIENT LOGOS */}
      <div className="section">
        <div className="py-12 sm:py-16 lg:py-20 bg-black-pure text-white-pure">
          <div className="w-full">
            <ClientLogosCarousel />
          </div>
        </div>
      </div>

      {/* SECCIÓN 5: CONTACTO Y FOOTER */}
      <div className="section">
        <div className="min-h-[80vh] sm:min-h-screen bg-black-pure text-white-pure flex flex-col">
          {/* Contenido de Contacto */}
          <div className="flex-1 flex items-center justify-center py-12 sm:py-16 lg:py-20">
            <div className="px-4 sm:px-6 lg:px-8 xl:px-20 w-full">
              <div className="max-w-6xl mx-auto">
                <motion.div 
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16"
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
                    <h3 className="text-white-pure text-xl sm:text-2xl mb-4 sm:mb-6 font-gotham-cond-black">
                      {t("about.contactTitle")}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <a 
                          href={`mailto:${t("common.email")}`}
                          className="text-red-primary text-lg sm:text-xl hover:text-white-pure transition-colors duration-300 block mb-1"
                        >
                          {t("common.email")}
                        </a>
                        <p className="text-gray-dark text-sm">
                          {t("about.commercialProjects")}
                        </p>
                      </div>
                      
                      <div>
                        <a 
                          href={`mailto:${t("common.email")}?subject=Talent`}
                          className="text-red-primary text-lg sm:text-xl hover:text-white-pure transition-colors duration-300 block mb-1"
                        >
                          Talent
                        </a>
                        <p className="text-gray-dark text-sm">
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
                    <h3 className="text-white-pure text-xl sm:text-2xl mb-4 sm:mb-6 font-gotham-cond-black">
                      {t("about.locationTitle")}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-dark text-lg sm:text-xl mb-1">
                          Guadalajara, Jalisco, México
                        </p>
                        <a 
                          href={`tel:${t("common.phone")}`}
                          className="text-red-primary text-lg sm:text-xl hover:text-white-pure transition-colors duration-300"
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

          {/* Footer */}
          <div className="py-6 sm:py-8">
            <Footer />
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default AboutPage;