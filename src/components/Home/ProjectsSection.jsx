import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import RedDistortionBackground from "../Background/RedDistortionBackground";

const ProjectsSection = ({ 
  featuredProjects, 
  isMobile, 
  isTablet, 
  onProjectClick 
}) => {
  const [deviceType, setDeviceType] = useState('desktop');

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
                // Solo habilitar hover effects en dispositivos que no sean táctiles
                deviceType === 'xs' || deviceType === 'sm' ? '' : 'hover:rotate-0 hover:scale-105'
              } hover:z-10 active:scale-95 ${
                // Mejoras táctiles para móviles
                deviceType === 'xs' || deviceType === 'sm' ? 'touch-manipulation' : ''
              }`}
              onClick={() => onProjectClick(project)}
              style={{
                // Mejora de rendimiento para animaciones
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="relative w-full h-full bg-black">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                  aria-label={`Video de ${project.client} - ${project.title}`}
                >
                  <source src={project.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

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
                
                {/* Borde sutil en hover - SIN BORDES REDONDOS */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 transition-all duration-300" />
                
                {/* Indicador de play para móviles */}
                {(deviceType === 'xs' || deviceType === 'sm') && (
                  <div className="absolute top-2 right-2 bg-black/60 p-1.5 opacity-0 group-active:opacity-100 transition-opacity duration-200">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
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