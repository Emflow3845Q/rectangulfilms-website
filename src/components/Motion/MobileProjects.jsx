import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const MobileProjects = ({ 
  projects, 
  activeProject, 
  onProjectTap,
  onCloseVideo 
}) => {
  const { t } = useLanguage();

  return (
    <div className="lg:hidden px-4">
      {/* Header móvil simplificado */}
      <div className="flex justify-between items-center text-white uppercase tracking-widest text-xs border-b border-white/40 pb-3 mb-4 font-gotham font-medium">
        <div>{t("motion.projects")}</div>
        <div>{projects.length} {t("motion.items")}</div>
      </div>

      {/* Grid de proyectos móvil */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="bg-white/10 rounded-lg overflow-hidden border border-white/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onProjectTap(project)}
          >
            {/* Contenido principal del proyecto */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-white-pure font-gotham font-bold uppercase text-lg mb-1">
                    {project.title}
                  </h3>
                  <p className="text-red-primary text-sm uppercase tracking-widest mb-2 font-gotham font-medium">
                    {project.category}
                  </p>
                  <p className="text-white text-sm font-gotham font-light">
                    {project.client}
                  </p>
                </div>
                <div className="text-white text-sm ml-4 font-gotham font-light">
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
                        onCloseVideo();
                      }}
                      className="w-full mt-3 bg-white/50 text-white-pure py-2 rounded text-sm uppercase tracking-widest font-gotham font-medium"
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
  );
};

export default MobileProjects;