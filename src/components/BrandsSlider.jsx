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

  const brands = [
    { name: "WARNER BROS", image: "/brand1.webp", color: "#DC2626" },
    { name: "SONY PICTURES", image: "/brand2.webp", color: "#DC2626" },
    { name: "PARAMOUNT", image: "/brand3.webp", color: "#DC2626" },
    { name: "UNIVERSAL", image: "/brand4.webp", color: "#DC2626" },
    { name: "DISNEY", image: "/brand5.webp", color: "#DC2626" },
    { name: "NETFLIX", image: "/brand6.webp", color: "#DC2626" },
    { name: "20th CENTURY", image: "/brand7.webp", color: "#DC2626" },
    { name: "MARVEL", image: "/brand8.webp", color: "#DC2626" },
    { name: "DC COMICS", image: "/brand9.webp", color: "#DC2626" },
    { name: "LIONSGATE", image: "/brand10.webp", color: "#DC2626" },
    { name: "MGM", image: "/brand11.webp", color: "#DC2626" },
    { name: "PIXAR", image: "/brand12.webp", color: "#DC2626" },
  ];

  const getBrandPositions = () => {
    const positions = [];
    const gridCols = 4;
    const gridRows = 3;
    
    const isMobile = window.innerWidth < 1024;
    const spacingX = isMobile ? 80 : 120;
    const spacingY = isMobile ? 70 : 100;
    
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

  useEffect(() => {
    setBrandPositions(getBrandPositions());

    const handleResize = () => {
      setBrandPositions(getBrandPositions());
    };

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
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [brandPositions]);

  const startAnimations = () => {
    const masterTimeline = gsap.timeline();

    // Animación del fondo
    masterTimeline
      .fromTo(sectionRef.current, 
        { backgroundColor: "#000000" },
        { backgroundColor: "#DC2626", duration: 2, ease: "power2.inOut" }
      )
      .fromTo(titleRef.current, 
        { 
          opacity: 0,
          y: 80
        },
        { 
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out"
        },
        "-=1.5"
      )
      .fromTo(subtitleRef.current, 
        { 
          opacity: 0,
          y: 40 
        },
        { 
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out"
        },
        "-=1"
      );

    // Animación de las marcas
    if (brandPositions.length > 0) {
      brands.forEach((brand, index) => {
        const position = brandPositions[index];
        
        const startPositions = [
          { x: -400, y: gsap.utils.random(-150, 150) },
          { x: 400, y: gsap.utils.random(-150, 150) },
          { x: gsap.utils.random(-200, 200), y: -200 },
          { x: gsap.utils.random(-200, 200), y: 200 }
        ];
        
        const startPos = startPositions[index % startPositions.length];

        gsap.fromTo(brandRefs.current[index],
          {
            x: startPos.x,
            y: startPos.y,
            rotation: gsap.utils.random(-90, 90),
            opacity: 0
          },
          {
            x: position.x,
            y: position.y,
            rotation: 0,
            opacity: 1,
            duration: 1.2,
            delay: 1 + (index * 0.1),
            ease: "power2.out"
          }
        );
      });
    }
  };

  const handleBrandHover = (brand, index) => {
    setActiveBrand(brand);

    gsap.to(brandRefs.current[index], {
      scale: 1.8,
      duration: 0.4,
      ease: "back.out(1.7)",
      zIndex: 100
    });

    gsap.to(brandRefs.current[index].querySelector('img'), {
      filter: "none",
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(brandRefs.current[index].querySelector('.logo-container'), {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      duration: 0.3
    });

    gsap.to(brandRefs.current[index].querySelector('.logo-border'), {
      borderColor: "rgba(255, 255, 255, 1)",
      duration: 0.3
    });

    brandRefs.current.forEach((ref, i) => {
      if (i !== index) {
        gsap.to(ref, {
          opacity: 0.4,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  };

  const handleBrandLeave = () => {
    setActiveBrand(null);

    brandRefs.current.forEach((ref, index) => {
      const position = brandPositions[index];
      
      gsap.to(ref, {
        x: position.x,
        y: position.y,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
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

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden"
      style={{ 
        height: 'auto',
        minHeight: '600px',
        padding: '2rem 0'
      }}
    >
      {/* Contenedor principal con tamaño limitado */}
      <div className="relative w-full max-w-7xl mx-auto py-8 lg:py-16">
        <div className="container mx-auto px-4 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full">
            
            <div className="lg:w-2/5 mb-8 lg:mb-0 text-center lg:text-left w-full">
              <h2 
                ref={titleRef}
                className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white uppercase leading-tight mb-4 lg:mb-6 opacity-0"
              >
                CLIENTES QUE HAN CONFIADO EN NOSOTROS
              </h2>
              <p 
                ref={subtitleRef}
                className="text-lg lg:text-2xl xl:text-3xl text-white/90 leading-relaxed opacity-0"
              >
                Y han encontrado resultados.
              </p>
            </div>

            <div className="lg:w-3/5 relative w-full">
              <div 
                ref={containerRef}
                className="relative w-full h-64 lg:h-80 xl:h-96 mx-auto lg:mx-0 lg:ml-auto"
              >
                {brands.map((brand, index) => (
                  <div
                    key={brand.name}
                    ref={el => addToBrandRefs(el, index)}
                    className="absolute top-1/2 left-1/2 cursor-pointer transform-gpu"
                    onMouseEnter={() => handleBrandHover(brand, index)}
                    onMouseLeave={handleBrandLeave}
                    style={{
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="relative group">
                      <div className="logo-container absolute inset-0 bg-white/85 transition-all duration-300"></div>
                      <div className="logo-border absolute -inset-1 border border-white/80 transition-all duration-300"></div>
                      <div className="absolute -inset-2 bg-white/20 blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      
                      <div className="relative z-10 p-2 lg:p-3">
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="h-10 w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 object-contain transition-all duration-300"
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

      {activeBrand && (
        <div className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 lg:px-6 py-2 lg:py-3 backdrop-blur-sm border border-white/20 z-50">
          <span className="font-bold text-sm lg:text-lg tracking-wider">
            {activeBrand.name}
          </span>
        </div>
      )}

      {/* Efectos de fondo - limitados al contenedor */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 lg:w-48 lg:h-48 xl:w-64 xl:h-64 bg-white/10 blur-xl lg:blur-2xl xl:blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-white/5 blur-xl lg:blur-2xl xl:blur-3xl animate-pulse pointer-events-none" 
           style={{ animationDelay: '1s' }}></div>

    </section>
  );
};

export default CinematicBrandsShowcase;