import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CameraFrameUI = ({ onLoadingComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const masterTL = gsap.timeline();
    
    // Logo aparece con buena animación en 0.6s
    masterTL.fromTo(logoRef.current,
      {
        opacity: 0,
        scale: 0.85
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      }
    )
    // Barra de progreso en 1.2s
    .to(progressRef.current, {
      scaleX: 1,
      duration: 1.2,
      ease: "power1.out"
    }, "-=0.3")
    // Delay final para completar 2s total
    .to({}, { 
      duration: 0.4,
      onComplete: onLoadingComplete
    });

  }, [onLoadingComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden bg-black-pure"
    >
      {/* FONDO CON MEJOR CONTRASTE */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-96 opacity-35"
          style={{
            background: `radial-gradient(ellipse at center, 
              rgba(236, 35, 60, 0.6) 0%, 
              rgba(236, 35, 60, 0.35) 40%,
              transparent 70%)`,
            filter: 'blur(60px)'
          }}
        />
      </div>

      {/* CONTENIDO PRINCIPAL - LIMPIO */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        
        {/* LOGO BIEN VISIBLE */}
        <div 
          ref={logoRef}
          className="relative opacity-0"
        >
          <div className="relative">
            <img 
              src="/logo.svg" 
              alt="Rectángulo Films"
              className="w-80 h-40 sm:w-96 sm:h-48 object-contain filter brightness-110 contrast-105"
            />
            
            {/* RESPLANDOR MEJORADO */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-35"
              style={{
                background: 'radial-gradient(circle, rgba(236, 35, 60, 0.7) 0%, rgba(236, 35, 60, 0.3) 40%, transparent 65%)',
                filter: 'blur(50px)',
                zIndex: -1
              }}
            />
          </div>
        </div>

        {/* BARRA DE PROGRESO */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="w-56 h-1 bg-gray-dark/40 rounded-full overflow-hidden">
            <div 
              ref={progressRef}
              className="h-full bg-gradient-to-r from-red-primary to-red-600 rounded-full"
              style={{
                transform: 'scaleX(0)',
                transformOrigin: 'left center'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraFrameUI;