import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AudiovisualesSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const itemsRef = useRef([]);
  const imageRef = useRef(null);
  const badgesRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(titleRef.current,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power2.out"
      }
    )
    .fromTo(".title-line",
      {
        scaleX: 0,
        opacity: 0
      },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out"
      },
      "-=0.6"
    )
    .fromTo(subtitleRef.current,
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
      "-=0.4"
    )
    .fromTo(itemsRef.current,
      {
        x: -25,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out"
      },
      "-=0.3"
    )
    .fromTo(imageRef.current,
      {
        rotationY: 15,
        opacity: 0,
        scale: 0.95
      },
      {
        rotationY: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      },
      "-=0.4"
    )
    .fromTo(badgesRef.current,
      {
        scale: 0,
        rotation: -180
      },
      {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.8)"
      },
      "-=0.5"
    );
  }, []);

  const formatos = [
    "Publicidad",
    "Comercial", 
    "Videoclip",
    "Corporativo",
    "Cobertura de eventos",
    "Contenido para redes",
    "Drone"
  ];

  const addToItemsRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  const addToBadgesRefs = (el) => {
    if (el && !badgesRef.current.includes(el)) {
      badgesRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-20 bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 lg:mb-14">
          <h2 
            ref={titleRef}
            className="text-4xl lg:text-5xl font-gotham-cond-black text-white uppercase tracking-tight mb-4 opacity-0"
          >
            Audiovisuales
          </h2>
          
          <div className="title-line w-20 h-1 bg-red-600 mx-auto mb-6 transform origin-center"></div>
          
          <p 
            ref={subtitleRef}
            className="text-xl font-gotham-light text-white/80 max-w-lg mx-auto opacity-0"
          >
            Producción integral de piezas audiovisuales para todo tipo de formatos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-6xl mx-auto">
          
          {/* Lista */}
          <div className="space-y-3">
            {formatos.map((formato, index) => (
              <div
                key={index}
                ref={addToItemsRefs}
                className="group flex items-center justify-between p-4 bg-black/40 backdrop-blur-sm border border-white/10 hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 cursor-pointer opacity-0"
              >
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-600 mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                  <span className="text-white font-gotham-cond-bold text-base uppercase tracking-wide">
                    {formato}
                  </span>
                </div>
                <div className="w-5 h-5 border-2 border-white/30 flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600 transition-all duration-300">
                  <div className="w-1.5 h-1.5 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Imagen - Mismo tamaño que la lista */}
          <div className="relative">
            <div className="relative overflow-hidden transform-gpu [perspective:1000px] h-full">
              <img
                ref={imageRef}
                src="/bts/bts2.jpg"
                alt="Producción audiovisual integral"
                className="w-full h-full object-cover opacity-0 transform-gpu min-h-[400px]"
              />
              
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-blue-600/5 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Badges sin bordes redondeados */}
              <div className="absolute top-5 right-5 flex flex-col gap-2">
                <div 
                  ref={addToBadgesRefs}
                  className="bg-red-600 text-white font-gotham-cond-bold text-xs uppercase tracking-wider px-3 py-2 opacity-0 transform-gpu"
                >
                  4K HDR
                </div>
                <div 
                  ref={addToBadgesRefs}
                  className="bg-black/80 text-white font-gotham-cond-bold text-xs uppercase tracking-wider px-3 py-2 border border-white/20 opacity-0 transform-gpu"
                >
                  DOLBY ATMOS
                </div>
              </div>

              {/* Texto inferior */}
              <div className="absolute bottom-5 left-5">
                <div className="bg-gradient-to-r from-black/90 to-black/70 backdrop-blur-md px-4 py-3 border-r-4 border-red-600">
                  <div className="text-white font-gotham-cond-black text-sm uppercase tracking-wider">
                    PRODUCCIÓN
                  </div>
                  <div className="text-red-400 font-gotham-cond-bold text-xs uppercase tracking-wide">
                    INTEGRAL
                  </div>
                </div>
              </div>
            </div>

            {/* Líneas decorativas - sin bordes redondeados */}
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t border-r border-red-600/40 pointer-events-none"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b border-l border-red-600/30 pointer-events-none"></div>
          </div>

        </div>

      </div>

      {/* Elementos de fondo */}
      <div className="absolute top-12 left-8 w-3 h-3 bg-red-600 opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-12 right-8 w-2 h-2 bg-red-600 opacity-30 pointer-events-none"></div>
      
      <div className="absolute top-1/4 -left-20 w-40 h-40 bg-red-600/5 blur-2xl pointer-events-none"></div>
    </section>
  );
};

export default AudiovisualesSection;