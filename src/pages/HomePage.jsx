import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { HeroSection, VideoSection, ProjectsSection, VideoModal } from "../components/Home";
import RedDistortionBackground from "../components/Background/RedDistortionBackground";
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [fullscreenVideo, setFullscreenVideo] = useState(null);
  const [showContent, setShowContent] = useState(false);
  
  const { currentLanguage } = useLanguage();

  // Refs para las secciones
  const videoSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);

  // Textos dinámicos en inglés
  const dynamicTextsEN = [
    "Rectángulo",
    "Advertising",
    "Narrative",
    "Storytellers",
    "Motion",
    "Cinema",
    "Vision",
    "Events",
    "Music Video",
    "Production"
  ];

  // Textos dinámicos en español
  const dynamicTextsES = [
    "Rectángulo",
    "Publicidad",
    "Narradores",
    "Movimiento", 
    "Cine",
    "Visión",
    "Eventos",
    "Videoclip",
    "Producción"
  ];

  const dynamicTexts = currentLanguage === 'en' ? dynamicTextsEN : dynamicTextsES;

  // Animación mejorada para las secciones
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    const timer = setTimeout(() => {
      setShowContent(true);
    }, 800);

    return () => {
      window.removeEventListener('resize', checkDevice);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (fullscreenVideo) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [fullscreenVideo]);

  const handleButtonClick = () => {
    window.location.href = "/about";
  };

  const handleProjectClick = (project) => {
    setFullscreenVideo(project);
  };

  const closeFullscreen = () => {
    setFullscreenVideo(null);
  };

  return (
    <div className="relative bg-black min-h-screen">
      {/* Fondo con animación de bajada - SIN overlay que lo tape */}
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut" 
        }}
        className="fixed inset-0 z-0"
      >
        <RedDistortionBackground />
      </motion.div>

      {/* Contenido que aparece después del fondo */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { 
                duration: 0.5, 
                ease: "easeOut",
                delay: 0.2
              }
            }}
            className="relative z-10"
          >
            {/* Hero Section - Altura completa */}
            <div className="h-screen">
              <HeroSection
                dynamicTexts={dynamicTexts}
                isMobile={isMobile}
                isTablet={isTablet}
                onButtonClick={handleButtonClick}
              />
            </div>

            {/* Video Section - Con animación de entrada mejorada */}
            <motion.div
              ref={videoSectionRef}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px" }}
              variants={sectionVariants}
            >
              <VideoSection
                isMobile={isMobile}
                isTablet={isTablet}
              />
            </motion.div>

            {/* Projects Section - Con animación de entrada mejorada */}
            <motion.div
              ref={projectsSectionRef}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px" }}
              variants={sectionVariants}
            >
              <ProjectsSection
                isMobile={isMobile}
                isTablet={isTablet}
                onProjectClick={handleProjectClick}
              />
            </motion.div>

            <VideoModal
              fullscreenVideo={fullscreenVideo}
              onClose={closeFullscreen}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;