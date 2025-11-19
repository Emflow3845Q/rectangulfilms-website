import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const VideoSection = ({ isMobile, isTablet }) => {
  const marqueeRef = useRef(null);

  // Animación marquee responsive
  useEffect(() => {
    if (!marqueeRef.current) return;

    const marqueeContent = marqueeRef.current;
    const duration = isMobile ? 20 : isTablet ? 22 : 25;
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
          <source src="/videos/DemoRectangulo2025.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay para mejor contraste */}
        <div className={`absolute inset-0 ${
          isMobile ? 'bg-black/40' : 
          isTablet ? 'bg-black/30' : 
          'bg-black/20'
        }`}></div>
      </div>

      {/* Marquee responsive - TEXTO MÁS GRANDE */}
      <div className="absolute bottom-0 w-full overflow-hidden z-10 pb-3 xs:pb-4 sm:pb-6 md:pb-8">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap"
          style={{ willChange: 'transform' }}
        >
          {[...Array(isMobile ? 6 : isTablet ? 8 : 10)].map((_, i) => (
            <span
              key={i}
              className={`font-accent text-white uppercase tracking-tighter font-black ${
                isMobile 
                  ? 'text-4xl xs:text-5xl mx-3 xs:mx-4 opacity-90' 
                  : isTablet
                  ? 'text-6xl sm:text-7xl mx-4 sm:mx-6 opacity-85'
                  : 'text-7xl sm:text-8xl md:text-9xl lg:text-9xl xl:text-10xl mx-6 sm:mx-8 md:mx-10 lg:mx-12 opacity-80'
              }`}
              style={{
                textShadow: '2px 2px 6px rgba(0,0,0,0.6)'
              }}
            >
              everything is a rectangle
            </span>
          ))}
        </div>
      </div>

      {/* Gradiente adicional para mejor legibilidad */}
      <div className={`absolute inset-0 bg-gradient-to-t ${
        isMobile ? 'from-black/70 via-transparent to-black/70' : 
        isTablet ? 'from-black/60 via-transparent to-black/60' :
        'from-black/50 via-transparent to-black/50'
      } z-5`}></div>
    </section>
  );
};

export default VideoSection;