import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VideoPreview = ({ 
  activeProject, 
  mousePosition, 
  showVideo, 
  onVideoLoad 
}) => {
  const videoRef = useRef(null);

  // Efecto para manejar la transición de foto a video
  useEffect(() => {
    if (activeProject && showVideo && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => {
        console.log("Autoplay prevented:", e);
      });
    }
  }, [activeProject, showVideo]);

  if (!activeProject) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={activeProject.id}
        className="fixed pointer-events-none z-50"
        style={{
          left: `${mousePosition.x + 20}px`,
          top: `${mousePosition.y - 150}px`,
        }}
        initial={{ opacity: 0, scale: 0.9, x: -10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.9, x: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="relative overflow-hidden bg-black-pure"
          style={{ width: '400px', height: '225px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Mostrar foto primero, luego video */}
          {!showVideo ? (
            <motion.img
              src={activeProject.thumbnail}
              alt={activeProject.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.video
              ref={videoRef}
              key={activeProject.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <source src={activeProject.video} type="video/mp4" />
            </motion.video>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoPreview;