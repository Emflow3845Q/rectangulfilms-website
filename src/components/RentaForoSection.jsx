import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaAd, FaFilm, FaMusic, FaMobile } from "react-icons/fa";

const RentaForoSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const featuresRef = useRef([]);
  const lensRef = useRef(null);

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

    // Efecto de apertura de lente
    tl.fromTo(lensRef.current,
      {
        scale: 0,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      }
    )
    .fromTo(contentRef.current,
      {
        x: -100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out"
      },
      "-=1"
    )
    .fromTo(titleRef.current,
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
      "-=0.8"
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
      "-=0.6"
    )
    .fromTo(descriptionRef.current,
      {
        y: 25,
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
    .fromTo(featuresRef.current,
      {
        scale: 0,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.3"
    );
  }, []);

  const features = [
    { icon: <FaAd />, text: "Publicidad" },
    { icon: <FaFilm />, text: "Cine" },
    { icon: <FaMusic />, text: "Videoclips" },
    { icon: <FaMobile />, text: "Contenido digital" }
  ];

  const addToFeaturesRefs = (el) => {
    if (el && !featuresRef.current.includes(el)) {
      featuresRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="relative py-16 flex items-center justify-end bg-black overflow-hidden">
      
      {/* Fondo con efecto de lente de cámara */}
      <div className="absolute inset-0">
        {/* Imagen BTS */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/bts/bts3.jpg")'
          }}
        />
        
        {/* Overlay para contraste */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        
        {/* Lente de cámara - efecto circular */}
        <div 
          ref={lensRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-4 border-red-600/40 rounded-full opacity-0 pointer-events-none"
        >
          <div className="absolute inset-6 border-2 border-red-600/20 rounded-full"></div>
          <div className="absolute inset-12 border border-red-600/10 rounded-full"></div>
          
          {/* Cruz de enfoque */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-600/30"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-600/30"></div>
        </div>
      </div>

      {/* Contenido a la derecha - estilo viewfinder */}
      <div className="relative z-10 w-full max-w-md mr-0 lg:mr-16">
        <div 
          ref={contentRef}
          className="bg-black/70 backdrop-blur-md border-2 border-white/20 p-6 lg:p-8 mx-auto max-w-sm opacity-0"
          style={{
            boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)'
          }}
        >
          <h2 
            ref={titleRef}
            className="text-2xl lg:text-3xl font-gotham-cond-black text-white uppercase tracking-tight mb-3 opacity-0"
          >
            RENTA DE FORO
          </h2>
          
          <div className="w-12 h-1 bg-red-600 mb-4"></div>
          
          <p 
            ref={subtitleRef}
            className="text-xl lg:text-2xl font-gotham-light text-red-400 mb-4 opacity-0"
          >
            Tu set, tu historia
          </p>

          <p 
            ref={descriptionRef}
            className="text-base lg:text-lg font-gotham-book text-white/80 leading-relaxed mb-6 opacity-0"
          >
            Foro versátil y listo para cualquier producción: publicidad, cine, videoclips o contenido digital. 
            Espacio profesional que se adapta a tu visión.
          </p>

          {/* Features con iconos React Icons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={addToFeaturesRefs}
                className="flex items-center p-2 bg-black/60 border border-white/20 hover:border-red-600 hover:bg-red-600/20 transition-all duration-300 opacity-0 group"
              >
                <div className="w-8 h-8 bg-red-600 flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white text-sm">
                    {feature.icon}
                  </div>
                </div>
                <span className="text-white font-gotham-cond-bold text-xs uppercase tracking-wide">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA estilo botón de cámara */}
          <button className="w-full bg-red-600 text-white font-gotham-cond-bold uppercase tracking-wider py-3 text-sm border-2 border-red-600 hover:bg-red-700 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
            <span className="relative z-10">RESERVAR FORO</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </div>

      {/* Elementos decorativos de cámara */}
      <div className="absolute top-8 right-1/4 w-2 h-2 bg-red-600 opacity-60 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-8 left-1/3 w-1.5 h-1.5 bg-red-600 opacity-40 pointer-events-none"></div>
      
      {/* Luz de grabación */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-red-600 rounded-full animate-pulse pointer-events-none"></div>
    </section>
  );
};

export default RentaForoSection;