import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const BtsGallery = () => {
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef(null);
  const sliderRef = useRef(null);
  const lastTimeRef = useRef(0);
  const progressRef = useRef(0);

  const btsImages = [
    { id: 1, image: "/bts/bts1.jpg", alt: "Behind the scenes production 1" },
    { id: 2, image: "/bts/bts2.jpg", alt: "Behind the scenes production 2" },
    { id: 3, image: "/bts/bts3.jpg", alt: "Behind the scenes production 3" },
    { id: 4, image: "/bts/bts4.jpg", alt: "Behind the scenes production 4" },
    { id: 5, image: "/bts/bts5.jpg", alt: "Behind the scenes production 5" },
    { id: 6, image: "/bts/bts6.jpg", alt: "Behind the scenes production 6" },
    { id: 7, image: "/bts/bts7.jpg", alt: "Behind the scenes production 7" },
    { id: 8, image: "/bts/bts8.jpg", alt: "Behind the scenes production 8" },
    { id: 9, image: "/bts/bts9.jpg", alt: "Behind the scenes production 9" },
    { id: 10, image: "/bts/bts10.jpg", alt: "Behind the scenes production 10" },
  ];

  const duplicatedImages = [...btsImages, ...btsImages, ...btsImages];

  const NORMAL_SPEED = 60;
  const HOVER_SPEED = 30;

  const animateSlider = (timestamp) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }

    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    const currentSpeed = isHovering ? HOVER_SPEED : NORMAL_SPEED;
    const progressIncrement = (currentSpeed * deltaTime) / 1000;
    progressRef.current += progressIncrement;

    const totalWidth = duplicatedImages.length * (280 + 24);
    const viewportWidth = sliderRef.current?.parentElement?.offsetWidth || 1200;

    if (progressRef.current >= totalWidth - viewportWidth) {
      progressRef.current = 0;
    }

    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${progressRef.current}px)`;
    }

    animationRef.current = requestAnimationFrame(animateSlider);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animateSlider);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="section">
      {/* CONTENIDO EMPEZANDO MÁS ABAJO CON FONDO NEGRO */}
      <div className="pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 bg-black-pure text-white-pure overflow-hidden">
        <motion.div 
          className="relative h-[35vh] sm:h-[40vh] flex items-center"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div 
            ref={sliderRef}
            className="flex gap-4 sm:gap-6 absolute left-0 transition-transform duration-100 linear"
            style={{ willChange: 'transform' }}
          >
            {duplicatedImages.map((image, index) => {
              const rotations = [-3, 2, -2, 3, -1, 2, -3, 1, -2, 3, 2, -1, 3, -2, 1];
              const rotation = rotations[index % rotations.length];
              
              return (
                <div
                  key={`${image.id}-${index}`}
                  className="flex-shrink-0 w-[260px] sm:w-[300px] lg:w-[340px] group"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: 'transform 0.5s ease'
                  }}
                >
                  <div 
                    className="bg-white p-2 sm:p-3 shadow-2xl hover:shadow-3xl transition-all duration-500"
                    style={{ transform: 'translateZ(0)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = `rotate(0deg) scale(1.1)`;
                      e.currentTarget.style.zIndex = '10';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateZ(0)';
                      e.currentTarget.style.zIndex = '1';
                    }}
                  >
                    <div className="relative w-full aspect-square bg-gray-dark overflow-hidden">
                      <img
                        src={image.image}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {index % 5 === 0 && (
                        <div className="absolute top-2 left-2 w-2 h-2 bg-red-primary rounded-full shadow-lg"></div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BtsGallery;