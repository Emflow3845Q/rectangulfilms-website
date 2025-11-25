import React, { useRef } from "react";
import AnimatedMarquee from "../AnimatedMarquee";

const VideoSection = ({ isMobile, isTablet }) => {
  const sectionRef = useRef(null);

  return (
    <section 
      ref={sectionRef}
      className="h-screen snap-start relative bg-black overflow-hidden"
    >
      {/* Video de Vimeo como fondo completo */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <div style={{
          padding: '56.25% 0 0 0',
          position: 'relative',
          width: '100%',
          height: '100%'
        }}>
          <iframe 
            src="https://player.vimeo.com/video/1140278114?h=abcd123efg&autoplay=1&loop=1&muted=1&background=1&quality=1080p"
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            title="bg-hero"
          />
        </div>
        
        {/* Overlay para mejor contraste */}
        <div className={`absolute inset-0 ${
          isMobile ? 'bg-black/40' : 
          isTablet ? 'bg-black/30' : 
          'bg-black/20'
        }`} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}></div>
      </div>

      {/* Componente reutilizable de marquee animado */}
      <AnimatedMarquee 
        text="everything is a rectangle"
        repeatCount={15}
        isMobile={isMobile}
        isTablet={isTablet}
        bottomPosition="10%"
        animationDuration={0.15}
        fontSize={isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl"}
      />

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