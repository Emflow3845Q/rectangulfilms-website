import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

// Componente TiltedCard más compacto
const TiltedCard = ({
  imageSrc,
  altText = 'Tilted card image',
  containerHeight = '100%',
  containerWidth = '100%',
  imageHeight = '100%',
  imageWidth = '100%',
  scaleOnHover = 1.05,
  rotateAmplitude = 15,
  showMobileWarning = false,
  showTooltip = false,
  overlayContent = null,
  displayOverlayContent = false
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), {
    damping: 20,
    stiffness: 80,
    mass: 1.5
  });
  const rotateY = useSpring(useMotionValue(0), {
    damping: 20,
    stiffness: 80,
    mass: 1.5
  });
  const scale = useSpring(1, {
    damping: 25,
    stiffness: 100,
    mass: 1
  });
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 300,
    damping: 25,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 1.2);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:1000px] flex items-center justify-center cursor-pointer"
      style={{
        height: containerHeight,
        width: containerWidth
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-2 text-center text-xs block sm:hidden">
          This effect is not optimized for mobile.
        </div>
      )}

      <motion.div
        className="relative [transform-style:preserve-3d] w-full h-full"
        style={{
          rotateX,
          rotateY,
          scale
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="absolute top-0 left-0 object-cover rounded-md will-change-transform [transform:translateZ(0)] shadow-lg"
          style={{
            width: imageWidth,
            height: imageHeight
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(40px)]">
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-[3px] bg-white px-2 py-1 text-[9px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}
        >
          {altText}
        </motion.figcaption>
      )}
    </figure>
  );
};

