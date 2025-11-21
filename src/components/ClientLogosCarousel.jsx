import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ClientLogosCarousel = () => {
  const carouselRef = useRef(null);

  // Logos de clientes - URLs de Cloudinary
  const clientLogos = [
    "https://res.cloudinary.com/dhoyps3vk/image/upload/logo1_iiuzmj.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/logo2_rygji4.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/logo3_g1cdwp.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/logo4_chferx.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/logo5_z3c2jp.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/logo6_o4kusm.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/logo7_b0dyvb.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/logo9_ll8teo.png"
  ];

  // Duplicar logos para loop infinito
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  useEffect(() => {
    // Animación del carrusel infinito
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const carouselWidth = carousel.scrollWidth / 2;
      
      gsap.to(carousel, {
        x: -carouselWidth,
        duration: 40,
        ease: "none",
        repeat: -1
      });
    }
  }, []);

  return (
    <div className="bg-black py-4 overflow-hidden border-t border-b border-gray-dark/30">
      <div className="relative">
        <div 
          ref={carouselRef}
          className="flex items-center space-x-12"
          style={{ width: "max-content" }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-40 h-16 flex items-center justify-center"
            >
              <img 
                src={logo} 
                alt={`Client logo ${index + 1}`}
                className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-70 hover:opacity-100 hover:filter-none transition-all duration-300"
              />
            </div>
          ))}
        </div>
        
        {/* Overlay gradients */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default ClientLogosCarousel;