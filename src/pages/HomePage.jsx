import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import DarkVeil from "../components/LiquidChrome";
import { useLanguage } from "../context/LanguageContext";

const Home = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fullscreenVideo, setFullscreenVideo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [textAnimationReady, setTextAnimationReady] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const homeContainerRef = useRef(null);
  const sloganRef = useRef(null);
  const dynamicTextRef = useRef(null);
  const dynamicTextRef2 = useRef(null);
  const textContainerRef = useRef(null);
  const buttonRef = useRef(null);
  const marqueeRef = useRef(null);
  const particlesRef = useRef(null);

  const dynamicTexts = [
    "rectángulo",
    "Cine",
    "publicity",
    "music video",
    "comercial",
    "events"
  ];

  // Proyectos destacados - Optimizados para responsive
  const featuredProjects = [
    {
      id: 1,
      client: "Nike",
      title: "Air Max Revolution",
      category: "Commercial",
      video: "/videos/DemoRectangulo2025.mp4",
      width: "col-span-2 lg:col-span-2",
      height: "row-span-1 lg:row-span-2",
      rotation: "rotate-1",
      mobileWidth: "col-span-2",
      tabletWidth: "col-span-2"
    },
    {
      id: 2,
      client: "National Geographic",
      title: "Urban Wilderness",
      category: "Documentary",
      video: "/videos/CamiloRegresa.mp4",
      width: "col-span-1 lg:col-span-1",
      height: "row-span-1",
      rotation: "-rotate-2",
      mobileWidth: "col-span-1",
      tabletWidth: "col-span-1"
    },
    {
      id: 3,
      client: "Coca-Cola",
      title: "Summer Festival",
      category: "Advertising",
      video: "/videos/DemoRectangulo2025.mp4",
      width: "col-span-1 lg:col-span-1",
      height: "row-span-1",
      rotation: "rotate-3",
      mobileWidth: "col-span-1",
      tabletWidth: "col-span-1"
    },
    {
      id: 4,
      client: "Bad Bunny",
      title: "Concert Tour",
      category: "Music Video",
      video: "/videos/MotionGraphics.mp4",
      width: "col-span-2 lg:col-span-2",
      height: "row-span-1",
      rotation: "-rotate-1",
      mobileWidth: "col-span-2",
      tabletWidth: "col-span-2"
    },
    {
      id: 5,
      client: "Microsoft",
      title: "Tech Summit",
      category: "Event",
      video: "/videos/DemoRectangulo2025.mp4",
      width: "col-span-1 lg:col-span-1",
      height: "row-span-1 lg:row-span-2",
      rotation: "rotate-2",
      mobileWidth: "col-span-1",
      tabletWidth: "col-span-1"
    },
    {
      id: 6,
      client: "Apple",
      title: "Product Launch",
      category: "Commercial",
      video: "/videos/CamiloRegresa.mp4",
      width: "col-span-1 lg:col-span-1",
      height: "row-span-1",
      rotation: "-rotate-3",
      mobileWidth: "col-span-1",
      tabletWidth: "col-span-1"
    },
  ];

  // Detectar dispositivo y tamaño de ventana
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setWindowSize({ width, height });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Controlar visibilidad del header
  useEffect(() => {
    if (fullscreenVideo) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [fullscreenVideo]);

  // Sistema de seguimiento del mouse - OPTIMIZADO
  useEffect(() => {
    if (isMobile) return;

    let rafId = null;

    const handleMouseMove = (e) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });

        if (particlesRef.current) {
          particlesRef.current.style.opacity = '1';
        }
        rafId = null;
      });
    };

    const handleMouseLeave = () => {
      if (particlesRef.current) {
        particlesRef.current.style.opacity = '0';
      }
    };

    const section = section1Ref.current;
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    section?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      section?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  // Animación de cambio de texto
  useEffect(() => {
    if (!dynamicTextRef.current || !dynamicTextRef2.current || !textContainerRef.current) return;

    const text1 = dynamicTextRef.current;
    const text2 = dynamicTextRef2.current;
    const container = textContainerRef.current;

    let currentIndex = 0;
    let isFirstVisible = true;
    let animationInterval;
    let isTextAnimating = false;

    const initializeAnimation = () => {
      gsap.set([text1, text2], {
        opacity: 0,
        willChange: 'opacity',
        force3D: true
      });

      text1.textContent = dynamicTexts[0];
      text2.textContent = dynamicTexts[1];

      gsap.set(text1, {
        opacity: 1,
        immediateRender: true
      });

      // Ajustar tamaño del contenedor según el dispositivo
      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.whiteSpace = 'nowrap';
      tempSpan.textContent = dynamicTexts[0];
      container.appendChild(tempSpan);
      
      const minWidth = isMobile ? 'auto' : `${tempSpan.offsetWidth}px`;
      container.style.minWidth = minWidth;
      container.removeChild(tempSpan);
    };

    const animateText = () => {
      if (isTextAnimating) return;

      isTextAnimating = true;
      currentIndex = (currentIndex + 1) % dynamicTexts.length;
      const nextIndex = (currentIndex + 1) % dynamicTexts.length;

      const visibleText = isFirstVisible ? text1 : text2;
      const hiddenText = isFirstVisible ? text2 : text1;

      hiddenText.textContent = dynamicTexts[currentIndex];

      const timeline = gsap.timeline({
        onComplete: () => {
          visibleText.textContent = dynamicTexts[nextIndex];
          isFirstVisible = !isFirstVisible;
          isTextAnimating = false;
        }
      });

      timeline
        .to(visibleText, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
          force3D: true
        }, 0)
        .to(hiddenText, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          force3D: true
        }, 0);
    };

    initializeAnimation();

    const timeoutId = setTimeout(() => {
      animationInterval = setInterval(animateText, 2500);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(animationInterval);
      gsap.killTweensOf([text1, text2]);
      isTextAnimating = false;
    };
  }, [dynamicTexts, isMobile]);

  // Animaciones principales con responsive
  useEffect(() => {
    const masterTL = gsap.timeline();

    // Animación del slogan responsive
    masterTL.fromTo(sloganRef.current,
      {
        y: isMobile ? 20 : isTablet ? 40 : 60,
        opacity: 0,
        scale: 1.05
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.9 : isTablet ? 1.2 : 1.5,
        ease: "power2.out"
      }
    );

    masterTL.fromTo(buttonRef.current,
      {
        y: isMobile ? 20 : isTablet ? 30 : 40,
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.7 : isTablet ? 1.0 : 1.2,
        ease: "power2.out"
      },
      isMobile ? "-=0.6" : isTablet ? "-=0.7" : "-=0.8"
    );

    // Animación marquee responsive
    if (marqueeRef.current) {
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
    }

    // Animación de entrada para proyectos responsive
    const staggerAmount = isMobile ? 0.07 : isTablet ? 0.09 : 0.12;
    const delayAmount = isMobile ? 0.3 : isTablet ? 0.4 : 0.6;

    gsap.fromTo(".project-card",
      {
        opacity: 0,
        y: isMobile ? 20 : isTablet ? 35 : 50,
        scale: 0.9,
        rotation: isMobile ? 0 : isTablet ? -3 : -5
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: isMobile ? 0.7 : isTablet ? 0.9 : 1.1,
        stagger: staggerAmount,
        ease: "power2.out",
        delay: delayAmount
      }
    );

    setTimeout(() => {
      setIsAnimating(true);
      setTextAnimationReady(true);
    }, 1500);

    return () => { };
  }, [isMobile, isTablet]);

  const handleButtonClick = () => {
    window.location.href = "/about";
  };

  const handleProjectClick = (project) => {
    setFullscreenVideo(project);
  };

  const closeFullscreen = () => {
    setFullscreenVideo(null);
  };

  // Prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (fullscreenVideo) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [fullscreenVideo]);

  // Función para obtener clase responsive del proyecto
  const getProjectClass = (project) => {
    if (isMobile) return project.mobileWidth;
    if (isTablet) return project.tabletWidth || project.width;
    return project.width;
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black hide-scrollbar">
      {/* SECCIÓN 1: HERO */}
      <section
        ref={section1Ref}
        className="h-screen snap-start relative flex items-end justify-start overflow-hidden px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 pb-6 xs:pb-8 sm:pb-10 md:pb-14 lg:pb-20"
      >
        {/* DarkVeil como fondo */}
        <div className="absolute inset-0 z-0">
          <DarkVeil
            baseColor={[0.925, 0.137, 0.235]}
            speed={0.3}
            amplitude={0.4}
            frequencyX={2.5}
            frequencyY={1.8}
            interactive={true}
          />
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 text-left w-full max-w-4xl mx-0 px-2 xs:px-3 sm:px-4 md:px-6">
          {/* Título principal responsive */}
          <h1
            ref={sloganRef}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-accent text-white uppercase tracking-tight mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8 opacity-0 leading-tight sm:leading-normal flex flex-col xs:flex-row items-start xs:items-center justify-start flex-nowrap gap-1 xs:gap-2 sm:gap-3 md:gap-4 hardware-accelerated font-black"
          >
            <span className="block flex-shrink-0 font-accent font-black whitespace-nowrap">we are</span>
            <span
              ref={textContainerRef}
              className="inline-block relative flex-shrink-0 pointer-events-none text-animation-container min-w-0"
              style={{
                willChange: 'opacity',
                backfaceVisibility: 'hidden',
                perspective: '1000px',
                display: 'inline-block',
                lineHeight: '1'
              }}
            >
              <span
                ref={dynamicTextRef}
                className="text-white font-accent uppercase whitespace-nowrap pointer-events-none animated-text font-black"
                style={{
                  willChange: 'opacity',
                  backfaceVisibility: 'hidden',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  lineHeight: 'inherit'
                }}
              >
                {dynamicTexts[0]}
              </span>
              <span
                ref={dynamicTextRef2}
                className="text-white font-accent uppercase whitespace-nowrap pointer-events-none animated-text font-black"
                style={{
                  willChange: 'opacity',
                  backfaceVisibility: 'hidden',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  lineHeight: 'inherit'
                }}
              >
                {dynamicTexts[1]}
              </span>
              <span
                className="invisible font-accent font-black"
                aria-hidden="true"
                style={{ display: 'inline-block' }}
              >
                {dynamicTexts[0]}
              </span>
            </span>
          </h1>

          {/* Botón responsive */}
          <button
            ref={buttonRef}
            onClick={handleButtonClick}
            className="relative z-20 bg-white text-black px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 py-1.5 xs:py-2 sm:py-2.5 md:py-3 lg:py-4 font-gotham text-sm xs:text-base sm:text-lg md:text-xl uppercase tracking-widest hover:bg-gray-100 transition-all duration-300 border-2 border-white hover:scale-105 transform opacity-0 hover:shadow-xl mt-3 xs:mt-4 sm:mt-5 md:mt-6 font-bold"
          >
            who we are
          </button>
        </div>
      </section>

      {/* Sección 2: Video de fondo */}
      <section
        ref={section2Ref}
        className="h-screen snap-start relative bg-black overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://www.youtube.com/embed/Csyu_yJK-Sg?autoplay=1&mute=1&loop=1&playlist=Csyu_yJK-Sg&controls=0&modestbranding=1&rel=0&showinfo=0"
            className="w-full h-full object-cover"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Background Video"
            style={{
              transform: isMobile ? 'scale(1.1)' : isTablet ? 'scale(1.05)' : 'none'
            }}
          />
          <div className={`absolute inset-0 ${
            isMobile ? 'bg-black/40' : 
            isTablet ? 'bg-black/50' : 
            'bg-black/60'
          }`}></div>
        </div>

        {/* Marquee responsive */}
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
                    ? 'text-2xl xs:text-3xl mx-3 xs:mx-4 opacity-90' 
                    : isTablet
                    ? 'text-4xl sm:text-5xl mx-4 sm:mx-6 opacity-85'
                    : 'text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl mx-6 sm:mx-8 md:mx-10 lg:mx-12 opacity-80'
                }`}
              >
                everything is a rectangle
              </span>
            ))}
          </div>
        </div>

        <div className={`absolute inset-0 bg-gradient-to-t ${
          isMobile ? 'from-black/60 via-transparent to-black/60' : 
          isTablet ? 'from-black/45 via-transparent to-black/45' :
          'from-black/50 via-transparent to-black/50'
        } z-5`}></div>
      </section>

      {/* Sección 3: Proyectos Destacados - MEJORADO RESPONSIVE */}
      <section
        ref={section3Ref}
        className="h-screen snap-start relative bg-black flex items-center justify-center overflow-hidden"
      >
        <div className="w-full h-full px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-3 xs:py-4 sm:py-5 md:py-6 lg:py-8">
          <div className={`grid ${
            isMobile 
              ? 'grid-cols-2 grid-rows-3 gap-1.5 xs:gap-2' 
              : isTablet
              ? 'grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-2 sm:gap-3'
              : 'grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-3 lg:gap-4'
          } w-full h-full`}>
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className={`project-card group cursor-pointer bg-black rounded-none overflow-hidden relative ${
                  getProjectClass(project)
                } ${project.height} ${
                  isMobile ? '' : isTablet ? project.rotation.replace('rotate-', 'rotate-0.5') : project.rotation
                } transition-all duration-500 ${
                  isMobile ? '' : 'hover:rotate-0 hover:scale-105'
                } hover:z-10`}
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative w-full h-full bg-black">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>

                  {/* Información del proyecto responsive */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80">
                    <div className="absolute bottom-0 left-0 right-0 p-1.5 xs:p-2 sm:p-2.5 md:p-3 lg:p-4">
                      <h3 className="text-white font-accent text-xs xs:text-xs sm:text-sm uppercase mb-0.5 xs:mb-1 font-bold truncate">
                        {project.client}
                      </h3>
                      <p className="text-white/95 text-xs xs:text-xs leading-tight font-gotham font-medium line-clamp-2">
                        {project.title}
                      </p>
                      <div className={`${
                        isMobile ? 'w-3 xs:w-4 h-0.5 mt-0.5' : 
                        'w-4 xs:w-5 sm:w-6 lg:w-8 h-0.5 mt-1 lg:mt-2'
                      } bg-red-primary`} />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Video Modal - MEJORADO RESPONSIVE */}
      {fullscreenVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-6"
          onClick={closeFullscreen}
        >
          <div
            className="relative bg-black rounded-lg overflow-hidden shadow-2xl w-full mx-1 xs:mx-2 sm:mx-4 md:mx-6 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-1.5 xs:top-2 sm:top-3 md:top-4 right-1.5 xs:right-2 sm:right-3 md:right-4 z-10 bg-black/80 hover:bg-red-600 text-white w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-200 border border-white/30 hover:border-red-500"
              onClick={(e) => {
                e.stopPropagation();
                closeFullscreen();
              }}
            >
              <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="aspect-video bg-black">
              <video
                autoPlay
                controls
                controlsList="nodownload"
                className="w-full h-full object-contain"
              >
                <source src={fullscreenVideo.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="bg-gradient-to-t from-black to-black/80 p-2 xs:p-3 sm:p-4 md:p-6 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1.5 xs:gap-2 sm:gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-accent text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl uppercase mb-0.5 xs:mb-1 font-bold truncate">
                    {fullscreenVideo.client}
                  </h3>
                  <p className="text-white/80 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-gotham font-medium line-clamp-2">
                    {fullscreenVideo.title}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-red-primary text-xs xs:text-sm sm:text-base md:text-lg uppercase tracking-widest font-gotham font-bold whitespace-nowrap">
                    {fullscreenVideo.category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .text-animation-container {
          backface-visibility: hidden;
          perspective: 1000px;
          transform-style: preserve-3d;
          will-change: opacity;
        }
        
        .animated-text {
          backface-visibility: hidden;
          transform: translateZ(0);
          will-change: opacity;
        }
        
        .hardware-accelerated {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Mejoras de responsive para textos largos */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Asegurar que los videos se vean bien en móvil */
        @media (max-width: 640px) {
          .project-card video {
            object-fit: cover;
            min-height: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;