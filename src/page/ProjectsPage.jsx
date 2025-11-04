import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectsPage = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const projectRowRefs = useRef([]);
  const projectRefs = useRef([]);
  const frameRefs = useRef([]);
  const [activeProject, setActiveProject] = useState(null);
  
  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(4); // 2 filas de 2 proyectos cada una

  const projects = [
    {
      id: 1,
      title: "BMW SERIES 7",
      category: "PUBLICIDAD AUTOMOTRIZ",
      year: "2025",
      format: "4K RAW",
      aspect: "2.39:1",
      image: "/work1.webp",
      director: "ALEX RODRÍGUEZ",
      role: "DIRECCIÓN & PRODUCCIÓN",
      description: "Campaña publicitaria de alto impacto para el lanzamiento de la nueva serie 7 de BMW."
    },
    {
      id: 2,
      title: "DOCUMENTAL URBANO", 
      category: "DOCUMENTAL",
      year: "2025",
      format: "6K PRORES",
      aspect: "16:9",
      image: "/work2.webp",
      director: "MARIA SANTOS",
      role: "DIRECCIÓN & FOTOGRAFÍA",
      description: "Exploración visual de la vida en las grandes metrópolis contemporáneas."
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
      role: "PRODUCCIÓN EJECUTIVA",
      description: "Drama psicológico que explora los límites del sonido y el silencio."
    },
    {
      id: 4,
      title: "EVENTO MICROSOFT",
      category: "EVENTO CORPORATIVO",
      year: "2025",
      format: "4K XAVC",
      aspect: "1.85:1",
      image: "/work4.webp", 
      director: "LAURA CHEN",
      role: "PRODUCCIÓN & STREAMING",
      description: "Cobertura integral del evento de lanzamiento mundial de Microsoft."
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
      role: "DIRECCIÓN CREATIVA",
      description: "Videoclip conceptual para el artista emergente de música electrónica."
    },
    {
      id: 6,
      title: "COLECCIÓN PRIMAVERA",
      category: "MODA & BELLEZA",
      year: "2025",
      format: "8K RAW",
      aspect: "CINEMASCOPE",
      image: "/work6.webp",
      director: "SOPHIE LAURENT",
      role: "DIRECCIÓN DE ARTE",
      description: "Campaign de moda para la colección primavera-verano de lujo."
    },
    {
      id: 7,
      title: "CAMPAÑA SOCIAL",
      category: "CONTENIDO SOCIAL",
      year: "2025",
      format: "4K H.265",
      aspect: "9:16",
      image: "/work7.webp",
      director: "ANDRÉS GÓMEZ",
      role: "DIRECCIÓN & EDICIÓN",
      description: "Campaña viral para concientización sobre sostenibilidad ambiental."
    },
    {
      id: 8,
      title: "SERIE WEB",
      category: "SERIE DIGITAL",
      year: "2023",
      format: "6K PRORES",
      aspect: "2.00:1",
      image: "/work8.webp",
      director: "ISABEL RAMÍREZ",
      role: "PRODUCCIÓN EJECUTIVA",
      description: "Serie web original distribuida en plataformas digitales."
    }
  ];

  // Cálculos de paginación
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  // Agrupar proyectos en pares para la página actual
  const projectPairs = [];
  for (let i = 0; i < currentProjects.length; i += 2) {
    projectPairs.push(currentProjects.slice(i, i + 2));
  }

  // Función para cambiar de página con animación
  const handlePageChange = (pageNumber) => {
    // Animación de salida
    const exitTL = gsap.timeline();
    
    exitTL.to(".project-row", {
      opacity: 0,
      y: 50,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setCurrentPage(pageNumber);
      }
    });
  };

  // Efecto para animar la entrada cuando cambia la página
  useEffect(() => {
    if (currentPage > 0) {
      const enterTL = gsap.timeline();
      
      enterTL.fromTo(".project-row",
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }
      );

      // Re-animar proyectos individuales
      projectRefs.current.forEach((project, index) => {
        if (project) {
          gsap.fromTo(project,
            {
              y: 30,
              opacity: 0,
              rotationX: 5
            },
            {
              y: 0,
              opacity: 1,
              rotationX: 0,
              duration: 0.5,
              delay: index * 0.1,
              ease: "back.out(1.2)"
            }
          );
        }
      });
    }
  }, [currentPage]);

  useEffect(() => {
    // Animación del título y subtítulo (solo una vez)
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

  const handleProjectClick = (project) => {
    console.log("Navegar al proyecto:", project.title);
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

  // Componente de paginación simplificado
  const Pagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex flex-col items-center gap-8 mt-16 lg:mt-24">
        {/* Línea decorativa */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        
        {/* Controles de paginación */}
        <div className="flex items-center gap-4">
          {/* Botón anterior */}
          <button
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-3 border border-white/20 rounded-lg transition-all duration-300 ${
              currentPage === 1 
                ? "opacity-30 cursor-not-allowed" 
                : "hover:border-red-600 hover:bg-red-600/10 hover:scale-105"
            }`}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Números de página */}
          <div className="flex items-center gap-2">
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`px-4 py-2 rounded-lg font-gotham-cond-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                  currentPage === number
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/25 scale-105"
                    : "text-white/60 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20"
                }`}
              >
                {number}
              </button>
            ))}
          </div>

          {/* Botón siguiente */}
          <button
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-3 border border-white/20 rounded-lg transition-all duration-300 ${
              currentPage === totalPages 
                ? "opacity-30 cursor-not-allowed" 
                : "hover:border-red-600 hover:bg-red-600/10 hover:scale-105"
            }`}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Barra de progreso minimalista */}
        <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-600 transition-all duration-500 ease-out"
            style={{ 
              width: `${(currentPage / totalPages) * 100}%` 
            }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 lg:py-24 bg-black overflow-hidden min-h-screen"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-40">
        
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="relative inline-block mb-8">
            <h1 
              ref={titleRef}
              className="text-4xl lg:text-6xl xl:text-7xl font-gotham-cond-black text-white tracking-tight leading-none opacity-0"
            >
              <span className="block">PORTAFOLIO</span>
              <span className="block text-red-600 mt-2">DE PROYECTOS</span>
            </h1>
            
            {/* Líneas decorativas */}
            <div className="absolute -bottom-4 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          </div>

          <div 
            ref={subtitleRef}
            className="relative opacity-0"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-red-600"></div>
              <span className="text-red-600 font-gotham-cond-black text-sm tracking-wider uppercase">
                EXPLORA NUESTRO TRABAJO
              </span>
              <div className="w-12 h-px bg-red-600"></div>
            </div>
            <p className="text-white/70 font-gotham-book text-lg max-w-2xl mx-auto leading-relaxed">
              Descubre nuestra selección de proyectos donde la creatividad se encuentra con la técnica cinematográfica
            </p>
          </div>
        </div>

        {/* Grid de proyectos */}
        <div className="space-y-12 lg:space-y-16 relative z-40">
          {projectPairs.map((pair, rowIndex) => (
            <div
              key={rowIndex}
              ref={el => addToRefs(el, rowIndex, projectRowRefs)}
              className="project-row grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 transform-gpu"
            >
              {pair.map((project, projectIndex) => (
                <div
                  key={project.id}
                  ref={el => addToProjectRefs(el, rowIndex, projectIndex)}
                  className={`project-${rowIndex}-${projectIndex} group relative bg-black/50 backdrop-blur-sm overflow-hidden border border-white/10 cursor-pointer transition-all duration-400 transform-gpu hover:border-red-600/50 hover:z-50`}
                  onMouseEnter={() => handleProjectHover(project, rowIndex, projectIndex)}
                  onMouseLeave={() => handleProjectLeave(rowIndex, projectIndex)}
                  onClick={() => handleProjectClick(project)}
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

                    {/* Botón de ver proyecto */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 transform scale-0 group-hover:scale-100 transition-all duration-400 ease-out backdrop-blur-sm border border-white/30 hover:border-white/50 shadow-lg hover:shadow-red-500/20 opacity-0 group-hover:opacity-100 flex items-center gap-2"
                      >
                        <span className="font-gotham-cond-bold text-sm uppercase tracking-wider">
                          VER PROYECTO
                        </span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>

                    {/* Información del proyecto */}
                    <div className="project-info absolute bottom-0 left-0 right-0 p-6 lg:p-8 transition-all duration-400">
                      {/* Badges técnicos */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-red-600 font-gotham-cond-bold text-sm tracking-wider uppercase">
                          {project.format}
                        </span>
                        <div className="w-1.5 h-1.5 bg-red-600"></div>
                        <span className="text-red-600/80 font-gotham-cond-book text-sm">
                          {project.aspect}
                        </span>
                        <div className="w-1.5 h-1.5 bg-red-600"></div>
                        <span className="text-red-600/60 font-gotham-cond-book text-sm">
                          {project.year}
                        </span>
                      </div>

                      {/* Título y categoría */}
                      <div className="mb-4">
                        <h3 className="text-white text-2xl lg:text-3xl font-gotham-cond-black uppercase tracking-tight mb-2">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-3 text-white/70">
                          <span className="font-gotham-cond-bold text-sm">{project.category}</span>
                        </div>
                      </div>

                      {/* Descripción */}
                      <p className="text-white/80 font-gotham-book text-base leading-relaxed mb-3">
                        {project.description}
                      </p>

                      {/* Información de producción */}
                      <div>
                        <div className="text-white/60 font-gotham-book text-sm space-y-1">
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
                    className="absolute -top-3 -left-3 -right-3 -bottom-3 border border-red-600/20 pointer-events-none opacity-0"
                  ></div>

                  {/* Efecto de glow */}
                  <div className="absolute -inset-4 bg-red-600/10 blur-xl opacity-0 group-hover:opacity-100 -z-10 transition-all duration-400"></div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Componente de Paginación */}
        <Pagination />
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-16 h-16 border border-red-600/20 pointer-events-none z-30"></div>
      <div className="absolute bottom-32 right-10 w-12 h-12 border border-red-600/10 pointer-events-none z-30"></div>

      {/* Efectos de fondo */}
      <div className="absolute top-1/4 -left-24 w-48 h-48 bg-red-600/5 blur-2xl pointer-events-none z-30"></div>
      <div className="absolute bottom-1/4 -right-24 w-48 h-48 bg-red-600/5 blur-2xl pointer-events-none z-30"></div>

      {/* Partículas flotantes */}
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-red-600/30 pointer-events-none z-30"></div>
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-red-600/20 pointer-events-none z-30"></div>
    </section>
  );
};

export default ProjectsPage;