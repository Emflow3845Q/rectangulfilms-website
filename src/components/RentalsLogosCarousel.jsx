import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const RentalsLogosCarousel = () => {
    const carouselRef = useRef(null);

    // Logos de rentals - URLs de Cloudinary
    const rentalsLogos = [
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907657/logo1_kfqcbt_u1f8vh.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907656/logo2_o5pyg4_haancr.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907656/logo3_oiun5m_xcspuk.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907656/logo4_agqjjj_s9wjon.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907656/logo5_vldj88_bqj1hg.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907656/logo6_aqwlq6_ekfz1z.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907656/logo7_veupxg_gwoads.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907657/logo8_ocb27g_wpufkw.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907657/logo9_jd5a8o_lfbejo.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907657/logo10_h4pcjp_mt9fut.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907657/logo11_ipaq87_uvebcl.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907657/logo12_uhjicq_wiinxv.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907657/logo13_b4hzh7_cvpn7r.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907659/logo14_kxdkht_dkdvod.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907659/logo15_sczf89_cncydx.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907659/logo16_ojuosj_cygou5.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907659/logo17_wsu1rt_lltfzo.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907659/logo18_sulnzh_deaom1.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907660/logo19_dobe9e_vngnsa.png",
        "https://res.cloudinary.com/dl416umfa/image/upload/v1764907660/zoom_p3wsfi_buxult.png"
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