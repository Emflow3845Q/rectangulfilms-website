import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const menuLogoRef = useRef(null);
  const tl = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animación de entrada del header
    const entranceTL = gsap.timeline();
    
    if (logoRef.current) {
      entranceTL.fromTo(logoRef.current,
        {
          y: -100,
          opacity: 0,
          scale: 0.5
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)"
        }
      );
    }

    if (navRef.current?.children) {
      entranceTL.fromTo(navRef.current.children,
        {
          y: -50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        },
        "-=0.5"
      );
    }

    if (hamburgerRef.current) {
      entranceTL.fromTo(hamburgerRef.current,
        {
          scale: 0,
          rotation: 180,
          opacity: 0
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)"
        },
        "-=0.3"
      );
    }

    // Timeline para el menú móvil
    tl.current = gsap.timeline({ 
      paused: true,
      onReverseComplete: () => {
        // ESTA ES LA CLAVE: Solo cerrar el menú cuando la animación de reversa termine
        setIsMenuOpen(false);
        document.body.style.overflow = 'unset';
        
        // Deshabilitar clicks del botón X
        if (closeButtonRef.current) {
          closeButtonRef.current.style.pointerEvents = 'none';
        }
        
        // Mostrar hamburguesa después de que el menú se cierre completamente
        gsap.to(hamburgerRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          delay: 0.1
        });
      }
    });
    
    if (menuRef.current) {
      tl.current
        .to(menuRef.current, {
          duration: 0.8,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power3.inOut"
        })
        .fromTo(menuLogoRef.current,
          {
            y: -50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
          },
          "-=0.4"
        )
        .fromTo(closeButtonRef.current,
          {
            scale: 0,
            opacity: 0
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            onStart: () => {
              // Habilitar clicks cuando la animación comience
              if (closeButtonRef.current) {
                closeButtonRef.current.style.pointerEvents = 'auto';
              }
            }
          },
          "-=0.3"
        )
        .fromTo(menuItemsRef.current,
          {
            y: 80,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.5)"
          },
          "-=0.4"
        );
    }
  }, []);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      // ABRIR MENÚ
      setIsMenuOpen(true);
      document.body.style.overflow = 'hidden';
      
      // Ocultar hamburguesa inmediatamente
      gsap.to(hamburgerRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: "power2.in"
      });
      
      // Reproducir animación de apertura
      if (tl.current) tl.current.play();
    } else {
      // CERRAR MENÚ - SOLO REVERTIR LA ANIMACIÓN
      // No cambiar el estado aquí, se hará en onReverseComplete
      if (tl.current) {
        tl.current.reverse();
      } else {
        // Fallback si no hay timeline
        setIsMenuOpen(false);
        document.body.style.overflow = 'unset';
        gsap.to(hamburgerRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  };

  // Función para navegación suave en la página de inicio
  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        if (isMenuOpen) {
          toggleMenu();
        }
      }
    } else {
      navigate(`/#${sectionId}`);
      if (isMenuOpen) {
        toggleMenu();
      }
    }
  };

  // Función para navegar a páginas
  const navigateToPage = (path) => {
    navigate(path);
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const menuItems = [
    { id: 'inicio', label: 'Inicio', path: '/', type: 'scroll' },
    { id: 'nosotros', label: 'Nosotros', path: '/about', type: 'page' },
    { id: 'proyectos', label: 'Proyectos', path: '/projects', type: 'page' },
    { id: 'servicios', label: 'Servicios', path: '/services', type: 'page' },
    { id: 'contacto', label: 'Contacto', path: '/contact', type: 'page' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 py-4 transition-all duration-500 ${
        isScrolled || isMenuOpen 
          ? 'bg-black/95 backdrop-blur-xl border-b border-red-600/30' 
          : 'bg-transparent'
      }`}>
        
        <nav className="container mx-auto px-4 sm:px-6 relative z-40">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div ref={logoRef} className="flex items-center z-40">
              <Link to="/">
                <img 
                  src="/logo.svg" 
                  alt="CSA STUDIO" 
                  className="h-8 lg:h-10 w-auto cursor-pointer hover:scale-110 transition-transform duration-300"
                />
              </Link>
            </div>
            
            {/* Menú Desktop */}
            <div ref={navRef} className="hidden lg:flex items-center gap-8 z-40">
              {menuItems.map((item) => (
                item.type === 'page' ? (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`transition-all duration-300 font-gotham-cond-black text-sm uppercase tracking-widest relative py-2 group ${
                      isScrolled ? 'text-white hover:text-red-600' : 'text-white hover:text-red-600'
                    } ${location.pathname === item.path ? 'text-red-600' : ''}`}
                  >
                    {item.label}
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
                      location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`transition-all duration-300 font-gotham-cond-black text-sm uppercase tracking-widest relative py-2 group ${
                      isScrolled ? 'text-white hover:text-red-600' : 'text-white hover:text-red-600'
                    } ${location.pathname === '/' && location.hash === `#${item.id}` ? 'text-red-600' : ''}`}
                  >
                    {item.label}
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
                      location.pathname === '/' && location.hash === `#${item.id}` ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </button>
                )
              ))}
            </div>

            {/* Botón Hamburguesa */}
            <button 
              ref={hamburgerRef}
              className="lg:hidden flex flex-col justify-center items-center w-12 h-12 relative z-60 group"
              onClick={toggleMenu}
              aria-label="Abrir menú"
            >
              <div className="flex flex-col gap-1.5 w-6">
                <span className="w-full h-0.5 bg-white transition-all duration-300"></span>
                <span className="w-full h-0.5 bg-white transition-all duration-300"></span>
                <span className="w-full h-0.5 bg-white transition-all duration-300"></span>
              </div>
            </button>
          </div>
        </nav>

        {/* Botón de Cerrar (X) - Fuera del menú para que siempre sea clickeable */}
        <button 
          ref={closeButtonRef}
          className="lg:hidden fixed top-8 right-6 flex items-center justify-center w-12 h-12 z-[60] pointer-events-none"
          style={{ opacity: 0, scale: 0 }}
          onClick={toggleMenu}
          aria-label="Cerrar menú"
        >
          <div className="relative w-6 h-6">
            <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-white transform -rotate-45"></span>
            <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-white transform rotate-45"></span>
          </div>
        </button>

        {/* Menú Mobile */}
        <div 
          ref={menuRef}
          className="lg:hidden fixed top-0 left-0 w-full h-screen bg-black backdrop-blur-xl z-50"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
          }}
        >
          {/* Header del menú móvil con logo */}
          <div className="container mx-auto px-6 pt-8 relative z-10">
            <div className="flex justify-between items-center">
              {/* Logo en el menú móvil */}
              <div ref={menuLogoRef} className="opacity-0">
                <Link to="/" onClick={() => navigateToPage('/')}>
                  <img 
                    src="/logo.svg" 
                    alt="CSA STUDIO" 
                    className="h-8 w-auto"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Contenido del menú centrado */}
          <div className="container mx-auto px-6 h-full flex items-center justify-center -mt-16 relative z-10">
            <div className="w-full max-w-md">
              <div className="flex flex-col gap-8">
                {menuItems.map((item, index) => (
                  item.type === 'page' ? (
                    <Link
                      key={item.id}
                      to={item.path}
                      ref={el => menuItemsRef.current[index] = el}
                      onClick={() => navigateToPage(item.path)}
                      className="text-white text-4xl font-gotham-cond-black uppercase tracking-widest text-center py-4 opacity-0 transform hover:text-red-600 transition-all duration-500 border-b border-white/10 last:border-b-0 hover:scale-105 hover:translate-x-2 group block"
                    >
                      {item.label}
                      <span className="block w-0 group-hover:w-16 h-0.5 bg-red-600 mx-auto mt-2 transition-all duration-500"></span>
                    </Link>
                  ) : (
                    <button
                      key={item.id}
                      ref={el => menuItemsRef.current[index] = el}
                      onClick={() => scrollToSection(item.id)}
                      className="text-white text-4xl font-gotham-cond-black uppercase tracking-widest text-center py-4 opacity-0 transform hover:text-red-600 transition-all duration-500 border-b border-white/10 last:border-b-0 hover:scale-105 hover:translate-x-2 group"
                    >
                      {item.label}
                      <span className="block w-0 group-hover:w-16 h-0.5 bg-red-600 mx-auto mt-2 transition-all duration-500"></span>
                    </button>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ESPACIO MUY PEQUEÑO */}
      <div className="h-1"></div>
    </>
  );
};

export default Header;