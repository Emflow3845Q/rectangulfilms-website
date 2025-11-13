import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CameraFrameUI = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onLoadingComplete) onLoadingComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black-pure overflow-hidden"
      >
        {/* === FONDO CON OLAS DE PUNTICOS === */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* patrón de punticos con el rojo corporativo */}
            <pattern
              id="dotPattern"
              patternUnits="userSpaceOnUse"
              width="16"
              height="16"
            >
              <circle cx="8" cy="8" r="3" fill="rgb(236, 35, 60)" />
            </pattern>

            {/* máscara radial para difuminar el final de los puntos */}
            <radialGradient id="maskGradient">
              <stop offset="60%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
            <mask id="fadeMask">
              <rect width="100%" height="100%" fill="url(#maskGradient)" />
            </mask>
          </defs>

          {/* ---- OLA SUPERIOR IZQUIERDA ---- */}
          <path
            d="
              M -300,0
              C 200,150 600,0 1200,0
              L 1200,-200
              L -300,-200
              Z
            "
            fill="url(#dotPattern)"
            opacity="0.5"
            transform="translate(-400,-300) scale(1.6)"
            mask="url(#fadeMask)"
          />

          {/* ---- OLA INFERIOR DERECHA ---- */}
          <path
            d="
              M 0,900
              C 700,750 1000,1050 1800,900
              L 1800,1200
              L 0,1200
              Z
            "
            fill="url(#dotPattern)"
            opacity="0.5"
            transform="translate(150,150) scale(1.4)"
            mask="url(#fadeMask)"
          />
        </svg>

        {/* === LOGO CENTRAL === */}
        <motion.img
          src="/logo.svg"
          alt="Rectángulo Films"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 w-72 sm:w-96 object-contain brightness-110 contrast-105 animate-float"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default CameraFrameUI;
