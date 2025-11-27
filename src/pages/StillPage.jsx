import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isMobile, setIsMobile] = useState(false);

  // Estados para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Nuevo estado para controlar el doble clic
  const [clickTimers, setClickTimers] = useState({});

  // Referencias para GSAP
  const projectRefs = useRef([]);
  const imageRefs = useRef([]);

  // Detectar si es móvil - MEJORADO
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

  // Función para resetear a estado inicial - SIMPLIFICADA
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

  // Función de animación al hacer hover - SIMPLIFICADA: SOLO ZOOM SUTIL
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

  // Inicializar event listeners - SIMPLIFICADA
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

  // Variantes para el modal
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  // Variantes para la imagen del modal
  const modalImageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 0.3
      }
    }
  };

  const projects = [
    { id: 3, image: stills.still3 },
    { id: 4, image: stills.still4 },
    { id: 5, image: stills.still5 },
    { id: 6, image: stills.still6 },
    { id: 8, image: stills.still8 },
    { id: 9, image: stills.still9 },
    { id: 12, image: stills.still12 },
    { id: 13, image: stills.still13 },
    { id: 14, image: stills.still14 },
    { id: 15, image: stills.still15 },
    { id: 17, image: stills.still17 },
    { id: 18, image: stills.still18 },
    { id: 19, image: stills.still19 },
    { id: 20, image: stills.still20 },
    { id: 21, image: stills.still21 },
    { id: 22, image: stills.still22 },
    { id: 23, image: stills.still23 },
    { id: 24, image: stills.still24 },
    { id: 25, image: stills.still25 },
    { id: 27, image: stills.still27 },
    { id: 28, image: stills.still28 },
    { id: 29, image: stills.still29 },
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
    { id: 45, image: stills.still45 },
    { id: 48, image: stills.still48 },
    { id: 49, image: stills.still49 },
    { id: 51, image: stills.still51 },
    { id: 52, image: stills.still52 },
    { id: 53, image: stills.still53 },
    { id: 54, image: stills.still54 },
    { id: 56, image: stills.still56 },
    { id: 57, image: stills.still57 },
    { id: 58, image: stills.still58 },
    { id: 60, image: stills.still60 }
  ];

  // Medir ancho total para calcular drag constraints - MEJORADO
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
  }, [projects]); // Dependencia añadida

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

  // Limpiar timers cuando el componente se desmonta
  useEffect(() => {
    return () => {
      Object.values(clickTimers).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    };
  }, [clickTimers]);

  // Tamaños responsive para las tarjetas - MÁS ANCHAS
  const getCardWidth = () => {
    if (typeof window === 'undefined') return '28vw'; // Aumentado de 24vw a 28vw

    const width = window.innerWidth;
    if (width < 640) return '90vw'; // Aumentado de 85vw a 90vw (Mobile)
    if (width < 768) return '75vw'; // Aumentado de 70vw a 75vw (Tablet pequeña)
    if (width < 1024) return '50vw'; // Aumentado de 45vw a 50vw (Tablet)
    if (width < 1280) return '35vw'; // Aumentado de 32vw a 35vw (Laptop pequeña)
    return '28vw'; // Aumentado de 24vw a 28vw (Desktop)
  };

  return (
    <>
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

        {/* CARRUSEL - IMÁGENES QUE SE MUEVEN DENTRO DE CONTENEDORES FIJOS */}
        <motion.div
          ref={carouselRef}
          className={`relative ${isMobile
              ? "overflow-x-auto overflow-y-hidden scrollbar-hide"
              : "overflow-hidden"
            }`}
          style={{
            WebkitOverflowScrolling: 'touch', // Scroll suave en iOS
            cursor: isMobile ? 'grab' : 'grab'
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
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
              // SIN PADDING - solo gap uniforme
              width: isMobile ? 'max-content' : 'auto',
              // Gap uniforme usando padding en el primer y último elemento
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
              <motion.div
                key={project.id}
                ref={el => projectRefs.current[index] = el}
                className="flex-shrink-0 group project-thumbnail cursor-pointer"
                style={{
                  minWidth: getCardWidth(),
                  maxWidth: getCardWidth(),
                  // ACTUALIZADO: Mismo espacio que BtsGallery (8px = 0.5rem)
                  marginRight: '0.5rem', // Igual que el BtsGallery
                }}
                custom={index}
                variants={cardVariants}
                whileTap={isMobile ? { scale: 0.98 } : {}}
                onClick={() => handleImageClick(index)}
              >
                {/* CONTENEDOR PRINCIPAL DE LA IMAGEN - TAMAÑO FIJO */}
                <div className="project-thumbnail__img relative overflow-hidden">

                  {/* IMAGEN ÚNICA - más ancha que el contenedor para permitir movimiento */}
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
                        ref={el => {
                          imageRefs.current[index] = el;
                          // También asignamos la misma referencia para el hover
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
                          // La imagen es más ancha para permitir movimiento horizontal
                          minWidth: '120%',
                          width: '120%',
                          left: '-10%',
                          transform: 'scale(1)' // Estado inicial
                        }}
                        draggable="false"
                        loading="lazy"
                        onLoad={(e) => {
                          // Una vez cargada la imagen, podemos usar sus dimensiones reales
                          const img = e.target;
                          if (img.naturalWidth > 0) {
                            // Ajustar el movimiento basado en el tamaño real de la imagen
                          }
                        }}
                      />
                    </motion.div>
                  </motion.div>

                </div>
              </motion.div>
            ))}
            {/* ELEMENTO FANTASMA PARA ESPACIO FINAL */}
            <div
              className="flex-shrink-0"
              style={{
                width: '1rem', // Mismo que el paddingRight
                minWidth: '1rem'
              }}
            />
          </motion.div>
        </motion.div>

        {/* ESTILOS CSS PARA EL EFECTO - SIMPLIFICADOS */}
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
            /* CONTENEDOR CON TAMAÑO FIJO - NO CAMBIA */
          }

          .img {
            height: 100%;
            object-fit: cover;
            position: absolute;
            /* IMAGEN MÁS ANCHA QUE EL CONTENEDOR PARA PERMITIR MOVIMIENTO */
            transition: transform 0.8s ease-out !important;
          }

          /* Utilidades para texto */
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          /* Scrollbar personalizada para móvil */
          .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none; /* Chrome, Safari and Opera */
          }

          /* Scrollbar personalizada para móvil */
          @media (max-width: 768px) {
            .project-thumbnail__img {
              border-radius: 8px;
            }
          }
        `}</style>

      </section>

      {/* MODAL - se mantiene igual */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            {/* Botón cerrar con animación igual al header */}
            <button
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-10 flex items-center justify-center w-auto h-10 sm:h-12 px-4 sm:px-6 group"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <div className="relative h-6 overflow-hidden">
                <div className="flex flex-col transition-all duration-300 group-hover:-translate-y-6">
                  {/* "CLOSE" normal - sube con animación */}
                  <span
                    className="text-white text-sm sm:text-base uppercase tracking-tighter font-gotham font-bold h-6 flex items-center justify-center"
                    style={{ letterSpacing: '-0.05em' }}
                  >
                    CLOSE
                  </span>
                  {/* "CLOSE" rojo que aparece desde abajo */}
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
            <motion.div
              className="relative max-w-90vw max-h-90vh mx-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={currentImageIndex} // Important para la animación entre imágenes
                src={projects[currentImageIndex].image}
                alt={`Still ${projects[currentImageIndex].id}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                variants={modalImageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />

              {/* Contador de imágenes */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-gotham">
                {currentImageIndex + 1} / {projects.length}
              </div>
            </motion.div>

            {/* Instrucciones de teclado (solo desktop) */}
            {!isMobile && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-xs font-gotham text-center">
                Usa las flechas del teclado para navegar • ESC para cerrar
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StillPage;