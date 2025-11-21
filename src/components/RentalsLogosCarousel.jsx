import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const RentalsLogosCarousel = () => {
    const carouselRef = useRef(null);

    // Logos de rentals - ajusta los nombres según tus archivos
    const rentalsLogos = [
        "/rentals-logos/logo1.png",
        "/rentals-logos/logo2.png",
        "/rentals-logos/logo3.png",
        "/rentals-logos/logo4.png",
        "/rentals-logos/logo5.png",
        "/rentals-logos/logo6.png",
        "/rentals-logos/logo7.png",
        "/rentals-logos/logo8.png",
        "/rentals-logos/logo9.png",
        "/rentals-logos/logo10.png",
        "/rentals-logos/logo11.png",
        "/rentals-logos/logo12.png",
        "/rentals-logos/logo13.png",
        "/rentals-logos/logo14.png",
        "/rentals-logos/logo15.png",
        "/rentals-logos/logo16.png",
        "/rentals-logos/logo17.png",
        "/rentals-logos/logo18.png",
        "/rentals-logos/logo19.png",
        "/rentals-logos/logo20.png",
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