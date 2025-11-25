// components/LenisProvider.jsx - VERSIÓN ACTUALIZADA
import React, { useEffect } from 'react';

const LenisProvider = ({ children }) => {
  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        smoothTouch: true,
        wheelMultiplier: 1.2,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientation: 'vertical',
        touchInertiaMultiplier: 20,
        
        // Callback de scroll mejorado
        onScroll: (e) => {
          // Emitir evento personalizado para que otros componentes lo capturen
          const scrollEvent = new CustomEvent('lenis:scroll', { 
            detail: { 
              scroll: e.animatedScroll,
              velocity: e.velocity,
              direction: e.direction
            } 
          });
          document.dispatchEvent(scrollEvent);
        }
      });

      // RAF function optimizada
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Manejar resize para recalcular dimensiones
      const handleResize = () => {
        lenis.resize();
      };

      // Manejar visibilidad de la página
      const handleVisibilityChange = () => {
        if (document.hidden) {
          lenis.stop();
        } else {
          lenis.start();
        }
      };

      window.addEventListener('resize', handleResize);
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        lenis.destroy();
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        document.removeEventListener('lenis:scroll', () => {});
      };
    };

    initLenis();

  }, []);

  return <>{children}</>;
};

export default LenisProvider;