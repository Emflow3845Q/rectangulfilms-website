// components/Home/HeroSection.jsx
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const HeroSection = ({ 
  dynamicTexts, 
  isMobile, 
  isTablet, 
  onButtonClick 
}) => {
  const sloganRef = useRef(null);
  const textContainerRef = useRef(null);
  const buttonRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  // Calcular el breakpoint para diseño responsive
  const getBreakpoint = () => {
    if (typeof window === 'undefined') return 'desktop';
    
    const width = window.innerWidth;
    if (width < 480) return 'xs';
    if (width < 640) return 'sm';
    if (width < 768) return 'md';
    if (width < 1024) return 'lg';
    if (width < 1280) return 'xl';
    return '2xl';
  };

  // Obtener configuración responsive basada en breakpoint
  const getResponsiveConfig = () => {
    const breakpoint = getBreakpoint();
    
    const configs = {
      xs: { // < 480px
        fontSize: '1.5rem', // text-2xl
        lineHeight: '1.2',
        gap: '0.5rem',
        buttonPadding: '0.75rem 1rem',
        buttonFontSize: '0.875rem',
        animationDelay: 0.6,
        typeSpeed: { min: 50, max: 80 },
        deleteSpeed: { min: 30, max: 45 }
      },
      sm: { // 480px - 640px
        fontSize: '1.875rem', // text-3xl
        lineHeight: '1.25',
        gap: '0.75rem',
        buttonPadding: '0.875rem 1.25rem',
        buttonFontSize: '1rem',
        animationDelay: 0.7,
        typeSpeed: { min: 45, max: 75 },
        deleteSpeed: { min: 25, max: 40 }
      },
      md: { // 640px - 768px
        fontSize: '2.25rem', // text-4xl
        lineHeight: '1.3',
        gap: '1rem',
        buttonPadding: '1rem 1.5rem',
        buttonFontSize: '1.125rem',
        animationDelay: 0.8,
        typeSpeed: { min: 40, max: 70 },
        deleteSpeed: { min: 20, max: 35 }
      },
      lg: { // 768px - 1024px
        fontSize: '3rem', // text-5xl
        lineHeight: '1.3',
        gap: '1.25rem',
        buttonPadding: '1.125rem 2rem',
        buttonFontSize: '1.25rem',
        animationDelay: 0.9,
        typeSpeed: { min: 35, max: 65 },
        deleteSpeed: { min: 15, max: 30 }
      },
      xl: { // 1024px - 1280px
        fontSize: '3.75rem', // text-6xl
        lineHeight: '1.3',
        gap: '1.5rem',
        buttonPadding: '1.25rem 2.5rem',
        buttonFontSize: '1.5rem',
        animationDelay: 1.0,
        typeSpeed: { min: 30, max: 60 },
        deleteSpeed: { min: 10, max: 25 }
      },
      '2xl': { // > 1280px
        fontSize: '4.5rem', // text-7xl
        lineHeight: '1.3',
        gap: '2rem',
        buttonPadding: '1.5rem 3rem',
        buttonFontSize: '1.875rem',
        animationDelay: 1.2,
        typeSpeed: { min: 25, max: 55 },
        deleteSpeed: { min: 8, max: 20 }
      }
    };

    return configs[breakpoint] || configs.lg;
  };

  useEffect(() => {
    if (!textContainerRef.current) return;

    const container = textContainerRef.current;
    const config = getResponsiveConfig();
    
    // CREAR ELEMENTOS PARA LA ANIMACIÓN
    const text1 = document.createElement('span');
    const text2 = document.createElement('span');
    
    // Configurar estilos de los textos con valores responsive
    [text1, text2].forEach(text => {
      text.style.color = 'white';
      text.style.fontFamily = 'GOTHAM';
      text.style.fontWeight = '700';
      text.style.textTransform = 'uppercase';
      text.style.whiteSpace = 'nowrap';
      text.style.lineHeight = config.lineHeight;
      text.style.opacity = '0';
      text.style.willChange = 'transform';
      text.style.position = 'absolute';
      text.style.left = '0';
      text.style.top = '0';
      text.style.fontSize = config.fontSize;
      container.appendChild(text);
    });

    let currentIndex = 0;
    let isFirstVisible = true;
    let animationInterval;
    let isTyping = false;

    // FUNCIÓN DE ESCRIBIR CON EFECTO MÁQUINA DE ESCRIBIR
    const typeWriterEffect = (element, text, onComplete) => {
      isTyping = true;
      element.textContent = '';
      element.classList.remove('typewriter-cursor');
      
      let currentChar = 0;
      
      const typeChar = () => {
        if (currentChar < text.length) {
          element.textContent += text[currentChar];
          currentChar++;
          
          // Velocidad variable responsive
          const speed = Math.random() * (config.typeSpeed.max - config.typeSpeed.min) + config.typeSpeed.min;
          setTimeout(typeChar, speed);
        } else {
          // TERMINÓ DE ESCRIBIR - agregar cursor
          element.classList.add('typewriter-cursor');
          isTyping = false;
          if (onComplete) onComplete();
        }
      };
      
      typeChar();
    };

    // FUNCIÓN DE BORRADO CON EFECTO
    const deleteEffect = (element, onComplete) => {
      isTyping = true;
      const text = element.textContent;
      let currentChar = text.length;
      
      element.classList.remove('typewriter-cursor');
      
      const deleteChar = () => {
        if (currentChar > 0) {
          element.textContent = text.substring(0, currentChar - 1);
          currentChar--;
          
          // Velocidad de borrado más rápida y responsive
          const speed = Math.random() * (config.deleteSpeed.max - config.deleteSpeed.min) + config.deleteSpeed.min;
          setTimeout(deleteChar, speed);
        } else {
          isTyping = false;
          if (onComplete) onComplete();
        }
      };
      
      deleteChar();
    };

    const switchToNextText = () => {
      if (isTyping) return;

      currentIndex = (currentIndex + 1) % dynamicTexts.length;
      const nextText = dynamicTexts[currentIndex];

      const visibleText = isFirstVisible ? text1 : text2;
      const hiddenText = isFirstVisible ? text2 : text1;

      // Primero borrar el texto visible
      deleteEffect(visibleText, () => {
        // Luego escribir el nuevo texto en el elemento oculto
        hiddenText.style.opacity = '1';
        typeWriterEffect(hiddenText, nextText, () => {
          // Ocultar el texto anterior
          visibleText.style.opacity = '0';
          isFirstVisible = !isFirstVisible;
        });
      });
    };

    // INICIAR LA ANIMACIÓN CON EL PRIMER TEXTO
    const startAnimation = () => {
      setIsAnimating(true);
      text1.style.opacity = '1';
      typeWriterEffect(text1, dynamicTexts[0], () => {
        // Intervalo responsive
        setTimeout(() => {
          animationInterval = setInterval(switchToNextText, 3500);
        }, 1000);
      });
    };

    // Calcular el ancho máximo para el contenedor
    const calculateContainerWidth = () => {
      const longestText = dynamicTexts.reduce((a, b) => a.length > b.length ? a : b);
      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.whiteSpace = 'nowrap';
      tempSpan.textContent = longestText;
      tempSpan.style.fontFamily = 'GOTHAM';
      tempSpan.style.fontWeight = '700';
      tempSpan.style.textTransform = 'uppercase';
      tempSpan.style.fontSize = config.fontSize;
      tempSpan.style.lineHeight = config.lineHeight;
      container.appendChild(tempSpan);
      
      const width = tempSpan.offsetWidth;
      const height = tempSpan.offsetHeight;
      
      container.style.minWidth = `${width}px`;
      container.style.height = `${height}px`;
      setContainerWidth(width);
      
      container.removeChild(tempSpan);
      
      // Iniciar animación después de calcular el ancho
      startAnimation();
    };

    calculateContainerWidth();

    // Manejar resize
    const handleResize = () => {
      clearInterval(animationInterval);
      calculateContainerWidth();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(animationInterval);
      window.removeEventListener('resize', handleResize);
      if (container.contains(text1)) container.removeChild(text1);
      if (container.contains(text2)) container.removeChild(text2);
    };
  }, [dynamicTexts]);

  // Animación de entrada del hero
  useEffect(() => {
    const masterTL = gsap.timeline();
    const config = getResponsiveConfig();

    masterTL.fromTo(sloganRef.current,
      {
        y: isMobile ? 20 : isTablet ? 40 : 60,
        opacity: 0,
        scale: 1.05
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.9 : isTablet ? 1.2 : 1.5,
        ease: "power2.out"
      }
    );

    masterTL.fromTo(buttonRef.current,
      {
        y: isMobile ? 20 : isTablet ? 30 : 40,
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.7 : isTablet ? 1.0 : 1.2,
        ease: "power2.out"
      },
      `-=${config.animationDelay}`
    );

    return () => { };
  }, [isMobile, isTablet]);

  const config = getResponsiveConfig();

  return (
    <section 
      className="h-screen snap-start relative flex items-end justify-start overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-8 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-24"
      style={{ background: 'transparent' }}
    >
      <div className="relative z-10 text-left w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
        {/* CONTENEDOR PRINCIPAL CON DISPLAY FLEX COLUMN */}
        <div 
          className="flex flex-col items-start"
          style={{ gap: config.gap }}
        >
          {/* TÍTULO - ESTRUCTURA RESPONSIVE MEJORADA */}
          <h1
            ref={sloganRef}
            className="text-white uppercase tracking-tight opacity-0 w-full"
            style={{
              lineHeight: config.lineHeight
            }}
          >
            {/* Contenedor flex responsive */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-start flex-nowrap gap-2 sm:gap-3 md:gap-4 w-full">
              {/* "we are" con BBH_Sans_Bartle - NORMAL */}
              <span 
                className="block flex-shrink-0 whitespace-nowrap font-accent font-normal"
                style={{
                  fontSize: `calc(${config.fontSize} * 0.9)`
                }}
              >
                we are
              </span>
              
              {/* CONTENEDOR PARA TEXTO DINÁMICO CON GOTHAM BOLD */}
              <span
                ref={textContainerRef}
                className="inline-block relative flex-shrink-0 pointer-events-none min-w-0 font-gotham font-bold"
                style={{
                  fontSize: config.fontSize
                }}
              />
            </div>
          </h1>

          {/* BOTÓN - COMPLETAMENTE RESPONSIVE */}
          <button
            ref={buttonRef}
            onClick={onButtonClick}
            className="bg-white text-black font-gotham font-bold uppercase tracking-widest transition-all duration-300 border-2 border-white hover:bg-black hover:text-white hover:border-white opacity-0 mt-4 sm:mt-6 md:mt-8"
            style={{
              padding: config.buttonPadding,
              fontSize: config.buttonFontSize
            }}
          >
            who we are
          </button>
        </div>
      </div>

      <style jsx>{`
        .typewriter-cursor {
          border-right: 2px solid white;
          animation: blink-caret 0.7s step-end infinite;
          padding-right: 2px;
        }

        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: white; }
        }

        /* Responsive para el cursor */
        @media (max-width: 768px) {
          .typewriter-cursor {
            border-right: 1px solid white;
            padding-right: 1px;
          }
        }

        @media (max-width: 480px) {
          .typewriter-cursor {
            border-right: 1px solid white;
            padding-right: 1px;
            animation-duration: 0.8s;
          }
        }

        /* Mejoras de rendimiento para móviles */
        @media (max-width: 768px) {
          .hero-section {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;