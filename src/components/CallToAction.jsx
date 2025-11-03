import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CTA = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      sectionRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.2 }
    )
      .fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.5"
      )
      .fromTo(
        paragraphRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      )
      .fromTo(
        buttonRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[90vh] w-full overflow-hidden bg-black text-white flex items-center justify-center"
    >
      {/* Fondo con video o imagen oscura */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/bg-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-gotham-cond-black uppercase tracking-tight text-red-600 mb-4 opacity-0"
        >
          Hablemos
        </h2>

        <h3
          ref={subtitleRef}
          className="text-2xl md:text-4xl font-gotham-cond-black text-white mb-6 opacity-0"
        >
          Tu presencia digital está a punto de despegar
        </h3>

        <p
          ref={paragraphRef}
          className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg md:text-xl opacity-0"
        >
          ¡Programe una consulta gratuita con nuestro equipo y hagamos que las cosas sucedan!
        </p>

        <button
          ref={buttonRef}
          className="bg-red-600 hover:bg-red-700 text-white font-gotham-cond-black text-lg md:text-xl uppercase tracking-widest px-10 py-4 border-2 border-red-600 transition-all duration-300 hover:scale-105 opacity-0"
        >
          Contáctanos
        </button>
      </div>

      {/* Efectos visuales adicionales */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-red-600/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-red-600/10 blur-3xl rounded-full"></div>
    </section>
  );
};

export default CTA;
