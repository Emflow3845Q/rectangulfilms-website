// components/Home/HeroSection.jsx
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import VideoBackground from "../Background/RedDistortionBackground"; // Ajusta la ruta según tu estructura

const HeroSection = ({ 
  dynamicTexts, 
  isMobile, 
  isTablet, 
  onButtonClick 
}) => {
  const textContainerRef = useRef(null);
  const weAreRef = useRef(null);
  const buttonRef = useRef(null);
  const titleWrapperRef = useRef(null);

  // Quitamos el TempBackground y usamos VideoBackground

  // Resto del código de animaciones permanece igual...
  useEffect(() => {
    const initAnimations = () => {
      const tl = gsap.timeline({
        defaults: {
          duration: 1.2,
          ease: "power3.out"
        }
      });

      if (weAreRef.current) {
        tl.fromTo(
          weAreRef.current,
          { 
            y: "115%",
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.6,
            ease: "power3.out",
            delay: 0.8
          },
          0
        );
      }

      if (textContainerRef.current) {
        tl.fromTo(
          textContainerRef.current,
          { 
            x: "-102%",
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.5,
            ease: "expo.inOut",
            delay: 0.5
          },
          0.3
        );
      }

      if (buttonRef.current) {
        tl.fromTo(
          buttonRef.current,
          { 
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 1.2
          },
          0.8
        );
      }

      return tl;
    };

    const timeline = initAnimations();

    return () => {
      if (timeline) {
        timeline.kill();
      }
    };
  }, []);

  // Resto del código de texto dinámico permanece igual...
  useEffect(() => {
    if (!textContainerRef.current) return;

    const container = textContainerRef.current;
    
    const text1 = document.createElement('span');
    const text2 = document.createElement('span');
    
    [text1, text2].forEach(text => {
      text.style.color = 'white';
      text.style.fontFamily = 'GOTHAM';
      text.style.fontWeight = '700';
      text.style.textTransform = 'uppercase';
      text.style.whiteSpace = 'nowrap';
      text.style.lineHeight = '0.95';
      text.style.opacity = '0';
      text.style.position = 'absolute';
      text.style.left = '0';
      text.style.top = '0';
      text.style.width = '100%';
      text.style.textAlign = 'left';
      text.style.letterSpacing = '-0.05em';
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
      setTimeout(() => {
        text1.style.opacity = '1';
        typeWriterEffect(text1, dynamicTexts[0], () => {
          setTimeout(() => {
            animationInterval = setInterval(switchToNextText, 3500);
          }, 1000);
        });
      }, 1500);
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
      tempSpan.style.letterSpacing = '-0.05em';
      tempSpan.style.lineHeight = '0.95';
      
      if (isMobile) {
        tempSpan.style.fontSize = '3.2rem';
      } else if (isTablet) {
        tempSpan.style.fontSize = '4.5rem';
      } else {
        tempSpan.style.fontSize = '5.8rem';
      }
      
      tempSpan.textContent = longestText;
      container.appendChild(tempSpan);
      
      const width = tempSpan.offsetWidth;
      const height = tempSpan.offsetHeight;
      container.style.minWidth = `${width}px`;
      container.style.height = `${height}px`;
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
      className="h-screen snap-start relative flex items-end justify-start overflow-hidden px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-24 xs:pb-28 sm:pb-32 md:pb-36 lg:pb-40 xl:pb-44"
      style={{ background: 'transparent' }}
    >
      {/* Reemplazar TempBackground con VideoBackground */}
      <VideoBackground />

      <div className="relative z-10 text-left w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-0 px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8">
        <div 
          ref={titleWrapperRef}
          className="flex flex-col items-start space-y-3 xs:space-y-3 sm:space-y-4 md:space-y-4 lg:space-y-4 xl:space-y-4"
        >
          <h1 className="text-white uppercase flex flex-col xs:flex-row items-start xs:items-end justify-start flex-nowrap gap-1 xs:gap-2 sm:gap-2 md:gap-2 w-full leading-none overflow-hidden">
            <span 
              ref={weAreRef}
              className="block flex-shrink-0 whitespace-nowrap font-accent font-normal text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl pb-0"
              style={{ lineHeight: '0.95' }}
            >
              we are
            </span>
            
            <span
              ref={textContainerRef}
              className="inline-block relative flex-shrink-0 pointer-events-none min-w-0 font-gotham font-bold text-left overflow-visible tracking-tighter leading-none"
              style={{ 
                minHeight: '0.95em',
                fontSize: isMobile ? '3.2rem' : isTablet ? '4.5rem' : '5.8rem',
                letterSpacing: '-0.05em',
                lineHeight: '0.95',
                marginTop: '-0.02em'
              }}
            />
          </h1>

          <button
            ref={buttonRef}
            onClick={onButtonClick}
            className="bg-white text-black px-6 xs:px-7 sm:px-8 md:px-9 lg:px-10 xl:px-11 py-2.5 xs:py-3 sm:py-3.5 md:py-4 lg:py-4.5 font-gotham font-bold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-widest transition-all duration-300 border-2 border-white hover:bg-black hover:text-white hover:border-white mt-4 xs:mt-5 sm:mt-6 md:mt-7 lg:mt-8 xl:mt-9"
          >
            who we are
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;