import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useLanguage } from "../../context/LanguageContext";
import FluidDistortionVideo from "../Background/RedDistortionBackground";
import RevealText from "../RevealText";

const HeroSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  // Animación de fade-in para toda la sección
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power1.inOut"
        }
      );
    }
  }, []);

  // Configuración responsive centralizada
  const responsiveConfig = {
    padding: {
      mobile: "px-4",
      tablet: "sm:px-6",
      desktop: "lg:px-12 xl:px-16 2xl:px-20"
    },
    overlay: {
      mobile: "bg-opacity-30",
      tablet: "xs:bg-opacity-25 sm:bg-opacity-20",
      desktop: "md:bg-opacity-15 lg:bg-opacity-10"
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[80vh] xs:min-h-[85vh] sm:min-h-[90vh] md:min-h-[95vh] lg:min-h-screen bg-black-pure text-white-pure flex items-center pt-12 xs:pt-14 sm:pt-16 md:pt-20 lg:pt-0 overflow-hidden"
    >
      {/* Fondo con efecto de distorsión */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-[2]">
        <FluidDistortionVideo
          videoUrl="/leeroy-background.mp4"
          displacementStrength={0.03}
          className="w-full h-full object-cover"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div
          className={`absolute inset-0 bg-black pointer-events-none z-[3] 
      ${responsiveConfig.overlay.mobile} 
      ${responsiveConfig.overlay.tablet} 
      ${responsiveConfig.overlay.desktop}`}
        />
      </div>

      {/* Contenido principal */}
      <div className={`relative z-10 w-full ${responsiveConfig.padding.mobile} ${responsiveConfig.padding.tablet} ${responsiveConfig.padding.desktop}`}>
        <div className="w-full">
          {/* Título principal - Envuelto en un div contenedor */}
          <div className="overflow-hidden">
            <div
              className="font-sans font-black uppercase tracking-tight text-white-pure mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8"
              style={{
                fontSize: 'clamp(2.25rem, 8vw, 8rem)',
                lineHeight: 1.1
              }}
            >
              <RevealText as="span">
                {t("about.title")}
              </RevealText>
            </div>
          </div>

          {/* Grid de contenido */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 overflow-hidden">
            {/* Columna izquierda - Texto principal */}
            <div className="overflow-hidden">
              <div
                className="text-white-pure font-gotham font-medium leading-relaxed"
                style={{
                  fontSize: 'clamp(1rem, 2.3vw, 1.7rem)',
                  lineHeight: 1.4
                }}
              >
                <RevealText as="span">
                  {t("about.heroText1")}
                </RevealText>
              </div>
            </div>

            {/* Columna derecha - Texto secundario */}
            <div className="overflow-hidden">
              <div
                className="text-white-pure font-gotham font-light leading-relaxed"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
                  lineHeight: 1.6
                }}
              >
                <RevealText as="span">
                  {t("about.heroText2")}
                </RevealText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;