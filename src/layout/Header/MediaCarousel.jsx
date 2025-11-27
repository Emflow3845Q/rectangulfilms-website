// src/layout/Header/MediaCarousel.jsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const MediaCarousel = ({ 
  currentMedia, 
  currentMediaType, 
  currentImageIndex, 
  nextImageIndex, 
  isTransitioning,
  transitionToNextImage,
  imageIntervalRef
}) => {
  const currentImageRef = useRef(null);
  const nextImageRef = useRef(null);

  // Efecto para el carrusel automático de imágenes
  useEffect(() => {
    if ((currentMediaType === 'image' || currentMediaType === 'gif') && 
        currentMedia && 
        Array.isArray(currentMedia) && 
        currentMedia.length > 1) {
      
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
      }

      imageIntervalRef.current = setInterval(() => {
        transitionToNextImage();
      }, 3000);

      return () => {
        if (imageIntervalRef.current) {
          clearInterval(imageIntervalRef.current);
        }
      };
    }
  }, [currentMediaType, currentMedia, currentImageIndex, isTransitioning]);

  const renderMediaContent = () => {
    if (currentMediaType === 'image' && Array.isArray(currentMedia) && currentMedia.length > 0) {
      const currentImage = currentMedia[currentImageIndex];
      const nextImage = currentMedia[nextImageIndex];
      
      return (
        <div className="relative w-full h-full">
          <img
            ref={currentImageRef}
            key={`current-${currentImage.id}-${currentMedia.length}`}
            src={currentImage.image}
            alt={currentImage.alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 1 }}
          />
          
          {currentMedia.length > 1 && (
            <img
              ref={nextImageRef}
              key={`next-${nextImage.id}-${currentMedia.length}`}
              src={nextImage.image}
              alt={nextImage.alt}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0 }}
            />
          )}
          
          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
        </div>
      );
    } else if (currentMediaType === 'gif') {
      return (
        <div className="relative w-full h-full">
          <img
            src={currentMedia}
            alt="Motion GIF"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
        </div>
      );
    } else {
      return (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <span className="text-white/50 text-xl font-gotham font-bold">Selecciona una opción</span>
        </div>
      );
    }
  };

  return renderMediaContent();
};

export default MediaCarousel;