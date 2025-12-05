import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import RevealText from "../RevealText"; // Ajusta la ruta según tu estructura

const DesktopProjects = ({ projects, onProjectHover }) => {
  const { t } = useLanguage();

  return (
    <div className="hidden lg:block">
      <div className="px-6 lg:px-20">
        {/* Header de la tabla - Cada columna con su propio RevealText */}
        <div className="grid grid-cols-3 gap-8 text-white uppercase tracking-widest text-sm border-b border-white/40 pb-4 mb-2 pl-8 font-gotham font-medium">
          <RevealText as="div" className="inline-block">
            {t("client")}
          </RevealText>
          <RevealText as="div" className="inline-block">
            {t("project")}
          </RevealText>
          <RevealText as="div" className="inline-block">
            {t("category")}
          </RevealText>
        </div>

        {/* Lista de proyectos */}
        <div className="space-y-1">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="grid grid-cols-3 gap-8 py-6 border-b border-white/20 group cursor-pointer relative pl-8"
              onMouseEnter={() => onProjectHover(project)}
              onMouseLeave={() => onProjectHover(null)}
            >
              {/* Client */}
              <RevealText
                as="div"
                className="text-white-pure group-hover:text-red-primary transition-colors duration-300 font-gotham font-bold"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {project.client}
              </RevealText>
              
              {/* Project Title */}
              <RevealText
                as="div"
                className="text-white-pure group-hover:text-white-pure transition-colors duration-300 font-gotham font-medium"
                style={{ animationDelay: `${index * 0.1 + 0.05}s` }}
              >
                {project.title}
              </RevealText>
              
              {/* Category */}
              <RevealText
                as="div"
                className="text-white group-hover:text-white-pure transition-colors duration-300 font-gotham font-light"
                style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
              >
                {project.category}
              </RevealText>

              {/* Línea decorativa */}
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-red-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
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