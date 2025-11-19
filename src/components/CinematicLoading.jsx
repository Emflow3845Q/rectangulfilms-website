import React, { useEffect } from "react";
import { motion } from "framer-motion";

const CameraFrameUI = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onLoadingComplete) onLoadingComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
    >
      {/* FONDO */}
      <motion.div
        className="absolute inset-0"
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
          </defs>

          {/* OLA SUPERIOR */}
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
            initial={{ opacity: 0.4 }}
            animate={{ 
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* OLA INFERIOR */}
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
            initial={{ opacity: 0.4 }}
            animate={{ 
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </svg>
      </motion.div>

      {/* LOGO */}
      <motion.div
        className="relative z-10"
        initial={{ 
          opacity: 0, 
          scale: 0.8,
        }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          transition: {
            duration: 1.2,
            ease: "easeOut"
          }
        }}
      >
        <motion.img
          src="/logo.png"
          alt="Rectángulo Films"
          className="w-32 sm:w-48 object-contain"
        />
      </motion.div>
    </motion.div>
  );
};

export default CameraFrameUI;