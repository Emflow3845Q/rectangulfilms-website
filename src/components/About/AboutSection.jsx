import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRefs = useRef([]);
  const overlayRef = useRef(null);
  const teamCardsRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);

  // Texto del componente
  const content = {
    title: "Equipo",
    subtitle: "Nuestra gente",
    description: "En Rectángulo Films, transformamos ideas en experiencias visuales impactantes. Especializados en cine, publicidad y contenido digital, creamos narrativas que conectan marcas con audiencias."
  };

  // Datos del equipo - 6 miembros
  const teamMembers = [
    {
      id: 1,
      name: "Alex Morgan",
      role: "Director Creativo",
      image: "/team1.webp",
      specialty: "DIRECCIÓN"
    },
    {
      id: 2,
      name: "Sarah Chen", 
      role: "Director de Fotografía",
      image: "/team2.webp",
      specialty: "FOTOGRAFÍA"
    },
    {
      id: 3,
      name: "Marcus Rodriguez",
      role: "Diseñador de Sonido",
      image: "/team3.webp",
      specialty: "SONIDO"
    },
    {
      id: 4,
      name: "Elena Petrova",
      role: "Artista VFX",
      image: "/team4.webp",
      specialty: "EFECTOS VISUALES"
    },
    {
      id: 5,
      name: "David Kim",
      role: "Productor Ejecutivo",
      image: "/team5.webp",
      specialty: "PRODUCCIÓN"
    },
    {
      id: 6,
      name: "Lisa Thompson",
      role: "Editora",
      image: "/team6.webp",
      specialty: "POSTPRODUCCIÓN"
    }
  ];

  // Efecto para observer de intersección
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animaciones al hacerse visible
  useEffect(() => {
    if (isVisible) {
      const masterTL = gsap.timeline();

      // 1. Animación del overlay
      masterTL.to(overlayRef.current, {
        x: "100%",
        duration: 1.2,
        ease: "power2.inOut"
      });

      // 2. Animación del título principal
      masterTL.fromTo(titleRef.current,
        {
          y: 50,
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

      // 3. Animación del subtítulo
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

      // 4. Animación del texto descriptivo
      masterTL.fromTo(textRefs.current,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        },
        "-=0.4"
      );

      // 5. Animación de las tarjetas del equipo
      masterTL.fromTo(teamCardsRef.current,
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
          stagger: 0.1,
          ease: "back.out(1.4)"
        },
        "-=0.2"
      );

    }
  }, [isVisible]);

  // Funciones para agregar referencias
  const addToTextRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  const addToTeamCardsRefs = (el, index) => {
    if (el && !teamCardsRef.current.includes(el)) {
      teamCardsRef.current[index] = el;
    }
  };

  // Componente de tarjeta de equipo SIN BORDER RADIUS
  const TeamCard = ({ member, index }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
      if (cardRef.current) {
        addToTeamCardsRefs(cardRef.current, index);
      }
    }, [index]);

    const handleMouseEnter = () => {
      setIsHovered(true);
      gsap.to(cardRef.current, {
        scale: 1.05,
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(cardRef.current, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    return (
      <div
        ref={cardRef}
        className={`group relative bg-black/40 backdrop-blur-sm border border-white/10 overflow-hidden cursor-pointer transition-all duration-300 opacity-0 transform-gpu hover:border-red-600/50`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative aspect-square">
          {/* Imagen del miembro */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
            {/* Placeholder para imagen */}
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600/20 flex items-center justify-center mx-auto mb-2 border border-red-600/30">
                <svg 
                  className="w-8 h-8 text-red-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </div>
              <div className="text-white/40 text-xs">Imagen</div>
            </div>
          </div>
          
          {/* Overlay de la imagen */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

          {/* Información del miembro */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
            <div className="mb-1">
              <span className="text-red-600 font-gotham-cond-bold text-xs tracking-wider uppercase">
                {member.specialty}
              </span>
            </div>
            <h3 className="text-white font-gotham-cond-black text-base uppercase tracking-tight leading-tight">
              {member.name}
            </h3>
            <div className="text-white/70">
              <span className="font-gotham-cond-book text-sm">{member.role}</span>
            </div>
          </div>

          {/* Efecto de escáner */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-red-600/8 to-transparent transform -translate-y-full group-hover:translate-y-full transition-transform duration-600 ease-in-out"></div>
        </div>

        {/* Efecto de glow */}
        <div className="absolute -inset-2 bg-red-600/10 blur-xl opacity-0 group-hover:opacity-100 -z-10 transition-all duration-300"></div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 bg-black overflow-hidden">
      
      {/* Overlay animado */}
      <div 
        ref={overlayRef}
        className="absolute top-0 left-0 w-full h-full bg-red-600 z-10 transform -translate-x-full"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Header centrado */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          {/* Línea decorativa y título */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 lg:w-12 h-px bg-red-600"></div>
            <h2 
              ref={titleRef}
              className="font-bold text-white uppercase leading-tight opacity-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            >
              {content.title}
            </h2>
            <div className="w-8 lg:w-12 h-px bg-red-600"></div>
          </div>

          {/* Subtítulo */}
          <h3 
            ref={subtitleRef}
            className="text-red-600 font-gotham-cond-black text-xl lg:text-2xl xl:text-3xl mb-6 uppercase tracking-wide opacity-0"
          >
            {content.subtitle}
          </h3>

          {/* Texto descriptivo corto */}
          <div className="mb-8">
            <p 
              ref={addToTextRefs}
              className="text-lg lg:text-xl text-white/80 leading-relaxed font-gotham-book opacity-0 max-w-2xl mx-auto"
            >
              {content.description}
            </p>
          </div>

          {/* Elementos decorativos de texto */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-0.5 bg-red-600"></div>
              <span className="text-white/60 font-gotham-book text-sm uppercase tracking-wider">
                Cine
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-0.5 bg-red-600"></div>
              <span className="text-white/60 font-gotham-book text-sm uppercase tracking-wider">
                Publicidad
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-0.5 bg-red-600"></div>
              <span className="text-white/60 font-gotham-book text-sm uppercase tracking-wider">
                Contenido Digital
              </span>
            </div>
          </div>
        </div>

        {/* Grid de tarjetas del equipo - 6 en grid 3x2 SIN BORDER RADIUS */}
        <div className="relative overflow-hidden">
          {/* Overlay animado */}
          <div 
            ref={overlayRef}
            className="absolute top-0 left-0 w-full h-full bg-red-600 z-20 transform -translate-x-full"
          ></div>
          
          {/* Grid de 6 tarjetas SIN ESQUINAS REDONDEADAS */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-4 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>

      </div>

      {/* Elementos decorativos de fondo */}
      <div className="absolute top-20 -left-20 w-40 h-40 bg-red-600/5 blur-xl pointer-events-none"></div>
      <div className="absolute bottom-20 -right-20 w-40 h-40 bg-red-600/5 blur-xl pointer-events-none"></div>

    </section>
  );
};

export default AboutSection;