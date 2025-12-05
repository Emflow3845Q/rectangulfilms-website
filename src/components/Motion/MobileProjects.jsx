import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import RevealText from "../RevealText";

const MobileProjects = ({ 
  projects, 
  activeProject, 
  onProjectTap,
  onCloseVideo 
}) => {
  const { t } = useLanguage();

  return (
    <div className="lg:hidden">
      {/* Header móvil simplificado */}
      <div className="flex justify-between items-center text-white uppercase tracking-widest text-xs border-b border-white/40 pb-3 mb-4 px-4 font-gotham font-medium">
        <RevealText as="div">
          {t("motion.projects")}
        </RevealText>
        <RevealText as="div">
          {projects.length} {t("motion.items")}
        </RevealText>
      </div>

      {/* Grid de proyectos móvil */}
      <div className="space-y-3 px-4">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="bg-white/10 rounded-xl overflow-hidden border border-white/20"
            onClick={() => onProjectTap(project)}
          >
            {/* Contenido principal del proyecto */}
            <div className="p-3">
              <div className="mb-3">
                {/* Título del proyecto */}
                <RevealText
                  as="h3"
                  className="text-white-pure font-gotham font-bold uppercase text-base mb-1 leading-tight"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  {project.title}
                </RevealText>
                
                {/* Cliente y categoría en línea */}
                <div className="flex items-center gap-2 mb-2">
                  <RevealText
                    as="span"
                    className="text-white text-xs font-gotham font-medium"
                    style={{ animationDelay: `${index * 0.08 + 0.04}s` }}
                  >
                    {project.client}
                  </RevealText>
                  <span className="text-white/40 text-xs">•</span>
                  <RevealText
                    as="span"
                    className="text-red-primary text-xs uppercase tracking-wide font-gotham font-semibold"
                    style={{ animationDelay: `${index * 0.08 + 0.06}s` }}
                  >
                    {project.category}
                  </RevealText>
                </div>
              </div>

              {/* Thumbnail del proyecto */}
              <div className="relative rounded-lg overflow-hidden bg-black-pure aspect-video">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {/* Indicador de que es un video */}
                <div className="absolute inset-0 bg-black-pure/20 flex items-center justify-center">
                  <div className="bg-red-primary rounded-full p-2">
                    <svg className="w-5 h-5 text-white-pure" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Video en pantalla completa - SIN TEXTOS */}
            {activeProject && activeProject.id === project.id && (
              <div 
                className="fixed inset-0 z-50 bg-black-pure"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseVideo();
                }}
              >
                <video
                  key={activeProject.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-contain"
                >
                  <source src={activeProject.video} type="video/mp4" />
                </video>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileProjects;