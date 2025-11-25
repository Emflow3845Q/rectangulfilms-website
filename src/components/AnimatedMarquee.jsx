import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const AnimatedMarquee = ({ 
  text = "everything is a rectangle", 
  repeatCount = 6,
  isMobile = false, 
  isTablet = false,
  bottomPosition = "10%",
  animationDuration = 0.8
}) => {
  const marqueeRef = useRef(null);
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!marqueeRef.current || !containerRef.current) return;

    const marqueeContent = marqueeRef.current;
    const container = containerRef.current;
    const duration = isMobile ? 120 : isTablet ? 150 : 180;
    const contentWidth = marqueeContent.scrollWidth / (isMobile ? 2 : 2);

    // El texto YA ESTÁ EN SU POSICIÓN pero invisible y más abajo
    gsap.set(marqueeContent.children, {
      y: 60, // Menos distancia para que sea más sutil
      opacity: 0
    });

    // Animación del scroll horizontal (siempre activa)
    const horizontalAnimation = gsap.to(marqueeContent, {
      x: `-=${contentWidth}`,
      duration: duration,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
      }
    });

    // Scroll trigger MUCHO MÁS ESTRICTO - solo cuando está bien visible
    const handleScroll = () => {
      if (hasAnimated.current) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // El elemento debe estar en la parte INFERIOR de la pantalla para activarse
      // Solo se activa cuando el top del elemento está entre 40% y 70% del viewport
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      
      // Más estricto: debe estar en la mitad inferior de la pantalla
      const shouldAnimate = elementTop < windowHeight * 0.7 && 
                           elementTop > windowHeight * 0.3 &&
                           elementBottom > windowHeight * 0.5;
      
      if (shouldAnimate) {
        hasAnimated.current = true;
        
        // Animación más rápida y sutil
        gsap.to(marqueeContent.children, {
          y: 0,
          opacity: 0.9,
          duration: 0.6, // Más rápido
          stagger: 0.02, // Menos stagger
          ease: "power2.out"
        });
      }
    };

    // Usar requestAnimationFrame para mejor performance
    let rafId;
    const scrollHandler = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', scrollHandler, { passive: true });
    
    document.addEventListener('lenis:scroll', scrollHandler);

    // Verificar después de que todo esté cargado
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(handleScroll);
    }, 500);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', scrollHandler);
      document.removeEventListener('lenis:scroll', scrollHandler);
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      horizontalAnimation.kill();
    };
  }, [isMobile, isTablet, animationDuration]);

  const count = isMobile ? Math.floor(repeatCount * 0.6) : isTablet ? Math.floor(repeatCount * 0.8) : repeatCount;

  return (
    <div 
      ref={containerRef}
      className="absolute w-full overflow-hidden z-10" 
      style={{ 
        bottom: isMobile ? '6%' : isTablet ? '8%' : bottomPosition
      }}
    >
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap"
        style={{ willChange: 'transform' }}
      >
        {[...Array(count)].map((_, i) => (
          <span
            key={i}
            className="font-sans text-white uppercase tracking-tighter font-black"
            style={{
              textShadow: '5px 5px 15px rgba(0,0,0,1)',
              fontSize: isMobile 
                ? '8rem'
                : isTablet 
                ? '10rem'
                : '12rem',
              marginLeft: isMobile ? '5rem' : isTablet ? '6rem' : '8rem',
              marginRight: isMobile ? '5rem' : isTablet ? '6rem' : '8rem',
              lineHeight: '0.8',
              fontWeight: '900',
              letterSpacing: '-0.03em'
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnimatedMarquee;