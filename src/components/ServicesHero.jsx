import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ServicesHero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRefs = useRef([]);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const ctaRef = useRef(null);

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

    tl.to(overlayRef.current, {
      x: "100%",
      duration: 1.2,
      ease: "power2.inOut"
    })
    .fromTo(titleRef.current,
      {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0
      },
      {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
      },
      "-=0.8"
    )
    .fromTo(subtitleRef.current,
      {
        y: 25,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.8"
    )
    .fromTo(textRefs.current,
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
    )
    .fromTo(ctaRef.current,
      {
        y: 30,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
      },
      "-=0.4"
    )
    .fromTo(imageRef.current,
      {
        scale: 1.1,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      },
      "-=0.4"
    );
  }, []);

  const addToTextRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header con mismo estilo que Work */}
        <div className="text-center mb-12 lg:mb-20">
          <div className="relative inline-block mb-6">
            <h1 
              ref={titleRef}
              className="text-3xl lg:text-5xl xl:text-6xl font-gotham-cond-black text-white tracking-tight leading-none opacity-0"
            >
              <span className="block">SERVICIOS</span>
              <span className="block text-red-600 mt-1">PROFESIONALES</span>
            </h1>
            
            {/* Líneas decorativas */}
            <div className="absolute -bottom-3 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          </div>

          <div 
            ref={subtitleRef}
            className="relative opacity-0"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-px bg-red-600"></div>
              <span className="text-red-600 font-gotham-cond-black text-xs tracking-wider uppercase">
                SOLUCIONES INTEGRALES
              </span>
              <div className="w-8 h-px bg-red-600"></div>
            </div>
            <p className="text-white/70 font-gotham-book text-base max-w-lg mx-auto leading-relaxed">
              Ofrecemos servicios completos de producción audiovisual para llevar tus ideas al siguiente nivel
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Columna de texto */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-5">
              <p 
                ref={addToTextRefs}
                className="text-xl lg:text-2xl xl:text-3xl font-gotham-cond-black text-white uppercase tracking-tight opacity-0"
              >
                Producción audiovisual de principio a fin.
              </p>
              
              <p 
                ref={addToTextRefs}
                className="text-base lg:text-lg text-white/80 leading-relaxed font-gotham-book opacity-0"
              >
                Conceptualizamos, grabamos, editamos y entregamos contenido visual con intención, estética y calidad profesional.
              </p>
            </div>

            {/* CTA para contacto */}
            <div ref={ctaRef} className="opacity-0">
              <button className="group bg-red-600 text-white font-gotham-cond-bold uppercase tracking-wider px-10 py-4 text-lg border-2 border-red-600 hover:bg-red-700 transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
                <span className="relative z-10">SOLICITAR COTIZACIÓN</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          </div>

          {/* Columna de imagen */}
          <div className="relative">
            <div 
              ref={overlayRef}
              className="absolute top-0 left-0 w-full h-full bg-red-600 z-20 transform -translate-x-full"
            />
            
            <div className="relative overflow-hidden">
              <img
                ref={imageRef}
                src="/bts/bts1.jpg"
                alt="Producción audiovisual profesional"
                className="w-full h-[350px] lg:h-[500px] object-cover opacity-0"
              />
              
              <div className="absolute inset-0 bg-red-600/20 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>

            {/* Líneas decorativas */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-70 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-70 pointer-events-none" />

            {/* Cuadros decorativos */}
            <div className="absolute -top-3 -right-3 w-16 h-16 border border-red-600/20 pointer-events-none" />
            <div className="absolute -bottom-3 -left-3 w-12 h-12 border border-red-600/50 pointer-events-none" />
          </div>

        </div>

      </div>

      {/* Elementos decorativos de fondo */}
      <div className="absolute top-1/4 -left-24 w-48 h-48 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-48 h-48 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Partículas */}
      <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-red-600/50 rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-red-600/40 rounded-full pointer-events-none" />
    </section>
  );
};

export default ServicesHero;