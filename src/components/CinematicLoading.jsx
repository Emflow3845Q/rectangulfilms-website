import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CameraFrameUI = ({ onLoadingComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1800);
    
    const completeTimer = setTimeout(() => {
      if (onLoadingComplete) onLoadingComplete();
    }, 2500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isExiting ? 
          {
            opacity: 0,
            scale: 1.1,
            y: -20,
            transition: { duration: 0.7, ease: "easeIn" }
          } : 
          {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }
          }
        }
      >
        {/* Texto en minúsculas */}
        <motion.div
          className="text-white"
          style={{ 
            fontFamily: 'Rodina-Regular',
            fontSize: 'clamp(4rem, 12vw, 10rem)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            textTransform: 'lowercase'
          }}
        >
          rectángulo
        </motion.div>
        
        <motion.div 
          className="text-red-primary mt-2"
          style={{ 
            fontFamily: 'GOTHAM',
            fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
            fontWeight: 300,
            letterSpacing: '0.4em',
            textTransform: 'lowercase'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          films
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CameraFrameUI;