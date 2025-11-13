import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const { currentLanguage, toggleLanguage, t } = useLanguage();

  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const logoRef = useRef(null);
  const hamburgerButtonRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const headerRef = useRef(null);
  const tl = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Menú items usando las traducciones con VIDEOS asociados
  const menuItems = [
    {
      id: 'motion',
      label: t('header.menu.motion'),
      path: '/motion',
      type: 'page',
      video: '/videos/CamiloRegresa.mp4'
    },
    {
      id: 'still',
      label: t('header.menu.still'),
      path: '/stills',
      type: 'page',
      video: '/videos/DemoRectangulo2025.mp4'
    },
    {
      id: 'about',
      label: t('header.menu.about'),
      path: '/about',
      type: 'page',
      video: '/videos/MotionGraphics.mp4'
    },
    {
      id: 'rentals',
      label: t('header.menu.rentals'),
      path: '/rentals',
      type: 'page',
      video: '/videos/CamiloRegresa.mp4'
    },
  ];

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

  // Precargar videos del menú
  useEffect(() => {
    menuItems.forEach(item => {
      if (item.video) {
        const video = document.createElement('video');
        video.src = item.video;
        video.preload = 'metadata';
        video.onerror = () => {
          console.warn(`⚠️ No se pudo cargar el video: ${item.video}`);
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
        setCurrentVideo('');
        // Pausar video cuando se cierra el menú
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
        setIsVisible(true);
      },
      onStart: () => {
        if (menuItems[0]?.video && window.innerWidth > 768) {
          setCurrentVideo(menuItems[0].video);
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
          .fromTo(videoContainerRef.current,
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
        setCurrentVideo('');
        // Pausar video cuando se cierra el menú
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
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
    if (window.innerWidth > 768 && item.video) {
      gsap.to(videoContainerRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          // Pausar video actual antes de cambiar
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
          
          setCurrentVideo(item.video);
          gsap.set(videoContainerRef.current, { y: 30 });
          gsap.to(videoContainerRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
    }
  };

  // Efecto para manejar la reproducción del video cuando cambia
  useEffect(() => {
    if (videoRef.current && currentVideo) {
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
  }, [currentVideo]);

  const handleVideoError = (e) => {
    console.error('❌ Error cargando video del menú:', e.target.src);
    e.target.style.display = 'none';
    const parent = e.target.parentElement;
    if (parent) {
      parent.style.backgroundColor = '#1f2937';
      parent.innerHTML = '<div class="flex items-center justify-center h-full text-white/50 text-lg">Video no disponible</div>';
    }
  };

  const handleVideoLoaded = () => {
    // Video cargado correctamente
    if (videoRef.current) {
      videoRef.current.style.display = 'block';
    }
  };

  return (
    <>
      {/* HEADER PRINCIPAL */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-[100] py-2 md:py-3 transform transition-all duration-500 ${
          !isVisible || isMenuOpen 
            ? '-translate-y-full opacity-0' 
            : 'translate-y-0 opacity-100'
        } bg-transparent`}
      >
        <nav className="container mx-auto px-4 sm:px-6 relative">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div ref={logoRef} className="flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src="/logo.svg"
                  alt="CSA STUDIO"
                  className="h-7 sm:h-8 lg:h-10 w-auto cursor-pointer hover:scale-110 transition-transform duration-300"
                />
              </Link>
            </div>

            {/* Selector de idioma y Botón Hamburguesa */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Selector de idioma */}
              <button
                onClick={toggleLanguage}
                className="text-white text-sm uppercase tracking-widest hover:text-red-600 transition-colors duration-300 px-2 py-1 font-gotham font-medium"
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
                  <div className="relative w-5 sm:w-6 h-5 sm:h-6">
                    <span className="absolute top-1/2 left-0 w-5 sm:w-6 h-0.5 bg-white transform -rotate-45 transition-all duration-300 group-hover:bg-red-600"></span>
                    <span className="absolute top-1/2 left-0 w-5 sm:w-6 h-0.5 bg-white transform rotate-45 transition-all duration-300 group-hover:bg-red-600"></span>
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
        {/* Botón de cerrar */}
        <button
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[110] flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-black/50 rounded-full backdrop-blur-sm group"
          onClick={toggleMenu}
          aria-label={t('header.aria.closeMenu')}
        >
          <div className="relative w-5 sm:w-6 h-5 sm:h-6">
            <span className="absolute top-1/2 left-0 w-5 sm:w-6 h-0.5 bg-white transform -rotate-45 transition-all duration-300 group-hover:bg-red-600"></span>
            <span className="absolute top-1/2 left-0 w-5 sm:w-6 h-0.5 bg-white transform rotate-45 transition-all duration-300 group-hover:bg-red-600"></span>
          </div>
        </button>

        <div className={`h-full ${window.innerWidth <= 768 ? '' : 'flex flex-col md:flex-row'}`}>
          {/* VERSIÓN MÓVIL - SIN LÍNEAS */}
          {window.innerWidth <= 768 ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full max-w-md px-6">
                <div className="flex flex-col gap-8">
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
                      className="text-white text-4xl font-accent uppercase tracking-wide text-center py-6 transition-all duration-300 active:bg-white/10 active:scale-95 group cursor-pointer font-black"
                    >
                      <div className="flex items-center justify-between">
                        <span className="group-hover:text-red-600 transition-colors duration-300 text-5xl">
                          {item.label}
                        </span>
                        <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2 text-3xl">
                          →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // VERSIÓN DESKTOP - SIN LÍNEAS
            <>
              <div className="w-full md:w-1/2 relative z-10 flex items-center justify-center">
                <div className="w-full max-w-2xl px-8">
                  <div className="flex flex-col gap-8">
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
                        className="text-white text-5xl xl:text-6xl font-accent uppercase tracking-wider text-left py-4 hover:text-red-600 transition-all duration-500 hover:translate-x-6 group block cursor-pointer font-black"
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                ref={videoContainerRef}
                className="hidden md:block w-1/2 relative overflow-hidden"
              >
                {currentVideo ? (
                  <div className="absolute inset-0 w-full h-full">
                    <video
                      ref={videoRef}
                      key={currentVideo} // Forzar re-render cuando cambia el video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                      onError={handleVideoError}
                      onLoadedData={handleVideoLoaded}
                    >
                      <source src={currentVideo} type="video/mp4" />
                      Tu navegador no soporta el elemento de video.
                    </video>
                    <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
                  </div>
                ) : (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <span className="text-white/50 text-xl font-gotham font-light">Selecciona una opción</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;