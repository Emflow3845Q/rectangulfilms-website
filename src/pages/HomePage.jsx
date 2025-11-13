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

  // Proyectos destacados
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
      mobileWidth: "col-span-2"
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
      mobileWidth: "col-span-1"
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
      mobileWidth: "col-span-1"
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
      mobileWidth: "col-span-2"
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
      mobileWidth: "col-span-1"
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
      mobileWidth: "col-span-1"
    },
  ];

  // Detectar dispositivo
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
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
      if (rafId) return; // Throttle con requestAnimationFrame

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

  // Animación de cambio de texto SIN DESTELLOS - Versión mejorada
  useEffect(() => {
    if (!dynamicTextRef.current || !dynamicTextRef2.current || !textContainerRef.current) return;

    const text1 = dynamicTextRef.current;
    const text2 = dynamicTextRef2.current;
    const container = textContainerRef.current;

    let currentIndex = 0;
    let isFirstVisible = true;
    let animationInterval;
    let isTextAnimating = false;

    // Configuración inicial más robusta
    const initializeAnimation = () => {
      // Forzar renderizado sincrónico
      gsap.set([text1, text2], {
        opacity: 0,
        willChange: 'opacity',
        force3D: true
      });

      // Establecer contenido inicial
      text1.textContent = dynamicTexts[0];
      text2.textContent = dynamicTexts[1];

      // Mostrar el primer texto inmediatamente
      gsap.set(text1, {
        opacity: 1,
        immediateRender: true
      });

      // Asegurar que el contenedor tenga el ancho correcto
      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.whiteSpace = 'nowrap';
      tempSpan.textContent = dynamicTexts[0];
      container.appendChild(tempSpan);
      container.style.minWidth = `${tempSpan.offsetWidth}px`;
      container.removeChild(tempSpan);
    };

    const animateText = () => {
      if (isTextAnimating) return; // Prevenir superposición

      isTextAnimating = true;
      currentIndex = (currentIndex + 1) % dynamicTexts.length;
      const nextIndex = (currentIndex + 1) % dynamicTexts.length;

      const visibleText = isFirstVisible ? text1 : text2;
      const hiddenText = isFirstVisible ? text2 : text1;

      // Preparar el texto siguiente ANTES de la animación
      hiddenText.textContent = dynamicTexts[currentIndex];

      const timeline = gsap.timeline({
        onComplete: () => {
          // Preparar el próximo texto después de completar
          visibleText.textContent = dynamicTexts[nextIndex];
          isFirstVisible = !isFirstVisible;
          isTextAnimating = false;
        }
      });

      // Animación más suave con easing mejorado
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

    // Inicializar y comenzar animación
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
  }, [dynamicTexts]);

  useEffect(() => {
    const masterTL = gsap.timeline();

    // Animación del slogan
    masterTL.fromTo(sloganRef.current,
      {
        y: isMobile ? 20 : 60,
        opacity: 0,
        scale: 1.05
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.9 : 1.5,
        ease: "power2.out"
      }
    );

    masterTL.fromTo(buttonRef.current,
      {
        y: isMobile ? 20 : 40,
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.7 : 1.2,
        ease: "power2.out"
      },
      isMobile ? "-=0.6" : "-=0.8"
    );

    // Animación marquee
    if (marqueeRef.current) {
      if (isMobile) {
        gsap.to(marqueeRef.current, {
          x: `-=${marqueeRef.current.scrollWidth / 2}`,
          duration: 20,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % (marqueeRef.current.scrollWidth / 2))
          }
        });
      } else {
        const marqueeContent = marqueeRef.current;
        const contentWidth = marqueeContent.scrollWidth / 2;

        gsap.to(marqueeContent, {
          x: `-=${contentWidth}`,
          duration: 25,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
          }
        });
      }
    }

    // Animación de entrada para proyectos
    gsap.fromTo(".project-card",
      {
        opacity: 0,
        y: isMobile ? 20 : 50,
        scale: 0.9,
        rotation: isMobile ? 0 : -5
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: isMobile ? 0.7 : 1.1,
        stagger: isMobile ? 0.07 : 0.12,
        ease: "power2.out",
        delay: isMobile ? 0.3 : 0.6
      }
    );

    // Iniciar animación después de que todo cargue
    setTimeout(() => {
      setIsAnimating(true);
      setTextAnimationReady(true);
    }, 1500);

    return () => { };
  }, [isMobile]);

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

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black hide-scrollbar">
      {/* SECCIÓN 1: HERO SOLO CON DARKVEIL - CONTENIDO EN ESQUINA INFERIOR IZQUIERDA */}
      <section
        ref={section1Ref}
        className="h-screen snap-start relative flex items-end justify-start overflow-hidden px-4 sm:px-6 pb-8 sm:pb-12 md:pb-16 lg:pb-20"
      >
        {/* DarkVeil como único fondo */}
        <div className="absolute inset-0 z-0">
          <DarkVeil
            baseColor={[0.925, 0.137, 0.235]} // Color rojo de la marca
            speed={0.3}
            amplitude={0.4}
            frequencyX={2.5}
            frequencyY={1.8}
            interactive={true}
          />
        </div>

        {/* Contenido principal - POSICIONADO EN ESQUINA INFERIOR IZQUIERDA */}
        <div className="relative z-10 text-left w-full max-w-4xl mx-0 px-2 sm:px-4">
          {/* Título principal con BBH_Sans_Bartle - EN LA MISMA LÍNEA */}
          <h1
            ref={sloganRef}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-accent text-white uppercase tracking-tight mb-4 sm:mb-6 md:mb-8 opacity-0 leading-tight sm:leading-normal flex flex-row items-center justify-start flex-nowrap gap-2 sm:gap-3 md:gap-4 whitespace-nowrap hardware-accelerated font-black"
          >
            <span className="block flex-shrink-0 font-accent font-black">we are</span>
            <span
              ref={textContainerRef}
              className="inline-block relative flex-shrink-0 pointer-events-none text-animation-container"
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
              {/* Elemento invisible para mantener el espacio */}
              <span
                className="invisible font-accent font-black"
                aria-hidden="true"
                style={{ display: 'inline-block' }}
              >
                {dynamicTexts[0]}
              </span>
            </span>
          </h1>

          {/* Botón */}
          <button
            ref={buttonRef}
            onClick={handleButtonClick}
            className="relative z-20 bg-white text-black px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 font-gotham text-base sm:text-lg md:text-xl uppercase tracking-widest hover:bg-gray-100 transition-all duration-300 border-2 border-white hover:scale-105 transform opacity-0 hover:shadow-xl mt-4 sm:mt-6 font-bold"
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
              transform: isMobile ? 'scale(1.1)' : 'none'
            }}
          />
          <div className={`absolute inset-0 ${isMobile ? 'bg-black/40' : 'bg-black/60'
            }`}></div>
        </div>

        {/* TEXTO MOVIÉNDOSE EN LA PARTE INFERIOR */}
        <div className="absolute bottom-0 w-full overflow-hidden z-10 pb-4 sm:pb-8">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap"
            style={{ willChange: 'transform' }}
          >
            {[...Array(isMobile ? 6 : 10)].map((_, i) => (
              <span
                key={i}
                className={`font-accent text-white uppercase tracking-tighter font-black ${isMobile
                    ? 'text-3xl xs:text-4xl mx-4 xs:mx-6 opacity-90'
                    : 'text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl mx-6 sm:mx-8 md:mx-10 lg:mx-12 opacity-80'
                  }`}
              >
                everything is a rectangle
              </span>
            ))}
          </div>
        </div>

        <div className={`absolute inset-0 bg-gradient-to-t ${isMobile ? 'from-black/60 via-transparent to-black/60' : 'from-black/50 via-transparent to-black/50'
          } z-5`}></div>
      </section>

      {/* Sección 3: Proyectos Destacados */}
      <section
        ref={section3Ref}
        className="h-screen snap-start relative bg-black flex items-center justify-center overflow-hidden"
      >
        <div className="w-full h-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className={`grid grid-cols-2 ${isMobile ? 'gap-2' : 'sm:gap-3 lg:gap-4'
            } w-full h-full ${isMobile ? 'grid-rows-3' : 'lg:grid-cols-4 lg:grid-rows-2'
            }`}>
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`project-card group cursor-pointer bg-black rounded-none overflow-hidden relative ${isMobile ? project.mobileWidth : project.width
                  } ${project.height} ${isMobile ? '' : project.rotation
                  } transition-all duration-500 ${isMobile ? '' : 'hover:rotate-0'
                  }`}
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

                  {/* INFORMACIÓN SIEMPRE VISIBLE */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80">
                    <div className="absolute bottom-0 left-0 right-0 p-2 xs:p-3 sm:p-3 lg:p-4">
                      <h3 className="text-white font-accent text-xs sm:text-xs lg:text-sm uppercase mb-1 font-bold">
                        {project.client}
                      </h3>
                      <p className="text-white/95 text-xs sm:text-xs leading-tight font-gotham font-medium">
                        {isMobile ?
                          (project.title.length > 20 ? project.title.substring(0, 20) + '...' : project.title)
                          : project.title
                        }
                      </p>
                      <div className="w-4 xs:w-5 sm:w-6 lg:w-8 h-0.5 bg-red-primary mt-1 lg:mt-2" />
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

      {/* Fullscreen Video Modal */}
      {fullscreenVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-3 xs:p-4 sm:p-6"
          onClick={closeFullscreen}
        >
          <div
            className="relative bg-black rounded-lg overflow-hidden shadow-2xl w-full mx-2 xs:mx-4 sm:mx-6 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 z-10 bg-black/80 hover:bg-red-600 text-white w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 border border-white/30 hover:border-red-500"
              onClick={(e) => {
                e.stopPropagation();
                closeFullscreen();
              }}
            >
              <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            <div className="bg-gradient-to-t from-black to-black/80 p-3 xs:p-4 sm:p-4 md:p-6 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div className="flex-1">
                  <h3 className="text-white font-accent text-base xs:text-lg sm:text-xl md:text-2xl uppercase mb-1 font-bold">
                    {fullscreenVideo.client}
                  </h3>
                  <p className="text-white/80 text-sm xs:text-base sm:text-lg md:text-xl font-gotham font-medium">
                    {fullscreenVideo.title}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-red-primary text-xs xs:text-sm sm:text-base md:text-lg uppercase tracking-widest font-gotham font-bold">
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
        
        /* Prevenir destellos en textos animados */
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
        
        /* Forzar hardware acceleration */
        .hardware-accelerated {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default Home;