const StorySection = () => {
  const imageOverlayRef = useRef(null);
  const titleRef = useRef(null);
  const textRefs = useRef([]);
  const statsRefs = useRef([]);
  const sectionRef = useRef(null);
  const particlesRef = useRef([]);
  const decorElementsRef = useRef([]);
  const scrollTopRef = useRef(null);
  const scrollArrowRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [counters, setCounters] = useState({
    marcas: 0,
    proyectos: 0,
    producciones: 0
  });

  const stats = [
    {
      id: "marcas",
      number: 30,
      suffix: "+",
      title: "Marcas"
    },
    {
      id: "proyectos", 
      number: 50,
      suffix: "+",
      title: "Proyectos"
    },
    {
      id: "producciones",
      number: 140,
      suffix: "+", 
      title: "Producciones"
    }
  ];

  // Efecto para mostrar/ocultar el scroll top
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efecto para animar el scroll top cuando aparece/desaparece
  useEffect(() => {
    if (scrollTopRef.current) {
      if (showScrollTop) {
        gsap.to(scrollTopRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.5)"
        });
        
        // Animación continua de la flecha
        gsap.to(scrollArrowRef.current, {
          y: -3,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      } else {
        gsap.to(scrollTopRef.current, {
          opacity: 0,
          scale: 0.8,
          y: 15,
          duration: 0.2,
          ease: "power2.in"
        });
      }
    }
  }, [showScrollTop]);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0, autoKill: false },
      ease: "power2.inOut"
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startCounters();
          startContinuousAnimations();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Función para iniciar animaciones continuas
  const startContinuousAnimations = () => {
    // Animación continua de los cuadros decorativos
    decorElementsRef.current.forEach((element, index) => {
      if (element) {
        // Rotación continua
        gsap.to(element, {
          rotation: index % 2 === 0 ? 360 : -360,
          duration: 12 + (index * 2),
          repeat: -1,
          ease: "none",
          delay: index * 0.3
        });

        // Movimiento flotante
        gsap.to(element, {
          y: index % 3 === 0 ? -10 : index % 3 === 1 ? 8 : -6,
          x: index % 2 === 0 ? 8 : -6,
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        });

        // Efecto de pulso en la opacidad
        gsap.to(element, {
          opacity: index % 2 === 0 ? 0.5 : 0.8,
          duration: 2 + index,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.5
        });
      }
    });

    // Animación de partículas flotantes
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.to(particle, {
          y: -20 + (index * 4),
          x: index % 2 === 0 ? 15 : -10,
          rotation: index % 2 === 0 ? 120 : -120,
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3
        });
      }
    });
  };

  useEffect(() => {
    if (isVisible) {
      const masterTL = gsap.timeline();

      // 1. Animación del overlay de la imagen
      masterTL.to(imageOverlayRef.current, {
        x: "100%",
        duration: 1.2,
        ease: "power2.inOut"
      });

      // 2. Animación de los cuadros decorativos
      masterTL.fromTo(decorElementsRef.current,
        {
          scale: 0,
          opacity: 0,
          rotation: 45
        },
        {
          scale: 1,
          opacity: 0.7,
          rotation: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.5)"
        },
        "-=0.8"
      );

      // 3. Animación del título
      masterTL.fromTo(titleRef.current,
        {
          y: 40,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        },
        "-=0.8"
      );

      // 4. Animación del texto
      masterTL.fromTo(textRefs.current,
        {
          y: 25,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out"
        },
        "-=0.6"
      );

      // 5. Animación de las stats
      masterTL.fromTo(statsRefs.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.3)"
        },
        "-=0.4"
      );
    }
  }, [isVisible]);

  // Efecto parallax suave
  useEffect(() => {
    if (scrollTopRef.current) {
      gsap.to(scrollTopRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }
  }, [isVisible]);

  const startCounters = () => {
    stats.forEach(stat => {
      const targetNumber = stat.number;
      const duration = 1500;
      const steps = 50;
      const increment = targetNumber / steps;
      const stepTime = duration / steps;

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
          current = targetNumber;
          clearInterval(timer);
        }
        setCounters(prev => ({
          ...prev,
          [stat.id]: Math.floor(current)
        }));
      }, stepTime);
    });
  };

  const addToTextRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  const addToStatsRefs = (el) => {
    if (el && !statsRefs.current.includes(el)) {
      statsRefs.current.push(el);
    }
  };

  const addToParticlesRefs = (el) => {
    if (el && !particlesRef.current.includes(el)) {
      particlesRef.current.push(el);
    }
  };

  const addToDecorRefs = (el) => {
    if (el && !decorElementsRef.current.includes(el)) {
      decorElementsRef.current.push(el);
    }
  };

  const textLines = [
    "En Rectángulo Films creemos en el poder de una buena historia bien contada.",
    "Desarrollamos y producimos largometrajes, documentales y series que invitan a sentir, pensar y cuestionar.", 
    "Trabajamos con talentos valientes y mentes creativas para llevar ideas poderosas desde el papel hasta la pantalla."
  ];

  return (
    <>
      <section ref={sectionRef} className="relative py-16 lg:py-24 bg-black overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Columna de texto */}
            <div className="order-2 lg:order-1">
              <div className="max-w-lg">
                {/* Línea decorativa y título */}
                <div className="flex items-center gap-3 mb-6 lg:mb-8">
                  <div className="w-8 lg:w-12 h-px bg-red-600"></div>
                  <h2 
                    ref={titleRef}
                    className="font-bold text-white uppercase leading-tight mb-4 lg:mb-6 opacity-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                  >
                    Nuestra Filosofía
                  </h2>
                </div>

                {/* Texto principal */}
                <div className="space-y-4 lg:space-y-5 mb-8 lg:mb-12">
                  {textLines.map((line, index) => (
                    <p 
                      key={index}
                      ref={addToTextRefs}
                      className="text-base lg:text-lg text-white/80 leading-relaxed font-gotham-book opacity-0"
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {/* Stats con contadores - SIN DESCRIPCIÓN */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                  {stats.map((stat, index) => (
                    <div 
                      key={stat.id}
                      ref={addToStatsRefs}
                      className="text-center group opacity-0"
                    >
                      <div className="mb-2">
                        <span className="text-2xl lg:text-3xl xl:text-4xl font-gotham-cond-black text-red-600 block leading-none">
                          {counters[stat.id]}
                          <span className="text-red-600">{stat.suffix}</span>
                        </span>
                      </div>
                      <h3 className="text-base lg:text-lg font-gotham-cond-black text-white mb-1 uppercase tracking-tight">
                        {stat.title}
                      </h3>
                      
                      {/* Línea decorativa inferior */}
                      <div className="mt-2 w-8 h-0.5 bg-red-600 mx-auto group-hover:w-12 transition-all duration-400"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna de imagen */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative overflow-hidden">
                {/* Overlay animado */}
                <div 
                  ref={imageOverlayRef}
                  className="absolute top-0 left-0 w-full h-full bg-red-600 z-20 transform -translate-x-full"
                ></div>
                
                {/* Contenedor de la imagen */}
                <div className="relative h-[350px] lg:h-[500px]">
                  <TiltedCard
                    imageSrc="/infosection.webp"
                    altText="Nuestra filosofía en Rectángulo Films"
                    containerHeight="100%"
                    containerWidth="100%"
                    imageHeight="100%"
                    imageWidth="100%"
                    rotateAmplitude={15}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent={false}
                  />
                  
                  {/* Overlays de color */}
                  <div className="absolute inset-0 bg-red-600/20 mix-blend-multiply rounded-md pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-md pointer-events-none"></div>
                </div>

                {/* Líneas decorativas */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-70 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-70 pointer-events-none"></div>
              </div>

              {/* Cuadros decorativos más pequeños - SIN ESQUINAS REDONDEADAS */}
              <div 
                ref={addToDecorRefs}
                className="absolute -top-3 -right-3 w-16 h-16 lg:w-20 lg:h-20 border border-red-600 opacity-0 pointer-events-none transform-gpu"
              ></div>
              
              <div 
                ref={addToDecorRefs}
                className="absolute -bottom-3 -left-3 w-12 h-12 lg:w-16 lg:h-16 border border-red-600/50 opacity-0 pointer-events-none transform-gpu"
              ></div>

              <div 
                ref={addToDecorRefs}
                className="absolute -top-6 -left-6 w-8 h-8 lg:w-12 lg:h-12 border border-red-600/30 opacity-0 pointer-events-none transform-gpu"
              ></div>
              
              <div 
                ref={addToDecorRefs}
                className="absolute -bottom-6 -right-6 w-6 h-6 lg:w-10 lg:h-10 border border-red-600/40 opacity-0 pointer-events-none transform-gpu"
              ></div>

              {/* Texto superpuesto - SIN ESQUINAS REDONDEADAS */}
              <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                <div className="bg-black/80 px-3 py-2 border-l-2 border-red-600 backdrop-blur-sm">
                  <div className="text-white font-gotham-cond-black text-xs lg:text-sm uppercase tracking-wider">
                    Storytelling
                  </div>
                  <div className="text-red-600 font-gotham-cond-bold text-xs uppercase tracking-wide">
                    Desde 2018
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Elementos decorativos de fondo más pequeños */}
        <div className="absolute top-1/4 -left-24 w-48 h-48 bg-red-600/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-24 w-48 h-48 bg-red-600/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Partículas más pequeñas */}
        <div
          ref={addToParticlesRefs}
          className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-red-600/50 rounded-full pointer-events-none"
        ></div>
        
        <div
          ref={addToParticlesRefs}
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-600/30 rounded-full pointer-events-none"
        ></div>
        
        <div
          ref={addToParticlesRefs}
          className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-red-600/40 rounded-full pointer-events-none"
        ></div>
        
        <div
          ref={addToParticlesRefs}
          className="absolute top-2/3 right-1/4 w-1 h-1 bg-red-600/50 rounded-full pointer-events-none"
        ></div>

        {/* Líneas decorativas más cortas */}
        <div
          ref={addToParticlesRefs}
          className="absolute top-32 left-8 w-12 h-0.5 bg-red-600/40 pointer-events-none"
        ></div>
        
        <div
          ref={addToParticlesRefs}
          className="absolute bottom-48 right-16 w-10 h-0.5 bg-red-600/30 pointer-events-none"
        ></div>

      </section>

      {/* Scroll Top Button más pequeño */}
      <div
        ref={scrollTopRef}
        className="fixed bottom-6 right-6 z-50 opacity-0 scale-80 transform cursor-pointer"
        onClick={scrollToTop}
      >
        <div className="relative group">
          {/* Círculo principal */}
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full shadow-lg shadow-red-600/25 flex items-center justify-center transition-all duration-300 group-hover:shadow-red-600/40 group-hover:scale-105">
            
            {/* Flecha animada */}
            <div ref={scrollArrowRef} className="transform transition-transform duration-300">
              <svg 
                className="w-5 h-5 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 15l7-7 7 7" 
                />
              </svg>
            </div>

            {/* Efecto de pulso */}
            <div className="absolute inset-0 border border-red-400 rounded-full animate-ping opacity-15"></div>
          </div>

          {/* Tooltip más pequeño */}
          <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-black/90 text-white text-[10px] font-gotham-book px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap backdrop-blur-sm border border-red-600/20">
            Volver al inicio
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-black/90"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StorySection;