// src/layout/Header/HeaderNav.jsx
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import useBackgroundColor from './hooks/useBackgroundColor';

// Componente interno para el efecto reveal
const RevealWrapper = ({ children, delay = 0, direction = "up" }) => {
  const wrapperRef = useRef(null);
  
  useEffect(() => {
    if (!wrapperRef.current) return;
    
    gsap.fromTo(wrapperRef.current,
      {
        y: direction === "up" ? "100%" : "-100%",
        opacity: 0
      },
      {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        delay: delay,
        ease: "power3.out",
        clearProps: "all"
      }
    );
  }, [delay, direction]);
  
  return (
    <div 
      ref={wrapperRef}
      className="overflow-hidden"
      style={{
        display: 'inline-block',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

const HeaderNav = ({ 
  isMenuOpen, 
  toggleLanguage, 
  currentLanguage, 
  toggleMenu, 
  t 
}) => {
  const logoRef = useRef(null);
  const { useBlackLogo } = useBackgroundColor();
  
  // Efecto para aplicar el filtro correcto al logo
  useEffect(() => {
    if (!logoRef.current) return;
    
    const logo = logoRef.current;
    
    // Transición suave del filtro
    if (isMenuOpen) {
      // Menú abierto: logo blanco siempre
      logo.style.filter = 'none';
      logo.style.opacity = '1';
    } else if (useBlackLogo) {
      // Fondo claro: logo negro
      logo.style.filter = 'brightness(0) saturate(100%)';
      logo.style.opacity = '1';
    } else {
      // Fondo oscuro/rojo: logo blanco
      logo.style.filter = 'none';
      logo.style.opacity = '1';
    }
    
    // Aplicar transición suave
    logo.style.transition = 'filter 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';
    
  }, [useBlackLogo, isMenuOpen]);

  // Determinar estilos del header
  const getHeaderStyles = () => {
    const styles = {
      backgroundColor: 'transparent',
      transition: 'all 0.4s ease'
    };
    
    if (isMenuOpen) {
      styles.mixBlendMode = 'normal';
    } else {
      styles.mixBlendMode = useBlackLogo ? 'normal' : 'difference';
    }
    
    return styles;
  };

  // Determinar color del texto
  const getTextColor = () => {
    if (isMenuOpen) {
      return 'text-white';
    }
    return useBlackLogo ? 'text-black' : 'text-white';
  };

  // Determinar color de las líneas del menú
  const getMenuLinesColor = () => {
    if (isMenuOpen) {
      return 'bg-white';
    }
    return useBlackLogo ? 'bg-black' : 'bg-white';
  };

  // Animación de zoom al pasar el cursor
  const handleLogoMouseEnter = () => {
    if (isMenuOpen) return;
    
    gsap.to(logoRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleLogoMouseLeave = () => {
    if (isMenuOpen) return;
    
    gsap.to(logoRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    
    gsap.timeline()
      .to(logoRef.current, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out"
      })
      .to(logoRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
          window.location.href = '/';
        }
      });
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] py-2 md:py-3 ${
        isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
      style={getHeaderStyles()}
    >
      <nav className="w-full px-4 sm:px-6 relative">
        <div className="flex justify-between items-center">
          {/* Logo - Imagen original BLANCA */}
          <RevealWrapper delay={0}>
            <Link 
              to="/" 
              className="flex items-center"
              onClick={handleLogoClick}
            >
              <div
                className="relative"
                onMouseEnter={handleLogoMouseEnter}
                onMouseLeave={handleLogoMouseLeave}
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <img
                  ref={logoRef}
                  src="/logo.png" // Logo original BLANCO
                  alt="Rectángulo Films"
                  className="h-7 sm:h-8 lg:h-10 w-auto cursor-pointer"
                  style={{
                    transformOrigin: 'center',
                    willChange: 'transform, filter'
                  }}
                />
              </div>
            </Link>
          </RevealWrapper>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Botón de idioma */}
            <RevealWrapper delay={0.1}>
              <button
                onClick={toggleLanguage}
                className={`text-sm uppercase tracking-tighter hover:text-red-600 transition-colors duration-300 px-2 py-1 font-gotham font-bold ${getTextColor()}`}
                style={{ 
                  letterSpacing: '-0.05em'
                }}
              >
                {currentLanguage === 'en' ? 'ES' : 'EN'}
              </button>
            </RevealWrapper>

            {/* Botón de menú */}
            <RevealWrapper delay={0.2}>
              <button
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 relative group"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? t('header.aria.closeMenu') : t('header.aria.openMenu')}
              >
                {!isMenuOpen ? (
                  <div className="flex flex-col justify-center items-center w-5 sm:w-6 gap-1 sm:gap-1.5">
                    <span 
                      className={`w-full h-0.5 transition-all duration-300 group-hover:bg-red-600 ${getMenuLinesColor()}`}
                    ></span>
                    <span 
                      className={`w-full h-0.5 transition-all duration-300 group-hover:bg-red-600 ${getMenuLinesColor()}`}
                    ></span>
                    <span 
                      className={`w-full h-0.5 transition-all duration-300 group-hover:bg-red-600 ${getMenuLinesColor()}`}
                    ></span>
                  </div>
                ) : (
                  <div className="relative h-6 overflow-hidden">
                    <div className="flex flex-col transition-all duration-300 group-hover:-translate-y-6">
                      <span className="text-white text-xs uppercase tracking-tighter font-gotham font-bold h-6 flex items-center justify-center"
                        style={{ letterSpacing: '-0.05em' }}>
                        CLOSE
                      </span>
                      <span className="text-red-600 text-xs uppercase tracking-tighter font-gotham font-bold h-6 flex items-center justify-center"
                        style={{ letterSpacing: '-0.05em' }}>
                        CLOSE
                      </span>
                    </div>
                  </div>
                )}
              </button>
            </RevealWrapper>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderNav;