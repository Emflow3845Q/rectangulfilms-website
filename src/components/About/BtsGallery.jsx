import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
// Importar todas las imágenes de photography
import { photographyImages as photography } from "../../assets/images/photography";

const BtsGallery = () => {
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef(null);
  const sliderRef = useRef(null);
  const lastTimeRef = useRef(0);
  const progressRef = useRef(0);

  // Array de imágenes de photography (1-49)
  const btsImages = [
    { id: 1, image: photography.photography1, alt: "Photography production 1" },
    { id: 2, image: photography.photography2, alt: "Photography production 2" },
    { id: 3, image: photography.photography3, alt: "Photography production 3" },
    { id: 4, image: photography.photography4, alt: "Photography production 4" },
    { id: 6, image: photography.photography6, alt: "Photography production 6" },
    { id: 9, image: photography.photography9, alt: "Photography production 9" },
    { id: 10, image: photography.photography10, alt: "Photography production 10" },
    { id: 12, image: photography.photography12, alt: "Photography production 12" },
    { id: 14, image: photography.photography14, alt: "Photography production 14" },
    { id: 15, image: photography.photography15, alt: "Photography production 15" },
    { id: 16, image: photography.photography16, alt: "Photography production 16" },
    { id: 17, image: photography.photography17, alt: "Photography production 17" },
    { id: 18, image: photography.photography18, alt: "Photography production 18" },
    { id: 19, image: photography.photography19, alt: "Photography production 19" },
    { id: 20, image: photography.photography20, alt: "Photography production 20" },
    { id: 21, image: photography.photography21, alt: "Photography production 21" },
    { id: 22, image: photography.photography22, alt: "Photography production 22" },
    { id: 24, image: photography.photography24, alt: "Photography production 24" },
    { id: 25, image: photography.photography25, alt: "Photography production 25" },
    { id: 26, image: photography.photography26, alt: "Photography production 26" },
    { id: 27, image: photography.photography27, alt: "Photography production 27" },
    { id: 29, image: photography.photography29, alt: "Photography production 29" },
    { id: 30, image: photography.photography30, alt: "Photography production 30" },
    { id: 31, image: photography.photography31, alt: "Photography production 31" },
    { id: 32, image: photography.photography32, alt: "Photography production 32" },
    { id: 33, image: photography.photography33, alt: "Photography production 33" },
    { id: 34, image: photography.photography34, alt: "Photography production 34" },
    { id: 35, image: photography.photography35, alt: "Photography production 35" },
    { id: 36, image: photography.photography36, alt: "Photography production 36" },
    { id: 37, image: photography.photography37, alt: "Photography production 37" },
    { id: 38, image: photography.photography38, alt: "Photography production 38" },
    { id: 39, image: photography.photography39, alt: "Photography production 39" },
    { id: 40, image: photography.photography40, alt: "Photography production 40" },
    { id: 42, image: photography.photography42, alt: "Photography production 42" },
    { id: 43, image: photography.photography43, alt: "Photography production 43" },
    { id: 44, image: photography.photography44, alt: "Photography production 44" },
    { id: 45, image: photography.photography45, alt: "Photography production 45" },
    { id: 47, image: photography.photography47, alt: "Photography production 47" },
    { id: 48, image: photography.photography48, alt: "Photography production 48" }
  ];

  const duplicatedImages = [...btsImages, ...btsImages, ...btsImages];

  const NORMAL_SPEED = 50;
  const HOVER_SPEED = 20;

  const animateSlider = (timestamp) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }

    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    const currentSpeed = isHovering ? HOVER_SPEED : NORMAL_SPEED;
    const progressIncrement = (currentSpeed * deltaTime) / 1000;
    progressRef.current += progressIncrement;

    const totalWidth = duplicatedImages.length * (420 + 52);
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
  }, [isHovering]);

  return (
    <div className="w-full bg-black">
      <div className="py-8 sm:py-12 lg:py-16 overflow-hidden">
        {/* Gradientes laterales sutiles */}
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-black via-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-black via-black to-transparent z-10 pointer-events-none"></div>

        <motion.div
          className="relative h-80 sm:h-96 lg:h-[28rem] flex items-center perspective"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div
            ref={sliderRef}
            className="flex gap-0 absolute left-0 h-full"
            style={{ willChange: 'transform' }}
          >
            {duplicatedImages.map((image, index) => {
              const angles = [-8, 5, -6, 7, -5, 6, -8, 5, -7, 6, -8, 5, -6, 7, -5, 6];
              const angle = angles[index % angles.length];

              return (
                <div
                  key={`${image.id}-${index}`}
                  className="flex-shrink-0 h-full group"
                  style={{ width: '420px', marginLeft: '-8px' }}
                >
                  <div
                    className="relative w-full h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `rotateY(${angle * 0.5}deg) rotateZ(${angle}deg)`,
                      transition: 'transform 0.6s ease-out'
                    }}
                  >
                    <img
                      src={image.image}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay sutil */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
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