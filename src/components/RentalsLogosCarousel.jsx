import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const RentalsLogosCarousel = () => {
    const carouselRef = useRef(null);

    // Logos de rentals - URLs de Cloudinary
    const rentalsLogos = [
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo1_kfqcbt.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo2_o5pyg4.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo3_oiun5m.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo4_agqjjj.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo5_vldj88.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo6_aqwlq6.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo7_veupxg.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo8_ocb27g.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo9_jd5a8o.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo10_h4pcjp.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo11_ipaq87.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo12_uhjicq.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo13_b4hzh7.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo14_kxdkht.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo15_sczf89.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo16_ojuosj.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo17_wsu1rt.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo18_sulnzh.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/logo19_dobe9e.png",
        "https://res.cloudinary.com/dhoyps3vk/image/upload/zoom_p3wsfi.png"
    ];

    // Duplicar logos para loop infinito
    const duplicatedLogos = [...rentalsLogos, ...rentalsLogos];

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
                                alt={`Rental logo ${index + 1}`}
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

export default RentalsLogosCarousel;