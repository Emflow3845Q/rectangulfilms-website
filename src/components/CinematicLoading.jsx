import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CameraFrameUI = ({ onLoadingComplete }) => {
  const containerRef = useRef(null);
  const noiseRef = useRef(null);
  const logoRef = useRef(null);
  const overlayRef = useRef(null);
  const cameraFrameRef = useRef(null);
  
  const [isGlitching, setIsGlitching] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    // Canvas noise effect
    const canvas = noiseRef.current;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const drawNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() > 0.8) {
          const value = Math.random() * 255;
          data[i] = value;
          data[i + 1] = value;
          data[i + 2] = value;
          data[i + 3] = 20;
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    let animationId;
    const loop = () => {
      drawNoise();
      animationId = requestAnimationFrame(loop);
    };
    loop();

    // Animación completa del logo
    setTimeout(() => {
      setLogoVisible(true);
      
      const masterTL = gsap.timeline();
      
      // 1. Aparece desenfocado
      masterTL.fromTo(logoRef.current,
        {
          opacity: 0,
          scale: 0.7,
          filter: "blur(30px)"
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(30px)",
          duration: 0.8,
          ease: "power2.out"
        }
      )
      // 2. Se enfoca progresivamente
      .to(logoRef.current, {
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power2.inOut"
      })
      // 3. SE QUEDA ENFOCADO MÁS TIEMPO - 1.5 segundos
      .to({}, { duration: 1.5 })
      // 4. SALIDA MÁS EXTREMA - escala enorme y movimiento exagerado
      .to(logoRef.current, {
        scale: 12, // MUCHO MÁS GRANDE - 12x
        y: -500,  // MUCHO MÁS MOVIMIENTO HACIA ARRIBA - 500px
        opacity: 0,
        duration: 1.2, // Más tiempo para apreciar el movimiento extremo
        ease: "power2.in",
        onComplete: () => {
          // 5. Transición INMEDIATA sin pantalla blanca
          onLoadingComplete();
        }
      })
      // 6. La interfaz de cámara también desaparece completamente
      .to(cameraFrameRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.8") // Empieza al mismo tiempo que el logo sale
      // 7. Todo el container desaparece completamente
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3"); // Un poco antes del final

    }, 500);

    // Glitch effects solo durante el enfoque
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.6 && logoVisible) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 100);
      }
    }, 800);

    return () => {
      clearInterval(glitchInterval);
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [onLoadingComplete, logoVisible]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black font-mono"
    >
      {/* Noise Canvas */}
      <canvas
        ref={noiseRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ imageRendering: 'pixelated' }}
      />

      {/* MARCO COMPLETO DE CÁMARA - SOLO BORDES ROJOS */}
      <div ref={cameraFrameRef}>
        {/* Marco exterior - Responsive */}
        <div className="absolute inset-4 sm:inset-6 md:inset-8 border-2 border-gray-600 rounded-lg pointer-events-none">
          
          {/* ESQUINAS ROJAS - Responsive */}
          <div className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-red-500"></div>
          <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-red-500"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-red-500"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-red-500"></div>
          
          {/* BORDES ROJOS - Líneas horizontales - Responsive */}
          <div className="absolute top-0 left-8 right-8 sm:left-12 sm:right-12 md:left-16 md:right-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          <div className="absolute bottom-0 left-8 right-8 sm:left-12 sm:right-12 md:left-16 md:right-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          
          {/* BORDES ROJOS - Líneas verticales - Responsive */}
          <div className="absolute left-0 top-8 bottom-8 sm:top-12 sm:bottom-12 md:top-16 md:bottom-16 w-px bg-gradient-to-b from-transparent via-red-500 to-transparent"></div>
          <div className="absolute right-0 top-8 bottom-8 sm:top-12 sm:bottom-12 md:top-16 md:bottom-16 w-px bg-gradient-to-b from-transparent via-red-500 to-transparent"></div>
        </div>

        {/* INTERFAZ DE CÁMARA - Responsive */}
        
        {/* Barra Superior - Responsive */}
        <div className="absolute top-4 sm:top-6 md:top-8 lg:top-12 left-4 sm:left-6 md:left-8 lg:left-16 right-4 sm:right-6 md:right-8 lg:right-16 flex justify-between items-center text-white text-xs sm:text-sm">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-500 font-bold text-xs sm:text-sm">REC</span>
            </div>
            <div className="text-white/90 text-xs sm:text-sm">00:04:12</div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
            <div className="text-white/80 text-xs sm:text-sm hidden xs:block">4K 24p</div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="text-white/60 text-[10px] sm:text-xs">BATT</div>
              {/* BATERÍA VERDE - Responsive */}
              <div className="w-12 sm:w-16 md:w-20 h-1 sm:h-2 bg-gray-700 rounded border border-gray-600">
                <div className="h-full bg-green-500 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Izquierdo - Configuración - Responsive */}
        <div className="absolute left-4 sm:left-6 md:left-8 lg:left-16 top-1/2 transform -translate-y-1/2 space-y-4 sm:space-y-5 md:space-y-6 text-white text-sm sm:text-base md:text-lg">
          <div className="text-white font-bold">F2.8</div>
          <div className="text-white/90">1/50</div>
          <div className="text-white/80">ISO 800</div>
          <div className="text-white/70">+0.0</div>
        </div>

        {/* Panel Derecho - Niveles - Responsive */}
        <div className="absolute right-4 sm:right-6 md:right-8 lg:right-16 top-1/2 transform -translate-y-1/2 space-y-4 sm:space-y-6 md:space-y-8">
          <div className="text-white/80 text-xs sm:text-sm text-center">AUDIO</div>
          {/* NIVELES DE AUDIO VERDES - Responsive */}
          <div className="w-6 h-20 sm:w-7 sm:h-24 md:w-8 md:h-32 bg-gray-800 rounded border border-gray-600 relative">
            <div className="absolute bottom-0 left-0 right-0 bg-green-500 rounded h-3/4"></div>
            <div className="absolute top-1/4 left-0 right-0 h-px bg-green-500/60"></div>
          </div>
        </div>

        {/* Panel Inferior - Responsive */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 left-4 sm:left-6 md:left-8 lg:left-16 right-4 sm:right-6 md:right-8 lg:right-16 flex justify-between items-center text-white/80 text-[10px] sm:text-xs md:text-sm">
          <div className="hidden xs:block">S-LOG3</div>
          <div>5600K</div>
          <div className="hidden sm:block">MANUAL</div>
          <div className="hidden md:block">AF-C</div>
          <div className="hidden lg:block">100M 4:2:2</div>
        </div>

        {/* ELEMENTOS DE ENFOQUE - BORDES ROJOS - Responsive */}
        
        {/* Cruz de enfoque central - Responsive */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 pointer-events-none">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-red-500/60"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-red-500/60"></div>
          <div className="absolute inset-1 sm:inset-1.5 md:inset-2 border border-red-500/40 rounded-full"></div>
        </div>

        {/* Puntos de enfoque ROJOS - Responsive */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 border border-red-500/30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 sm:left-1/3 transform -translate-y-1/2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 border border-red-500/30 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 sm:right-1/3 transform -translate-y-1/2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 border border-red-500/30 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 border border-red-500/30 rounded-full"></div>

        {/* Grid de tercios ROJO - Responsive */}
        <div className="absolute inset-4 sm:inset-6 md:inset-8 lg:inset-12 pointer-events-none opacity-30">
          <div className="absolute top-1/3 left-0 right-0 h-px bg-red-500/40"></div>
          <div className="absolute top-2/3 left-0 right-0 h-px bg-red-500/40"></div>
          <div className="absolute left-1/3 top-0 bottom-0 w-px bg-red-500/40"></div>
          <div className="absolute left-2/3 top-0 bottom-0 w-px bg-red-500/40"></div>
        </div>
      </div>

      {/* LOGO.SVG EN EL CENTRO CON EFECTO COMPLETO - Responsive */}
      {logoVisible && (
        <div 
          ref={logoRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0"
        >
          {/* Usar el archivo logo.svg real */}
          <div className="relative">
            <img 
              src="/logo.svg" 
              alt="Rectángulo Films"
              className="w-48 h-24 sm:w-64 sm:h-32 md:w-80 md:h-40 object-contain filter blur-0" // El blur se controla con GSAP
              onError={(e) => {
                // Fallback si el SVG no carga
                e.target.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'w-48 h-24 sm:w-64 sm:h-32 md:w-80 md:h-40 flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl font-bold bg-black text-center';
                fallback.innerHTML = 'RECTÁNGULO<br/>FILMS';
                e.target.parentNode.appendChild(fallback);
              }}
            />

            {/* Efectos de Glitch sobre el logo */}
            {isGlitching && (
              <>
                {/* Glitch layer 1 */}
                <div
                  className="absolute inset-0 opacity-70 mix-blend-overlay"
                  style={{ 
                    transform: 'translate(4px, -2px)',
                    filter: 'hue-rotate(90deg)'
                  }}
                >
                  <img 
                    src="/logo.svg" 
                    alt=""
                    className="w-48 h-24 sm:w-64 sm:h-32 md:w-80 md:h-40 object-contain"
                  />
                </div>
                
                {/* Glitch layer 2 */}
                <div
                  className="absolute inset-0 opacity-50 mix-blend-overlay"
                  style={{ 
                    transform: 'translate(-3px, 1px)',
                    filter: 'hue-rotate(180deg)'
                  }}
                >
                  <img 
                    src="/logo.svg" 
                    alt=""
                    className="w-48 h-24 sm:w-64 sm:h-32 md:w-80 md:h-40 object-contain"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Overlay para efectos de glitch */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-red-600 opacity-0 pointer-events-none mix-blend-overlay"
      />

      {/* Efecto de vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.6) 100%)'
        }}
      ></div>

      {/* Línea de scanning roja */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent animate-scan"></div>
      </div>
    </div>
  );
};

// Agregar los keyframes para la animación de scanning
const styles = `
  @keyframes scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(400%); }
  }
  .animate-scan {
    animation: scan 3s linear infinite;
  }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default CameraFrameUI;