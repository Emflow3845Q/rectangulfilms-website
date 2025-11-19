import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  HeaderSection,
  DesktopProjects,
  MobileProjects,
  VideoPreview
} from "../components/Motion";

const MotionPage = () => {
  const { t } = useLanguage();
  const [activeProject, setActiveProject] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const projects = [
    {
      id: 1,
      client: t("motionProjects.billionsFashion.client"),
      title: t("motionProjects.billionsFashion.title"),
      category: t("motionProjects.billionsFashion.category"),
      thumbnail: "/motion/work1.webp",
      video: "/videos/DemoRectangulo2025.mp4",
    },
    {
      id: 2,
      client: t("motionProjects.hpFinance.client"),
      title: t("motionProjects.hpFinance.title"),
      category: t("motionProjects.hpFinance.category"),
      thumbnail: "/motion/work2.webp",
      video: "/videos/MotionGraphics.mp4",
    },
    {
      id: 3,
      client: t("motionProjects.ohLaLashes.client"),
      title: t("motionProjects.ohLaLashes.title"),
      category: t("motionProjects.ohLaLashes.category"),
      thumbnail: "/motion/work3.webp",
      video: "/videos/CamiloRegresa.mp4",
    },
    {
      id: 4,
      client: t("motionProjects.gnpEncore.client"),
      title: t("motionProjects.gnpEncore.title"),
      category: t("motionProjects.gnpEncore.category"),
      thumbnail: "/motion/work4.webp",
      video: "/videos/DemoRectangulo2025.mp4",
    },
    {
      id: 5,
      client: t("motionProjects.grupoAeropuertario.client"),
      title: t("motionProjects.grupoAeropuertario.title"),
      category: t("motionProjects.grupoAeropuertario.category"),
      thumbnail: "/motion/work5.webp",
      video: "/videos/MotionGraphics.mp4",
    },
    {
      id: 6,
      client: t("motionProjects.dac.client"),
      title: t("motionProjects.dac.title"),
      category: t("motionProjects.dac.category"),
      thumbnail: "/motion/wrok6.webp",
      video: "/videos/CamiloRegresa.mp4",
    },
    {
      id: 7,
      client: t("motionProjects.drCamilo.client"),
      title: t("motionProjects.drCamilo.title"),
      category: t("motionProjects.drCamilo.category"),
      thumbnail: "/motion/work7.webp",
      video: "/videos/DemoRectangulo2025.mp4",
    },
    {
      id: 8,
      client: t("motionProjects.mickFlores.client"),
      title: t("motionProjects.mickFlores.title"),
      category: t("motionProjects.mickFlores.category"),
      thumbnail: "/motion/work8.webp",
      video: "/videos/MotionGraphics.mp4",
    },
    {
      id: 9,
      client: t("motionProjects.casaIdea.client"),
      title: t("motionProjects.casaIdea.title"),
      category: t("motionProjects.casaIdea.category"),
      thumbnail: "/motion/work9.webp",
      video: "/videos/CamiloRegresa.mp4",
    },
    {
      id: 10,
      client: t("motionProjects.laPerla.client"),
      title: t("motionProjects.laPerla.title"),
      category: t("motionProjects.laPerla.category"),
      thumbnail: "/motion/work10.webp",
      video: "/videos/DemoRectangulo2025.mp4",
    },
    {
      id: 11,
      client: t("motionProjects.billionsTrade.client"),
      title: t("motionProjects.billionsTrade.title"),
      category: t("motionProjects.billionsTrade.category"),
      thumbnail: "/motion/work11.webp",
      video: "/videos/MotionGraphics.mp4",
    },
    {
      id: 12,
      client: t("motionProjects.ramsesSoriano.client"),
      title: t("motionProjects.ramsesSoriano.title"),
      category: t("motionProjects.ramsesSoriano.category"),
      thumbnail: "/motion/work12.webp",
      video: "/videos/CamiloRegresa.mp4",
    },
    {
      id: 13,
      client: t("motionProjects.elAfilador.client"),
      title: t("motionProjects.elAfilador.title"),
      category: t("motionProjects.elAfilador.category"),
      thumbnail: "/motion/work13.webp",
      video: "/videos/DemoRectangulo2025.mp4",
    },
  ];

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track mouse position solo en desktop
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Efecto para manejar la transición de foto a video
  useEffect(() => {
    if (activeProject) {
      setShowVideo(false);
      const timer = setTimeout(() => {
        setShowVideo(true);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setShowVideo(false);
    }
  }, [activeProject]);

  // Función para manejar hover en desktop
  const handleProjectHover = (project) => {
    setActiveProject(project);
  };

  // Función para manejar tap en móvil
  const handleProjectTap = (project) => {
    if (isMobile) {
      if (activeProject && activeProject.id === project.id) {
        setActiveProject(null);
      } else {
        setActiveProject(project);
      }
    }
  };

  // Función para cerrar video en móvil
  const handleCloseVideo = () => {
    setActiveProject(null);
  };

  return (
    <div className="min-h-screen bg-black-pure text-white-pure pt-20">
      <HeaderSection projects={projects} />

      {/* Versión Desktop */}
      <DesktopProjects 
        projects={projects}
        onProjectHover={handleProjectHover}
      />

      {/* Versión Mobile */}
      <MobileProjects
        projects={projects}
        activeProject={activeProject}
        onProjectTap={handleProjectTap}
        onCloseVideo={handleCloseVideo}
      />

      {/* Video Preview - Solo en Desktop */}
      {!isMobile && (
        <VideoPreview
          activeProject={activeProject}
          mousePosition={mousePosition}
          showVideo={showVideo}
        />
      )}
    </div>
  );
};

export default MotionPage;