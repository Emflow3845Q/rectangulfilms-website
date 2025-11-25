// components/Home/HeroSection.jsx
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const HeroSection = ({ 
  dynamicTexts, 
  isMobile, 
  isTablet, 
  onButtonClick 
}) => {
  const weAreRef = useRef(null);
  const textContainerRef = useRef(null);
  const buttonRef = useRef(null);

  // Animación de entrada simple y elegante
  useEffect(() => {
    const tl = gsap.timeline();

    // Animación simultánea de todo el texto
    tl.fromTo([weAreRef.current, textContainerRef.current],
      {
        y: 20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1
      }
    );

    // Botón con fade in simple
    tl.fromTo(buttonRef.current,
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.3" // Comienza antes de que termine la animación del texto
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Animación del texto dinámico (solo la escritura)
  useEffect(() => {
    if (!textContainerRef.current) return;

    const container = textContainerRef.current;
    
    // CREAR ELEMENTOS PARA LA ANIMACIÓN
    const text1 = document.createElement('span');
    const text2 = document.createElement('span');
    
    // Configurar estilos de los textos
    [text1, text2].forEach(text => {
      text.style.color = 'white';
      text.style.fontFamily = 'GOTHAM';
      text.style.fontWeight = '700';
      text.style.textTransform = 'uppercase';
      text.style.whiteSpace = 'nowrap';
      text.style.lineHeight = 'inherit';
      text.style.opacity = '0';
      text.style.position = 'absolute';
      text.style.left = '0';
      text.style.top = '0';
      text.style.width = '100%';
      text.style.textAlign = 'left';
      container.appendChild(text);
    });

    let currentIndex = 0;
    let isFirstVisible = true;
    let animationInterval;
    let isTyping = false;

    const typeWriterEffect = (element, text, onComplete) => {
      isTyping = true;
      element.textContent = '';
      
      let currentChar = 0;
      
      const typeChar = () => {
        if (currentChar < text.length) {
          element.textContent += text[currentChar];
          currentChar++;
          const speed = Math.random() * 40 + 40;
          setTimeout(typeChar, speed);
        } else {
          isTyping = false;
          if (onComplete) onComplete();
        }
      };
      
      typeChar();
    };

    const deleteEffect = (element, onComplete) => {
      isTyping = true;
      const text = element.textContent;
      let currentChar = text.length;
      
      const deleteChar = () => {
        if (currentChar > 0) {
          element.textContent = text.substring(0, currentChar - 1);
          currentChar--;
          const speed = Math.random() * 25 + 25;
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

      deleteEffect(visibleText, () => {
        hiddenText.style.opacity = '1';
        typeWriterEffect(hiddenText, nextText, () => {
          visibleText.style.opacity = '0';
          isFirstVisible = !isFirstVisible;
        });
      });
    };

    const startAnimation = () => {
      text1.style.opacity = '1';
      typeWriterEffect(text1, dynamicTexts[0], () => {
        setTimeout(() => {
          animationInterval = setInterval(switchToNextText, 3500);
        }, 1000);
      });
    };

    const calculateContainerWidth = () => {
      const longestText = dynamicTexts.reduce((a, b) => a.length > b.length ? a : b);
      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.whiteSpace = 'nowrap';
      tempSpan.style.fontFamily = 'GOTHAM';
      tempSpan.style.fontWeight = '700';
      tempSpan.style.textTransform = 'uppercase';
      
      if (isMobile) {
        tempSpan.style.fontSize = '1.5rem';
      } else if (isTablet) {
        tempSpan.style.fontSize = '2.25rem';
      } else {
        tempSpan.style.fontSize = '3rem';
      }
      
      tempSpan.textContent = longestText;
      container.appendChild(tempSpan);
      
      const width = tempSpan.offsetWidth;
      container.style.minWidth = `${width}px`;
      container.style.height = `${tempSpan.offsetHeight}px`;
      container.removeChild(tempSpan);
      
      startAnimation();
    };

    calculateContainerWidth();

    return () => {
      clearInterval(animationInterval);
      if (container.contains(text1)) container.removeChild(text1);
      if (container.contains(text2)) container.removeChild(text2);
    };
  }, [dynamicTexts, isMobile, isTablet]);

  return (
    <section 
      className="h-screen snap-start relative flex items-end justify-start overflow-hidden px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-8 xs:pb-10 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-24"
      style={{ background: 'transparent' }}
    >
      <div className="relative z-10 text-left w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-0 px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="flex flex-col items-start space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 xl:space-y-9">
          {/* TÍTULO */}
          <h1 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-white uppercase tracking-tight leading-tight sm:leading-snug md:leading-normal flex flex-col xs:flex-row items-start xs:items-baseline justify-start flex-nowrap gap-1 xs:gap-2 sm:gap-3 md:gap-4 w-full">
            <span 
              ref={weAreRef}
              className="block flex-shrink-0 whitespace-nowrap font-accent font-normal mt-0.5 xs:mt-0 opacity-0"
            >
              we are
            </span>
            
            <span
              ref={textContainerRef}
              className="inline-block relative flex-shrink-0 pointer-events-none min-w-0 font-gotham font-bold text-left overflow-visible opacity-0"
              style={{ minHeight: '1.2em' }}
            />
          </h1>

          {/* BOTÓN */}
          <button
            ref={buttonRef}
            onClick={onButtonClick}
            className="bg-white text-black px-5 xs:px-6 sm:px-7 md:px-8 lg:px-10 xl:px-12 py-2 xs:py-2.5 sm:py-3 md:py-3.5 lg:py-4 font-gotham font-bold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-widest transition-all duration-300 border-2 border-white hover:bg-black hover:text-white hover:border-white mt-3 xs:mt-4 sm:mt-5 md:mt-6 lg:mt-7 xl:mt-8 opacity-0"
          >
            who we are
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;