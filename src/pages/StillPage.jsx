import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import { CustomEase, ScrollTrigger } from "gsap/all";
import RevealText from "../components/RevealText";
// Importar todas las imágenes de stills
import { stillImages as stills } from "../assets/images/stills";

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger, CustomEase);

const StillPage = () => {
  const { t } = useLanguage();
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
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
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

  // Animación de entrada de thumbnails - CORREGIDO: DE ARRIBA HACIA ABAJO
  const revealThumbnails = () => {
    if (!carouselRef.current) return;
    
    const thumbnails = Array.from(
      carouselRef.current.querySelectorAll(".js-project-thumbnail-img:not(.is-shown)")
    );
    const images = carouselRef.current.querySelectorAll(".js-project-image");

    if (!thumbnails.length) return;

    // Configuración inicial - CORREGIDO: Comienza con altura 0 desde arriba
    gsap.set(thumbnails, { 
      "--reveal-height": "0%",
      clipPath: "inset(0 0 calc(100% - var(--reveal-height, 0%)) 0)" 
    });
    gsap.set(images, { scale: 1.2 });

    // ScrollTrigger para revelar
    ScrollTrigger.batch(thumbnails, {
      start: "top 90%",
      onEnter: (elements) => {
        // timeline de entrada
        let tl = gsap.timeline();

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
      },
      once: true
    });

    // Animación de escala de imágenes
    ScrollTrigger.batch(images, {
      start: "top 100%",
      onEnter: (elements) => {
        gsap.fromTo(elements,
          { scale: 1.2 },
          { 
            scale: 1, 
            ease: CustomEase.create("easeOutExpo", "0.16, 1, 0.3, 1"), 
            duration: 1.8, 
            stagger: 0.15 
          }
        );
      },
      once: true
    });
  };

  const projects = [
    { id: 1, image: stills.still1 },
    { id: 2, image: stills.still2 },
    { id: 3, image: stills.still3 },
    { id: 4, image: stills.still4 },
    { id: 5, image: stills.still5 },
    { id: 6, image: stills.still6 },
    { id: 7, image: stills.still7 },
    { id: 8, image: stills.still8 },
    // { id: 9, image: stills.still9 }, // FALTA
    { id: 10, image: stills.still10 },
    { id: 11, image: stills.still11 },
    { id: 12, image: stills.still12 },
    { id: 13, image: stills.still13 },
    { id: 14, image: stills.still14 },
    { id: 15, image: stills.still15 },
    { id: 16, image: stills.still16 },
    { id: 17, image: stills.still17 },
    { id: 18, image: stills.still18 },
    { id: 19, image: stills.still19 },
    { id: 20, image: stills.still20 },
    { id: 21, image: stills.still21 },
    { id: 22, image: stills.still22 },
    { id: 22.5, image: stills.still22_5 },
    { id: 23, image: stills.still23 },
    { id: 24, image: stills.still24 },
    { id: 25, image: stills.still25 },
    { id: 26, image: stills.still26 },
    { id: 27, image: stills.still27 },
    // { id: 28, image: stills.still28 }, // FALTA
    // { id: 29, image: stills.still29 }, // FALTA
    { id: 30, image: stills.still30 },
    { id: 31, image: stills.still31 },
    { id: 32, image: stills.still32 },
    { id: 33, image: stills.still33 },
    { id: 34, image: stills.still34 },
    { id: 35, image: stills.still35 },
    { id: 36, image: stills.still36 },
    { id: 37, image: stills.still37 },
    { id: 38, image: stills.still38 },
    { id: 39, image: stills.still39 },
    { id: 40, image: stills.still40 },
    { id: 41, image: stills.still41 },
    { id: 42, image: stills.still42 },
    { id: 43, image: stills.still43 },
    { id: 44, image: stills.still44 },
    { id: 45, image: stills.still45 },
    { id: 46, image: stills.still46 },
    { id: 47, image: stills.still47 },
    { id: 48, image: stills.still48 },
    { id: 49, image: stills.still49 },
    { id: 50, image: stills.still50 },
    { id: 51, image: stills.still51 },
    // { id: 52, image: stills.still52 } // FALTA
  ];

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
  }, [projects]);

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

  // Tamaños responsive para las tarjetas
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
      <section className="w-full bg-black-pure text-white-pure py-10 md:py-20 overflow-hidden relative">

        {/* HEADER - Usando RevealText */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-10 px-4 sm:px-6 max-w-[1800px] mx-auto">
          <RevealText
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans uppercase tracking-tight text-white-pure font-black mb-4 sm:mb-0"
          >
            {t("still.title") || "Our Work"}
          </RevealText>

          <RevealText
            as="button"
            className="text-xs uppercase tracking-[0.3em] border-b border-white-pure pb-1 text-white-pure hover:text-red-primary hover:border-red-primary transition-colors duration-300 font-gotham font-medium self-start sm:self-auto"
          >
            ALL PROJECTS
          </RevealText>
        </div>

        {/* CARRUSEL */}
        <motion.div
          ref={carouselRef}
          className={`relative ${isMobile
              ? "overflow-x-auto overflow-y-hidden scrollbar-hide"
              : "overflow-hidden"
            }`}
          style={{
            WebkitOverflowScrolling: 'touch',
            cursor: isMobile ? 'grab' : 'grab'
          }}
          onMouseEnter={() => !isMobile && setIsHovering(true)}
          onMouseLeave={() => !isMobile && setIsHovering(false)}
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
            {projects.map((project, index) => (
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
                {/* CONTENEDOR PRINCIPAL DE LA IMAGEN */}
                <div className="project-thumbnail__img relative overflow-hidden js-project-thumbnail-img">
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
                      alt={`Still ${project.id}`}
                      className="img js-project-image w-full h-full object-cover transition-transform duration-800 ease-out"
                      style={{
                        transformOrigin: 'center center',
                        willChange: 'transform',
                        minWidth: '120%',
                        width: '120%',
                        left: '-10%',
                        transform: 'scale(1.2)'
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

        {/* ESTILOS CSS - CORREGIDO PARA ANIMACIÓN DE ARRIBA HACIA ABAJO */}
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
            /* La animación se controla mediante JS con clip-path */
            will-change: clip-path;
          }

          .img {
            height: 100%;
            object-fit: cover;
            position: absolute;
            transition: transform 0.8s ease-out !important;
          }

          .js-project-thumbnail-img.is-shown .thumbnail-clip {
            clip-path: none !important;
          }

          /* Scrollbar personalizada para móvil */
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          @media (max-width: 768px) {
            .project-thumbnail__img {
              border-radius: 8px;
            }
          }
        `}</style>
      </section>

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
                    <RevealText as="span">
                      CLOSE
                    </RevealText>
                  </span>
                  <span
                    className="text-red-600 text-sm sm:text-base uppercase tracking-tighter font-gotham font-bold h-6 flex items-center justify-center"
                    style={{ letterSpacing: '-0.05em' }}
                  >
                    <RevealText as="span">
                      CLOSE
                    </RevealText>
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
                src={projects[currentImageIndex].image}
                alt={`Still ${projects[currentImageIndex].id}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                style={{ opacity: 1 }}
              />

              {/* Contador de imágenes */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-gotham">
                <RevealText as="span">
                  {currentImageIndex + 1} / {projects.length}
                </RevealText>
              </div>
            </div>

            {/* Instrucciones de teclado (solo desktop) */}
            {!isMobile && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-xs font-gotham text-center">
                <RevealText as="span">
                  Usa las flechas del teclado para navegar • ESC para cerrar
                </RevealText>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StillPage;