import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { CustomEase, ScrollTrigger } from "gsap/all";
// Importar todas las imágenes de photography
import { photographyImages as photography } from "../../assets/images/photography";

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger, CustomEase);

const BtsGallery = () => {
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Estados para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Nuevo estado para controlar el doble clic
  const [clickTimers, setClickTimers] = useState({});

  // Referencias para GSAP
  const projectRefs = useRef([]);
  const imageRefs = useRef([]);
  const thumbnailRefs = useRef([]);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // Resetear estados cuando cambia a móvil
      if (mobile) {
        setIsHovering(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Array de imágenes de photography (1-82)
  const btsImages = [
    { id: 1, image: photography.photography1, alt: "Photography production 1" },
    { id: 2, image: photography.photography2, alt: "Photography production 2" },
    { id: 3, image: photography.photography3, alt: "Photography production 3" },
    { id: 4, image: photography.photography4, alt: "Photography production 4" },
    { id: 5, image: photography.photography5, alt: "Photography production 5" },
    { id: 6, image: photography.photography6, alt: "Photography production 6" },
    { id: 7, image: photography.photography7, alt: "Photography production 7" },
    { id: 8, image: photography.photography8, alt: "Photography production 8" },
    { id: 9, image: photography.photography9, alt: "Photography production 9" },
    { id: 10, image: photography.photography10, alt: "Photography production 10" },
    { id: 11, image: photography.photography11, alt: "Photography production 11" },
    { id: 12, image: photography.photography12, alt: "Photography production 12" },
    { id: 13, image: photography.photography13, alt: "Photography production 13" },
    { id: 14, image: photography.photography14, alt: "Photography production 14" },
    { id: 15, image: photography.photography15, alt: "Photography production 15" },
    { id: 16, image: photography.photography16, alt: "Photography production 16" },
    { id: 17, image: photography.photography17, alt: "Photography production 17" },
    { id: 18, image: photography.photography18, alt: "Photography production 18" },
    { id: 19, image: photography.photography19, alt: "Photography production 19" },
    { id: 20, image: photography.photography20, alt: "Photography production 20" },
    { id: 21, image: photography.photography21, alt: "Photography production 21" },
    { id: 22, image: photography.photography22, alt: "Photography production 22" },
    { id: 23, image: photography.photography23, alt: "Photography production 23" },
    { id: 24, image: photography.photography24, alt: "Photography production 24" },
    { id: 25, image: photography.photography25, alt: "Photography production 25" },
    { id: 26, image: photography.photography26, alt: "Photography production 26" },
    { id: 27, image: photography.photography27, alt: "Photography production 27" },
    { id: 28, image: photography.photography28, alt: "Photography production 28" },
    { id: 29, image: photography.photography29, alt: "Photography production 29" },
    { id: 30, image: photography.photography30, alt: "Photography production 30" },
    { id: 31, image: photography.photography31, alt: "Photography production 31" },
    { id: 32, image: photography.photography32, alt: "Photography production 32" },
    { id: 33, image: photography.photography33, alt: "Photography production 33" },
    { id: 34, image: photography.photography34, alt: "Photography production 34" },
    { id: 35, image: photography.photography35, alt: "Photography production 35" },
    { id: 36, image: photography.photography36, alt: "Photography production 36" },
    { id: 37, image: photography.photography37, alt: "Photography production 37" },
    { id: 38, image: photography.photography38, alt: "Photography production 38" },
    { id: 39, image: photography.photography39, alt: "Photography production 39" },
    { id: 40, image: photography.photography40, alt: "Photography production 40" },
    { id: 41, image: photography.photography41, alt: "Photography production 41" },
    { id: 42, image: photography.photography42, alt: "Photography production 42" },
    { id: 43, image: photography.photography43, alt: "Photography production 43" },
    { id: 44, image: photography.photography44, alt: "Photography production 44" },
    { id: 45, image: photography.photography45, alt: "Photography production 45" },
    { id: 46, image: photography.photography46, alt: "Photography production 46" },
    { id: 47, image: photography.photography47, alt: "Photography production 47" },
    { id: 48, image: photography.photography48, alt: "Photography production 48" },
    { id: 49, image: photography.photography49, alt: "Photography production 49" },
    { id: 50, image: photography.photography50, alt: "Photography production 50" },
    { id: 51, image: photography.photography51, alt: "Photography production 51" },
    { id: 52, image: photography.photography52, alt: "Photography production 52" },
    { id: 53, image: photography.photography53, alt: "Photography production 53" },
    { id: 54, image: photography.photography54, alt: "Photography production 54" },
    { id: 55, image: photography.photography55, alt: "Photography production 55" },
    { id: 56, image: photography.photography56, alt: "Photography production 56" },
    { id: 57, image: photography.photography57, alt: "Photography production 57" },
    { id: 58, image: photography.photography58, alt: "Photography production 58" },
    { id: 59, image: photography.photography59, alt: "Photography production 59" },
    { id: 60, image: photography.photography60, alt: "Photography production 60" },
    { id: 61, image: photography.photography61, alt: "Photography production 61" },
    { id: 62, image: photography.photography62, alt: "Photography production 62" },
    { id: 63, image: photography.photography63, alt: "Photography production 63" },
    { id: 64, image: photography.photography64, alt: "Photography production 64" },
    { id: 65, image: photography.photography65, alt: "Photography production 65" },
    { id: 66, image: photography.photography66, alt: "Photography production 66" },
    { id: 67, image: photography.photography67, alt: "Photography production 67" },
    { id: 68, image: photography.photography68, alt: "Photography production 68" },
    { id: 69, image: photography.photography69, alt: "Photography production 69" },
    { id: 70, image: photography.photography70, alt: "Photography production 70" },
    { id: 71, image: photography.photography71, alt: "Photography production 71" },
    { id: 72, image: photography.photography72, alt: "Photography production 72" },
    { id: 73, image: photography.photography73, alt: "Photography production 73" },
    { id: 74, image: photography.photography74, alt: "Photography production 74" },
    { id: 75, image: photography.photography75, alt: "Photography production 75" },
    { id: 76, image: photography.photography76, alt: "Photography production 76" },
    { id: 77, image: photography.photography77, alt: "Photography production 77" },
    { id: 78, image: photography.photography78, alt: "Photography production 78" },
    { id: 79, image: photography.photography79, alt: "Photography production 79" },
    { id: 80, image: photography.photography80, alt: "Photography production 80" },
    { id: 81, image: photography.photography81, alt: "Photography production 81" },
    { id: 82, image: photography.photography82, alt: "Photography production 82" }
  ];

  // Función para manejar el clic en las imágenes
  const handleImageClick = (index) => {
    // Si ya hay un timer para este índice, es un doble clic
    if (clickTimers[index]) {
      clearTimeout(clickTimers[index]);
      setClickTimers(prev => {
        const newTimers = { ...prev };
        delete newTimers[index];
        return newTimers;
      });
      openModal(index);
    } else {
      // Primer clic - establecer timer
      const timer = setTimeout(() => {
        // Si el timer expira, limpiarlo (fue un clic simple)
        setClickTimers(prev => {
          const newTimers = { ...prev };
          delete newTimers[index];
          return newTimers;
        });
      }, 300); // 300ms para detectar doble clic

      setClickTimers(prev => ({
        ...prev,
        [index]: timer
      }));
    }
  };

  // Función para abrir el modal
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    // Bloquear scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';

    // Ocultar el header cuando se abre el modal
    const header = document.querySelector('header');
    if (header) {
      header.style.display = 'none';
    }
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';

    // Mostrar el header cuando se cierra el modal
    const header = document.querySelector('header');
    if (header) {
      header.style.display = 'block';
    }
  };

  // Navegación entre imágenes
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === btsImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? btsImages.length - 1 : prevIndex - 1
    );
  };

  // Manejar eventos de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;

      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      // Ocultar header
      const header = document.querySelector('header');
      if (header) {
        header.style.display = 'none';
      }
    } else {
      document.body.style.overflow = 'auto';
      // Mostrar header
      const header = document.querySelector('header');
      if (header) {
        header.style.display = 'block';
      }
    }

    return () => {
      document.body.style.overflow = 'auto';
      const header = document.querySelector('header');
      if (header) {
        header.style.display = 'block';
      }
    };
  }, [isModalOpen]);

  // Función para mover las imágenes dentro de sus contenedores
  const moveImagesWithinContainers = (scrollPosition) => {
    if (isMobile) return;

    // Calcular el progreso del scroll (0 a 1)
    const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    const progress = maxScroll > 0 ? scrollPosition / maxScroll : 0;

    // Aplicar transformación a todas las imágenes
    imageRefs.current.forEach((imgRef, index) => {
      if (!imgRef) return;

      const element = imgRef;

      // Calcular cuánto puede moverse la imagen (20% del ancho de la imagen)
      const imageMovementRange = element.naturalWidth * 0.2;

      // Mover la imagen basado en el progreso del scroll
      // Las imágenes se mueven en direcciones opuestas para crear variedad
      const movementDirection = index % 2 === 0 ? 1 : -1;
      const imageOffset = progress * imageMovementRange * movementDirection;

      gsap.to(element, {
        x: -imageOffset,
        duration: 0.8,
        ease: "power2.out"
      });
    });
  };

  // Efecto para actualizar el movimiento de imágenes cuando se hace scroll
  useEffect(() => {
    if (carouselRef.current && !isMobile) {
      const carousel = carouselRef.current;
      const handleScroll = () => {
        moveImagesWithinContainers(carousel.scrollLeft);
      };

      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile]);

  // Función para resetear a estado inicial
  const resetToInitialState = (index) => {
    if (isMobile) return;

    const projectElement = projectRefs.current[index];
    if (!projectElement) return;

    const imageElement = projectElement.querySelector(".js-project-image");

    if (!imageElement) return;

    gsap.killTweensOf(imageElement);

    // Resetear el zoom
    gsap.to(imageElement, {
      scale: 1,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  // Función de animación al hacer hover
  const handleProjectHover = (index) => {
    if (isMobile) return;

    const projectElement = projectRefs.current[index];
    if (!projectElement) return;

    const imageElement = projectElement.querySelector(".js-project-image");

    if (!imageElement) return;

    gsap.killTweensOf(imageElement);

    // Zoom sutil sin cambiar el tamaño del contenedor
    gsap.to(imageElement, {
      scale: 1.05,
      duration: 0.8,
      ease: "power2.out"
    });
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

  // Animación de entrada de thumbnails - MODIFICADO: Configuración inicial correcta
  const revealThumbnails = () => {
    if (!carouselRef.current) return;
    
    const thumbnails = Array.from(
      carouselRef.current.querySelectorAll(".js-project-thumbnail-img:not(.is-shown)")
    );
    const images = carouselRef.current.querySelectorAll(".js-project-image");

    if (!thumbnails.length) return;

    // IMPORTANTE: Configurar estado inicial oculto
    // Las imágenes comienzan con clip-path que las oculta completamente
    gsap.set(thumbnails, { 
      "--reveal-height": "0%",
      clipPath: "inset(0 0 calc(100% - var(--reveal-height, 0%)) 0)",
      visibility: "visible" // Pero visibles para la animación
    });
    
    // Las imágenes comienzan escaladas
    gsap.set(images, { 
      scale: 1.2,
      opacity: 0 // Comienzan invisibles
    });

    // ScrollTrigger para revelar
    ScrollTrigger.batch(thumbnails, {
      start: "top 90%",
      onEnter: (elements) => {
        // timeline de entrada
        let tl = gsap.timeline();

        // Primero hacemos que las imágenes sean visibles
        tl.to(elements, {
          opacity: 1,
          duration: 0.1,
          onComplete: () => {
            // Luego aplicamos la animación de clip-path
            tl.to(elements, {
              "--reveal-height": "100%",
              duration: 1,
              ease: CustomEase.create("easeOutCubic", ".4,.17,.53,1"),
              stagger: 0.15,
              onUpdate: function() {
                // Actualizar el clip-path dinámicamente
                elements.forEach(el => {
                  const height = getComputedStyle(el).getPropertyValue('--reveal-height');
                  el.style.clipPath = `inset(0 0 calc(100% - ${height}) 0)`;
                });
              },
              onComplete: () => {
                elements.forEach(el => {
                  el.classList.add("is-shown");
                  // Remover clip-path cuando la animación está completa
                  el.style.clipPath = "none";
                });
              }
            });
          }
        });
      },
      once: true
    });

    // Animación de escala de imágenes
    ScrollTrigger.batch(images, {
      start: "top 100%",
      onEnter: (elements) => {
        gsap.fromTo(elements,
          { 
            scale: 1.2,
            opacity: 0 // Comienzan invisibles
          },
          { 
            scale: 1, 
            opacity: 1, // Terminan visibles
            ease: CustomEase.create("easeOutExpo", "0.16, 1, 0.3, 1"), 
            duration: 1.8, 
            stagger: 0.15 
          }
        );
      },
      once: true
    });
  };

  // Medir ancho total para calcular drag constraints
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(
          carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
        );
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [btsImages]);

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

  // Inicializar animaciones de entrada
  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        revealThumbnails();
      }, 300);
    }
  }, [isInView]);

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

  // Limpiar timers cuando el componente se desmonta
  useEffect(() => {
    return () => {
      Object.values(clickTimers).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    };
  }, [clickTimers]);

  // Tamaños responsive para las tarjetas - IDÉNTICO A STILLS
  const getCardWidth = () => {
    if (typeof window === 'undefined') return '28vw';

    const width = window.innerWidth;
    if (width < 640) return '90vw';
    if (width < 768) return '75vw';
    if (width < 1024) return '50vw';
    if (width < 1280) return '35vw';
    return '28vw';
  };

  return (
    <>
      <div className="w-full bg-black">
        <div className="py-8 sm:py-12 lg:py-16 overflow-hidden">
          {/* Gradientes laterales sutiles */}
          <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-black via-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-black via-black to-transparent z-10 pointer-events-none"></div>

          <motion.div
            ref={carouselRef}
            className={`relative h-80 sm:h-96 lg:h-[28rem] flex items-center ${isMobile
                ? "overflow-x-auto overflow-y-hidden scrollbar-hide"
                : "overflow-hidden"
              }`}
            style={{
              WebkitOverflowScrolling: 'touch',
              cursor: isMobile ? 'grab' : 'grab'
            }}
            onMouseEnter={() => !isMobile && setIsHovering(true)}
            onMouseLeave={() => !isMobile && setIsHovering(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              drag={!isMobile ? "x" : false}
              dragConstraints={{ right: 0, left: -width }}
              dragElastic={0.1}
              className={`flex ${!isMobile ? 'cursor-grab active:cursor-grabbing' : 'cursor-grab active:cursor-grabbing'
                }`}
              style={{
                width: isMobile ? 'max-content' : 'auto',
                paddingLeft: '1rem',
                paddingRight: '1rem'
              }}
              onDrag={(event, info) => {
                if (!isMobile && carouselRef.current) {
                  const scrollLeft = -info.offset.x;
                  moveImagesWithinContainers(scrollLeft);
                }
              }}
              onDragEnd={(event, info) => {
                if (!isMobile && carouselRef.current) {
                  const scrollLeft = -info.offset.x;
                  moveImagesWithinContainers(scrollLeft);
                }
              }}
            >
              {btsImages.map((project, index) => (
                <div
                  key={project.id}
                  ref={el => {
                    projectRefs.current[index] = el;
                    thumbnailRefs.current[index] = el?.querySelector('.js-project-thumbnail-img');
                  }}
                  className="flex-shrink-0 group project-thumbnail cursor-pointer js-project-thumbnail"
                  style={{
                    minWidth: getCardWidth(),
                    maxWidth: getCardWidth(),
                    marginRight: '0.5rem',
                  }}
                  onClick={() => handleImageClick(index)}
                >
                  {/* CONTENEDOR PRINCIPAL DE LA IMAGEN - OCULTO INICIALMENTE */}
                  <div 
                    className="project-thumbnail__img relative overflow-hidden js-project-thumbnail-img"
                    style={{
                      opacity: 0, // Inicialmente invisible
                      clipPath: "inset(0 0 100% 0)" // Completamente oculto
                    }}
                  >
                    {/* IMAGEN ÚNICA */}
                    <div className="w-full h-full overflow-hidden absolute inset-0 thumbnail-clip">
                      <img
                        ref={el => {
                          imageRefs.current[index] = el;
                          if (projectRefs.current[index]) {
                            const projectEl = projectRefs.current[index];
                            if (projectEl && !projectEl.querySelector(".js-project-image")) {
                              el.classList.add("js-project-image");
                            }
                          }
                        }}
                        src={project.image}
                        alt={project.alt}
                        className="img js-project-image w-full h-full object-cover transition-transform duration-800 ease-out filter grayscale"
                        style={{
                          transformOrigin: 'center center',
                          willChange: 'transform',
                          minWidth: '120%',
                          width: '120%',
                          left: '-10%',
                          transform: 'scale(1.2)',
                          opacity: 0 // Inicialmente invisible
                        }}
                        draggable="false"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {/* ELEMENTO FANTASMA PARA ESPACIO FINAL */}
              <div
                className="flex-shrink-0"
                style={{
                  width: '1rem',
                  minWidth: '1rem'
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ESTILOS CSS */}
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

        .thumbnail-clip {
          will-change: clip-path;
        }

        .img {
          height: 100%;
          object-fit: cover;
          position: absolute;
          transition: transform 0.8s ease-out !important;
        }

        .js-project-thumbnail-img.is-shown {
          opacity: 1 !important;
          clip-path: none !important;
        }
        
        .js-project-thumbnail-img.is-shown .thumbnail-clip {
          clip-path: none !important;
        }
        
        .js-project-thumbnail-img.is-shown .img {
          opacity: 1 !important;
        }

        /* Scrollbar personalizada para móvil */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-md"
            onClick={closeModal}
            style={{ opacity: 1 }}
          >
            {/* Botón cerrar */}
            <button
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-10 flex items-center justify-center w-auto h-10 sm:h-12 px-4 sm:px-6 group"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <div className="relative h-6 overflow-hidden">
                <div className="flex flex-col transition-all duration-300 group-hover:-translate-y-6">
                  <span
                    className="text-white text-sm sm:text-base uppercase tracking-tighter font-gotham font-bold h-6 flex items-center justify-center"
                    style={{ letterSpacing: '-0.05em' }}
                  >
                    CLOSE
                  </span>
                  <span
                    className="text-red-600 text-sm sm:text-base uppercase tracking-tighter font-gotham font-bold h-6 flex items-center justify-center"
                    style={{ letterSpacing: '-0.05em' }}
                  >
                    CLOSE
                  </span>
                </div>
              </div>
            </button>

            {/* Botón anterior */}
            <button
              className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-red-primary transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Botón siguiente */}
            <button
              className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-red-primary transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Contenedor de la imagen */}
            <div
              className="relative max-w-90vw max-h-90vh mx-4"
              style={{ opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                key={currentImageIndex}
                src={btsImages[currentImageIndex].image}
                alt={btsImages[currentImageIndex].alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                style={{ opacity: 1 }}
              />

              {/* Contador de imágenes */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-gotham">
                {currentImageIndex + 1} / {btsImages.length}
              </div>
            </div>

            {/* Instrucciones de teclado */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-xs font-gotham text-center">
              Usa las flechas del teclado para navegar • ESC para cerrar
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BtsGallery;