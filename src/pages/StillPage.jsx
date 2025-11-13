import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const StillPage = () => {
  const { t } = useLanguage();
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({});
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Proyectos de Still - Mismo orden que MotionPage pero excluyendo HP Finance de los primeros
  const projects = [
    {
      id: 1,
      title: t("stillProjects.billionsFashion.title"),
      category: t("stillProjects.billionsFashion.category"),
      image: "/motion/work1.webp",
      size: "large"
    },
    {
      id: 3,
      title: t("stillProjects.ohLaLashes.title"),
      category: t("stillProjects.ohLaLashes.category"),
      image: "/motion/work3.webp",
      size: "large"
    },
    {
      id: 4,
      title: t("stillProjects.gnpEncore.title"),
      category: t("stillProjects.gnpEncore.category"),
      image: "/motion/work4.webp",
      size: "medium"
    },
    {
      id: 5,
      title: t("stillProjects.grupoAeropuertario.title"),
      category: t("stillProjects.grupoAeropuertario.category"),
      image: "/motion/work5.webp",
      size: "large"
    },
    {
      id: 6,
      title: t("stillProjects.dac.title"),
      category: t("stillProjects.dac.category"),
      image: "/motion/work6.webp",
      size: "medium"
    },
    {
      id: 7,
      title: t("stillProjects.drCamilo.title"),
      category: t("stillProjects.drCamilo.category"),
      image: "/motion/work7.webp",
      size: "large"
    },
    {
      id: 8,
      title: t("stillProjects.mickFlores.title"),
      category: t("stillProjects.mickFlores.category"),
      image: "/motion/work8.webp",
      size: "medium"
    },
    {
      id: 9,
      title: t("stillProjects.casaIdea.title"),
      category: t("stillProjects.casaIdea.category"),
      image: "/motion/work9.webp",
      size: "large"
    },
    {
      id: 10,
      title: t("stillProjects.laPerla.title"),
      category: t("stillProjects.laPerla.category"),
      image: "/motion/work10.webp",
      size: "medium"
    },
    {
      id: 11,
      title: t("stillProjects.billionsTrade.title"),
      category: t("stillProjects.billionsTrade.category"),
      image: "/motion/work11.webp",
      size: "large"
    },
    {
      id: 12,
      title: t("stillProjects.ramsesSoriano.title"),
      category: t("stillProjects.ramsesSoriano.category"),
      image: "/motion/work12.webp",
      size: "medium"
    },
    {
      id: 13,
      title: t("stillProjects.elAfilador.title"),
      category: t("stillProjects.elAfilador.category"),
      image: "/motion/work13.webp",
      size: "large"
    },
    // HP Finance se agrega al final como solicitado
    {
      id: 2,
      title: t("stillProjects.hpFinance.title"),
      category: t("stillProjects.hpFinance.category"),
      image: "/motion/work2.webp",
      size: "medium"
    }
  ];

  // Efecto para cargar y medir las dimensiones reales de las imágenes
  useEffect(() => {
    const loadImageDimensions = async () => {
      const dimensions = {};
      
      for (const project of projects) {
        try {
          const img = new Image();
          img.src = project.image;
          
          await new Promise((resolve, reject) => {
            img.onload = () => {
              // Calcular el ancho que tendría la imagen a 400px de altura manteniendo la relación de aspecto
              const aspectRatio = img.width / img.height;
              const expandedWidth = 400 * aspectRatio;
              
              dimensions[project.id] = {
                originalWidth: img.width,
                originalHeight: img.height,
                aspectRatio,
                expandedWidth: Math.min(expandedWidth, 1200) // Limitar máximo ancho
              };
              resolve();
            };
            img.onerror = reject;
          });
        } catch (error) {
          console.warn(`No se pudo cargar la imagen: ${project.image}`);
          dimensions[project.id] = {
            originalWidth: 800,
            originalHeight: 600,
            aspectRatio: 4/3,
            expandedWidth: 600
          };
        }
      }
      
      setImageDimensions(dimensions);
    };

    loadImageDimensions();
  }, []);

  // Manejar el arrastre del mouse
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 3;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  // Filtrar proyectos por categoría
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const categories = ['Todos', ...new Set(projects.map(project => project.category))];
  
  const filteredProjects = selectedCategory === 'Todos' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Efecto de rectángulos flotantes en el fondo
  const FloatingRectangles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-red-primary/10"
          style={{
            width: `${Math.random() * 80 + 40}px`,
            height: `${Math.random() * 60 + 30}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 3, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black-pure text-white-pure pt-20 pb-8 relative overflow-hidden">
      {/* Rectángulos flotantes de fondo */}
      <FloatingRectangles />

      {/* ================= HEADER COMPACTO ================= */}
      <div className="px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-accent uppercase tracking-tight text-white-pure leading-[0.9] font-black"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {t("still.title")}
          </motion.h1>
          
          <motion.button
            className="text-xs sm:text-sm uppercase tracking-widest text-white-pure hover:text-red-primary transition-colors border-b border-white-pure pb-1 self-start sm:self-auto font-gotham font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t("still.allProjects")}
          </motion.button>
        </div>

        <motion.p
          className="text-sm text-white-pure mt-4 max-w-xl font-gotham font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {t("still.description")}
        </motion.p>
      </div>

      {/* ================= FILTROS COMPACTOS ================= */}
      <div className="px-4 sm:px-6 lg:px-8 mb-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-accent uppercase tracking-wide text-white-pure font-bold">
            {t("still.subtitle")}
          </h2>
          
          {/* Filtros de categorías responsivos */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-3 py-2 text-xs sm:text-sm uppercase tracking-widest border transition-all duration-200 font-gotham font-bold whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-red-primary border-red-primary text-white-pure'
                    : 'bg-transparent border-white-pure text-white-pure hover:border-red-primary hover:text-red-primary'
                }`}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= CAROUSEL RESPONSIVE CON ANCHO REAL DE LA IMAGEN ================= */}
      <div className="relative overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-hide items-start py-4"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          {filteredProjects.map((project, index) => {
            const dimensions = imageDimensions[project.id];
            const expandedWidth = dimensions?.expandedWidth || 600;
            
            return (
              <motion.div
                key={project.id}
                className="relative flex-shrink-0 group cursor-pointer bg-gray-dark overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                onMouseEnter={() => {
                  setHoveredProject(project.id);
                  setActiveProject(project.id);
                }}
                onMouseLeave={() => {
                  setHoveredProject(null);
                  setActiveProject(null);
                }}
                layout
                whileHover={{ 
                  zIndex: 50,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Contenedor principal que se alarga al ancho real de la imagen */}
                <motion.div
                  className="relative bg-gray-dark overflow-hidden"
                  initial={{ 
                    width: '300px',
                    height: '400px'
                  }}
                  animate={{ 
                    width: hoveredProject === project.id ? `${expandedWidth}px` : '300px',
                    height: '400px'
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 25,
                    duration: 0.5
                  }}
                >
                  {/* Marco rectangular rojo en hover */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent z-20 pointer-events-none"
                    initial={{ borderColor: 'transparent' }}
                    animate={{
                      borderColor: hoveredProject === project.id ? 'rgb(236, 35, 60)' : 'transparent'
                    }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Contenedor de la imagen */}
                  <div className="relative w-full h-full bg-gray-dark overflow-hidden">
                    {/* Imagen que muestra su ancho completo */}
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      initial={{ 
                        objectPosition: 'center'
                      }}
                      animate={{ 
                        objectPosition: hoveredProject === project.id ? 'left center' : 'center'
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                    
                    {/* Overlay rojo sutil en hover */}
                    <motion.div
                      className="absolute inset-0 bg-red-primary/5"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hoveredProject === project.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Efecto de brillo rectangular */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white-pure/15 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ 
                        x: hoveredProject === project.id ? '100%' : '-100%'
                      }}
                      transition={{ 
                        duration: 0.6,
                        ease: "easeInOut"
                      }}
                    />

                    {/* Información del proyecto */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black-pure/90 via-black-pure/40 to-transparent"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: hoveredProject === project.id ? 0.9 : 0.7 }}
                        transition={{ duration: 0.2 }}
                      />
                      
                      <motion.div
                        className="relative z-10"
                        initial={{ y: 0 }}
                        animate={{ y: hoveredProject === project.id ? -3 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="inline-flex items-center px-3 py-1 border text-xs uppercase tracking-widest mb-2 font-gotham font-bold"
                          style={{
                            backgroundColor: hoveredProject === project.id ? 'rgb(236, 35, 60)' : 'transparent',
                            color: 'rgb(255, 255, 255)',
                            borderColor: hoveredProject === project.id ? 'rgb(236, 35, 60)' : 'rgb(255, 255, 255)'
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {project.category}
                        </motion.div>
                        
                        <motion.h3
                          className="text-lg sm:text-xl font-accent text-white-pure uppercase leading-tight font-bold"
                          initial={{ opacity: 1, x: 0 }}
                          animate={{ 
                            x: hoveredProject === project.id ? 3 : 0
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {project.title}
                        </motion.h3>
                      </motion.div>
                    </div>

                    {/* Efecto de resplandor rectangular exterior */}
                    <motion.div
                      className="absolute inset-0 border-2 border-transparent"
                      initial={{ boxShadow: '0 0 0 0 rgba(236, 35, 60, 0)' }}
                      animate={{
                        boxShadow: hoveredProject === project.id ? 
                          '0 0 0 2px rgba(236, 35, 60, 0.8), 0 0 20px 8px rgba(236, 35, 60, 0.3)' : 
                          '0 0 0 0 rgba(236, 35, 60, 0)'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Efecto de partículas rectangulares en hover */}
                  <AnimatePresence>
                    {hoveredProject === project.id && (
                      <>
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-3 h-3 border border-red-primary pointer-events-none"
                            initial={{ 
                              scale: 0, 
                              opacity: 0,
                              x: Math.random() * expandedWidth - (expandedWidth / 2),
                              y: Math.random() * 400 - 200
                            }}
                            animate={{ 
                              scale: [0, 1, 0],
                              opacity: [0, 0.6, 0],
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ 
                              duration: 1,
                              delay: i * 0.15,
                              repeat: Infinity
                            }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ================= PIE COMPACTO ================= */}
      <div className="px-4 sm:px-6 lg:px-8 mt-6 flex flex-col sm:flex-row justify-between items-center gap-3 relative z-10">
        <p className="text-xs text-white-pure uppercase tracking-wider font-gotham font-light">
          {t("still.dragInstruction")}
        </p>
        
        <div className="text-xs text-white-pure flex items-center gap-2 font-gotham font-medium">
          <span className="px-2 py-1 border border-white-pure text-white-pure text-xs">
            {selectedCategory}
          </span>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .group:hover {
          z-index: 20;
        }
      `}</style>
    </div>
  );
};

export default StillPage;