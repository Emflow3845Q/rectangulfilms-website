import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ClientLogosCarousel = () => {
  const carouselRef = useRef(null);

  // Logos de clientes - URLs de Cloudinary
  const clientLogos = [
    "https://res.cloudinary.com/dhoyps3vk/image/upload/v1764260001/DAC_-_Logotipo_Oficial_-_2025_hkp6ag.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/v1764260000/Symetria_White_y3nstp.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/v1764259999/Grupo_aeroportuario_logo_pxqyad.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/v1764540768/La_perla_logo_iqxwj6.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/v1764259998/Encore_Logo_qyrcxk.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/v1764539555/2_lj2rzx.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/v1764259998/Rosk_logo_x6jeiz.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/v1764259998/Casa_ideas_Logo_jh9lu6.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/v1764259997/Oh_la_Lashes_Logo_gnujtc.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/v1764259997/LOGO_BILLIONS_qdtexz.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/v1764259997/soriano_academy_uaduua.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/v1764540119/Celiona.m._ywi4b8.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/v1764259997/681188c0d323346f55c4907b_AC_Horizontal_blanco-p-1600_xso6cl.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/v1764259996/Odella-logo_kakrzy.webp",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/v1764540232/logo_en_blanco_bl1hsj.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/v1764259996/grupo_galenum_tskdaq.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/v1764259996/dermaherilen_n5pvqj.png",
    "https://res.cloudinary.com/dhoyps3vk/image/upload/v1764273412/UNIAT_mma3kb.png"
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