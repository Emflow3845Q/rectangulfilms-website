import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const heroRef = useRef(null);
  const sloganRef = useRef(null);
  const dynamicTextRef = useRef(null);
  const buttonRef = useRef(null);
  
  const dynamicTexts = [
    "rectángulo",
    "Cine",
    "publicity", 
    "music video",
    "comercial",
    "events"
  ];

  useEffect(() => {
    // Animación de entrada del hero
    const masterTL = gsap.timeline();
    
    masterTL.fromTo(heroRef.current,
      {
        opacity: 0,
        scale: 1.1
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out"
      }
    );

    masterTL.fromTo(sloganRef.current,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.5"
    );

    // Iniciar la animación del texto dinámico después de que aparezca el slogan
    masterTL.call(() => {
      startTextAnimation();
    });

    // Efecto de partículas rojas
    gsap.to(".red-particle", {
      y: -20,
      opacity: 0,
      duration: 3,
      stagger: 0.1,
      repeat: -1,
      ease: "power1.out"
    });

    return () => {
      // Cleanup
    };
  }, []);

  useEffect(() => {
    if (!isAnimating) return;

    const textAnimation = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        // Avanzar al siguiente texto después de un delay
        setTimeout(() => {
          setCurrentTextIndex((prev) => 
            prev === dynamicTexts.length - 1 ? 0 : prev + 1
          );
        }, 1000);
      }
    });

    textAnimation
      .to(dynamicTextRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      })
      .call(() => {
        // Cambiar el texto mientras está invisible
        gsap.set(dynamicTextRef.current, { y: 20 });
      })
      .to(dynamicTextRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      });
  }, [currentTextIndex, isAnimating]);

  const startTextAnimation = () => {
    setIsAnimating(true);
  };

  const handleButtonClick = () => {
    // Navegar a la página about
    window.location.href = "/about";
  };

  // Crear partículas decorativas
  const particles = Array.from({ length: 15 }, (_, i) => (
    <div
      key={i}
      className="red-particle absolute w-2 h-2 bg-red-primary opacity-20"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  ));

  return (
    <section 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-red-primary opacity-0"
    >
      {/* Fondo animado con gradientes */}
      <div className="absolute inset-0">
        {/* Gradiente animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-darker via-red-primary to-red-dark animate-pulse"></div>
        
        {/* Efecto de movimiento sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-primary/10 to-transparent animate-[shift_3s_ease-in-out_infinite]"></div>
        
        {/* Partículas */}
        {particles}
      </div>

      {/* Contenido principal */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Slogan */}
          <div className="mb-8">
            <h1 
              ref={sloganRef}
              className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-gotham-cond-black text-white uppercase tracking-tight opacity-0"
            >
              we are{" "}
              <span 
                ref={dynamicTextRef}
                className="inline-block text-white border-b-4 border-white pb-2 min-w-[200px]"
              >
                {dynamicTexts[currentTextIndex]}
              </span>
            </h1>
          </div>

          {/* Botón Who We Are */}
          <div className="mt-12">
            <button
              ref={buttonRef}
              onClick={handleButtonClick}
              className="bg-white text-red-primary px-12 py-4 font-gotham-cond-black text-xl uppercase tracking-widest hover:bg-gray-100 transition-all duration-300 border-2 border-white hover:scale-105 transform opacity-0"
              style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              who we are
            </button>
          </div>
        </div>
      </div>

      {/* Efectos visuales adicionales */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>

      {/* Elementos decorativos cuadrados */}
      <div className="absolute top-10 left-10 w-6 h-6 border-2 border-white/30 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-4 h-4 border-2 border-white/20 animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-white/40 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/4 left-20 w-5 h-5 border border-white/25 animate-float" style={{animationDelay: '1.5s'}}></div>
    </section>
  );
};

export default Hero;