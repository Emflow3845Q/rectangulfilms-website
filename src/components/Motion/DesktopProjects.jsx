import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const DesktopProjects = ({ projects, onProjectHover }) => {
  const { t } = useLanguage();

  return (
    <div className="hidden lg:block">
      <div className="px-6 lg:px-20">
        {/* Header de la tabla */}
        <div className="grid grid-cols-4 gap-8 text-white uppercase tracking-widest text-sm border-b border-white/40 pb-4 mb-2 pl-8 font-gotham font-medium">
          <div>{t("client")}</div>
          <div>{t("project")}</div>
          <div>{t("category")}</div>
          <div className="text-right">{t("year")}</div>
        </div>

        {/* Lista de proyectos */}
        <div className="space-y-1">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="grid grid-cols-4 gap-8 py-6 border-b border-white/20 group cursor-pointer relative pl-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => onProjectHover(project)}
              onMouseLeave={() => onProjectHover(null)}
            >
              {/* Línea decorativa */}
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-red-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Client */}
              <div className="text-white-pure group-hover:text-red-primary transition-colors duration-300 font-accent font-bold">
                {project.client}
              </div>
              
              {/* Project Title */}
              <div className="text-white-pure group-hover:text-white-pure transition-colors duration-300 font-gotham font-medium">
                {project.title}
              </div>
              
              {/* Category */}
              <div className="text-white group-hover:text-white-pure transition-colors duration-300 font-gotham font-light">
                {project.category}
              </div>
              
              {/* Year */}
              <div className="text-white text-right group-hover:text-white-pure transition-colors duration-300 font-gotham font-light">
                2025
              </div>

              {/* Efecto de fondo al hover */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesktopProjects;