import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutRectangulo = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRefs = useRef([]);
  const photoContainerRef = useRef(null);
  const photoRef = useRef(null);
  const overlayRef = useRef(null);
  const rectElementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        }
      });

      // Overlay inicial
      masterTL.to(overlayRef.current, {
        x: "100%",
        duration: 1.2,
        ease: "power2.inOut"
      });

      // Foto BTS aparece - más grande
      masterTL.fromTo(photoRef.current,
        {
          scale: 0.9,
          opacity: 0,
          x: -50
        },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power2.out"
        },
        "-=0.8"
      );

      // Rectángulos decorativos animados
      masterTL.fromTo(rectElementsRef.current,
        {
          scale: 0,
          rotation: -45,
          opacity: 0
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.8)"
        },
        "-=0.6"
      );

      // Título principal
      masterTL.fromTo(titleRef.current,
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
        "-=0.4"
      );

      // Subtítulo
      masterTL.fromTo(subtitleRef.current,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        },
        "-=0.6"
      );

      // Textos
      masterTL.fromTo(textRefs.current,
        {
          x: -40,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out"
        },
        "-=0.3"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToTextRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  const addToRectRefs = (el, index) => {
    if (el && !rectElementsRef.current.includes(el)) {
      rectElementsRef.current[index] = el;
    }
  };

  const textContent = [
    "Somos Rectángulo, casa productora con base en Guadalajara.",
    "Creamos visuales que cuentan. Un equipo de creativos, técnicos y especialistas que convierte ideas en piezas visuales potentes.",
    "Nuestro enfoque une método, sensibilidad y ejecución impecable. No producimos por producir."
  ];

  const rectangulos = [
    { size: "w-20 h-20", position: "top-4 -right-4", border: "border-red-600/80" },
    { size: "w-16 h-16", position: "bottom-8 -left-4", border: "border-red-600/60" },
    { size: "w-12 h-12", position: "top-12 left-8", border: "border-red-600/40" },
    { size: "w-10 h-10", position: "bottom-4 right-12", border: "border-red-600/20" }
  ];

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 bg-black overflow-hidden">
      
      {/* Overlay animado */}
      <div 
        ref={overlayRef}
        className="absolute top-0 left-0 w-full h-full bg-red-600 z-10 transform -translate-x-full"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          
          {/* Columna visual - Foto BTS grande */}
          <div className="flex justify-center lg:justify-start">
            <div ref={photoContainerRef} className="relative w-full max-w-2xl">
              {/* Contenedor principal de la foto */}
              <div 
                ref={photoRef}
                className="relative w-full h-[500px] lg:h-[600px] bg-gray-800 border-2 border-red-600/50 overflow-hidden opacity-0"
              >
                {/* Foto BTS de fondo - ocupa todo el espacio */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: "url('/bts/bts.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                
                {/* Overlay rojo sutil */}
                <div className="absolute inset-0 bg-red-600/10 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Logo Rectángulo Films superpuesto */}
                <div className="absolute bottom-6 left-6 z-10">
                  <div className="bg-black/80 px-4 py-3 border-l-2 border-red-600 backdrop-blur-sm">
                    <div className="text-white font-gotham-cond-black text-xl uppercase tracking-widest">
                      RECTÁNGULO
                    </div>
                    <div className="text-red-600 font-gotham-cond-bold text-sm uppercase tracking-wider">
                      FILMS
                    </div>
                  </div>
                </div>

                {/* Esquinas decorativas grandes */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-red-600"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-red-600"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-red-600"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-red-600"></div>
              </div>

              {/* Rectángulos decorativos flotantes */}
              {rectangulos.map((rect, index) => (
                <div
                  key={index}
                  ref={el => addToRectRefs(el, index)}
                  className={`absolute ${rect.size} border ${rect.border} bg-black/30 backdrop-blur-sm opacity-0 ${rect.position}`}
                >
                  {/* Esquinas decorativas */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-red-600"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-red-600"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-red-600"></div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-red-600"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna de texto */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-px bg-red-600"></div>
                <h2 
                  ref={titleRef}
                  className="font-bold text-white uppercase leading-tight opacity-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                >
                  Somos Rectángulo
                </h2>
              </div>
              
              <h3 
                ref={subtitleRef}
                className="text-red-600 font-gotham-cond-black text-xl lg:text-2xl uppercase tracking-wider opacity-0"
              >
                Casa Productora • Guadalajara
              </h3>
            </div>

            {/* Texto contenido */}
            <div className="space-y-6">
              {textContent.map((text, index) => (
                <p 
                  key={index}
                  ref={addToTextRefs}
                  className="text-white/80 font-gotham-book text-lg lg:text-xl leading-relaxed opacity-0"
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Línea decorativa y año */}
            <div className="flex items-center gap-8 pt-6 border-t border-white/10">
              <div className="text-red-600 font-gotham-cond-bold text-lg uppercase tracking-wider">
                Desde 2018
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-red-600 to-transparent"></div>
              <div className="text-white/60 font-gotham-book text-sm uppercase tracking-widest">
                Producción Audiovisual
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Elementos decorativos de fondo */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 bg-red-600/5 rounded-full blur-xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-red-600/5 rounded-full blur-xl pointer-events-none"></div>
      
      {/* Líneas decorativas */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent"></div>
    </section>
  );
};

export default AboutRectangulo;