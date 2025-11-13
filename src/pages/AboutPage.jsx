import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const AboutPage = ({ fullpageApi }) => {
  const { t } = useLanguage();
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef(null);
  const sliderRef = useRef(null);
  const lastTimeRef = useRef(0);
  const progressRef = useRef(0);

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

  // Crear array duplicado para efecto infinito
  const duplicatedImages = [...btsImages, ...btsImages, ...btsImages];

  // Velocidades (en píxeles por segundo)
  const NORMAL_SPEED = 60; // px por segundo
  const HOVER_SPEED = 30;  // px por segundo (más lento)

  const animateSlider = (timestamp) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }

    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    // Determinar velocidad actual
    const currentSpeed = isHovering ? HOVER_SPEED : NORMAL_SPEED;
    
    // Calcular progreso basado en velocidad y tiempo
    const progressIncrement = (currentSpeed * deltaTime) / 1000;
    progressRef.current += progressIncrement;

    // Calcular el ancho total del contenido duplicado
    const totalWidth = duplicatedImages.length * (280 + 24); // ancho + gap aprox
    const viewportWidth = sliderRef.current?.parentElement?.offsetWidth || 1200;

    // Reiniciar progreso cuando se llega al final (efecto infinito suave)
    if (progressRef.current >= totalWidth - viewportWidth) {
      progressRef.current = 0;
    }

    // Aplicar transformación al slider
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${progressRef.current}px)`;
    }

    animationRef.current = requestAnimationFrame(animateSlider);
  };

  useEffect(() => {
    // Iniciar animación
    animationRef.current = requestAnimationFrame(animateSlider);
    
    // Limpiar al desmontar
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* SECCIÓN 1: HERO */}
      <div className="section">
        <div className="min-h-[90vh] sm:min-h-screen bg-black-pure text-white-pure flex items-center pt-20 lg:pt-0">
          <div className="px-4 sm:px-6 lg:px-8 xl:px-20 w-full">
            <div className="max-w-6xl mx-auto">
              {/* Título principal - BBH_Sans_Bartle (Acento) */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-accent uppercase tracking-tight text-white-pure mb-6 sm:mb-8 lg:mb-10 font-black"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {t("about.title")}
              </motion.h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                {/* Columna izquierda - GOTHAM (Base) */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white-pure leading-relaxed sm:leading-loose font-gotham font-medium">
                    {t("about.heroText1")}
                  </p>
                </motion.div>

                {/* Columna derecha - GOTHAM (Base) */}
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
      </div>

      {/* SECCIÓN 2: GALERÍA BTS - SLIDER AUTOMÁTICO */}
      <div className="section">
        <div className="py-12 sm:py-16 lg:py-20 bg-black-pure text-white-pure overflow-hidden">
          {/* Slider automático con múltiples imágenes visibles */}
          <motion.div 
            className="relative h-[45vh] sm:h-[50vh] flex items-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Contenedor de imágenes con animación continua */}
            <div 
              ref={sliderRef}
              className="flex gap-6 sm:gap-8 absolute left-0 transition-transform duration-100 linear"
              style={{
                willChange: 'transform'
              }}
            >
              {duplicatedImages.map((image, index) => {
                // Rotaciones aleatorias pero consistentes para cada índice
                const rotations = [-3, 2, -2, 3, -1, 2, -3, 1, -2, 3, 2, -1, 3, -2, 1];
                const rotation = rotations[index % rotations.length];
                
                return (
                  <div
                    key={`${image.id}-${index}`}
                    className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] group"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: 'transform 0.5s ease'
                    }}
                  >
                    {/* Marco blanco tipo Polaroid */}
                    <div 
                      className="bg-white p-3 sm:p-4 shadow-2xl hover:shadow-3xl transition-all duration-500"
                      style={{
                        transform: 'translateZ(0)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = `rotate(0deg) scale(1.1)`;
                        e.currentTarget.style.zIndex = '10';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateZ(0)';
                        e.currentTarget.style.zIndex = '1';
                      }}
                    >
                      <div className="relative w-full aspect-square bg-gray-dark overflow-hidden">
                        <img
                          src={image.image}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Punto rojo decorativo en algunas imágenes */}
                        {index % 5 === 0 && (
                          <div className="absolute top-3 left-3 w-3 h-3 bg-red-primary rounded-full shadow-lg"></div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* LÍNEA DIVISORA SUPERIOR */}
      <div className="w-full h-px bg-white/10"></div>

      {/* SECCIÓN 3: SERVICIOS */}
      <div className="section">
        <div className="min-h-screen bg-black-pure text-white-pure flex items-center py-20">
          <div className="px-4 sm:px-6 lg:px-8 xl:px-20 w-full">
            <div className="max-w-7xl mx-auto">
              {/* Subtítulo superior - GOTHAM (Base) */}
              <motion.p
                className="text-xs sm:text-sm text-white-pure uppercase tracking-[0.3em] text-left mb-6 font-gotham font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                OUR CAPABILITIES
              </motion.p>

              {/* Título centrado - BBH_Sans_Bartle (Acento) */}
              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-accent uppercase tracking-tight text-white-pure text-center mb-20 sm:mb-24 lg:mb-28 font-black"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {t("about.servicesTitle")}
              </motion.h2>

              {/* Grid de 4 columnas en desktop, 2 en tablet, 1 en móvil */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 xl:gap-16">
                {/* COLUMNA 1: PRODUCTION */}
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {/* Título de categoría - BBH_Sans_Bartle (Acento) */}
                  <h3 className="text-white-pure text-sm sm:text-base uppercase tracking-[0.3em] mb-6 font-accent font-bold">
                    {t("about.services.production")}
                  </h3>
                  {/* Items de servicio - GOTHAM (Base) */}
                  <ul className="space-y-2">
                    {t("about.serviceItems.production", { returnObjects: true }).map((service, index) => (
                      <motion.li 
                        key={index} 
                        className="text-white-pure text-xs sm:text-sm tracking-wide font-gotham font-light"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                      >
                        {service}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* COLUMNA 2: PHOTOGRAPHY */}
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <h3 className="text-white-pure text-sm sm:text-base uppercase tracking-[0.3em] mb-6 font-accent font-bold">
                    {t("about.services.photography")}
                  </h3>
                  <ul className="space-y-2">
                    {t("about.serviceItems.photography", { returnObjects: true }).map((service, index) => (
                      <motion.li 
                        key={index} 
                        className="text-white-pure text-xs sm:text-sm tracking-wide font-gotham font-light"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                      >
                        {service}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* COLUMNA 3: LIVE EVENTS */}
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h3 className="text-white-pure text-sm sm:text-base uppercase tracking-[0.3em] mb-6 font-accent font-bold">
                    {t("about.services.liveEvents")}
                  </h3>
                  <ul className="space-y-2">
                    {t("about.serviceItems.liveEvents", { returnObjects: true }).map((service, index) => (
                      <motion.li 
                        key={index} 
                        className="text-white-pure text-xs sm:text-sm tracking-wide font-gotham font-light"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                      >
                        {service}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* COLUMNA 4: EQUIPMENT RENTAL */}
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <h3 className="text-white-pure text-sm sm:text-base uppercase tracking-[0.3em] mb-6 font-accent font-bold">
                    {t("about.services.equipment")}
                  </h3>
                  <ul className="space-y-2">
                    {t("about.serviceItems.equipment", { returnObjects: true }).map((service, index) => (
                      <motion.li 
                        key={index} 
                        className="text-white-pure text-xs sm:text-sm tracking-wide font-gotham font-light"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                      >
                        {service}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LÍNEA DIVISORA INFERIOR */}
      <div className="w-full h-px bg-white/10"></div>

      {/* SECCIÓN 4: CONTACTO */}
      <div className="section">
        <div className="min-h-[80vh] sm:min-h-screen bg-black-pure text-white-pure flex items-center">
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
                  {/* Título - BBH_Sans_Bartle (Acento) */}
                  <h3 className="text-white-pure text-xl sm:text-2xl mb-4 sm:mb-6 font-accent font-bold">
                    {t("about.contactTitle")}
                  </h3>
                  
                  {/* Contenido - GOTHAM (Base) */}
                  <div className="space-y-4">
                    <div>
                      <a 
                        href={`mailto:${t("common.email")}`}
                        className="text-red-primary text-lg sm:text-xl hover:text-white-pure transition-colors duration-300 block mb-1 font-gotham font-medium"
                      >
                        {t("common.email")}
                      </a>
                      <p className="text-white-pure text-sm font-gotham font-light">
                        {t("about.commercialProjects")}
                      </p>
                    </div>
                    
                    <div>
                      <a 
                        href={`mailto:${t("common.email")}?subject=Talent`}
                        className="text-red-primary text-lg sm:text-xl hover:text-white-pure transition-colors duration-300 block mb-1 font-gotham font-medium"
                      >
                        Talent
                      </a>
                      <p className="text-white-pure text-sm font-gotham font-light">
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
                  {/* Título - BBH_Sans_Bartle (Acento) */}
                  <h3 className="text-white-pure text-xl sm:text-2xl mb-4 sm:mb-6 font-accent font-bold">
                    {t("about.locationTitle")}
                  </h3>
                  
                  {/* Contenido - GOTHAM (Base) */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-white-pure text-lg sm:text-xl mb-1 font-gotham font-medium">
                        Guadalajara, Jalisco, México
                      </p>
                      <a 
                        href={`tel:${t("common.phone")}`}
                        className="text-red-primary text-lg sm:text-xl hover:text-white-pure transition-colors duration-300 font-gotham font-medium"
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
    </>
  );
};

export default AboutPage;