import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const CameraFrameUI = ({ onLoadingComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Solo iniciar el timer de salida cuando el video haya terminado
    if (isExiting) {
      const completeTimer = setTimeout(() => {
        if (onLoadingComplete) onLoadingComplete();
      }, 500);

      return () => {
        clearTimeout(completeTimer);
      };
    }
  }, [isExiting, onLoadingComplete]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    // Reproducir el video
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
        // En caso de que autoplay sea prevenido, mostrar controles
        videoRef.current.controls = true;
      });
    }
  };

  const handleVideoEnd = () => {
    // Cuando el video termina completamente, iniciar la salida
    setIsExiting(true);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isExiting ? 
          {
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.7, ease: "easeIn" }
          } : 
          {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 }
          }
        }
      >
        {/* Video de logo - Más grande y sin fallback de texto */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover" // Cambiado de object-contain a object-cover para llenar más espacio
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          onEnded={handleVideoEnd}
          preload="auto"
        >
          <source src="/logo-entrada.mov" type="video/mp4" />
          <source src="/logo-entrada.mov" type="video/quicktime" />
          {/* Se eliminó completamente el fallback de texto */}
        </video>

        {/* Loading indicator simplificado sin texto */}
        {!isVideoLoaded && (
          <motion.div
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CameraFrameUI;