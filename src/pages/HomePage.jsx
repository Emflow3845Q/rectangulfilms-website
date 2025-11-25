// pages/Home.jsx
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

  const featuredProjects = [
  // COLUMNA 1
  {
    id: 1,
    client: "Oh la lashes",
    title: "Camilo Regresa Oh la lashes",
    category: "Beauty / Commercial",
    video: "/videos/camilo-regresa.mp4",
    width: "col-span-2 lg:col-span-1",
    height: "row-span-2 lg:row-span-2",
    rotation: "rotate-1",
    mobileWidth: "col-span-2",
    tabletWidth: "col-span-2"
  },
  {
    id: 4,
    client: "DAC",
    title: "DAC 2025 - Recap", 
    category: "Medical / Event",
    video: "/videos/DAC 2025 - Recap.mp4",
    width: "col-span-2 lg:col-span-1",
    height: "row-span-1 lg:row-span-1",
    rotation: "-rotate-1",
    mobileWidth: "col-span-2",
    tabletWidth: "col-span-2"
  },

  // COLUMNA 2 
  {
    id: 2,
    client: "DAC",
    title: "Derma Aesthetics Congress",
    category: "Medical / Event",
    video: "/videos/dac-dermaaestheticscongress.mp4",
    width: "col-span-1 lg:col-span-1",
    height: "row-span-1 lg:row-span-1",
    rotation: "-rotate-2",
    mobileWidth: "col-span-1",
    tabletWidth: "col-span-1"
  },
  {
    id: 5,
    client: "Guerza",
    title: "Frente al mar",
    category: "Music Video",
    video: "/videos/Guerza - Frente al mar.mp4", 
    width: "col-span-1 lg:col-span-1",
    height: "row-span-2 lg:row-span-2",
    rotation: "rotate-2",
    mobileWidth: "col-span-1",
    tabletWidth: "col-span-1"
  },

  // COLUMNA 3
  {
    id: 3,
    client: "Don Ricardo",
    title: "El afilador",
    category: "Documentary / Short Film",
    video: "/videos/El afilador .mp4",
    width: "col-span-1 lg:col-span-1",
    height: "row-span-1 lg:row-span-1",
    rotation: "rotate-3",
    mobileWidth: "col-span-1",
    tabletWidth: "col-span-1"
  },
  {
    id: 6,
    client: "Recrea",
    title: "STEAM 2024",
    category: "Educational / STEAM",
    video: "/videos/Recrea STEAM - 2024.mp4",
    width: "col-span-1 lg:col-span-1",
    height: "row-span-1 lg:row-span-1",
    rotation: "-rotate-3",
    mobileWidth: "col-span-1",
    tabletWidth: "col-span-1"
  },
  {
    id: 7,
    client: "Bomberos Guadalajara",
    title: "1 Corte",
    category: "Documentary / Corporate",
    video: "/videos/Bomberos Guadalajara - 1 Corte .mp4",
    width: "col-span-1 lg:col-span-1",
    height: "row-span-1 lg:row-span-1",
    rotation: "rotate-2",
    mobileWidth: "col-span-1",
    tabletWidth: "col-span-1"
  },

  // COLUMNA 4
  {
    id: 8,
    client: "Foro Off Screen",
    title: "Promocional foro Off Screen", 
    category: "Promotional / Event",
    video: "/videos/promocionalforo offscreen.mov",
    width: "col-span-1 lg:col-span-1",
    height: "row-span-1 lg:row-span-1",
    rotation: "-rotate-2",
    mobileWidth: "col-span-1",
    tabletWidth: "col-span-1"
  },
  {
    id: 9,
    client: "Rosk",
    title: "Rosk",
    category: "Commercial / Branding",
    video: "/videos/rosk.mp4",
    width: "col-span-1 lg:col-span-1",
    height: "row-span-1 lg:row-span-1", 
    rotation: "rotate-1",
    mobileWidth: "col-span-1",
    tabletWidth: "col-span-1"
  }
];

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

  // Animación para las secciones que entran desde abajo
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // Curva suave
      }
    }
  };

  return (
    <div className="relative bg-black">
      {/* Fondo con animación de bajada */}
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

            {/* Video Section - Con animación de entrada */}
            <motion.div
              ref={videoSectionRef}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
            >
              <VideoSection
                isMobile={isMobile}
                isTablet={isTablet}
              />
            </motion.div>

            {/* Projects Section - Con animación de entrada */}
            <motion.div
              ref={projectsSectionRef}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
            >
              <ProjectsSection
                featuredProjects={featuredProjects}
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