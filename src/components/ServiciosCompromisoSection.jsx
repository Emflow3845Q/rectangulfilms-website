import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaBroadcastTower, 
  FaCamera, 
  FaFilm,
  FaEdit,
  FaVideo,
  FaVolumeUp
} from "react-icons/fa";

const ServiciosCompromisoSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const servicesRef = useRef([]);

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
        y: 60,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }
    )
    .fromTo(subtitleRef.current,
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
    )
    .fromTo(servicesRef.current,
      {
        scale: 0.8,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.4"
    );
  }, []);

  const servicios = [
    {
      icon: <FaBroadcastTower />,
      title: "Streaming",
      description: "Producción en vivo"
    },
    {
      icon: <FaCamera />,
      title: "Fotografia", 
      description: "Imagen cinematográfica"
    },
    {
      icon: <FaFilm />,
      title: "Dirección",
      description: "Lenguaje visual"
    },
    {
      icon: <FaEdit />,
      title: "Postproducción",
      description: "Precisión técnica"
    },
    {
      icon: <FaVideo />,
      title: "Equipo",
      description: "Listo para rodar"
    },
    {
      icon: <FaVolumeUp />,
      title: "Sonido",
      description: "Diseño sonoro"
    }
  ];

  const addToServicesRefs = (el) => {
    if (el && !servicesRef.current.includes(el)) {
      servicesRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 lg:mb-16">
          <h1 
            ref={titleRef}
            className="text-4xl lg:text-5xl xl:text-6xl font-gotham-cond-black text-white uppercase tracking-tight mb-6 opacity-0"
          >
            Servicios
          </h1>
          
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          
          <p 
            ref={subtitleRef}
            className="text-lg lg:text-xl font-gotham-cond-bold text-red-600 uppercase tracking-wider opacity-0"
          >
            COMPROMISO REAL
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {servicios.map((servicio, index) => (
            <div
              key={index}
              ref={addToServicesRefs}
              className="text-center group cursor-pointer opacity-0"
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-red-600 flex items-center justify-center mx-auto group-hover:bg-red-700 transition-all duration-300">
                  <div className="text-2xl lg:text-3xl text-white">
                    {servicio.icon}
                  </div>
                </div>
              </div>
              
              <h3 className="text-white font-gotham-cond-black text-lg lg:text-xl uppercase tracking-tight mb-2 group-hover:text-red-600 transition-colors duration-300">
                {servicio.title}
              </h3>
              
              <p className="text-white/70 font-gotham-book text-sm lg:text-base">
                {servicio.description}
              </p>
            </div>
          ))}
        </div>

      </div>

      <div className="absolute top-20 left-8 w-3 h-3 bg-red-600 opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-20 right-8 w-2 h-2 bg-red-600 opacity-40 pointer-events-none"></div>
    </section>
  );
};

export default ServiciosCompromisoSection;