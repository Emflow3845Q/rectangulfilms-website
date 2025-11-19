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
        exit={{ 
          opacity: 0,
          transition: { duration: 0.6, ease: "easeIn" }
        }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black-pure overflow-hidden"
      >
        {/* === FONDO CON EFECTO DE ZOOM OUT === */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          exit={{ 
            scale: 1.8,
            opacity: 0,
            transition: { 
              duration: 1.2, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }
          }}
        >
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="dotPattern"
                patternUnits="userSpaceOnUse"
                width="16"
                height="16"
              >
                <circle cx="8" cy="8" r="2" fill="rgb(236, 35, 60)" />
              </pattern>
              <radialGradient id="maskGradient">
                <stop offset="50%" stopColor="white" />
                <stop offset="100%" stopColor="black" />
              </radialGradient>
              <mask id="fadeMask">
                <rect width="100%" height="100%" fill="url(#maskGradient)" />
              </mask>
            </defs>

            {/* OLA SUPERIOR CON MOVIMIENTO */}
            <motion.path
              d="
                M -300,0
                C 200,150 600,0 1200,0
                L 1200,-200
                L -300,-200
                Z
              "
              fill="url(#dotPattern)"
              opacity="0.6"
              transform="translate(-400,-300) scale(1.6)"
              mask="url(#fadeMask)"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* OLA INFERIOR CON MOVIMIENTO */}
            <motion.path
              d="
                M 0,900
                C 700,750 1000,1050 1800,900
                L 1800,1200
                L 0,1200
                Z
              "
              fill="url(#dotPattern)"
              opacity="0.6"
              transform="translate(150,150) scale(1.4)"
              mask="url(#fadeMask)"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            />
          </svg>
        </motion.div>

        {/* === LOGO CON EFECTO DE "SALIR" DE LA PANTALLA === */}
        <motion.div
          className="relative z-10"
          initial={{ 
            opacity: 0, 
            scale: 0.5,
            y: 10,
            rotate: -5
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: 0,
            rotate: 0,
            transition: {
              duration: 1,
              ease: [0.34, 1.56, 0.64, 1] // curva con rebote sutil
            }
          }}
          exit={{
            scale: 2.5,
            opacity: 0,
            y: -50,
            rotate: 2,
            transition: {
              duration: 1.4,
              ease: [0.4, 0, 0.2, 1], // curva de aceleración
            }
          }}
        >
          <motion.img
            src="/logo.png"
            alt="Rectángulo Films"
            className="w-32 sm:w-48 object-contain brightness-110 contrast-105"
            animate={{
              filter: [
                "brightness(1) contrast(1) drop-shadow(0 0 0px rgba(236,35,60,0))",
                "brightness(1.15) contrast(1.1) drop-shadow(0 0 15px rgba(236,35,60,0.3))",
                "brightness(1) contrast(1) drop-shadow(0 0 0px rgba(236,35,60,0))"
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* === EFECTO DE PARTICULAS QUE SE ALEJAN === */}
        <motion.div
          className="absolute inset-0 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
          }}
        >
          {/* Partículas que se alejan rápidamente */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-500 rounded-full"
              style={{
                left: `${50 + Math.random() * 20 - 10}%`,
                top: `${50 + Math.random() * 20 - 10}%`,
              }}
              initial={{ 
                scale: 0,
                opacity: 0 
              }}
              exit={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 400,
                transition: {
                  duration: 1.2,
                  ease: "easeOut",
                  delay: Math.random() * 0.3
                }
              }}
            />
          ))}
        </motion.div>

        {/* === OVERLAY DE BRILLO EN LA SALIDA === */}
        <motion.div
          className="absolute inset-0 bg-white z-5"
          initial={{ opacity: 0 }}
          exit={{
            opacity: [0, 0.15, 0],
            transition: {
              duration: 1,
              ease: "easeInOut"
            }
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default CameraFrameUI;