import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
// Importar las imágenes de stills, rentals y videos
import { stillImages as stills } from '../assets/images/stills';
import { rentalsImages as rentals } from '../assets/images/rentals';
import { videos } from "../assets/videos";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentMedia, setCurrentMedia] = useState('');
  const [currentMediaType, setCurrentMediaType] = useState(''); // 'video' o 'image'
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [randomImageOrder, setRandomImageOrder] = useState([]);
  const [randomRentalsOrder, setRandomRentalsOrder] = useState([]);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const logoRef = useRef(null);
  const hamburgerButtonRef = useRef(null);
  const mediaContainerRef = useRef(null);
  const videoRef = useRef(null);
  const headerRef = useRef(null);
  const currentImageRef = useRef(null);
  const nextImageRef = useRef(null);
  const menuLogoRef = useRef(null); // NUEVO REF PARA EL LOGO DEL MENÚ
  const tl = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const imageIntervalRef = useRef(null);

  const { currentLanguage, toggleLanguage, t } = useLanguage();

  // Crear array de imágenes de stills para el carrusel
  const stillsImagesArray = Array.from({ length: 61 }, (_, index) => ({
    id: index + 1,
    image: stills[`still${index + 1}`],
    alt: `Still production ${index + 1}`
  }));

  // Crear array de imágenes de rentals para el carrusel
  const rentalsImagesArray = Array.from({ length: 27 }, (_, index) => ({
    id: index + 1,
    image: rentals[`rentals${index + 1}`],
    alt: `Rentals ${index + 1}`
  }));

  // Función para mezclar array aleatoriamente (Fisher-Yates shuffle)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Inicializar órdenes aleatorios cuando se monta el componente
  useEffect(() => {
    setRandomImageOrder(shuffleArray(stillsImagesArray));
    setRandomRentalsOrder(shuffleArray(rentalsImagesArray));
  }, []);

  // Menú items actualizado con rentals usando imágenes
  const menuItems = [
    {
      id: 'motion',
      label: t('header.menu.motion'),
      path: '/motion',
      type: 'page',
      media: videos.dacDermaaestheticsCongress,
      mediaType: 'video'
    },
    {
      id: 'still',
      label: t('header.menu.still'),
      path: '/stills',
      type: 'page',
      media: randomImageOrder,
      mediaType: 'image'
    },
    {
      id: 'about',
      label: t('header.menu.about'),
      path: '/about',
      type: 'page',
      media: videos.motionGraphicsSymetriAcademy,
      mediaType: 'video'
    },
    {
      id: 'rentals',
      label: t('header.menu.rentals'),
      path: '/rentals',
      type: 'page',
      media: randomRentalsOrder,
      mediaType: 'image'
    },
  ];

  // Función para limpiar completamente el estado del media
  const cleanupMedia = () => {
    // Limpiar intervalo de imágenes
    if (imageIntervalRef.current) {
      clearInterval(imageIntervalRef.current);
      imageIntervalRef.current = null;
    }

    // Pausar y resetear video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    // Resetear estados de transición
    setIsTransitioning(false);
    setCurrentImageIndex(0);
    setNextImageIndex(1);
  };

  // Función para inicializar el media según su tipo
  const initializeMedia = (media, mediaType) => {
    cleanupMedia();

    if (mediaType === 'video') {
      // Para video, simplemente establecer el media
      setCurrentMedia(media);
      setCurrentMediaType('video');
    } else if (mediaType === 'image' && Array.isArray(media)) {
      // Para imágenes, establecer el array y reiniciar índices
      setCurrentMedia(media);
      setCurrentMediaType('image');
      setCurrentImageIndex(0);
      setNextImageIndex(1);
      
      // Resetear opacidades de las imágenes
      setTimeout(() => {
        if (currentImageRef.current) {
          gsap.set(currentImageRef.current, { opacity: 1 });
        }
        if (nextImageRef.current) {
          gsap.set(nextImageRef.current, { opacity: 0 });
        }
      }, 50);
    }
  };

  // Función para manejar la transición entre imágenes CON CROSSFADE
  const transitionToNextImage = () => {
    if (!currentMedia || !Array.isArray(currentMedia) || currentMedia.length === 0 || isTransitioning) return;

    // Si solo hay una imagen, no hacer transición
    if (currentMedia.length === 1) return;

    setIsTransitioning(true);

    const newNextIndex = (currentImageIndex + 1) % currentMedia.length;

    // Configurar la siguiente imagen
    setNextImageIndex(newNextIndex);

    // Pre-cargar la siguiente imagen
    const nextImage = new Image();
    nextImage.src = currentMedia[newNextIndex].image;
    
    nextImage.onload = () => {
      // Cuando la imagen está cargada, iniciar la transición CROSSFADE
      gsap.timeline({
        onComplete: () => {
          // Cuando la transición termina, hacer que la siguiente imagen sea la actual
          setCurrentImageIndex(newNextIndex);
          setIsTransitioning(false);
        }
      })
      // La imagen actual se desvanece (opacidad 1 → 0)
      .to(currentImageRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut"
      }, 0)
      // La siguiente imagen aparece (opacidad 0 → 1) AL MISMO TIEMPO
      .fromTo(nextImageRef.current,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.inOut"
        },
        0
      );
    };
  };

  // Efecto para el carrusel automático de imágenes
  useEffect(() => {
    if (currentMediaType === 'image' && currentMedia && Array.isArray(currentMedia) && currentMedia.length > 1 && isMenuOpen) {
      // Limpiar intervalo anterior
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
      }

      // Configurar nuevo intervalo para cambiar imágenes cada 3 segundos
      imageIntervalRef.current = setInterval(() => {
        transitionToNextImage();
      }, 3000);

      return () => {
        if (imageIntervalRef.current) {
          clearInterval(imageIntervalRef.current);
        }
      };
    }
  }, [currentMediaType, currentMedia, isMenuOpen, currentImageIndex, isTransitioning]);

  // Efecto para manejar la reproducción del video cuando cambia
  useEffect(() => {
    if (videoRef.current && currentMediaType === 'video' && currentMedia) {
      const playVideo = async () => {
        try {
          videoRef.current.currentTime = 0;
          await videoRef.current.play();
        } catch (error) {
          console.warn('No se pudo reproducir el video automáticamente:', error);
        }
      };

      playVideo();
    }
  }, [currentMedia, currentMediaType]);

  // Efecto para detectar scroll y mostrar/ocultar header
  useEffect(() => {
    const minDelta = 3;
    const hideThreshold = 10;

    lastScrollY.current = window.scrollY || window.pageYOffset || 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const delta = scrollTop - lastScrollY.current;

          if (scrollTop <= 10) {
            setIsVisible(true);
          } else if (Math.abs(delta) > minDelta) {
            if (delta > 0 && scrollTop > hideThreshold) {
              setIsVisible(false);
            } else if (delta < 0) {
              setIsVisible(true);
            }
          }

          setIsScrolled(scrollTop > 50);
          lastScrollY.current = scrollTop;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Precargar videos del menú usando los videos importados
  useEffect(() => {
    menuItems.forEach(item => {
      if (item.mediaType === 'video' && item.media) {
        const video = document.createElement('video');
        video.src = item.media;
        video.preload = 'metadata';
        video.onerror = () => {
          console.warn(`⚠️ No se pudo cargar el video: ${item.media}`);
        };
      }
    });
  }, []);

  // Efecto para cerrar menú al cambiar tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        toggleMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    menuItemsRef.current = menuItemsRef.current.slice(0, menuItems.length);

    tl.current = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'unset';
        setCurrentMedia('');
        setCurrentMediaType('');
        cleanupMedia();
        setIsVisible(true);
      },
      onStart: () => {
        if (menuItems[0]?.media && window.innerWidth > 768) {
          initializeMedia(menuItems[0].media, menuItems[0].mediaType);
        }
        setIsVisible(false);
      }
    });

    if (menuRef.current) {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        tl.current
          .to(menuRef.current, {
            duration: 0.5,
            y: 0,
            ease: "power3.out"
          })
          .fromTo(menuLogoRef.current, // ANIMACIÓN DEL LOGO EN MÓVIL
            {
              y: -30,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out"
            },
            "-=0.3"
          )
          .fromTo(menuItemsRef.current,
            {
              y: 20,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.06,
              ease: "power2.out"
            },
            "-=0.2"
          );
      } else {
        tl.current
          .to(menuRef.current, {
            duration: 0.8,
            x: 0,
            ease: "power3.inOut"
          })
          .fromTo(menuLogoRef.current, // ANIMACIÓN DEL LOGO EN DESKTOP
            {
              x: -50,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out"
            },
            "-=0.6"
          )
          .fromTo(menuItemsRef.current,
            {
              x: -50,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out"
            },
            "-=0.4"
          )
          .fromTo(mediaContainerRef.current,
            {
              x: 50,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out"
            },
            "-=0.4"
          );
      }
    }
  }, []);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      document.body.style.overflow = 'hidden';
      if (tl.current) tl.current.play();
    } else {
      if (tl.current) {
        tl.current.reverse();
      } else {
        setIsMenuOpen(false);
        document.body.style.overflow = 'unset';
        setCurrentMedia('');
        setCurrentMediaType('');
        cleanupMedia();
        const isMobile = window.innerWidth <= 768;
        gsap.to(menuRef.current, { 
          [isMobile ? 'y' : 'x']: isMobile ? '-100%' : '-100%', 
          duration: 0.5 
        });
        setIsVisible(true);
      }
    }
  };

  const navigateToPage = (path) => {
    navigate(path);
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const handleMenuItemClick = (item) => {
    navigateToPage(item.path);
  };

  const handleMenuItemHover = (item) => {
    if (window.innerWidth > 768 && item.media) {
      gsap.to(mediaContainerRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          // Inicializar el nuevo media
          initializeMedia(item.media, item.mediaType);
          
          gsap.set(mediaContainerRef.current, { y: 30 });
          gsap.to(mediaContainerRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
    }
  };

  const handleVideoError = (e) => {
    console.error('❌ Error cargando video del menú:', e.target.src);
    e.target.style.display = 'none';
    const parent = e.target.parentElement;
    if (parent) {
      parent.style.backgroundColor = '#1f2937';
      parent.innerHTML = '<div class="flex items-center justify-center h-full text-white/50 text-lg font-gotham font-bold">Video no disponible</div>';
    }
  };

  const handleVideoLoaded = () => {
    // Video cargado correctamente
    if (videoRef.current) {
      videoRef.current.style.display = 'block';
    }
  };

  // Función para renderizar el contenido multimedia según el tipo
  const renderMediaContent = () => {
    if (currentMediaType === 'video') {
      return (
        <video
          ref={videoRef}
          key={`video-${currentMedia}`} // Key único para forzar re-render
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onError={handleVideoError}
          onLoadedData={handleVideoLoaded}
        >
          <source src={currentMedia} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      );
    } else if (currentMediaType === 'image' && Array.isArray(currentMedia) && currentMedia.length > 0) {
      const currentImage = currentMedia[currentImageIndex];
      const nextImage = currentMedia[nextImageIndex];
      
      return (
        <div className="relative w-full h-full">
          {/* Imagen actual - se desvanece */}
          <img
            ref={currentImageRef}
            key={`current-${currentImage.id}-${currentMedia.length}`}
            src={currentImage.image}
            alt={currentImage.alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 1 }}
          />
          
          {/* Siguiente imagen - aparece (solo si hay más de una imagen) */}
          {currentMedia.length > 1 && (
            <img
              ref={nextImageRef}
              key={`next-${nextImage.id}-${currentMedia.length}`}
              src={nextImage.image}
              alt={nextImage.alt}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0 }}
            />
          )}
          
          {/* Overlay sutil */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
        </div>
      );
    } else {
      return (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <span className="text-white/50 text-xl font-gotham font-bold">Selecciona una opción</span>
        </div>
      );
    }
  };

  return (
    <>
      {/* HEADER PRINCIPAL - ANCHO COMPLETO */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-[100] py-2 md:py-3 transform transition-all duration-500 ${
          !isVisible || isMenuOpen 
            ? '-translate-y-full opacity-0' 
            : 'translate-y-0 opacity-100'
        } bg-transparent`}
      >
        <nav className="w-full px-4 sm:px-6 relative">
          <div className="flex justify-between items-center">
            {/* Logo - SIN EFECTO HOVER */}
            <div ref={logoRef} className="flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="Rectángulo Films"
                  className="h-7 sm:h-8 lg:h-10 w-auto cursor-pointer"
                />
              </Link>
            </div>

            {/* Selector de idioma y Botón Hamburguesa */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Selector de idioma - GOTHAM BOLD */}
              <button
                onClick={toggleLanguage}
                className="text-white text-sm uppercase tracking-tighter hover:text-red-600 transition-colors duration-300 px-2 py-1 font-gotham font-bold"
                style={{ letterSpacing: '-0.05em' }}
              >
                {currentLanguage === 'en' ? 'ES' : 'EN'}
              </button>

              {/* Botón Hamburguesa */}
              <button
                ref={hamburgerButtonRef}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 relative group"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? t('header.aria.closeMenu') : t('header.aria.openMenu')}
              >
                {!isMenuOpen ? (
                  <div className="flex flex-col justify-center items-center w-5 sm:w-6 gap-1 sm:gap-1.5">
                    <span className="w-full h-0.5 bg-white transition-all duration-300 group-hover:bg-red-600"></span>
                    <span className="w-full h-0.5 bg-white transition-all duration-300 group-hover:bg-red-600"></span>
                    <span className="w-full h-0.5 bg-white transition-all duration-300 group-hover:bg-red-600"></span>
                  </div>
                ) : (
                  // Contenedor para el efecto hover de "CLOSE" - ANIMACIÓN DE SUBIDA
                  <div className="relative h-6 overflow-hidden">
                    <div className="flex flex-col transition-all duration-300 group-hover:-translate-y-6">
                      {/* "CLOSE" normal - sube con animación */}
                      <span 
                        className="text-white text-xs uppercase tracking-tighter font-gotham font-bold h-6 flex items-center justify-center"
                        style={{ letterSpacing: '-0.05em' }}
                      >
                        CLOSE
                      </span>
                      {/* "CLOSE" rojo que aparece desde abajo */}
                      <span 
                        className="text-red-600 text-xs uppercase tracking-tighter font-gotham font-bold h-6 flex items-center justify-center"
                        style={{ letterSpacing: '-0.05em' }}
                      >
                        CLOSE
                      </span>
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* MENÚ DESPLEGABLE */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-xl overflow-hidden"
        style={{
          transform: window.innerWidth <= 768 ? 'translateY(-100%)' : 'translateX(-100%)',
          zIndex: 99,
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
      >
        {/* Botón de cerrar con texto "CLOSE" - ANIMACIÓN DE SUBIDA */}
        <button
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[110] flex items-center justify-center w-auto h-10 sm:h-12 px-4 sm:px-6 group"
          onClick={toggleMenu}
          aria-label={t('header.aria.closeMenu')}
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

        <div className={`h-full ${window.innerWidth <= 768 ? '' : 'flex flex-col md:flex-row'}`}>
          {/* VERSIÓN MÓVIL - LOGO VISIBLE INMEDIATAMENTE */}
          {window.innerWidth <= 768 ? (
            <div className="w-full h-full flex flex-col pt-20 pb-8">
              {/* LOGO EN MÓVIL - VISIBLE INMEDIATAMENTE */}
              <div 
                ref={menuLogoRef}
                className="absolute top-6 left-6"
              >
                <img
                  src="/logo.png"
                  alt="Rectángulo Films"
                  className="h-12 w-auto" 
                />
              </div>

              <div className="w-full max-w-md px-6 flex-1 flex flex-col justify-center">
                <div className="flex flex-col">
                  {menuItems.map((item, index) => (
                    <div
                      key={item.id}
                      ref={el => {
                        if (el) {
                          menuItemsRef.current[index] = el;
                          gsap.set(el, { opacity: 1, x: 0, y: 0 });
                        }
                      }}
                      onClick={() => handleMenuItemClick(item)}
                      className="text-white text-5xl font-gotham font-bold uppercase tracking-tighter text-left py-3 transition-all duration-300 active:bg-white/10 active:scale-95 group cursor-pointer"
                      style={{ letterSpacing: '-0.08em' }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="group-hover:text-red-600 transition-colors duration-300">
                          {item.label}
                        </span>
                        <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2 text-4xl">
                          →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // VERSIÓN DESKTOP - LOGO VISIBLE INMEDIATAMENTE
            <>
              <div className="w-full md:w-1/2 relative z-10 flex flex-col justify-center pl-12 xl:pl-24">
                {/* LOGO EN DESKTOP - VISIBLE INMEDIATAMENTE */}
                <div 
                  ref={menuLogoRef}
                  className="absolute top-8 left-12"
                >
                  <img
                    src="/logo.png"
                    alt="Rectángulo Films"
                    className="h-16 w-auto" 
                  />
                </div>

                <div className="w-full max-w-2xl">
                  <div className="flex flex-col">
                    {menuItems.map((item, index) => (
                      <div
                        key={item.id}
                        ref={el => {
                          if (el) {
                            menuItemsRef.current[index] = el;
                            gsap.set(el, { opacity: 1, x: 0, y: 0 });
                          }
                        }}
                        onClick={() => handleMenuItemClick(item)}
                        onMouseEnter={() => handleMenuItemHover(item)}
                        className="text-white text-6xl xl:text-7xl 2xl:text-8xl font-gotham font-bold uppercase tracking-tighter text-left py-3 hover:text-red-600 transition-all duration-500 hover:translate-x-6 group block cursor-pointer"
                        style={{ letterSpacing: '-0.08em' }}
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                ref={mediaContainerRef}
                className="hidden md:block w-1/2 relative overflow-hidden"
              >
                {renderMediaContent()}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;