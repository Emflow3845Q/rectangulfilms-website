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

  useEffect(() => {
    if (!textContainerRef.current) return;

    const container = textContainerRef.current;
    
    // CREAR ELEMENTOS PARA LA ANIMACIÓN
    const text1 = document.createElement('span');
    const text2 = document.createElement('span');
    
    // Configurar estilos de los textos - CON LAS FUENTES LOCALES
    [text1, text2].forEach(text => {
      text.style.color = 'white';
      text.style.fontFamily = 'GOTHAM';
      text.style.fontWeight = '700';
      text.style.textTransform = 'uppercase';
      text.style.whiteSpace = 'nowrap';
      text.style.lineHeight = 'inherit';
      text.style.opacity = '0';
      text.style.willChange = 'transform';
      text.style.position = 'absolute';
      text.style.left = '0';
      text.style.top = '0';
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
          
          // Velocidad variable para efecto más natural
          const speed = Math.random() * 40 + 40; // 40-80ms
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
          
          // Velocidad de borrado más rápida
          const speed = Math.random() * 25 + 25; // 25-50ms
          setTimeout(deleteChar, speed);
        } else {
          isTyping = false;
          if (onComplete) onComplete();
        }
      };
      
      deleteChar();
    };

    const switchToNextText = () => {
      if (isTyping) return; // No hacer nada si aún está escribiendo/borrando

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
        // Iniciar el intervalo después de que termine la escritura inicial
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
      container.appendChild(tempSpan);
      
      const width = tempSpan.offsetWidth;
      container.style.minWidth = `${width}px`;
      container.style.height = `${tempSpan.offsetHeight}px`; // Asegurar altura
      container.removeChild(tempSpan);
      
      // Iniciar animación después de calcular el ancho
      startAnimation();
    };

    calculateContainerWidth();

    return () => {
      clearInterval(animationInterval);
      // Limpiar elementos
      if (container.contains(text1)) container.removeChild(text1);
      if (container.contains(text2)) container.removeChild(text2);
    };
  }, [dynamicTexts]);

  // Animación de entrada del hero
  useEffect(() => {
    const masterTL = gsap.timeline();

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
      isMobile ? "-=0.6" : isTablet ? "-=0.7" : "-=0.8"
    );

    return () => { };
  }, [isMobile, isTablet]);

  return (
    <section 
      className="h-screen snap-start relative flex items-end justify-start overflow-hidden px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 pb-6 xs:pb-8 sm:pb-10 md:pb-14 lg:pb-20"
      style={{ background: 'transparent' }}
    >
      <div className="relative z-10 text-left w-full max-w-4xl mx-0 px-2 xs:px-3 sm:px-4 md:px-6">
        {/* CONTENEDOR PRINCIPAL CON DISPLAY FLEX COLUMN */}
        <div className="flex flex-col items-start space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-8">
          {/* TÍTULO - AHORA EN SU PROPIA LÍNEA */}
          <h1
            ref={sloganRef}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-white uppercase tracking-tight opacity-0 leading-tight sm:leading-normal flex flex-col xs:flex-row items-start xs:items-center justify-start flex-nowrap gap-1 xs:gap-2 sm:gap-3 md:gap-4 w-full"
          >
            {/* "we are" con BBH_Sans_Bartle - NORMAL */}
            <span 
              className="block flex-shrink-0 whitespace-nowrap font-accent font-normal"
            >
              we are
            </span>
            
            {/* CONTENEDOR PARA TEXTO DINÁMICO CON GOTHAM BOLD */}
            <span
              ref={textContainerRef}
              className="inline-block relative flex-shrink-0 pointer-events-none min-w-0 font-gotham font-bold"
            />
          </h1>

          {/* BOTÓN - EFECTO HOVER SIMPLE Y ELEGANTE */}
          <button
            ref={buttonRef}
            onClick={onButtonClick}
            className="bg-white text-black px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 py-1.5 xs:py-2 sm:py-2.5 md:py-3 lg:py-4 font-gotham font-bold text-sm xs:text-base sm:text-lg md:text-xl uppercase tracking-widest transition-all duration-300 border-2 border-white hover:bg-black hover:text-white hover:border-white opacity-0 mt-2 xs:mt-3 sm:mt-4"
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

        @media (max-width: 768px) {
          .typewriter-cursor {
            border-right: 1px solid white;
            padding-right: 1px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;