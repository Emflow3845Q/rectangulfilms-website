import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const VideoSection = ({ isMobile, isTablet }) => {
  const marqueeRef = useRef(null);

  // Animación marquee responsive - HIPER LENTA
  useEffect(() => {
    if (!marqueeRef.current) return;

    const marqueeContent = marqueeRef.current;
    // EXTREMADAMENTE LENTO
    const duration = isMobile ? 120 : isTablet ? 150 : 180;
    const contentWidth = marqueeContent.scrollWidth / (isMobile ? 2 : 2);

    gsap.to(marqueeContent, {
      x: `-=${contentWidth}`,
      duration: duration,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
      }
    });
  }, [isMobile, isTablet]);

  return (
    <section className="h-screen snap-start relative bg-black overflow-hidden">
      {/* Video local como fondo completo */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        >
          <source src="/bg-hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay para mejor contraste */}
        <div className={`absolute inset-0 ${
          isMobile ? 'bg-black/40' : 
          isTablet ? 'bg-black/30' : 
          'bg-black/20'
        }`}></div>
      </div>

      {/* Marquee responsive - TEXTO GIGANTE - SUBIDO UN POQUITO MENOS */}
      <div className="absolute w-full overflow-hidden z-10" 
           style={{ 
             bottom: isMobile ? '6%' : isTablet ? '8%' : '10%' 
           }}>
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap"
          style={{ willChange: 'transform' }}
        >
          {[...Array(isMobile ? 6 : isTablet ? 8 : 10)].map((_, i) => (
            <span
              key={i}
              className="font-accent text-white uppercase tracking-tighter font-black opacity-90"
              style={{
                textShadow: '5px 5px 15px rgba(0,0,0,1)',
                fontSize: isMobile 
                  ? '8rem'  // GIGANTE
                  : isTablet 
                  ? '10rem'  // GIGANTE
                  : '12rem', // GIGANTE
                marginLeft: isMobile ? '5rem' : isTablet ? '6rem' : '8rem',
                marginRight: isMobile ? '5rem' : isTablet ? '6rem' : '8rem',
                lineHeight: '0.8',
                fontWeight: '900',
                letterSpacing: '-0.03em'
              }}
            >
              everything is a rectangle
            </span>
          ))}
        </div>
      </div>

      {/* Gradiente adicional para mejor legibilidad */}
      <div className={`absolute inset-0 bg-gradient-to-t ${
        isMobile ? 'from-black/90 via-transparent to-black/90' : 
        isTablet ? 'from-black/80 via-transparent to-black/80' :
        'from-black/70 via-transparent to-black/70'
      } z-5`}></div>
    </section>
  );
};

export default VideoSection;