import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Importar todas las imágenes de photography
import { photographyImages as photography } from "../../assets/images/photography";

const BtsGallery = () => {
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef(null);
  const sliderRef = useRef(null);
  const lastTimeRef = useRef(0);
  const progressRef = useRef(0);

  // Estados para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array de imágenes de photography (1-49)
  const btsImages = [
    { id: 3, image: photography.photography3, alt: "Photography production 3" },
    { id: 4, image: photography.photography4, alt: "Photography production 4" },
    { id: 6, image: photography.photography6, alt: "Photography production 6" },
    { id: 9, image: photography.photography9, alt: "Photography production 9" },
    { id: 10, image: photography.photography10, alt: "Photography production 10" },
    { id: 12, image: photography.photography12, alt: "Photography production 12" },
    { id: 14, image: photography.photography14, alt: "Photography production 14" },
    { id: 15, image: photography.photography15, alt: "Photography production 15" },
    { id: 16, image: photography.photography16, alt: "Photography production 16" },
    { id: 17, image: photography.photography17, alt: "Photography production 17" },
    { id: 18, image: photography.photography18, alt: "Photography production 18" },
    { id: 19, image: photography.photography19, alt: "Photography production 19" },
    { id: 20, image: photography.photography20, alt: "Photography production 20" },
    { id: 21, image: photography.photography21, alt: "Photography production 21" },
    { id: 22, image: photography.photography22, alt: "Photography production 22" },
    { id: 24, image: photography.photography24, alt: "Photography production 24" },
    { id: 25, image: photography.photography25, alt: "Photography production 25" },
    { id: 26, image: photography.photography26, alt: "Photography production 26" },
    { id: 27, image: photography.photography27, alt: "Photography production 27" },
    { id: 29, image: photography.photography29, alt: "Photography production 29" },
    { id: 30, image: photography.photography30, alt: "Photography production 30" },
    { id: 31, image: photography.photography31, alt: "Photography production 31" },
    { id: 33, image: photography.photography33, alt: "Photography production 33" },
    { id: 34, image: photography.photography34, alt: "Photography production 34" },
    { id: 35, image: photography.photography35, alt: "Photography production 35" },
    { id: 36, image: photography.photography36, alt: "Photography production 36" },
    { id: 37, image: photography.photography37, alt: "Photography production 37" },
    { id: 38, image: photography.photography38, alt: "Photography production 38" },
    { id: 39, image: photography.photography39, alt: "Photography production 39" },
    { id: 40, image: photography.photography40, alt: "Photography production 40" },
    { id: 42, image: photography.photography42, alt: "Photography production 42" },
    { id: 43, image: photography.photography43, alt: "Photography production 43" },
    { id: 44, image: photography.photography44, alt: "Photography production 44" },
    { id: 45, image: photography.photography45, alt: "Photography production 45" },
    { id: 47, image: photography.photography47, alt: "Photography production 47" },
    { id: 48, image: photography.photography48, alt: "Photography production 48" }
  ];

  const duplicatedImages = [...btsImages, ...btsImages, ...btsImages];

  const NORMAL_SPEED = 50;
  const HOVER_SPEED = 20;

  // Función para abrir el modal
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    
    const header = document.querySelector('header');
    if (header) {
      header.style.display = 'none';
    }
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    
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
      const header = document.querySelector('header');
      if (header) {
        header.style.display = 'none';
      }
    } else {
      document.body.style.overflow = 'auto';
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

  const animateSlider = (timestamp) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }

    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    const currentSpeed = isHovering ? HOVER_SPEED : NORMAL_SPEED;
    const progressIncrement = (currentSpeed * deltaTime) / 1000;
    progressRef.current += progressIncrement;

    const totalWidth = duplicatedImages.length * (420 + 52);
    const viewportWidth = sliderRef.current?.parentElement?.offsetWidth || 1200;

    if (progressRef.current >= totalWidth - viewportWidth) {
      progressRef.current = 0;
    }

    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${progressRef.current}px)`;
    }

    animationRef.current = requestAnimationFrame(animateSlider);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animateSlider);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovering]);

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

  return (
    <>
      <div className="w-full bg-black">
        <div className="py-8 sm:py-12 lg:py-16 overflow-hidden">
          {/* Gradientes laterales sutiles */}
          <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-black via-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-black via-black to-transparent z-10 pointer-events-none"></div>

          <motion.div
            className="relative h-80 sm:h-96 lg:h-[28rem] flex items-center perspective"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div
              ref={sliderRef}
              className="flex gap-0 absolute left-0 h-full"
              style={{ willChange: 'transform' }}
            >
              {duplicatedImages.map((image, index) => (
                <div
                  key={`${image.id}-${index}`}
                  className="flex-shrink-0 h-full group cursor-pointer"
                  style={{ width: '420px', marginLeft: '-8px' }}
                  onClick={() => openModal(index % btsImages.length)}
                >
                  <div
                    className="relative w-full h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
                    style={{
                      transition: 'transform 0.6s ease-out, filter 0.6s ease-out'
                    }}
                  >
                    <img
                      src={image.image}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                    />

                    {/* Overlay sutil */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
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
            <motion.div
              className="relative max-w-90vw max-h-90vh mx-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={currentImageIndex}
                src={btsImages[currentImageIndex].image}
                alt={btsImages[currentImageIndex].alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                variants={modalImageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />

              {/* Contador de imágenes */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-gotham">
                {currentImageIndex + 1} / {btsImages.length}
              </div>
            </motion.div>

            {/* Instrucciones de teclado */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-xs font-gotham text-center">
              Usa las flechas del teclado para navegar • ESC para cerrar
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BtsGallery;