import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const { currentLanguage, toggleLanguage, t } = useLanguage();

  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const logoRef = useRef(null);
  const hamburgerButtonRef = useRef(null);
  const imageContainerRef = useRef(null);
  const tl = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Menú items usando las traducciones con imágenes asociadas - SOLO 5 OPCIONES
  const menuItems = [
    {
      id: 'motion',
      label: t('header.menu.motion'),
      path: '/motion',
      type: 'page',
      image: '/bts/bts1.jpg'
    },
    {
      id: 'still',
      label: t('header.menu.still'),
      path: '/stills',
      type: 'page',
      image: '/bts/bts2.jpg'
    },
    {
      id: 'about',
      label: t('header.menu.about'),
      path: '/about',
      type: 'page',
      image: '/bts/bts3.jpg'
    },
    {
      id: 'rentals',
      label: t('header.menu.rentals'),
      path: '/rentals',
      type: 'page',
      image: '/bts/bts.jpg' // Cambiado de bts.jpg a bts4.jpg
    },
    {
      id: 'services',
      label: t('header.menu.services'),
      path: '/services',
      type: 'page',
      image: '/bts/bts5.jpg' // Cambiado a bts5.jpg
    }
  ];

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Precargar imágenes del menú con manejo de errores mejorado
  useEffect(() => {
    menuItems.forEach(item => {
      if (item.image) {
        const img = new Image();
        img.src = item.image;
        img.onerror = () => {
          console.warn(`⚠️ No se pudo cargar la imagen: ${item.image}`);
        };
        img.onload = () => {
          console.log(`✅ Imagen cargada: ${item.image}`);
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
    // Reinicializar las referencias del menú
    menuItemsRef.current = menuItemsRef.current.slice(0, menuItems.length);

    // Timeline para el menú hamburguesa
    tl.current = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'unset';
        setCurrentImage('');
      },
      onStart: () => {
        // Establecer imagen inicial si existe y es desktop
        if (menuItems[0]?.image && window.innerWidth > 768) {
          setCurrentImage(menuItems[0].image);
        }
      }
    });

    if (menuRef.current) {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Animación para móvil - deslizamiento desde arriba
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
        // Animación para desktop - deslizamiento horizontal
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
          .fromTo(imageContainerRef.current,
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
        setCurrentImage('');
        const isMobile = window.innerWidth <= 768;
        gsap.to(menuRef.current, { 
          [isMobile ? 'y' : 'x']: isMobile ? '-100%' : '-100%', 
          duration: 0.5 
        });
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
    if (window.innerWidth > 768 && item.image) {
      gsap.to(imageContainerRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentImage(item.image);
          gsap.set(imageContainerRef.current, { y: 30 });
          gsap.to(imageContainerRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
    }
  };

  // Función para manejar errores de imagen
  const handleImageError = (e) => {
    console.error('❌ Error cargando imagen del menú:', e.target.src);
    e.target.style.display = 'none';
    const parent = e.target.parentElement;
    if (parent) {
      parent.style.backgroundColor = '#1f2937';
      parent.innerHTML = '<div class="flex items-center justify-center h-full text-white/50 text-lg">Imagen no disponible</div>';
    }
  };

  return (
    <>
      {/* HEADER PRINCIPAL */}
      <header
        className={`fixed top-0 left-0 w-full z-[100] py-3 md:py-4 transition-all duration-500
          ${isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-red-600/30' : 'bg-transparent'}
          ${isMenuOpen ? 'bg-black/95 backdrop-blur-xl border-b border-red-600/30' : ''}`}
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
                className="text-white text-sm uppercase tracking-widest hover:text-red-600 transition-colors duration-300 px-2 py-1"
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
                  // Ícono Hamburguesa
                  <div className="flex flex-col justify-center items-center w-5 sm:w-6 gap-1 sm:gap-1.5">
                    <span className="w-full h-0.5 bg-white transition-all duration-300 group-hover:bg-red-600"></span>
                    <span className="w-full h-0.5 bg-white transition-all duration-300 group-hover:bg-red-600"></span>
                    <span className="w-full h-0.5 bg-white transition-all duration-300 group-hover:bg-red-600"></span>
                  </div>
                ) : (
                  // Ícono X
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
        className="fixed top-0 left-0 w-full bg-black backdrop-blur-xl overflow-hidden"
        style={{
          transform: window.innerWidth <= 768 ? 'translateY(-100%)' : 'translateX(-100%)',
          height: '100vh',
          zIndex: window.innerWidth <= 768 ? 90 : 60,
          paddingTop: window.innerWidth <= 768 ? '80px' : '0'
        }}
      >
        <div className={`h-full ${window.innerWidth <= 768 ? '' : 'flex flex-col md:flex-row'}`}>
          {/* En móvil: contenedor único que ocupa toda la pantalla */}
          {window.innerWidth <= 768 ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full max-w-md px-6">
                <div className="flex flex-col gap-4">
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
                      className="text-white text-2xl font-gotham-cond-black uppercase tracking-wide text-left py-4 transition-all duration-300 border-b border-white/10 last:border-b-0 active:bg-white/5 active:scale-95 group cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="group-hover:text-red-600 transition-colors duration-300">
                          {item.label}
                        </span>
                        <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // En desktop: layout dividido con imagen
            <>
              <div className="w-full md:w-1/2 lg:w-2/5 relative z-10 flex items-center justify-center">
                <div className="w-full max-w-2xl px-4 sm:px-6">
                  <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
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
                        className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-gotham-cond-black uppercase tracking-wider text-left py-1 sm:py-2 hover:text-red-600 transition-all duration-500 border-b border-white/10 last:border-b-0 hover:translate-x-2 md:hover:translate-x-4 group block cursor-pointer"
                      >
                        {item.label}
                        <span className="block w-0 group-hover:w-12 sm:group-hover:w-16 md:group-hover:w-20 h-0.5 bg-red-600 mt-1 sm:mt-2 transition-all duration-500"></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                ref={imageContainerRef}
                className="hidden md:block w-1/2 lg:w-3/5 relative overflow-hidden"
              >
                {currentImage && (
                  <div className="absolute inset-0 bg-gray-900">
                    <img
                      src={currentImage}
                      alt="Menu preview"
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                )}
                {!currentImage && (
                  <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                    <span className="text-white/50 text-lg">Selecciona una opción</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ESPACIO PARA EL HEADER */}
      <div className="h-16 sm:h-20"></div>
    </>
  );
};

export default Header;