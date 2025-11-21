import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
// Importar todas las imágenes de stills
import { stillImages as stills } from "../assets/images/stills";

const StillPage = () => {
  const { t } = useLanguage();
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [dragProgress, setDragProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Referencias para GSAP
  const projectRefs = useRef([]);
  const imageRefs = useRef([]);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Función para actualizar el parallax de las imágenes basado en el drag
  const updateImageParallax = () => {
    if (!carouselRef.current || isMobile) return;

    const carousel = carouselRef.current;
    const scrollLeft = -carousel.scrollLeft || 0;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;

    setDragProgress(progress);

    // Aplicar transformación a cada imagen
    imageRefs.current.forEach((imgRef, index) => {
      if (!imgRef) return;

      const element = imgRef;
      const elementRect = element.getBoundingClientRect();
      const containerRect = carousel.getBoundingClientRect();
      
      // Calcular posición relativa del elemento en el viewport
      const elementCenter = elementRect.left + elementRect.width / 2;
      const containerCenter = containerRect.left + containerRect.width / 2;
      const distanceFromCenter = elementCenter - containerCenter;
      
      // Calcular intensidad del efecto parallax (reducido en móvil)
      const parallaxIntensity = isMobile ? 0.1 : 0.3;
      const parallaxX = distanceFromCenter * parallaxIntensity;
      
      // Aplicar transformación
      gsap.to(element, {
        x: -parallaxX,
        duration: 0.1,
        ease: "power1.out"
      });
    });
  };

  // Efecto para actualizar parallax cuando se mueve el drag
  useEffect(() => {
    if (carouselRef.current && isHovering && !isMobile) {
      const carousel = carouselRef.current;
      const handleScroll = () => {
        updateImageParallax();
      };

      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [isHovering, isMobile]);

  // Función para resetear a estado inicial
  const resetToInitialState = (index) => {
    if (isMobile) return;
    
    const projectElement = projectRefs.current[index];
    if (!projectElement) return;

    const imgWrapper = projectElement.querySelector(".js-project-thumbnail-img-wrapper");
    const hoverImage = projectElement.querySelector(".js-project-thumbnail-image-hover");
    
    if (!imgWrapper) return;

    gsap.killTweensOf(imgWrapper);
    gsap.killTweensOf(hoverImage);

    gsap.set(imgWrapper, {
      "--first-top": "0%",
      "--second-top": "33.3333%",
      "--third-top": "66.6666%"
    });

    if (hoverImage) {
      gsap.set(hoverImage, {
        scale: 1.2
      });
    }
  };

  // Función de animación al hacer hover
  const handleProjectHover = (index) => {
    if (isMobile) return;

    const projectElement = projectRefs.current[index];
    if (!projectElement) return;

    const imgWrapper = projectElement.querySelector(".js-project-thumbnail-img-wrapper");
    const hoverImage = projectElement.querySelector(".js-project-thumbnail-image-hover");
    
    if (!imgWrapper) return;

    gsap.killTweensOf(imgWrapper);
    
    const timeline = gsap.timeline();
    
    timeline.fromTo(imgWrapper, {
      "--first-top": "0%",
      "--second-top": "33.3333%", 
      "--third-top": "66.6666%"
    }, {
      "--first-top": "33.3333%",
      "--second-top": "66.6666%",
      "--third-top": "100%",
      ease: "power3.out",
      duration: 1.5
    });

    if (hoverImage) {
      gsap.killTweensOf(hoverImage);
      gsap.set(hoverImage, { scale: 1.2 });
    }
  };

  // Inicializar event listeners
  const initializeHoverEffects = () => {
    if (isMobile) return;
    
    projectRefs.current.forEach((projectEl, index) => {
      if (projectEl) {
        projectEl.addEventListener("mouseleave", () => {
          resetToInitialState(index);
        });
        
        projectEl.addEventListener("mouseenter", () => {
          handleProjectHover(index);
        });
      }
    });
  };

  // Variantes de animación para el efecto cortina
  const curtainVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      y: -50
    },
    visible: {
      height: "100%",
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        opacity: { duration: 0.4 },
        height: { duration: 0.7 }
      }
    }
  };

  // Variantes para el contenido que aparece después
  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Variantes para el contenedor de cada tarjeta
  const cardVariants = {
    hidden: {
      opacity: 0
    },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  // Variantes para el cursor de drag
  const dragCursorVariants = {
    hidden: {
      scale: 0,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Manejar el movimiento del mouse
  const handleMouseMove = (e) => {
    if (carouselRef.current && !isMobile) {
      const rect = carouselRef.current.getBoundingClientRect();
      setCursorPosition({
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  // Deshabilitar el cursor personalizado cuando estamos sobre el carrusel
  useEffect(() => {
    if (isHovering && !isMobile) {
      const customCursor = document.querySelector('.fixed.pointer-events-none.z-\\[99999\\]');
      if (customCursor) {
        customCursor.style.display = 'none';
      }
      document.body.style.cursor = 'none';
    } else {
      const customCursor = document.querySelector('.fixed.pointer-events-none.z-\\[99999\\]');
      if (customCursor) {
        customCursor.style.display = 'block';
      }
      document.body.style.cursor = 'auto';
    }

    return () => {
      document.body.style.cursor = 'auto';
      const customCursor = document.querySelector('.fixed.pointer-events-none.z-\\[99999\\]');
      if (customCursor) {
        customCursor.style.display = 'block';
      }
    };
  }, [isHovering, isMobile]);

    const projects = [
    {
      id: 1,
      title: t("stillProjects.project1.title"),
      category: t("stillProjects.project1.category"),
      image: stills.still1,
    },
    {
      id: 2,
      title: t("stillProjects.project2.title"),
      category: t("stillProjects.project2.category"),
      image: stills.still2,
    },
    {
      id: 3,
      title: t("stillProjects.project3.title"),
      category: t("stillProjects.project3.category"),
      image: stills.still3,
    },
    {
      id: 4,
      title: t("stillProjects.project4.title"),
      category: t("stillProjects.project4.category"),
      image: stills.still4,
    },
    {
      id: 5,
      title: t("stillProjects.project5.title"),
      category: t("stillProjects.project5.category"),
      image: stills.still5,
    },
    {
      id: 6,
      title: t("stillProjects.project6.title"),
      category: t("stillProjects.project6.category"),
      image: stills.still6,
    },
    {
      id: 7,
      title: t("stillProjects.project7.title"),
      category: t("stillProjects.project7.category"),
      image: stills.still7,
    },
    {
      id: 8,
      title: t("stillProjects.project8.title"),
      category: t("stillProjects.project8.category"),
      image: stills.still8,
    },
    {
      id: 9,
      title: t("stillProjects.project9.title"),
      category: t("stillProjects.project9.category"),
      image: stills.still9,
    },
    {
      id: 10,
      title: t("stillProjects.project10.title"),
      category: t("stillProjects.project10.category"),
      image: stills.still10,
    },
    {
      id: 11,
      title: t("stillProjects.project11.title"),
      category: t("stillProjects.project11.category"),
      image: stills.still11,
    },
    {
      id: 12,
      title: t("stillProjects.project12.title"),
      category: t("stillProjects.project12.category"),
      image: stills.still12,
    },
    {
      id: 13,
      title: t("stillProjects.project13.title"),
      category: t("stillProjects.project13.category"),
      image: stills.still13,
    },
    {
      id: 14,
      title: t("stillProjects.project14.title"),
      category: t("stillProjects.project14.category"),
      image: stills.still14,
    },
    {
      id: 15,
      title: t("stillProjects.project15.title"),
      category: t("stillProjects.project15.category"),
      image: stills.still15,
    },
    {
      id: 16,
      title: t("stillProjects.project16.title"),
      category: t("stillProjects.project16.category"),
      image: stills.still16,
    },
    {
      id: 17,
      title: t("stillProjects.project17.title"),
      category: t("stillProjects.project17.category"),
      image: stills.still17,
    },
    {
      id: 18,
      title: t("stillProjects.project18.title"),
      category: t("stillProjects.project18.category"),
      image: stills.still18,
    },
    {
      id: 19,
      title: t("stillProjects.project19.title"),
      category: t("stillProjects.project19.category"),
      image: stills.still19,
    },
    {
      id: 20,
      title: t("stillProjects.project20.title"),
      category: t("stillProjects.project20.category"),
      image: stills.still20,
    },
    {
      id: 21,
      title: t("stillProjects.project21.title"),
      category: t("stillProjects.project21.category"),
      image: stills.still21,
    },
    {
      id: 22,
      title: t("stillProjects.project22.title"),
      category: t("stillProjects.project22.category"),
      image: stills.still22,
    },
    {
      id: 23,
      title: t("stillProjects.project23.title"),
      category: t("stillProjects.project23.category"),
      image: stills.still23,
    },
    {
      id: 24,
      title: t("stillProjects.project24.title"),
      category: t("stillProjects.project24.category"),
      image: stills.still24,
    },
    {
      id: 25,
      title: t("stillProjects.project25.title"),
      category: t("stillProjects.project25.category"),
      image: stills.still25,
    },
    {
      id: 26,
      title: t("stillProjects.project26.title"),
      category: t("stillProjects.project26.category"),
      image: stills.still26,
    },
    {
      id: 27,
      title: t("stillProjects.project27.title"),
      category: t("stillProjects.project27.category"),
      image: stills.still27,
    },
    {
      id: 28,
      title: t("stillProjects.project28.title"),
      category: t("stillProjects.project28.category"),
      image: stills.still28,
    },
    {
      id: 29,
      title: t("stillProjects.project29.title"),
      category: t("stillProjects.project29.category"),
      image: stills.still29,
    },
    {
      id: 30,
      title: t("stillProjects.project30.title"),
      category: t("stillProjects.project30.category"),
      image: stills.still30,
    },
    {
      id: 31,
      title: t("stillProjects.project31.title"),
      category: t("stillProjects.project31.category"),
      image: stills.still31,
    },
    {
      id: 32,
      title: t("stillProjects.project32.title"),
      category: t("stillProjects.project32.category"),
      image: stills.still32,
    },
    {
      id: 33,
      title: t("stillProjects.project33.title"),
      category: t("stillProjects.project33.category"),
      image: stills.still33,
    },
    {
      id: 34,
      title: t("stillProjects.project34.title"),
      category: t("stillProjects.project34.category"),
      image: stills.still34,
    },
    {
      id: 35,
      title: t("stillProjects.project35.title"),
      category: t("stillProjects.project35.category"),
      image: stills.still35,
    },
    {
      id: 36,
      title: t("stillProjects.project36.title"),
      category: t("stillProjects.project36.category"),
      image: stills.still36,
    },
    {
      id: 37,
      title: t("stillProjects.project37.title"),
      category: t("stillProjects.project37.category"),
      image: stills.still37,
    },
    {
      id: 38,
      title: t("stillProjects.project38.title"),
      category: t("stillProjects.project38.category"),
      image: stills.still38,
    },
    {
      id: 39,
      title: t("stillProjects.project39.title"),
      category: t("stillProjects.project39.category"),
      image: stills.still39,
    },
    {
      id: 40,
      title: t("stillProjects.project40.title"),
      category: t("stillProjects.project40.category"),
      image: stills.still40,
    },
    {
      id: 41,
      title: t("stillProjects.project41.title"),
      category: t("stillProjects.project41.category"),
      image: stills.still41,
    },
    {
      id: 42,
      title: t("stillProjects.project42.title"),
      category: t("stillProjects.project42.category"),
      image: stills.still42,
    },
    {
      id: 43,
      title: t("stillProjects.project43.title"),
      category: t("stillProjects.project43.category"),
      image: stills.still43,
    },
    {
      id: 44,
      title: t("stillProjects.project44.title"),
      category: t("stillProjects.project44.category"),
      image: stills.still44,
    },
    {
      id: 45,
      title: t("stillProjects.project45.title"),
      category: t("stillProjects.project45.category"),
      image: stills.still45,
    },
    {
      id: 46,
      title: t("stillProjects.project46.title"),
      category: t("stillProjects.project46.category"),
      image: stills.still46,
    },
    {
      id: 47,
      title: t("stillProjects.project47.title"),
      category: t("stillProjects.project47.category"),
      image: stills.still47,
    },
    {
      id: 48,
      title: t("stillProjects.project48.title"),
      category: t("stillProjects.project48.category"),
      image: stills.still48,
    },
    {
      id: 49,
      title: t("stillProjects.project49.title"),
      category: t("stillProjects.project49.category"),
      image: stills.still49,
    },
    {
      id: 50,
      title: t("stillProjects.project50.title"),
      category: t("stillProjects.project50.category"),
      image: stills.still50,
    },
    {
      id: 51,
      title: t("stillProjects.project51.title"),
      category: t("stillProjects.project51.category"),
      image: stills.still51,
    },
    {
      id: 52,
      title: t("stillProjects.project52.title"),
      category: t("stillProjects.project52.category"),
      image: stills.still52,
    },
    {
      id: 53,
      title: t("stillProjects.project53.title"),
      category: t("stillProjects.project53.category"),
      image: stills.still53,
    },
    {
      id: 54,
      title: t("stillProjects.project54.title"),
      category: t("stillProjects.project54.category"),
      image: stills.still54,
    },
    {
      id: 55,
      title: t("stillProjects.project55.title"),
      category: t("stillProjects.project55.category"),
      image: stills.still55,
    },
    {
      id: 56,
      title: t("stillProjects.project56.title"),
      category: t("stillProjects.project56.category"),
      image: stills.still56,
    },
    {
      id: 57,
      title: t("stillProjects.project57.title"),
      category: t("stillProjects.project57.category"),
      image: stills.still57,
    },
    {
      id: 58,
      title: t("stillProjects.project58.title"),
      category: t("stillProjects.project58.category"),
      image: stills.still58,
    },
    {
      id: 59,
      title: t("stillProjects.project59.title"),
      category: t("stillProjects.project59.category"),
      image: stills.still59,
    },
    {
      id: 60,
      title: t("stillProjects.project60.title"),
      category: t("stillProjects.project60.category"),
      image: stills.still60,
    },
    {
      id: 61,
      title: t("stillProjects.project61.title"),
      category: t("stillProjects.project61.category"),
      image: stills.still61,
    }
  ];

  // Medir ancho total para calcular drag constraints
  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      );
    }
  }, []);

  // Observer para detectar cuando la sección entra en vista
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Inicializar efectos hover cuando el componente está ready
  useEffect(() => {
    if (isInView && !isMobile) {
      setTimeout(() => {
        initializeHoverEffects();
      }, 100);
    }
  }, [isInView, isMobile]);

  // Manejar resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      if (!mobile) {
        initializeHoverEffects();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Tamaños responsive para las tarjetas
  const getCardWidth = () => {
    if (typeof window === 'undefined') return '24vw';
    
    const width = window.innerWidth;
    if (width < 640) return '85vw'; // Mobile
    if (width < 768) return '70vw'; // Tablet pequeña
    if (width < 1024) return '45vw'; // Tablet
    if (width < 1280) return '32vw'; // Laptop pequeña
    return '24vw'; // Desktop
  };

  return (
    <section className="w-full bg-black-pure text-white-pure py-10 md:py-20 overflow-hidden relative">

      {/* HEADER */}
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-10 px-4 sm:px-6 max-w-[1800px] mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans uppercase tracking-tight text-white-pure font-black mb-4 sm:mb-0">
          {t("still.title") || "Our Work"}
        </h2>

        <button className="text-xs uppercase tracking-[0.3em] border-b border-white-pure pb-1 text-white-pure hover:text-red-primary hover:border-red-primary transition-colors duration-300 font-gotham font-medium self-start sm:self-auto">
          ALL PROJECTS
        </button>
      </motion.div>

      {/* CARRUSEL */}
      <motion.div
        ref={carouselRef}
        className="pl-4 sm:pl-6 relative overflow-x-auto overflow-y-hidden"
        style={{ overflow: "hidden" }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        onMouseEnter={() => !isMobile && setIsHovering(true)}
        onMouseLeave={() => !isMobile && setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        {/* CURSOR PERSONALIZADO DRAG - Solo en desktop */}
        {!isMobile && (
          <motion.div
            className="fixed pointer-events-none z-[999999] flex items-center justify-center"
            style={{
              left: cursorPosition.x - 40,
              top: cursorPosition.y - 40,
            }}
            variants={dragCursorVariants}
            initial="hidden"
            animate={isHovering ? "visible" : "hidden"}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-white/80 backdrop-blur-md bg-red-primary/20 shadow-lg">
              <span className="text-white text-xs font-gotham font-bold uppercase tracking-wider drop-shadow-sm">
                DRAG
              </span>
            </div>
          </motion.div>
        )}

        <motion.div
          drag={!isMobile ? "x" : false}
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.1}
          className={`flex gap-3 sm:gap-4 ${!isMobile ? 'cursor-none' : 'cursor-grab'}`}
          onDrag={(event, info) => {
            !isMobile && updateImageParallax();
          }}
          onDragEnd={(event, info) => {
            !isMobile && updateImageParallax();
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              ref={el => projectRefs.current[index] = el}
              className="flex-shrink-0 group project-thumbnail"
              style={{
                minWidth: getCardWidth(),
                maxWidth: getCardWidth()
              }}
              custom={index}
              variants={cardVariants}
              whileTap={isMobile ? { scale: 0.98 } : {}}
            >
              {/* CONTENEDOR PRINCIPAL DE LA IMAGEN */}
              <div className="project-thumbnail__img relative overflow-hidden">
                
                {/* IMAGEN BASE - siempre visible */}
                <motion.div
                  className="w-full h-full absolute inset-0"
                  variants={curtainVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.05,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={contentVariants}
                    transition={{ delay: index * 0.05 + 0.3 }}
                    className="w-full h-full overflow-hidden absolute inset-0"
                  >
                    <img
                      ref={el => imageRefs.current[index] = el}
                      src={project.image}
                      alt={project.title}
                      className="img w-full h-full object-cover"
                      style={{ 
                        width: isMobile ? '100%' : '120%', 
                        transformOrigin: 'center center', 
                        willChange: 'transform' 
                      }}
                      draggable="false"
                      loading="lazy"
                    />
                  </motion.div>
                </motion.div>

                {/* WRAPPER CON CLIP-PATH PARA EL EFECTO HOVER - Solo en desktop */}
                {!isMobile && (
                  <div 
                    className="project-thumbnail__img-wrapper js-project-thumbnail-img-wrapper absolute inset-0 overflow-hidden"
                    style={{
                      "--first-top": "0%",
                      "--second-top": "33.3333%", 
                      "--third-top": "66.6666%",
                      "--first-bottom": "33.3333%",
                      "--second-bottom": "66.6666%", 
                      "--third-bottom": "100%"
                    }}
                  >
                    <img
                      ref={el => imageRefs.current[index + 100] = el}
                      src={project.image}
                      alt={project.title}
                      className="img project-thumbnail__img-hover js-project-thumbnail-image-hover w-full h-full object-cover"
                      style={{ 
                        transform: 'scale(1.2)',
                        transformOrigin: 'center center',
                        width: '120%',
                        willChange: 'transform'
                      }}
                      draggable="false"
                      loading="lazy"
                    />
                  </div>
                )}

              </div>

              {/* TEXTO que aparece después */}
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={contentVariants}
                transition={{ delay: index * 0.05 + 0.4 }}
                className="mt-3 sm:mt-4"
              >
                <h3 className="text-base sm:text-lg font-gotham font-medium text-white-pure line-clamp-2">
                  {project.title}
                </h3>

                <p className="text-xs uppercase tracking-[0.2em] text-red-primary font-gotham font-light mt-1">
                  {project.category}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* INDICADOR DE SCROLL PARA MÓVIL */}
      {isMobile && (
        <div className="flex justify-center mt-6 px-4">
          <div className="bg-white/20 rounded-full px-4 py-2">
            <span className="text-white text-xs font-gotham font-medium uppercase tracking-wider">
              Desliza para ver más →
            </span>
          </div>
        </div>
      )}

      {/* ESTILOS CSS PARA EL EFECTO */}
      <style jsx>{`
        .project-thumbnail {
          display: inline-block;
          width: 100%;
        }

        .project-thumbnail__img {
          position: relative;
          overflow: hidden;
          z-index: 1;
          aspect-ratio: 0.76;
        }

        .project-thumbnail__img-wrapper {
          --first-top: 0%;
          --first-bottom: 33.3333%;
          --second-top: 33.3333%;
          --second-bottom: 66.6666%;
          --third-top: 66.6666%;
          --third-bottom: 100%;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          clip-path: polygon(
            0% var(--first-top), 100% var(--first-top), 
            100% var(--first-bottom), 0% var(--first-bottom),
            0% var(--second-top), 100% var(--second-top), 
            100% var(--second-bottom), 0% var(--second-bottom),
            0% var(--third-top), 100% var(--third-top), 
            100% var(--third-bottom), 0% var(--third-bottom)
          );
          pointer-events: none;
        }

        .img {
          height: 100%;
          object-fit: cover;
          position: absolute;
        }

        /* La imagen principal es visible por defecto */
        .project-thumbnail__img > div:first-child {
          position: relative;
          z-index: 1;
        }

        /* El wrapper con clip-path se superpone */
        .project-thumbnail__img-wrapper {
          z-index: 2;
        }

        /* Utilidades para texto */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Scrollbar personalizada para móvil */
        @media (max-width: 768px) {
          .project-thumbnail__img {
            border-radius: 8px;
          }
        }
      `}</style>

    </section>
  );
};

export default StillPage;