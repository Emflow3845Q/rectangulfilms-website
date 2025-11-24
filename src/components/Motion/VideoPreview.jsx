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
          className="relative overflow-hidden border-2 border-white bg-black-pure shadow-2xl"
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
          
          {/* Overlay con información */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black-pure to-transparent p-4">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-white-pure font-gotham font-bold text-sm uppercase mb-1">
                  {activeProject.title}
                </h3>
                <p className="text-red-primary text-xs uppercase tracking-widest font-gotham font-medium">
                  {activeProject.category}
                </p>
              </div>
              <p className="text-white text-xs uppercase tracking-widest font-gotham font-light">
                {activeProject.client}
              </p>
            </div>
          </div>

          {/* Borde rojo en hover */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-primary transition-all duration-300 pointer-events-none" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoPreview;