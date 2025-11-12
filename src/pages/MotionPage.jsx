import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const MotionPage = () => {
  const { t } = useLanguage();
  const [activeProject, setActiveProject] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

  const projects = [
    {
      id: 1,
      client: t("motionProjects.billionsFashion.client"),
      title: t("motionProjects.billionsFashion.title"),
      category: t("motionProjects.billionsFashion.category"),
      thumbnail: "/motion/work1.webp",
      video: "/videos/DemoRectangulo2025.mp4",
    },
    {
      id: 2,
      client: t("motionProjects.hpFinance.client"),
      title: t("motionProjects.hpFinance.title"),
      category: t("motionProjects.hpFinance.category"),
      thumbnail: "/motion/work2.webp",
      video: "/videos/MotionGraphics.mp4",
    },
    {
      id: 3,
      client: t("motionProjects.ohLaLashes.client"),
      title: t("motionProjects.ohLaLashes.title"),
      category: t("motionProjects.ohLaLashes.category"),
      thumbnail: "/motion/work3.webp",
      video: "/videos/CamiloRegresa.mp4",
    },
    {
      id: 4,
      client: t("motionProjects.gnpEncore.client"),
      title: t("motionProjects.gnpEncore.title"),
      category: t("motionProjects.gnpEncore.category"),
      thumbnail: "/motion/work4.webp",
      video: "/videos/DemoRectangulo2025.mp4",
    },
    {
      id: 5,
      client: t("motionProjects.grupoAeropuertario.client"),
      title: t("motionProjects.grupoAeropuertario.title"),
      category: t("motionProjects.grupoAeropuertario.category"),
      thumbnail: "/motion/work5.webp",
      video: "/videos/MotionGraphics.mp4",
    },
    {
      id: 6,
      client: t("motionProjects.dac.client"),
      title: t("motionProjects.dac.title"),
      category: t("motionProjects.dac.category"),
      thumbnail: "/motion/wrok6.webp",
      video: "/videos/CamiloRegresa.mp4",
    },
    {
      id: 7,
      client: t("motionProjects.drCamilo.client"),
      title: t("motionProjects.drCamilo.title"),
      category: t("motionProjects.drCamilo.category"),
      thumbnail: "/motion/work7.webp",
      video: "/videos/DemoRectangulo2025.mp4",
    },
    {
      id: 8,
      client: t("motionProjects.mickFlores.client"),
      title: t("motionProjects.mickFlores.title"),
      category: t("motionProjects.mickFlores.category"),
      thumbnail: "/motion/work8.webp",
      video: "/videos/MotionGraphics.mp4",
    },
    {
      id: 9,
      client: t("motionProjects.casaIdea.client"),
      title: t("motionProjects.casaIdea.title"),
      category: t("motionProjects.casaIdea.category"),
      thumbnail: "/motion/work9.webp",
      video: "/videos/CamiloRegresa.mp4",
    },
    {
      id: 10,
      client: t("motionProjects.laPerla.client"),
      title: t("motionProjects.laPerla.title"),
      category: t("motionProjects.laPerla.category"),
      thumbnail: "/motion/work10.webp",
      video: "/videos/DemoRectangulo2025.mp4",
    },
    {
      id: 11,
      client: t("motionProjects.billionsTrade.client"),
      title: t("motionProjects.billionsTrade.title"),
      category: t("motionProjects.billionsTrade.category"),
      thumbnail: "/motion/work11.webp",
      video: "/videos/MotionGraphics.mp4",
    },
    {
      id: 12,
      client: t("motionProjects.ramsesSoriano.client"),
      title: t("motionProjects.ramsesSoriano.title"),
      category: t("motionProjects.ramsesSoriano.category"),
      thumbnail: "/motion/work12.webp",
      video: "/videos/CamiloRegresa.mp4",
    },
    {
      id: 13,
      client: t("motionProjects.elAfilador.client"),
      title: t("motionProjects.elAfilador.title"),
      category: t("motionProjects.elAfilador.category"),
      thumbnail: "/motion/work13.webp",
      video: "/videos/DemoRectangulo2025.mp4",
    },
  ];

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track mouse position solo en desktop
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Efecto para manejar la transición de foto a video
  useEffect(() => {
    if (activeProject) {
      setShowVideo(false);
      const timer = setTimeout(() => {
        setShowVideo(true);
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play().catch(e => {
            console.log("Autoplay prevented:", e);
          });
        }
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setShowVideo(false);
    }
  }, [activeProject]);

  // Función para manejar tap en móvil
  const handleProjectTap = (project) => {
    if (isMobile) {
      if (activeProject && activeProject.id === project.id) {
        setActiveProject(null);
      } else {
        setActiveProject(project);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black-pure text-white-pure pt-20 pb-12">
      {/* ================= HEADER ================= */}
      <div className="px-4 lg:px-20 mb-8 lg:mb-16">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
          <motion.h1
            className="text-5xl lg:text-9xl font-gotham-cond-black uppercase tracking-tight text-white-pure"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("motion.title")}
          </motion.h1>
          
          <motion.div
            className="lg:text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-dark text-sm uppercase tracking-widest mb-2">
              {projects.length} {t("motion.projects")}
            </p>
            <p className="text-gray-dark text-base lg:max-w-xs leading-relaxed">
              {t("motion.description")}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ================= VERSIÓN DESKTOP ================= */}
      {!isMobile ? (
        <div className="hidden lg:block">
          <div className="px-6 lg:px-20">
            {/* Header de la tabla */}
            <div className="grid grid-cols-4 gap-8 text-gray-dark uppercase tracking-widest text-sm border-b border-gray-dark/40 pb-4 mb-2 pl-8">
              <div>{t("motion.client")}</div>
              <div>{t("motion.project")}</div>
              <div>{t("motion.category")}</div>
              <div className="text-right">{t("motion.year")}</div>
            </div>

            {/* Lista de proyectos */}
            <div className="space-y-1">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="grid grid-cols-4 gap-8 py-6 border-b border-gray-dark/20 group cursor-pointer relative pl-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setActiveProject(project)}
                  onMouseLeave={() => setActiveProject(null)}
                >
                  {/* Línea decorativa */}
                  <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-red-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Client */}
                  <div className="text-white-pure group-hover:text-red-primary transition-colors duration-300 font-gotham-cond-black uppercase">
                    {project.client}
                  </div>
                  
                  {/* Project Title */}
                  <div className="text-white-pure group-hover:text-white-pure transition-colors duration-300">
                    {project.title}
                  </div>
                  
                  {/* Category */}
                  <div className="text-gray-dark group-hover:text-white-pure transition-colors duration-300">
                    {project.category}
                  </div>
                  
                  {/* Year */}
                  <div className="text-gray-dark text-right group-hover:text-white-pure transition-colors duration-300">
                    2025
                  </div>

                  {/* Efecto de fondo al hover */}
                  <div className="absolute inset-0 bg-gray-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ================= VERSIÓN MÓVIL ================= */
        <div className="lg:hidden px-4">
          {/* Header móvil simplificado */}
          <div className="flex justify-between items-center text-gray-dark uppercase tracking-widest text-xs border-b border-gray-dark/40 pb-3 mb-4">
            <div>{t("motion.projects")}</div>
            <div>{projects.length} {t("motion.items")}</div>
          </div>

          {/* Grid de proyectos móvil */}
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-gray-dark/10 rounded-lg overflow-hidden border border-gray-dark/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleProjectTap(project)}
              >
                {/* Contenido principal del proyecto */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-white-pure font-gotham-cond-black uppercase text-lg mb-1">
                        {project.title}
                      </h3>
                      <p className="text-red-primary text-sm uppercase tracking-widest mb-2">
                        {project.category}
                      </p>
                      <p className="text-gray-dark text-sm">
                        {project.client}
                      </p>
                    </div>
                    <div className="text-gray-dark text-sm ml-4">
                      2025
                    </div>
                  </div>

                  {/* Thumbnail del proyecto */}
                  <div className="relative rounded overflow-hidden bg-black-pure">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    {/* Botón de play para móvil */}
                    <div className="absolute inset-0 bg-black-pure/30 flex items-center justify-center">
                      <div className="bg-red-primary rounded-full p-3">
                        <svg className="w-6 h-6 text-white-pure" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video que se expande al hacer tap */}
                <AnimatePresence>
                  {activeProject && activeProject.id === project.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0">
                        <video
                          ref={videoRef}
                          key={project.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls
                          className="w-full rounded"
                        >
                          <source src={project.video} type="video/mp4" />
                        </video>
                        {/* Botón para cerrar */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveProject(null);
                          }}
                          className="w-full mt-3 bg-gray-dark/50 text-white-pure py-2 rounded text-sm uppercase tracking-widest"
                        >
                          {t("motion.close")}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ================= VIDEO PREVIEW - SOLO EN DESKTOP ================= */}
      {!isMobile && (
        <AnimatePresence>
          {activeProject && (
            <motion.div
              key={activeProject.id}
              className="fixed pointer-events-none z-50"
              style={{
                left: `${mousePosition.x + 20}px`,
                top: `${mousePosition.y - 150}px`,
              }}
              initial={{ opacity: 0, scale: 0.9, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div
                className="relative overflow-hidden border-2 border-gray-dark bg-black-pure shadow-2xl"
                style={{ width: '400px', height: '225px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Mostrar foto primero, luego video */}
                {!showVideo ? (
                  <motion.img
                    src={activeProject.thumbnail}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.video
                    ref={videoRef}
                    key={activeProject.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <source src={activeProject.video} type="video/mp4" />
                  </motion.video>
                )}
                
                {/* Overlay con información */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black-pure to-transparent p-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-white-pure font-gotham-cond-black text-sm uppercase mb-1">
                        {activeProject.title}
                      </h3>
                      <p className="text-red-primary text-xs uppercase tracking-widest">
                        {activeProject.category}
                      </p>
                    </div>
                    <p className="text-gray-dark text-xs uppercase tracking-widest">
                      {activeProject.client}
                    </p>
                  </div>
                </div>

                {/* Borde rojo en hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-primary transition-all duration-300 pointer-events-none" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* ================= FOOTER ================= */}
      <div className="px-4 lg:px-20 mt-8 lg:mt-12">
        <div className="flex flex-col lg:flex-row justify-between items-center text-gray-dark text-sm uppercase tracking-widest gap-2">
          <div>Rectángulo Films © 2025</div>
          <div>Motion & Animation</div>
        </div>
      </div>
    </div>
  );
};

export default MotionPage;