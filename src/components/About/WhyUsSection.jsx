import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhyUsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const overlayRef = useRef(null);
  const decorElementsRef = useRef([]);

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

      // Título principal
      masterTL.fromTo(titleRef.current,
        {
          y: 60,
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

      // Subtítulo
      masterTL.fromTo(subtitleRef.current,
        {
          y: 40,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        },
        "-=0.6"
      );

      // Elementos decorativos
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
        "-=0.4"
      );

      // Cards animadas
      masterTL.fromTo(cardsRef.current,
        {
          y: 80,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.4)"
        },
        "-=0.2"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToCardsRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const addToDecorRefs = (el) => {
    if (el && !decorElementsRef.current.includes(el)) {
      decorElementsRef.current.push(el);
    }
  };

  const cards = [
    {
      title: "Historias moldeadas por la empatía",
      content: "En Rectángulo Films transformamos ideas en cine y contenido que se siente vivo. Desde largometrajes y documentales hasta series y piezas de marca, diseñamos cada plano para emocionar, ser claro e inolvidable."
    },
    {
      title: "Narración que corta el ruido",
      content: "Hacemos que las audiencias paren y escuchen. Convertimos conceptos en relatos precisos con lenguaje visual potente y un ritmo que conecta. Las mejores historias no solo impresionan: se sienten y permanecen."
    },
    {
      title: "Dirección y diseño que crean conexión real",
      content: "Integramos guion, dirección, fotografía, arte y sonido para construir experiencias audiovisuales memorables. Colaboramos con marcas y creadores para elevar su identidad con contenidos cinematográficos, campañas y activaciones inmersivas."
    },
    {
      title: "Hechas juntos, hechas para durar",
      content: "Nuestro proceso es profundamente colaborativo. Trabajamos como extensión de tu equipo, desde el desarrollo hasta la postproducción: preguntamos, escuchamos y afinamos. ¿El resultado? Piezas a medida, de alto impacto y pensadas para trascender."
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 bg-black overflow-hidden">
      
      {/* Overlay animado */}
      <div 
        ref={overlayRef}
        className="absolute top-0 left-0 w-full h-full bg-red-600 z-10 transform -translate-x-full"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 lg:w-12 h-px bg-red-600"></div>
            <h2 
              ref={titleRef}
              className="font-bold text-white uppercase leading-tight opacity-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            >
              Porque nosotros
            </h2>
            <div className="w-8 lg:w-12 h-px bg-red-600"></div>
          </div>
          
          <h3 
            ref={subtitleRef}
            className="text-red-600 font-gotham-cond-black text-xl lg:text-2xl uppercase tracking-wider opacity-0 max-w-2xl mx-auto"
          >
            Transformamos ideas en experiencias cinematográficas que perduran
          </h3>
        </div>

        {/* Grid de cards SIN BORDER RADIUS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={index}
              ref={addToCardsRefs}
              className="group relative bg-black/40 backdrop-blur-sm border border-white/10 p-6 lg:p-8 hover:border-red-600/50 transition-all duration-500 opacity-0 transform-gpu hover:transform hover:scale-[1.02]"
            >
              {/* Número de card SIN BORDER RADIUS */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-red-600 flex items-center justify-center">
                <span className="text-white font-gotham-cond-black text-sm">
                  {index + 1}
                </span>
              </div>

              {/* Contenido */}
              <h3 className="text-white font-gotham-cond-black text-xl lg:text-2xl mb-4 uppercase tracking-tight leading-tight">
                {card.title}
              </h3>
              
              <p className="text-white/80 font-gotham-book text-base lg:text-lg leading-relaxed">
                {card.content}
              </p>

              {/* Línea decorativa inferior */}
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Efecto de glow al hover SIN BORDER RADIUS */}
              <div className="absolute -inset-2 bg-red-600/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Elementos decorativos SIN BORDER RADIUS */}
        <div 
          ref={addToDecorRefs}
          className="absolute top-20 left-10 w-16 h-16 border border-red-600 opacity-0 pointer-events-none transform-gpu"
        />
        
        <div 
          ref={addToDecorRefs}
          className="absolute bottom-20 right-10 w-12 h-12 border border-red-600/50 opacity-0 pointer-events-none transform-gpu"
        />

        <div 
          ref={addToDecorRefs}
          className="absolute top-1/2 -left-8 w-8 h-8 border border-red-600/30 opacity-0 pointer-events-none transform-gpu"
        />
        
        <div 
          ref={addToDecorRefs}
          className="absolute bottom-1/3 -right-8 w-10 h-10 border border-red-600/40 opacity-0 pointer-events-none transform-gpu"
        />

      </div>

      {/* Elementos decorativos de fondo SIN BORDER RADIUS */}
      <div className="absolute top-1/4 -left-24 w-48 h-48 bg-red-600/5 blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-24 w-48 h-48 bg-red-600/5 blur-2xl pointer-events-none"></div>

      {/* Partículas flotantes SIN BORDER RADIUS */}
      <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-red-600/50 pointer-events-none"></div>
      <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-red-600/30 pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-red-600/40 pointer-events-none"></div>

    </section>
  );
};

export default WhyUsSection;