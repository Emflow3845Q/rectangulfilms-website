import React, { useEffect } from "react";
import { gsap } from "gsap";
import NoiseGradientBackground from "../Background/NoiseGradientBackground";

const ProjectsSection = ({ 
  featuredProjects, 
  isMobile, 
  isTablet, 
  onProjectClick 
}) => {

  // Animation for responsive projects
  useEffect(() => {
    const staggerAmount = isMobile ? 0.07 : isTablet ? 0.09 : 0.12;
    const delayAmount = isMobile ? 0.3 : isTablet ? 0.4 : 0.6;

    gsap.fromTo(".project-card",
      {
        opacity: 0,
        y: isMobile ? 20 : isTablet ? 35 : 50,
        scale: 0.9,
        rotation: isMobile ? 0 : isTablet ? -3 : -5
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: isMobile ? 0.7 : isTablet ? 0.9 : 1.1,
        stagger: staggerAmount,
        ease: "power2.out",
        delay: delayAmount
      }
    );
  }, [isMobile, isTablet]);

  // Function to get responsive project class
  const getProjectClass = (project) => {
    if (isMobile) return project.mobileWidth;
    if (isTablet) return project.tabletWidth || project.width;
    return project.width;
  };

  // Function to get responsive rotation
  const getRotationClass = (project) => {
    if (isMobile) return '';
    
    if (isTablet) {
      // Para tablet, reducir la rotación a la mitad
      const rotationValue = project.rotation.replace('rotate-', '');
      const isNegative = rotationValue.startsWith('-');
      const numericValue = Math.abs(parseInt(rotationValue));
      const reducedValue = numericValue / 2;
      return isNegative ? `-rotate-${reducedValue}` : `rotate-${reducedValue}`;
    }
    
    // Para desktop, rotación completa
    return project.rotation;
  };

  return (
    <section className="h-screen snap-start relative bg-black flex items-center justify-center overflow-hidden">
      {/* Background component */}
      <NoiseGradientBackground />
      
      {/* Projects content */}
      <div className="w-full h-full px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-3 xs:py-4 sm:py-5 md:py-6 lg:py-8 relative z-10">
        <div className={`grid ${
          isMobile 
            ? 'grid-cols-2 grid-rows-4 gap-1.5 xs:gap-2'  // 2x4 = 8 espacios
            : isTablet
            ? 'grid-cols-3 grid-rows-3 gap-2 sm:gap-3'    // 3x3 = 9 espacios
            : 'grid-cols-4 grid-rows-3 gap-3 lg:gap-4'    // 4x3 = 12 espacios
        } w-full h-full`}>
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className={`project-card group cursor-pointer bg-black rounded-none overflow-hidden relative ${
                getProjectClass(project)
              } ${project.height} ${getRotationClass(project)} transition-all duration-500 ${
                isMobile ? '' : 'hover:rotate-0 hover:scale-105'
              } hover:z-10`}
              onClick={() => onProjectClick(project)}
            >
              <div className="relative w-full h-full bg-black">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={project.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Responsive project information */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80">
                  <div className="absolute bottom-0 left-0 right-0 p-1.5 xs:p-2 sm:p-2.5 md:p-3 lg:p-4">
                    <h3 className="text-white font-accent font-bold text-xs xs:text-xs sm:text-sm uppercase mb-0.5 xs:mb-1 truncate">
                      {project.client}
                    </h3>
                    <p className="text-white/95 font-gotham font-medium text-xs xs:text-xs leading-tight line-clamp-2">
                      {project.title}
                    </p>
                    <div className={`${
                      isMobile ? 'w-3 xs:w-4 h-0.5 mt-0.5' : 
                      'w-4 xs:w-5 sm:w-6 lg:w-8 h-0.5 mt-1 lg:mt-2'
                    } bg-red-600`} />
                  </div>
                </div>

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;