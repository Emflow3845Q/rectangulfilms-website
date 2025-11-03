import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const videoRef = useRef(null);
  const counterRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const indicatorsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const arrowRef = useRef(null);

  const [currentProject, setCurrentProject] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const masterTL = gsap.timeline();

    masterTL.fromTo(videoRef.current,
      {
        scale: 1.3,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      }
    ).fromTo(".hero-overlay",
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out"
      },
      "-=1.2"
    );

    masterTL.fromTo(counterRef.current,
      {
        scale: 0,
        rotation: -90,
        opacity: 0
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.5)"
      },
      "-=0.5"
    ).fromTo(titleRef.current,
      {
        y: 60,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.6"
    ).fromTo(subtitleRef.current.children,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      },
      "-=0.4"
    );

    masterTL.fromTo(buttonsRef.current,
      {
        y: 40,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.3"
    ).fromTo(indicatorsRef.current.children,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: "power2.out"
      },
      "-=0.2"
    );

    masterTL.fromTo(scrollIndicatorRef.current,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      },
      "-=0.2"
    );

    const scrollAnimation = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    
    scrollAnimation
      .to(arrowRef.current, {
        y: 12,
        duration: 1.2,
        ease: "power2.inOut"
      })
      .to(arrowRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: "power1.inOut"
      }, "-=0.5")
      .to(arrowRef.current, {
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      })
      .to(arrowRef.current, {
        duration: 0.5
      });

    gsap.to(".scroll-text", {
      opacity: 0.7,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1
    });

    gsap.to(arrowRef.current, {
      borderColor: "rgba(220, 38, 38, 0.8)",
      duration: 0.4,
      repeat: -1,
      repeatDelay: 2,
      yoyo: true,
      ease: "power1.inOut"
    });

    const projectInterval = setInterval(() => {
      setCurrentProject(prev => prev >= 5 ? 1 : prev + 1);
    }, 4000);

    return () => {
      clearInterval(projectInterval);
      window.removeEventListener('resize', checkMobile);
      scrollAnimation.kill();
    };
  }, [isMobile]);

  const projects = [
    { number: "01", title: "CINE PUBLICITARIO", year: "2024" },
    { number: "02", title: "DOCUMENTAL", year: "2024" },
    { number: "03", title: "CORTOMETRAJE", year: "2023" },
    { number: "04", title: "EVENTOS CORPORATIVOS", year: "2024" },
    { number: "05", title: "MUSICAL", year: "2023" }
  ];

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video principal */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          preload="auto"
        >
          <source src="/bg-hero.mp4" type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="hero-overlay absolute inset-0 bg-red-600/20 mix-blend-multiply opacity-0"></div>
        <div className="hero-overlay absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-20 h-full flex items-center pt-16 lg:pt-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center lg:text-left">

            <div className="text-white">
              <div className="mb-6 lg:mb-8">
                <div className="flex items-center justify-center lg:justify-start gap-3 lg:gap-4 mb-4 lg:mb-6">
                  <div className="w-8 lg:w-12 h-px bg-red-600"></div>
                  <span className="text-red-600 font-gotham-cond-black text-xs lg:text-sm tracking-widest uppercase">
                    PROYECTO ACTUAL
                  </span>
                  <div className="w-8 lg:w-12 h-px bg-red-600"></div>
                </div>

                <div className="mb-4 lg:mb-6">
                  <span
                    ref={counterRef}
                    className="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-gotham-cond-black text-red-600 inline-block opacity-0"
                  >
                    {projects[currentProject - 1].number}
                  </span>
                </div>

                <h1
                  ref={titleRef}
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-gotham-cond-black mb-3 lg:mb-4 leading-tight tracking-tight opacity-0">
                  {projects[currentProject - 1].title}
                </h1>

                <div
                  ref={subtitleRef}
                  className="flex flex-wrap justify-center lg:justify-start items-center gap-2 lg:gap-3 text-white/80 text-sm lg:text-base mb-6 lg:mb-8">
                  <span className="font-gotham-cond-black text-xs lg:text-sm tracking-tight opacity-0">
                    {projects[currentProject - 1].year}
                  </span>
                  <div className="w-1 h-1 bg-white opacity-0"></div>
                  <span className="text-xs lg:text-sm font-gotham-cond-black tracking-tight opacity-0">4K RESOLUTION</span>
                  <div className="w-1 h-1 bg-white opacity-0"></div>
                  <span className="text-xs lg:text-sm font-gotham-cond-black tracking-tight opacity-0">DOLBY ATMOS</span>
                </div>
              </div>

              {/* Botón único "Ver Proyecto" */}
              <div className="flex justify-center lg:justify-start">
                <button
                  ref={buttonsRef}
                  className="bg-red-600 text-white px-8 lg:px-12 py-3 lg:py-4 font-gotham-cond-black text-lg lg:text-xl uppercase tracking-widest hover:bg-red-700 transition-colors duration-300 border-2 border-red-600 opacity-0 transform hover:scale-105"
                >
                  Ver Proyecto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicadores técnicos - Solo desktop */}
      <div ref={indicatorsRef} className="hidden lg:block absolute bottom-8 right-8 z-20">
        <div className="grid grid-cols-2 gap-2 xl:gap-3 text-right">
          <div className="text-white/60 font-gotham-cond-black text-sm xl:text-base tracking-tight opacity-0">24 FPS</div>
          <div className="text-white/60 font-gotham-cond-black text-sm xl:text-base tracking-tight opacity-0">4K RAW</div>
          <div className="text-white/60 font-gotham-cond-black text-sm xl:text-base tracking-tight opacity-0">LOG</div>
          <div className="text-white/60 font-gotham-cond-black text-sm xl:text-base tracking-tight opacity-0">HDR</div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer group opacity-0"
        onClick={scrollToNext}
      >
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <div className="relative">
              {/* Efecto de aura sutil - SIN BORDER RADIUS */}
              <div className="absolute inset-0 w-8 h-8 -left-1 -top-1 bg-red-600/10 animate-ping"></div>
              
              {/* Flecha principal */}
              <div 
                ref={arrowRef}
                className="relative w-6 h-6 border-r-2 border-b-2 border-white transform rotate-45 group-hover:border-red-600 group-hover:scale-110 transition-all duration-300"
              ></div>
            </div>
          </div>

          <div className="text-center">
            <div className="scroll-text text-white/60 font-gotham-cond-black text-xs uppercase tracking-widest group-hover:text-red-600 transition-colors duration-300 mb-1">
              Scroll
            </div>
            {/* Texto adicional que aparece en hover - SIN BORDER RADIUS */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              <div className="text-red-600 text-[10px] uppercase tracking-widest font-gotham-cond-black bg-black/80 px-2 py-1">
                Descubre más
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Efecto de partículas sutil - SIN BORDER RADIUS */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-red-600/5 blur-3xl pointer-events-none"></div>

      {/* Elementos decorativos adicionales - CUADRADOS */}
      <div className="absolute top-20 left-10 w-4 h-4 border border-red-600/30 pointer-events-none z-10"></div>
      <div className="absolute bottom-20 right-10 w-3 h-3 border border-red-600/20 pointer-events-none z-10"></div>
      <div className="absolute top-1/2 left-5 w-2 h-2 bg-red-600/40 pointer-events-none z-10"></div>
      <div className="absolute bottom-1/3 right-5 w-1.5 h-1.5 bg-red-600/30 pointer-events-none z-10"></div>
    </section>
  );
};

export default Hero;