// pages/Home.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection, VideoSection, ProjectsSection, VideoModal } from "../components/Home";
import NoiseGradientBackground from "../components/Background/NoiseGradientBackground";
import CameraFrameUI from "../components/CinematicLoading";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [fullscreenVideo, setFullscreenVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const dynamicTexts = [
    "rectángulo",
    "Cine",
    "publicity",
    "music video",
    "comercial",
    "events"
  ];

  const featuredProjects = [
    {
      id: 1,
      client: "Nike",
      title: "Air Max Revolution",
      category: "Commercial",
      video: "/videos/DemoRectangulo2025.mp4",
      width: "col-span-2 lg:col-span-2",
      height: "row-span-1 lg:row-span-2",
      rotation: "rotate-1",
      mobileWidth: "col-span-2",
      tabletWidth: "col-span-2"
    },
    {
      id: 2,
      client: "National Geographic",
      title: "Urban Wilderness",
      category: "Documentary",
      video: "/videos/CamiloRegresa.mp4",
      width: "col-span-1 lg:col-span-1",
      height: "row-span-1",
      rotation: "-rotate-2",
      mobileWidth: "col-span-1",
      tabletWidth: "col-span-1"
    },
    {
      id: 3,
      client: "Coca-Cola",
      title: "Summer Festival",
      category: "Advertising",
      video: "/videos/DemoRectangulo2025.mp4",
      width: "col-span-1 lg:col-span-1",
      height: "row-span-1",
      rotation: "rotate-3",
      mobileWidth: "col-span-1",
      tabletWidth: "col-span-1"
    },
    {
      id: 4,
      client: "Bad Bunny",
      title: "Concert Tour",
      category: "Music Video",
      video: "/videos/MotionGraphics.mp4",
      width: "col-span-2 lg:col-span-2",
      height: "row-span-1",
      rotation: "-rotate-1",
      mobileWidth: "col-span-2",
      tabletWidth: "col-span-2"
    },
    {
      id: 5,
      client: "Microsoft",
      title: "Tech Summit",
      category: "Event",
      video: "/videos/DemoRectangulo2025.mp4",
      width: "col-span-1 lg:col-span-1",
      height: "row-span-1 lg:row-span-2",
      rotation: "rotate-2",
      mobileWidth: "col-span-1",
      tabletWidth: "col-span-1"
    },
    {
      id: 6,
      client: "Apple",
      title: "Product Launch",
      category: "Commercial",
      video: "/videos/CamiloRegresa.mp4",
      width: "col-span-1 lg:col-span-1",
      height: "row-span-1",
      rotation: "-rotate-3",
      mobileWidth: "col-span-1",
      tabletWidth: "col-span-1"
    },
  ];

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (fullscreenVideo) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [fullscreenVideo]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

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
    <div className="relative min-h-screen bg-black">
      {/* AnimatePresence para manejar las transiciones */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          // PANTALLA DE CARGA
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { 
                duration: 0.8, 
                ease: "easeInOut" 
              }
            }}
          >
            <CameraFrameUI onLoadingComplete={handleLoadingComplete} />
          </motion.div>
        ) : (
          // CONTENIDO PRINCIPAL
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { 
                duration: 0.5, 
                ease: "easeOut",
                delay: 0.3 // Pequeño delay después que el loading desaparece
              }
            }}
            className="relative min-h-screen"
          >
            {/* Fondo gradient */}
            <div className="absolute inset-0 z-0">
              <NoiseGradientBackground />
            </div>
            
            {/* Contenido de Home */}
            <div className="relative z-10 min-h-screen">
              <div className="h-screen overflow-y-scroll snap-y snap-mandatory hide-scrollbar">
                <HeroSection
                  dynamicTexts={dynamicTexts}
                  isMobile={isMobile}
                  isTablet={isTablet}
                  onButtonClick={handleButtonClick}
                />

                <VideoSection
                  isMobile={isMobile}
                  isTablet={isTablet}
                />

                <ProjectsSection
                  featuredProjects={featuredProjects}
                  isMobile={isMobile}
                  isTablet={isTablet}
                  onProjectClick={handleProjectClick}
                />

                <VideoModal
                  fullscreenVideo={fullscreenVideo}
                  onClose={closeFullscreen}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Home;