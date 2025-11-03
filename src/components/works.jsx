import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CinematicWorks = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const projectRowRefs = useRef([]);
  const projectRefs = useRef([]);
  const frameRefs = useRef([]);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const cinematicProjects = [
    {
      id: 1,
      title: "BMW SERIES 7",
      category: "PUBLICIDAD AUTOMOTRIZ",
      year: "2024",
      format: "4K RAW",
      aspect: "2.39:1",
      image: "/work1.webp",
      director: "ALEX RODRÍGUEZ",
      role: "DIRECCIÓN & PRODUCCIÓN"
    },
    {
      id: 2,
      title: "DOCUMENTAL URBANO", 
      category: "DOCUMENTAL",
      year: "2024",
      format: "6K PRORES",
      aspect: "16:9",
      image: "/work2.webp",
      director: "MARIA SANTOS",
      role: "DIRECCIÓN & FOTOGRAFÍA"
    },
    {
      id: 3,
      title: "SILENCIO",
      category: "CORTOMETRAJE",
      year: "2023", 
      format: "8K R3D",
      aspect: "2.35:1",
      image: "/work3.webp",
      director: "CARLOS MÉNDEZ",
      role: "PRODUCCIÓN EJECUTIVA"
    },
    {
      id: 4,
      title: "EVENTO MICROSOFT",
      category: "EVENTO CORPORATIVO",
      year: "2024",
      format: "4K XAVC",
      aspect: "1.85:1",
      image: "/work4.webp", 
      director: "LAURA CHEN",
      role: "PRODUCCIÓN & STREAMING"
    },
    {
      id: 5,
      title: "NEBLINA",
      category: "VIDEOCLIP MUSICAL",
      year: "2023",
      format: "4K PRORES 4444",
      aspect: "2.39:1",
      image: "/work5.webp",
      director: "DAVID PARK",
      role: "DIRECCIÓN CREATIVA"
    },
    {
      id: 6,
      title: "COLECCIÓN PRIMAVERA",
      category: "MODA & BELLEZA",
      year: "2024",
      format: "8K RAW",
      aspect: "CINEMASCOPE",
      image: "/work6.webp",
      director: "SOPHIE LAURENT",
      role: "DIRECCIÓN DE ARTE"
    }
  ];

  // Agrupar proyectos en pares
  const projectPairs = [];
  for (let i = 0; i < cinematicProjects.length; i += 2) {
    projectPairs.push(cinematicProjects.slice(i, i + 2));
  }

  useEffect(() => {
    // Animación del título y subtítulo
    const titleTL = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none"
      }
    });

    titleTL.fromTo(titleRef.current,
      {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0
      },
      {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
      }
    ).fromTo(subtitleRef.current,
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
    );

    // Animación de las filas
    projectRowRefs.current.forEach((row, index) => {
      if (row) {
        gsap.fromTo(row,
          {
            y: 80,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none none"
            },
            onStart: () => {
              gsap.to(row, {
                boxShadow: "0 0 30px rgba(220, 38, 38, 0.2)",
                duration: 0.3,
                yoyo: true,
                repeat: 1
              });
            }
          }
        );
      }
    });

    // Animación de los proyectos individuales
    projectRefs.current.forEach((project, index) => {
      if (project) {
        gsap.fromTo(project,
          {
            y: 40,
            opacity: 0,
            rotationX: 8
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.6,
            delay: index * 0.08,
            ease: "back.out(1.3)",
            scrollTrigger: {
              trigger: project,
              start: "top 90%",
              end: "bottom 20%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });

    // Animación de marcos decorativos
    frameRefs.current.forEach((frame, index) => {
      if (frame) {
        gsap.fromTo(frame,
          {
            scale: 0,
            opacity: 0,
            rotation: 30
          },
          {
            scale: 1,
            opacity: 0.3,
            rotation: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: "back.out(1.3)",
            scrollTrigger: {
              trigger: frame,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });

  }, []);

  const handlePlayVideo = async () => {
    if (!videoRef.current) return;

    try {
      // Mostrar el contenedor del video
      gsap.to(videoContainerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });

      // Preparar y reproducir el video
      videoRef.current.currentTime = 0;
      await videoRef.current.play();
      setIsVideoPlaying(true);
    } catch (error) {
      console.log('Error al reproducir el video:', error);
    }
  };

  const handleStopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    
    setIsVideoPlaying(false);
    
    gsap.to(videoContainerRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleProjectHover = (project, rowIndex, projectIndex) => {
    setActiveProject(project.id);

    const hoverTL = gsap.timeline();
    
    hoverTL.to(`.project-${rowIndex}-${projectIndex}`, {
      scale: 1.03,
      y: -10,
      duration: 0.3,
      ease: "power2.out"
    })
    .to(`.project-${rowIndex}-${projectIndex}`, {
      boxShadow: "0 15px 40px rgba(220, 38, 38, 0.2)",
      duration: 0.2
    }, "-=0.3");

    // Ocultar la información del proyecto cuando aparece el botón de play
    const projectInfo = document.querySelector(`.project-${rowIndex}-${projectIndex} .project-info`);
    if (projectInfo) {
      gsap.to(projectInfo, {
        opacity: 0,
        y: 15,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const handleProjectLeave = (rowIndex, projectIndex) => {
    setActiveProject(null);

    const leaveTL = gsap.timeline();
    
    leaveTL.to(`.project-${rowIndex}-${projectIndex}`, {
      scale: 1,
      y: 0,
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
      duration: 0.4,
      ease: "power2.out"
    });

    // Mostrar nuevamente la información del proyecto cuando desaparece el botón de play
    const projectInfo = document.querySelector(`.project-${rowIndex}-${projectIndex} .project-info`);
    if (projectInfo) {
      gsap.to(projectInfo, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const addToRefs = (el, index, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current[index] = el;
    }
  };

  const addToProjectRefs = (el, rowIndex, projectIndex) => {
    const index = rowIndex * 2 + projectIndex;
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current[index] = el;
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 lg:py-24 bg-black overflow-hidden"
    >
      {/* Video Container - Oculto por defecto */}
      <div
        ref={videoContainerRef}
        className="fixed inset-0 z-50 pointer-events-none opacity-0 scale-98"
      >
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        
        {/* Video */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/assets/showreel-producciones.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-white-clouds-in-the-sky-3161-large.mp4" type="video/mp4" />
        </video>

        {/* Efecto de grano de película */}
        <div className="absolute inset-0 mix-blend-overlay opacity-8 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />

        {/* Botón de cerrar */}
        <button
          onClick={handleStopVideo}
          className="absolute top-6 right-6 z-50 pointer-events-auto bg-red-600 hover:bg-red-700 text-white p-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-40">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-20">
          <div className="relative inline-block mb-6">
            <h1 
              ref={titleRef}
              className="text-3xl lg:text-5xl xl:text-6xl font-gotham-cond-black text-white tracking-tight leading-none opacity-0"
            >
              <span className="block">PRODUCCIONES</span>
              <span className="block text-red-600 mt-1">AUDIOVISUALES</span>
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
                PORTAFOLIO DE TRABAJOS
              </span>
              <div className="w-8 h-px bg-red-600"></div>
            </div>
            <p className="text-white/70 font-gotham-book text-base max-w-lg mx-auto leading-relaxed">
              Creamos contenido visual impactante que conecta marcas con audiencias a través del poder del storytelling
            </p>
          </div>
        </div>

        {/* Grid de proyectos */}
        <div className="space-y-8 lg:space-y-12 relative z-40">
          {projectPairs.map((pair, rowIndex) => (
            <div
              key={rowIndex}
              ref={el => addToRefs(el, rowIndex, projectRowRefs)}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 opacity-0 transform-gpu"
            >
              {pair.map((project, projectIndex) => (
                <div
                  key={project.id}
                  ref={el => addToProjectRefs(el, rowIndex, projectIndex)}
                  className={`project-${rowIndex}-${projectIndex} group relative bg-black/50 backdrop-blur-sm overflow-hidden border border-white/10 cursor-pointer transition-all duration-400 opacity-0 transform-gpu hover:border-red-600/50 hover:z-50`}
                  onMouseEnter={() => handleProjectHover(project, rowIndex, projectIndex)}
                  onMouseLeave={() => handleProjectLeave(rowIndex, projectIndex)}
                >
                  <div className="relative aspect-video lg:aspect-[16/9] overflow-hidden">
                    {/* Imagen principal */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80"></div>
                    <div 
                      className="absolute inset-0 mix-blend-overlay opacity-0 group-hover:opacity-15 transition-opacity duration-400"
                      style={{ backgroundColor: '#dc2626' }}
                    ></div>

                    {/* Botón de reproducción */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={handlePlayVideo}
                        className="bg-red-600 hover:bg-red-700 text-white p-4 transform scale-0 group-hover:scale-100 transition-all duration-400 ease-out backdrop-blur-sm border border-white/30 hover:border-white/50 shadow-lg hover:shadow-red-500/20 opacity-0 group-hover:opacity-100"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                    </div>

                    {/* Información del proyecto */}
                    <div className="project-info absolute bottom-0 left-0 right-0 p-4 lg:p-6 transition-all duration-400">
                      {/* Badges técnicos */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-600 font-gotham-cond-bold text-xs tracking-wider uppercase">
                          {project.format}
                        </span>
                        <div className="w-1 h-1 bg-red-600"></div>
                        <span className="text-red-600/80 font-gotham-cond-book text-xs">
                          {project.aspect}
                        </span>
                      </div>

                      {/* Título y categoría */}
                      <div className="mb-3">
                        <h3 className="text-white text-lg lg:text-xl font-gotham-cond-black uppercase tracking-tight mb-1">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 text-white/70">
                          <span className="font-gotham-cond-bold text-xs">{project.category}</span>
                          <div className="w-1 h-1 bg-red-600"></div>
                          <span className="font-gotham-cond-book text-xs">{project.year}</span>
                        </div>
                      </div>

                      {/* Información de producción */}
                      <div>
                        <div className="text-white/60 font-gotham-book text-xs space-y-1">
                          <div>Director: {project.director}</div>
                          <div>Rol: {project.role}</div>
                        </div>
                      </div>
                    </div>

                    {/* Efecto de escáner sutil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-red-600/5 to-transparent transform -translate-y-full group-hover:translate-y-full transition-transform duration-800 ease-in-out"></div>
                  </div>

                  {/* Marco decorativo */}
                  <div 
                    ref={el => addToRefs(el, rowIndex * 2 + projectIndex, frameRefs)}
                    className="absolute -top-2 -left-2 -right-2 -bottom-2 border border-red-600/20 pointer-events-none opacity-0"
                  ></div>

                  {/* Efecto de glow */}
                  <div className="absolute -inset-3 bg-red-600/10 blur-lg opacity-0 group-hover:opacity-100 -z-10 transition-all duration-400"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Elementos decorativos más pequeños */}
      <div className="absolute top-16 left-8 w-12 h-12 border border-red-600/20 pointer-events-none z-30"></div>
      <div className="absolute bottom-32 right-8 w-8 h-8 border border-red-600/10 pointer-events-none z-30"></div>

      {/* Efectos de fondo más pequeños */}
      <div className="absolute top-1/4 -left-24 w-48 h-48 bg-red-600/5 blur-2xl pointer-events-none z-30"></div>
      <div className="absolute bottom-1/4 -right-24 w-48 h-48 bg-red-600/5 blur-2xl pointer-events-none z-30"></div>

      {/* Partículas flotantes más pequeñas */}
      <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-red-600/30 pointer-events-none z-30"></div>
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-red-600/20 pointer-events-none z-30"></div>
    </section>
  );
};

export default CinematicWorks;