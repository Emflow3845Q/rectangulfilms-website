import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const VideoSection = ({ isMobile, isTablet }) => {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    // Inicializar animaciones usando la misma lógica que revealText
    initVideoAnimations();

    if (!marqueeRef.current) return;

    const marqueeContent = marqueeRef.current;
    const duration = isMobile ? 120 : isTablet ? 150 : 180;
    const contentWidth = marqueeContent.scrollWidth / (isMobile ? 2 : 2);

    // Animación del scroll horizontal (se mantiene igual)
    const horizontalAnimation = gsap.to(marqueeContent, {
      x: `-=${contentWidth}`,
      duration: duration,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
      }
    });

    // Cleanup
    return () => {
      horizontalAnimation.kill();
    };
  }, [isMobile, isTablet]);

  // Función que usa la misma lógica que revealText del HomeBanner
  const initVideoAnimations = () => {
    // Animación para el contenedor del video
    if (videoContainerRef.current) {
      gsap.fromTo(videoContainerRef.current, {
        y: '100%',
        opacity: 0,
        rotationX: 85,
        transformOrigin: 'bottom center'
      }, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top 70%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Animación para los elementos del marquee (similar a revealText)
    if (marqueeRef.current) {
      const marqueeItems = marqueeRef.current.querySelectorAll('.js-marquee-item');
      if (marqueeItems.length > 0) {
        gsap.fromTo(marqueeItems, {
          y: '115%',
          opacity: 0,
          rotationX: 85,
          transformOrigin: 'bottom center'
        }, {
          y: 0,
          opacity: 0.9,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      }
    }

    // Animación para overlays
    const overlay = sectionRef.current?.querySelector('.bg-overlay');
    if (overlay) {
      gsap.fromTo(overlay, {
        y: '100%',
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out"
      });
    }

    // Animación para gradiente
    const gradient = sectionRef.current?.querySelector('.bg-gradient');
    if (gradient) {
      gsap.fromTo(gradient, {
        y: '100%',
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.6,
        ease: "power3.out"
      });
    }
  };

  const count = isMobile ? Math.floor(15 * 0.6) : isTablet ? Math.floor(15 * 0.8) : 15;

  return (
    <section 
      ref={sectionRef}
      className="h-screen snap-start relative bg-black overflow-hidden"
    >
      {/* Video de Vimeo como fondo completo - con animación slide-up */}
      <div 
        ref={videoContainerRef}
        className="absolute inset-0 z-0 w-full h-full"
        style={{ 
          transformOrigin: 'bottom center'
        }}
      >
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
        
        {/* Overlay para mejor contraste - con animación */}
        <div 
          className={`absolute inset-0 bg-overlay ${
            isMobile ? 'bg-black/40' : 
            isTablet ? 'bg-black/30' : 
            'bg-black/20'
          }`} 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        ></div>
      </div>

      {/* Marquee animado - integrado directamente */}
      <div 
        className="absolute w-full overflow-hidden z-10" 
        style={{ 
          bottom: isMobile ? '6%' : isTablet ? '8%' : '10%'
        }}
      >
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap"
        >
          {[...Array(count)].map((_, i) => (
            <span
              key={i}
              className="font-sans text-white uppercase tracking-tighter font-black js-marquee-item"
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
                letterSpacing: '-0.03em',
                display: 'inline-block',
                transformOrigin: 'bottom center'
              }}
            >
              everything is a rectangle
            </span>
          ))}
        </div>
      </div>

      {/* Gradiente adicional para mejor legibilidad - con animación */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t bg-gradient ${
          isMobile ? 'from-black/90 via-transparent to-black/90' : 
          isTablet ? 'from-black/80 via-transparent to-black/80' :
          'from-black/70 via-transparent to-black/70'
        } z-5`}
      ></div>
    </section>
  );
};

export default VideoSection;