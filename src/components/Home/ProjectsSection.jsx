import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import RedDistortionBackground from "../Background/RedDistortionBackground";

const ProjectsSection = ({ 
  isMobile, 
  isTablet, 
  onProjectClick 
}) => {
  // Array de proyectos integrado directamente en el componente
  const featuredProjects = [
    // COLUMNA 1
    {
      id: 1,
      client: "Oh la lashes",
      title: "Camilo Regresa Oh la lashes",
      category: "Beauty / Commercial",
      video: "/videos/camilo-regresa.mp4",
      thumbnail: "/thumbnails/Portada GIF Camilo Regresa.jpg",
      hoverVideo: "/gifs/GIF_Camilo Regresa.gif", // GIF real
      isGif: true, // Indicar que es un GIF
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
      thumbnail: "/thumbnails/Portada Gif_GNP Encore.jpg",
      hoverVideo: "/gifs/Gif_DAC Recap 2025 Vertical.gif",
      isGif: true,
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
      thumbnail: "/thumbnails/Portada Gif_Dac 2025 Recap Vertical.jpg",
      hoverVideo: "/gifs/dac-congress-preview.gif",
      isGif: true,
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
      thumbnail: "/thumbnails/Portada GIF Guerza.jpg",
      hoverVideo: "/gifs/GIF_Guerza.gif",
      isGif: true,
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
      thumbnail: "/thumbnails/Portada Gif_Don Ricardo Afilador.jpg",
      hoverVideo: "/gifs/Gif_Don Ricardo Afilador.gif",
      isGif: true,
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
      thumbnail: "/thumbnails/recrea-steam.jpg",
      hoverVideo: "/gifs/recrea-preview.gif",
      isGif: true,
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
      thumbnail: "/thumbnails/Portada Gif_Bomberos.jpg",
      hoverVideo: "/gifs/GIF_bomberos.gif",
      isGif: true,
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
      thumbnail: "/thumbnails/foro-off-screen.jpg",
      hoverVideo: "/gifs/foro-preview.gif",
      isGif: true,
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
      thumbnail: "/thumbnails/Portada Gif_Rosk.jpg",
      hoverVideo: "/gifs/Gif_Rosk Donas.gif",
      isGif: true,
      width: "col-span-1 lg:col-span-1",
      height: "row-span-1 lg:row-span-1", 
      rotation: "rotate-1",
      mobileWidth: "col-span-1",
      tabletWidth: "col-span-1"
    }
  ];

  const [deviceType, setDeviceType] = useState('desktop');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [loadedGifs, setLoadedGifs] = useState({});
  const videoRefs = useRef({});

  // Detectar tipo de dispositivo más preciso
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      if (width < 480) return 'xs';
      if (width < 640) return 'sm';
      if (width < 768) return 'md';
      if (width < 1024) return 'lg';
      if (width < 1280) return 'xl';
      return '2xl';
    };

    setDeviceType(checkDeviceType());
    
    const handleResize = () => {
      setDeviceType(checkDeviceType());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Precargar GIFs
  useEffect(() => {
    featuredProjects.forEach(project => {
      if (project.hoverVideo && project.isGif) {
        const img = new Image();
        img.src = project.hoverVideo;
        img.onload = () => {
          setLoadedGifs(prev => ({
            ...prev,
            [project.id]: true
          }));
        };
      }
    });
  }, []);

  // Controlar la reproducción del video en hover (para videos MP4)
  useEffect(() => {
    if (hoveredProject) {
      const project = featuredProjects.find(p => p.id === hoveredProject);
      
      // Si es un video MP4 (no GIF), reproducirlo
      if (project && !project.isGif && videoRefs.current[hoveredProject]) {
        const video = videoRefs.current[hoveredProject];
        video.currentTime = 0;
        video.play().catch(error => {
          console.log("Error al reproducir video en hover:", error);
        });
      }
    }
  }, [hoveredProject]);

  // Pausar todos los videos cuando no hay hover
  useEffect(() => {
    if (!hoveredProject) {
      Object.values(videoRefs.current).forEach(video => {
        if (video && video.pause) {
          video.pause();
          video.currentTime = 0;
        }
      });
    }
  }, [hoveredProject]);

  // Resto del código permanece igual...
  // Animation for responsive projects
  useEffect(() => {
    const getAnimationConfig = () => {
      switch (deviceType) {
        case 'xs':
          return { stagger: 0.05, delay: 0.2, duration: 0.6, y: 15, scale: 0.95 };
        case 'sm':
          return { stagger: 0.06, delay: 0.25, duration: 0.7, y: 18, scale: 0.94 };
        case 'md':
          return { stagger: 0.08, delay: 0.3, duration: 0.8, y: 25, scale: 0.93 };
        case 'lg':
          return { stagger: 0.1, delay: 0.4, duration: 0.9, y: 35, scale: 0.92 };
        case 'xl':
          return { stagger: 0.12, delay: 0.5, duration: 1.0, y: 45, scale: 0.91 };
        default:
          return { stagger: 0.15, delay: 0.6, duration: 1.1, y: 50, scale: 0.9 };
      }
    };

    const config = getAnimationConfig();

    gsap.fromTo(".project-card",
      {
        opacity: 0,
        y: config.y,
        scale: config.scale,
        rotation: deviceType === 'xs' ? 0 : deviceType === 'sm' ? -1 : deviceType === 'md' ? -2 : -3
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: config.duration,
        stagger: config.stagger,
        ease: "power2.out",
        delay: config.delay
      }
    );
  }, [deviceType]);

  // Function to get responsive project class
  const getProjectClass = (project) => {
    // Priorizar configuraciones específicas por dispositivo
    if (deviceType === 'xs' && project.xsWidth) return project.xsWidth;
    if (deviceType === 'sm' && project.smWidth) return project.smWidth;
    if (deviceType === 'md' && project.mdWidth) return project.mdWidth;
    if (deviceType === 'lg' && project.lgWidth) return project.lgWidth;
    
    // Fallback a las configuraciones originales
    if (isMobile) return project.mobileWidth;
    if (isTablet) return project.tabletWidth || project.width;
    return project.width;
  };

  // Function to get responsive rotation
  const getRotationClass = (project) => {
    if (deviceType === 'xs' || deviceType === 'sm') return '';
    
    if (deviceType === 'md') {
      // Para tablet pequeña, reducir rotación a 25%
      const rotationValue = project.rotation?.replace('rotate-', '');
      if (!rotationValue) return '';
      const isNegative = rotationValue.startsWith('-');
      const numericValue = Math.abs(parseInt(rotationValue));
      const reducedValue = Math.round(numericValue * 0.25);
      return reducedValue > 0 ? (isNegative ? `-rotate-${reducedValue}` : `rotate-${reducedValue}`) : '';
    }
    
    if (deviceType === 'lg') {
      // Para tablet, reducir rotación a 50%
      const rotationValue = project.rotation?.replace('rotate-', '');
      if (!rotationValue) return '';
      const isNegative = rotationValue.startsWith('-');
      const numericValue = Math.abs(parseInt(rotationValue));
      const reducedValue = Math.round(numericValue * 0.5);
      return reducedValue > 0 ? (isNegative ? `-rotate-${reducedValue}` : `rotate-${reducedValue}`) : '';
    }
    
    // Para desktop, rotación completa
    return project.rotation || '';
  };

  // Get grid configuration
  const getGridConfig = () => {
    switch (deviceType) {
      case 'xs':
        return {
          grid: 'grid-cols-2 grid-rows-4',
          gap: 'gap-1.5',
          padding: 'px-2 py-3'
        };
      case 'sm':
        return {
          grid: 'grid-cols-2 grid-rows-4',
          gap: 'gap-2',
          padding: 'px-3 py-4'
        };
      case 'md':
        return {
          grid: 'grid-cols-3 grid-rows-3',
          gap: 'gap-2.5',
          padding: 'px-4 py-5'
        };
      case 'lg':
        return {
          grid: 'grid-cols-3 grid-rows-3',
          gap: 'gap-3',
          padding: 'px-5 py-6'
        };
      case 'xl':
        return {
          grid: 'grid-cols-4 grid-rows-3',
          gap: 'gap-3.5',
          padding: 'px-6 py-7'
        };
      default: // 2xl
        return {
          grid: 'grid-cols-4 grid-rows-3',
          gap: 'gap-4',
          padding: 'px-8 py-8'
        };
    }
  };

  // Get text sizes based on device
  const getTextSizes = () => {
    switch (deviceType) {
      case 'xs':
        return {
          client: 'text-xs',
          title: 'text-xs',
          line: 'w-3 h-0.5 mt-0.5'
        };
      case 'sm':
        return {
          client: 'text-xs',
          title: 'text-xs',
          line: 'w-4 h-0.5 mt-0.5'
        };
      case 'md':
        return {
          client: 'text-sm',
          title: 'text-xs',
          line: 'w-4 h-0.5 mt-1'
        };
      case 'lg':
        return {
          client: 'text-sm',
          title: 'text-sm',
          line: 'w-5 h-0.5 mt-1'
        };
      case 'xl':
        return {
          client: 'text-base',
          title: 'text-sm',
          line: 'w-6 h-0.5 mt-1.5'
        };
      default:
        return {
          client: 'text-lg',
          title: 'text-base',
          line: 'w-8 h-0.5 mt-2'
        };
    }
  };

  const handleMouseEnter = (projectId) => {
    if (deviceType !== 'xs' && deviceType !== 'sm') {
      setHoveredProject(projectId);
    }
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
  };

  const handleProjectClick = (project) => {
    // Pausar el video de hover antes de abrir el modal (si es video)
    if (videoRefs.current[project.id]) {
      videoRefs.current[project.id].pause();
      videoRefs.current[project.id].currentTime = 0;
    }
    setHoveredProject(null);
    onProjectClick(project);
  };

  const gridConfig = getGridConfig();
  const textSizes = getTextSizes();

  return (
    <section className="h-screen snap-start relative bg-black flex items-center justify-center overflow-hidden">
      {/* Background component */}
      <RedDistortionBackground />
      
      {/* Projects content */}
      <div className={`w-full h-full relative z-10 ${gridConfig.padding}`}>
        <div className={`grid ${gridConfig.grid} ${gridConfig.gap} w-full h-full`}>
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className={`project-card group cursor-pointer bg-black overflow-hidden relative ${
                getProjectClass(project)
              } ${project.height} ${getRotationClass(project)} transition-all duration-500 ${
                deviceType === 'xs' || deviceType === 'sm' ? '' : 'hover:rotate-0 hover:scale-105'
              } hover:z-10 active:scale-95 ${
                deviceType === 'xs' || deviceType === 'sm' ? 'touch-manipulation' : ''
              }`}
              onMouseEnter={() => handleMouseEnter(project.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleProjectClick(project)}
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="relative w-full h-full bg-black">
                {/* Portada estática (siempre visible) */}
                <img
                  src={project.thumbnail}
                  alt={`Portada de ${project.title}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    hoveredProject === project.id ? 'opacity-0' : 'opacity-100'
                  }`}
                />

                {/* Contenido en hover (solo en desktop/tablet) */}
                {(deviceType !== 'xs' && deviceType !== 'sm') && (
                  <>
                    {/* Si es GIF, mostrar imagen GIF */}
                    {project.isGif && loadedGifs[project.id] && (
                      <img
                        src={project.hoverVideo}
                        alt={`Preview de ${project.title}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                          hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    )}
                    
                    {/* Si es video MP4, mostrar elemento video */}
                    {!project.isGif && (
                      <video
                        ref={el => videoRefs.current[project.id] = el}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                          hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <source src={project.hoverVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </>
                )}

                {/* Para móviles, mostrar solo la portada */}
                {(deviceType === 'xs' || deviceType === 'sm') && (
                  <img
                    src={project.thumbnail}
                    alt={`Portada de ${project.title}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                {/* Overlay con gradiente responsive */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/70 sm:via-black/20 sm:to-black/80">
                  {/* Información del proyecto */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4">
                    <h3 className={`text-white font-gotham font-bold uppercase mb-1 truncate ${textSizes.client}`}>
                      {project.client}
                    </h3>
                    <p className={`text-white/95 font-gotham font-medium leading-tight line-clamp-2 ${textSizes.title}`}>
                      {project.title}
                    </p>
                    <div className={`${textSizes.line} bg-red-600 transition-all duration-300 group-hover:w-full group-hover:bg-red-500`} />
                  </div>
                </div>

                {/* Overlay de hover mejorado */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                
                {/* Borde sutil en hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 transition-all duration-300" />
                
                {/* Indicador de play para móviles */}
                {(deviceType === 'xs' || deviceType === 'sm') && (
                  <div className="absolute top-2 right-2 bg-black/60 p-1.5 opacity-0 group-active:opacity-100 transition-opacity duration-200">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                )}

                {/* Indicador de hover para desktop */}
                {(deviceType !== 'xs' && deviceType !== 'sm') && (
                  <div className="absolute top-3 right-3 bg-black/60 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estilos CSS para mejoras de rendimiento */}
      <style jsx>{`
        /* Mejoras de rendimiento para móviles */
        @media (max-width: 768px) {
          .project-card {
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
          }
        }

        /* Prevenir flash de contenido no estilizado */
        .project-card {
          opacity: 0;
        }

        /* Mejoras de accesibilidad */
        @media (prefers-reduced-motion: reduce) {
          .project-card {
            transition: none !important;
          }
          
          .group-hover .project-card {
            transform: none !important;
          }
        }

        /* Mejoras para tablets en landscape */
        @media (max-width: 1024px) and (orientation: landscape) {
          .grid {
            grid-template-rows: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;