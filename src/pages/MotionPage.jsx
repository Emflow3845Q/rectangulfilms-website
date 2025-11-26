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
      client: "Billions",
      title: "Anillo de fundador Billions",
      category: "Product",
      thumbnail: "/motion/anillo-fundador.webp",
      video: "/videos/AnilloFundadorBillions.mp4",
    },
    {
      id: 2,
      client: "Billions",
      title: "Billions - Ropa",
      category: "Fashion",
      thumbnail: "/motion/billions-ropa.webp",
      video: "/videos/BillionsRopaMovAt.mp4",
    },
    {
      id: 3,
      client: "Bomberos Guadalajara",
      title: "Bomberos Guadalajara",
      category: "Documental",
      thumbnail: "/motion/bomberos-guadalajara.webp",
      video: "/videos/BomberosGuadalajara.mp4",
    },
    {
      id: 4,
      client: "Oh la lashes",
      title: "Camilo Regresa Oh la lashes",
      category: "Comercial",
      thumbnail: "/motion/camilo-regresa.webp",
      video: "/videos/CamiloRegresaOhLaLashes.mp4",
    },
    {
      id: 5,
      client: "Sesión Acústica",
      title: "Caminando Solo",
      category: "Music video",
      thumbnail: "/motion/caminando-solo.webp",
      video: "/videos/CaminandoSoloSesionAcustica.mp4",
    },
    {
      id: 6,
      client: "CasaIdeas",
      title: "CasaIdeas",
      category: "Comercial",
      thumbnail: "/motion/casa-ideas.webp",
      video: "/videos/CasaIdeas.mp4",
    },
    {
      id: 7,
      client: "DAC",
      title: "Derma Aesthetics Congress",
      category: "Comercial",
      thumbnail: "/motion/dac.webp",
      video: "/videos/DACDermaAestheticsCongress.mp4",
    },
    {
      id: 8,
      client: "DAC",
      title: "DAC 2025",
      category: "Event",
      thumbnail: "/motion/dac-2025.webp",
      video: "/videos/DAC2025Rocap.mp4",
    },
    {
      id: 9,
      client: "Rectángulo",
      title: "Demo Reel Rectángulo 2025",
      category: "Corporate",
      thumbnail: "/motion/domo-reel.webp",
      video: "/videos/DomoReelRectangulo2025.mp4",
    },
    {
      id: 10,
      client: "DAC",
      title: "Derma Aesthetics 2024",
      category: "Event",
      thumbnail: "/motion/derma-2024.webp",
      video: "/videos/DermaAesthetics2024.mp4",
    },
    {
      id: 11,
      client: "Sesión Acústica",
      title: "Dolor",
      category: "Music video",
      thumbnail: "/motion/dolor.webp",
      video: "/videos/DolorSesionAcustica.mp4",
    },
    {
      id: 12,
      client: "Don Ricardo",
      title: "El afilador",
      category: "Documental",
      thumbnail: "/motion/don-ricardo.webp",
      video: "/videos/DonRicardoElAfilador.mp4",
    },
    {
      id: 13,
      client: "GNP",
      title: "Evento GNP Encore",
      category: "Event",
      thumbnail: "/motion/gnp-encore.webp",
      video: "/videos/EventoGNPEncore.mp4",
    },
    {
      id: 14,
      client: "Sesión Acústica",
      title: "Fiel",
      category: "Music video",
      thumbnail: "/motion/fiel.webp",
      video: "/videos/FielSesionAcustica.mp4",
    },
    {
      id: 15,
      client: "Práctica Médica",
      title: "Fosa Temporal",
      category: "Education",
      thumbnail: "/motion/fosa-temporal.webp",
      video: "/videos/FosaTemporalBSPractica.mp4",
    },
    {
      id: 16,
      client: "Grupo Aeroportuario",
      title: "Grupo Aeroportuario",
      category: "Event",
      thumbnail: "/motion/grupo-aeropuertario.webp",
      video: "/videos/GrupoAeropuertario.mp4",
    },
    {
      id: 17,
      client: "HP",
      title: "HP Finance Day",
      category: "Comercial",
      thumbnail: "/motion/hp-finance.webp",
      video: "/videos/HPFinanceDayFinal2025.mp4",
    },
    {
      id: 18,
      client: "La Perla",
      title: "La Perla",
      category: "Comercial",
      thumbnail: "/motion/la-perla.webp",
      video: "/videos/LaPerla.mp4",
    },
    {
      id: 19,
      client: "Sesión Acústica",
      title: "Mi mejor Canción",
      category: "Music video",
      thumbnail: "/motion/mi-mejor-cancion.webp",
      video: "/videos/MiMejorCancionSesionAcustica.mp4",
    },
    {
      id: 20,
      client: "Symetria Academy",
      title: "Motion Graphics",
      category: "Motion Graphics",
      thumbnail: "/motion/motion-graphics.webp",
      video: "/videos/MotionGraphicsSymetriAcademy.mp4",
    },
    {
      id: 21,
      client: "Oh la lashes",
      title: "Oh la lashes - Tarjetas",
      category: "Product comercial",
      thumbnail: "/motion/oh-la-lashes-tarjetas.webp",
      video: "/videos/OhLaLashesTarjetas.mp4",
    },
    {
      id: 22,
      client: "Foro Off Screen",
      title: "Promocional Foro Off Screen",
      category: "Comercial",
      thumbnail: "/motion/promocional-foro.webp",
      video: "/videos/PromocionalForoOffScreen.mp4",
    },
    {
      id: 23,
      client: "IBTM",
      title: "RECAP CDMX IBTM",
      category: "Event",
      thumbnail: "/motion/recap-cdmx.webp",
      video: "/videos/RECAPCDMXIBTMENCORE.mp4",
    },
    {
      id: 24,
      client: "AMCO",
      title: "Recap AMCO",
      category: "Event",
      thumbnail: "/motion/recap-amco.webp",
      video: "/videos/RecapEncoreAMCOJov.mp4",
    },
    {
      id: 25,
      client: "Recrea",
      title: "Recrea Event",
      category: "Event",
      thumbnail: "/motion/rocroa-steam.webp",
      video: "/videos/RocroaSTEAM2024.mp4",
    },
    {
      id: 26,
      client: "Rolex",
      title: "Rolex",
      category: "Product comercial",
      thumbnail: "/motion/rolex-producto.webp",
      video: "/videos/RolexProducto.mp4",
    },
    {
      id: 27,
      client: "Rosk",
      title: "Rosk",
      category: "Comercial",
      thumbnail: "/motion/rosk.webp",
      video: "/videos/Rosk.mp4",
    },
    {
      id: 28,
      client: "Rossana & Camilo",
      title: "Rossana & Camilo",
      category: "Comercial",
      thumbnail: "/motion/rossana-camilo.webp",
      video: "/videos/RossanaXCamilo.mp4",
    },
    {
      id: 29,
      client: "Fernanda",
      title: "Showreel - Fernanda",
      category: "Showreel",
      thumbnail: "/motion/showreel-fernanda.webp",
      video: "/videos/ShowreelFernandaT.mp4",
    },
    {
      id: 30,
      client: "Sesión Acústica",
      title: "Solo tu amor",
      category: "Music video",
      thumbnail: "/motion/solo-tu-amor-acustica.webp",
      video: "/videos/SoloTuAmorSesionAcustica.mp4",
    },
    {
      id: 31,
      client: "Sesión Acústica",
      title: "Solo un rato",
      category: "Music video",
      thumbnail: "/motion/solo-un-rato.webp",
      video: "/videos/SoloUnRato.mp4",
    },
    {
      id: 32,
      client: "Guerza",
      title: "Frente al mar",
      category: "Music video",
      thumbnail: "/motion/guerra-frente-mar.webp",
      video: "/videos/GuerraFrenteAlMar.mp4",
    }
  ];

  // Resto del código permanece igual...
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

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

  const handleProjectHover = (project) => {
    setActiveProject(project);
  };

  const handleProjectTap = (project) => {
    if (isMobile) {
      if (activeProject && activeProject.id === project.id) {
        setActiveProject(null);
      } else {
        setActiveProject(project);
      }
    }
  };

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