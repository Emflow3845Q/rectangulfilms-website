import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CinematicBrandsShowcase = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const brandRefs = useRef([]);
  const [activeBrand, setActiveBrand] = useState(null);
  const hasAnimatedRef = useRef(false);
  const isHoveringRef = useRef(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(false); // Cambiado a estado

  const brands = [
    { name: "DIVISION", image: "/brand1.webp", color: "#DC2626" },
    { name: "SONY PICTURES", image: "/brand2.webp", color: "#DC2626" },
    { name: "SOVAGE", image: "/brand3.webp", color: "#DC2626" },
    { name: "INSURRECTION", image: "/brand4.webp", color: "#DC2626" },
    { name: "DISNEY", image: "/brand5.webp", color: "#DC2626" },
    { name: "MAGDONAL", image: "/brand6.webp", color: "#DC2626" },
    { name: "MOONWALK FILMS", image: "/brand7.webp", color: "#DC2626" },
    { name: "NIKE", image: "/brand8.webp", color: "#DC2626" },
    { name: "PARTIZAN", image: "/brand9.webp", color: "#DC2626" },
    { name: "LIONSGATE", image: "/brand10.webp", color: "#DC2626" },
    { name: "TBWAI", image: "/brand11.webp", color: "#DC2626" },
    { name: "VODAFONE", image: "/brand12.webp", color: "#DC2626" },
  ];

  const getBrandPositions = () => {
    const positions = [];
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    // Configuraciones responsivas
    let gridCols, gridRows, spacingX, spacingY;
    
    if (isMobile) {
      gridCols = 3;
      gridRows = 4;
      spacingX = 70;
      spacingY = 60;
    } else if (isTablet) {
      gridCols = 4;
      gridRows = 3;
      spacingX = 90;
      spacingY = 80;
    } else {
      // Desktop
      gridCols = 4;
      gridRows = 3;
      spacingX = 120;
      spacingY = 100;
    }
    
    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const index = row * gridCols + col;
        if (index < brands.length) {
          const x = (col - (gridCols - 1) / 2) * spacingX;
          const y = (row - (gridRows - 1) / 2) * spacingY;
          positions.push({ x, y });
        }
      }
    }
    return positions;
  };

  const [brandPositions, setBrandPositions] = useState([]);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setBrandPositions(getBrandPositions());
    };

    setBrandPositions(getBrandPositions());
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          startAnimations();
          hasAnimatedRef.current = true;
        }
      },
      { 
        threshold: 0.2,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [brandPositions]);

  const startAnimations = () => {
    const masterTimeline = gsap.timeline();

    // Desactivar hover durante la animación
    setAnimationsEnabled(false);

    // Animación del fondo
    masterTimeline
      .fromTo(sectionRef.current, 
        { backgroundColor: "#000000" },
        { backgroundColor: "#DC2626", duration: 2, ease: "power2.inOut" }
      )
      .fromTo(titleRef.current, 
        { 
          opacity: 0,
          y: 60
        },
        { 
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out"
        },
        "-=1.5"
      )
      .fromTo(subtitleRef.current, 
        { 
          opacity: 0,
          y: 30 
        },
        { 
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        },
        "-=1"
      );

    // Animación de las marcas
    if (brandPositions.length > 0) {
      const brandTimeline = gsap.timeline();
      
      brands.forEach((brand, index) => {
        const position = brandPositions[index];
        
        const startPositions = [
          { x: -300, y: gsap.utils.random(-100, 100) },
          { x: 300, y: gsap.utils.random(-100, 100) },
          { x: gsap.utils.random(-150, 150), y: -150 },
          { x: gsap.utils.random(-150, 150), y: 150 }
        ];
        
        const startPos = startPositions[index % startPositions.length];

        brandTimeline.fromTo(brandRefs.current[index],
          {
            x: startPos.x,
            y: startPos.y,
            rotation: gsap.utils.random(-45, 45),
            opacity: 0
          },
          {
            x: position.x,
            y: position.y,
            rotation: 0,
            opacity: 1,
            duration: 1,
            delay: 0.8 + (index * 0.08),
            ease: "power2.out"
          },
          index * 0.08 // Stagger effect
        );
      });

      // Activar hover después de que termine la animación de las marcas
      brandTimeline.eventCallback("onComplete", () => {
        console.log("Animaciones completadas - Hover habilitado");
        setAnimationsEnabled(true);
        // Asegurarse de que todas las marcas estén en su posición final
        brands.forEach((brand, index) => {
          const position = brandPositions[index];
          if (brandRefs.current[index]) {
            gsap.set(brandRefs.current[index], {
              x: position.x,
              y: position.y,
              opacity: 1
            });
          }
        });
      });
    } else {
      // Si no hay posiciones, activar hover después de un tiempo seguro
      setTimeout(() => {
        console.log("Animaciones completadas (fallback) - Hover habilitado");
        setAnimationsEnabled(true);
      }, 2500);
    }
  };

  const resetAllBrandsExcept = (exceptIndex) => {
    if (!animationsEnabled) return;
    
    brandRefs.current.forEach((ref, index) => {
      if (index !== exceptIndex && ref) {
        const position = brandPositions[index];
        
        // Detener todas las animaciones en curso
        gsap.killTweensOf(ref);
        gsap.killTweensOf(ref.querySelector('img'));
        gsap.killTweensOf(ref.querySelector('.logo-container'));
        gsap.killTweensOf(ref.querySelector('.logo-border'));

        // Reset completo a estado normal
        gsap.to(ref, {
          x: position.x,
          y: position.y,
          scale: 1,
          opacity: 0.4,
          duration: 0.3,
          ease: "power2.out",
          zIndex: 1
        });
        
        gsap.to(ref.querySelector('img'), {
          filter: "brightness(0) invert(0)",
          duration: 0.2
        });

        gsap.to(ref.querySelector('.logo-container'), {
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          duration: 0.2
        });

        gsap.to(ref.querySelector('.logo-border'), {
          borderColor: "rgba(255, 255, 255, 0.8)",
          duration: 0.2
        });
      }
    });
  };

  const activateBrand = (index) => {
    if (!animationsEnabled) return;
    
    const ref = brandRefs.current[index];
    
    if (!ref) return;

    // Detener todas las animaciones en curso para esta marca
    gsap.killTweensOf(ref);
    gsap.killTweensOf(ref.querySelector('img'));
    gsap.killTweensOf(ref.querySelector('.logo-container'));
    gsap.killTweensOf(ref.querySelector('.logo-border'));

    // Escala responsiva
    const scale = windowSize.width < 768 ? 2.2 : 1.8;

    // Aplicar animación de activación
    gsap.to(ref, {
      scale: scale,
      duration: 0.3,
      ease: "back.out(1.7)",
      zIndex: 100,
      opacity: 1
    });

    gsap.to(ref.querySelector('img'), {
      filter: "none",
      duration: 0.2
    });

    gsap.to(ref.querySelector('.logo-container'), {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      duration: 0.2
    });

    gsap.to(ref.querySelector('.logo-border'), {
      borderColor: "rgba(255, 255, 255, 1)",
      duration: 0.2
    });
  };

  const handleBrandHover = (brand, index) => {
    // Verificar si las animaciones están habilitadas
    if (!animationsEnabled) return;
    
    isHoveringRef.current = true;

    // Resetear todas las marcas excepto la que va a ser activada
    resetAllBrandsExcept(index);
    
    setActiveBrand(brand);
    activateBrand(index);
  };

  const handleBrandLeave = () => {
    if (!animationsEnabled) return;
    isHoveringRef.current = false;
  };

  const handleContainerLeave = () => {
    if (!animationsEnabled) return;
    isHoveringRef.current = false;
    resetAllBrands();
  };

  const resetAllBrands = () => {
    if (!animationsEnabled) return;
    
    setActiveBrand(null);

    brandRefs.current.forEach((ref, index) => {
      const position = brandPositions[index];
      
      if (!ref) return;

      // Detener animaciones en curso
      gsap.killTweensOf(ref);
      gsap.killTweensOf(ref.querySelector('img'));
      gsap.killTweensOf(ref.querySelector('.logo-container'));
      gsap.killTweensOf(ref.querySelector('.logo-border'));

      // Reset completo a estado inicial
      gsap.to(ref, {
        x: position.x,
        y: position.y,
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        zIndex: 1
      });
      
      gsap.to(ref.querySelector('img'), {
        filter: "brightness(0) invert(0)",
        duration: 0.3
      });

      gsap.to(ref.querySelector('.logo-container'), {
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        duration: 0.3
      });

      gsap.to(ref.querySelector('.logo-border'), {
        borderColor: "rgba(255, 255, 255, 0.8)",
        duration: 0.3
      });
    });
  };

  const addToBrandRefs = (el, index) => {
    if (el && !brandRefs.current.includes(el)) {
      brandRefs.current[index] = el;
    }
  };

  // Tamaños responsivos para los logos
  const getLogoSize = () => {
    if (windowSize.width < 768) return "h-8 w-8";
    if (windowSize.width < 1024) return "h-10 w-10";
    return "h-12 w-12";
  };

  const getContainerHeight = () => {
    if (windowSize.width < 768) return "h-80";
    if (windowSize.width < 1024) return "h-96";
    return "h-[500px]";
  };

  const getBrandAreaSize = () => {
    if (windowSize.width < 768) return "60px";
    if (windowSize.width < 1024) return "70px";
    return "80px";
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden"
      style={{ 
        minHeight: windowSize.width < 768 ? '500px' : '600px',
        padding: windowSize.width < 768 ? '1.5rem 0' : '2rem 0'
      }}
    >
      {/* Contenedor principal con tamaño limitado */}
      <div className={`relative w-full max-w-7xl mx-auto ${windowSize.width < 768 ? 'py-6' : 'py-8 lg:py-16'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full">
            
            {/* Texto - Ocupa todo el ancho en móvil, 40% en desktop */}
            <div className="w-full lg:w-2/5 mb-8 lg:mb-0 text-center lg:text-left">
              <h2 
                ref={titleRef}
                className={`font-bold text-white uppercase leading-tight mb-4 lg:mb-6 opacity-0 ${
                  windowSize.width < 768 
                    ? 'text-2xl sm:text-3xl' 
                    : windowSize.width < 1024 
                    ? 'text-4xl' 
                    : 'text-5xl xl:text-6xl'
                }`}
              >
                CLIENTES QUE HAN CONFIADO EN NOSOTROS
              </h2>
              <p 
                ref={subtitleRef}
                className={`text-white/90 leading-relaxed opacity-0 ${
                  windowSize.width < 768 
                    ? 'text-base sm:text-lg' 
                    : windowSize.width < 1024 
                    ? 'text-xl' 
                    : 'text-2xl xl:text-3xl'
                }`}
              >
                Y han encontrado resultados.
              </p>
            </div>

            {/* Grid de marcas - Ocupa todo el ancho en móvil, 60% en desktop */}
            <div className="w-full lg:w-3/5 relative">
              <div 
                ref={containerRef}
                className={`relative w-full mx-auto lg:mx-0 lg:ml-auto ${getContainerHeight()} ${
                  !animationsEnabled ? 'pointer-events-none' : ''
                }`}
                onMouseLeave={handleContainerLeave}
                style={{
                  cursor: !animationsEnabled ? 'default' : 'auto'
                }}
              >
                {brands.map((brand, index) => (
                  <div
                    key={brand.name}
                    ref={el => addToBrandRefs(el, index)}
                    className={`absolute top-1/2 left-1/2 transform-gpu brand-item ${
                      animationsEnabled ? 'cursor-pointer' : 'cursor-default'
                    }`}
                    onMouseEnter={() => handleBrandHover(brand, index)}
                    onMouseLeave={handleBrandLeave}
                    style={{
                      transform: 'translate(-50%, -50%)',
                      width: getBrandAreaSize(),
                      height: getBrandAreaSize(),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: animationsEnabled ? 'auto' : 'none'
                    }}
                  >
                    <div className="relative group w-full h-full flex items-center justify-center">
                      {/* Área de hover expandida - más pequeña en móvil */}
                      <div 
                        className={`absolute z-0 ${
                          windowSize.width < 768 ? '-inset-4' : 
                          windowSize.width < 1024 ? '-inset-5' : '-inset-6'
                        }`}
                      ></div>
                      
                      <div className="logo-container absolute inset-0 bg-white/85 transition-all duration-300 rounded-sm"></div>
                      <div className="logo-border absolute -inset-1 border border-white/80 transition-all duration-300 rounded-sm"></div>
                      <div className={`absolute -inset-2 bg-white/20 blur-sm transition-all duration-500 rounded-sm ${
                        animationsEnabled ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
                      }`}></div>
                      
                      <div className="relative z-10 p-2 lg:p-3 flex items-center justify-center">
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className={`object-contain transition-all duration-300 ${getLogoSize()}`}
                          style={{
                            filter: "brightness(0) invert(0)"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Label de marca activa - solo mostrar si las animaciones están habilitadas */}
      {activeBrand && animationsEnabled && (
        <div className={`absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white backdrop-blur-sm border border-white/20 z-50 ${
          windowSize.width < 768 
            ? 'px-3 py-1 text-xs' 
            : windowSize.width < 1024 
            ? 'px-4 py-2 text-sm' 
            : 'px-6 py-3 text-lg'
        }`}>
          <span className="font-bold tracking-wider">
            {activeBrand.name}
          </span>
        </div>
      )}

      {/* Efectos de fondo responsivos */}
      <div className={`absolute top-1/4 left-1/4 bg-white/10 blur-xl lg:blur-2xl xl:blur-3xl animate-pulse pointer-events-none ${
        windowSize.width < 768 ? 'w-24 h-24' :
        windowSize.width < 1024 ? 'w-32 h-32' : 'w-48 h-48'
      }`}></div>
      
      <div className={`absolute bottom-1/4 right-1/4 bg-white/5 blur-xl lg:blur-2xl xl:blur-3xl animate-pulse pointer-events-none ${
        windowSize.width < 768 ? 'w-32 h-32' :
        windowSize.width < 1024 ? 'w-40 h-40' : 'w-64 h-64'
      }`} style={{ animationDelay: '1s' }}></div>

    </section>
  );
};

export default CinematicBrandsShowcase;