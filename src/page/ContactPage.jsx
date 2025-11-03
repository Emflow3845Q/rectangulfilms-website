import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const inputRefs = useRef([]);
  const overlayRef = useRef(null);
  const textRefs = useRef([]);
  const contactInfoRefs = useRef([]);
  const employmentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    empresa: '',
    mensaje: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const masterTL = gsap.timeline();

      // Overlay
      masterTL.to(overlayRef.current, {
        x: "100%",
        duration: 0.6,
        ease: "power2.inOut"
      }, 0);

      // Imagen
      masterTL.fromTo(imageRef.current,
        {
          scale: 1.1,
          filter: "brightness(0.6) blur(3px)"
        },
        {
          scale: 1,
          filter: "brightness(0.7) blur(0px)",
          duration: 0.8,
          ease: "power2.out"
        },
        0.2
      );

      // Título
      masterTL.fromTo(titleRef.current,
        {
          y: 40,
          opacity: 0,
          filter: "blur(5px)"
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power2.out"
        },
        0.3
      );

      // Texto descriptivo
      masterTL.fromTo(textRefs.current,
        {
          opacity: 0,
          y: 15
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out"
        },
        0.4
      );

      // Contact info
      masterTL.fromTo(contactInfoRefs.current,
        {
          opacity: 0,
          x: -15
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out"
        },
        0.5
      );

      // Empleo
      masterTL.fromTo(employmentRef.current,
        {
          opacity: 0,
          scale: 0.98,
          rotationY: -3
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.6,
          ease: "power2.out"
        },
        0.6
      );

      // Formulario
      masterTL.fromTo(formRef.current,
        {
          opacity: 0,
          x: -40
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out"
        },
        0.4
      );

      // Inputs
      masterTL.fromTo(inputRefs.current,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "back.out(1.2)"
        },
        0.5
      );
    }
  }, [isVisible]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
  };

  const addToRefs = (el, index, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current[index] = el;
    }
  };

  const addToTextRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  const addToContactInfoRefs = (el) => {
    if (el && !contactInfoRefs.current.includes(el)) {
      contactInfoRefs.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden pt-16 lg:pt-24">
      
      {/* Fondo con imagen */}
      <div className="absolute inset-0">
        {/* Overlay animado */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-red-600 z-20 transform -translate-x-full"
        ></div>
        
        {/* Imagen principal */}
        <div className="relative w-full h-full">
          <img
            ref={imageRef}
            src="/infosection.webp"
            alt="Contacto Cinematográfico"
            className="w-full h-full object-cover brightness-70"
          />
          
          {/* Overlays responsivos */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent lg:bg-gradient-to-r lg:from-black lg:via-black/80 lg:to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent lg:bg-gradient-to-l lg:from-black/50 lg:to-transparent"></div>
          <div className="absolute inset-0 bg-red-600/10 mix-blend-overlay"></div>
        </div>
      </div>

      {/* Espacio superior reducido */}
      <div className="relative z-30 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center min-h-[60vh]">
          
          {/* Columna izquierda - Título y información */}
          <div className="space-y-6 sm:space-y-8 order-1">
            
            {/* Título responsivo - SOLO EL TÍTULO CENTRADO EN MÓVIL */}
            <div className="text-center lg:text-left">
              <h1 
                ref={titleRef}
                className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-gotham-cond-black text-white leading-none tracking-tight mb-4 sm:mb-6 opacity-0"
              >
                <span className="block">CREEMOS</span>
                <span className="block text-red-600 mt-2 sm:mt-4">JUNTOS</span>
              </h1>
              
              {/* Línea decorativa responsiva - Centrada en móvil, izquierda en desktop */}
              <div className="w-20 sm:w-24 h-1 bg-red-600 mb-4 sm:mb-6 mx-auto lg:mx-0"></div>
            </div>

            {/* Texto descriptivo - SIEMPRE A LA IZQUIERDA */}
            <div>
              <p 
                ref={addToTextRefs}
                className="text-white/80 font-gotham-book text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg opacity-0 text-left"
              >
                Trabajamos con talentos valientes y mentes creativas para llevar ideas 
                poderosas desde el papel hasta la pantalla.
              </p>
            </div>

            {/* Información de contacto - SIEMPRE A LA IZQUIERDA */}
            <div className="space-y-3 sm:space-y-4">
              <div 
                ref={addToContactInfoRefs}
                className="flex items-center gap-3 text-white font-gotham-cond-bold text-sm sm:text-base opacity-0"
              >
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0"></div>
                <span className="break-words">Guadalajara Jalisco México</span>
              </div>
              
              <div 
                ref={addToContactInfoRefs}
                className="flex items-center gap-3 text-red-600 font-gotham-cond-black text-lg sm:text-xl opacity-0"
              >
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0"></div>
                <span className="break-words">+52 33 23 88 13 33</span>
              </div>
              
              <div 
                ref={addToContactInfoRefs}
                className="flex items-center gap-3 text-white/80 font-gotham-book text-sm sm:text-base opacity-0"
              >
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0"></div>
                <span className="break-words">contacto@rectangulofilms.com</span>
              </div>
            </div>

            {/* Sección de empleo - SIEMPRE A LA IZQUIERDA */}
            <div 
              ref={employmentRef}
              className="bg-black/60 backdrop-blur-md border-l-4 border-red-600 p-4 sm:p-4 opacity-0 transform-gpu"
            >
              <h3 className="text-red-600 font-gotham-cond-black text-sm sm:text-base uppercase tracking-wider mb-2">
                ÚNETE AL ELENCO
              </h3>
              <p className="text-white/80 font-gotham-book text-xs sm:text-sm leading-relaxed mb-2">
                Rectángulo busca talentos excepcionales. Si tienes lo que se necesita, 
                tenemos un lugar para ti.
              </p>
              <p className="text-red-600 font-gotham-cond-bold text-xs">
                Asunto: <span className="text-white">Talento</span>
              </p>
            </div>
          </div>

          {/* Columna derecha - Formulario responsivo */}
          <div 
            ref={formRef}
            className="bg-black/80 backdrop-blur-lg border border-white/10 rounded-lg p-4 sm:p-6 lg:p-8 opacity-0 transform-gpu order-2 lg:order-2"
          >
            <div className="mb-4 sm:mb-6">
              <h2 className="text-red-600 font-gotham-cond-black text-lg sm:text-xl uppercase tracking-wider mb-2 text-left">
                CUÉNTANOS DE TU PROYECTO
              </h2>
              <div className="w-12 h-1 bg-red-600"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              
              {/* Grid de inputs responsivo */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                
                {/* Nombre */}
                <div ref={el => addToRefs(el, 0, inputRefs)} className="lg:col-span-2 opacity-0">
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/20 text-white font-gotham-book px-4 py-3 focus:outline-none focus:border-red-600 transition-all duration-200 placeholder-white/40 text-sm sm:text-base"
                    placeholder="NOMBRE *"
                  />
                </div>

                {/* Correo */}
                <div ref={el => addToRefs(el, 1, inputRefs)} className="opacity-0">
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/20 text-white font-gotham-book px-4 py-3 focus:outline-none focus:border-red-600 transition-all duration-200 placeholder-white/40 text-sm sm:text-base"
                    placeholder="CORREO *"
                  />
                </div>

                {/* Teléfono */}
                <div ref={el => addToRefs(el, 2, inputRefs)} className="opacity-0">
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/20 text-white font-gotham-book px-4 py-3 focus:outline-none focus:border-red-600 transition-all duration-200 placeholder-white/40 text-sm sm:text-base"
                    placeholder="TELÉFONO *"
                  />
                </div>

                {/* Empresa */}
                <div ref={el => addToRefs(el, 3, inputRefs)} className="lg:col-span-2 opacity-0">
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/20 text-white font-gotham-book px-4 py-3 focus:outline-none focus:border-red-600 transition-all duration-200 placeholder-white/40 text-sm sm:text-base"
                    placeholder="EMPRESA"
                  />
                </div>

                {/* Mensaje */}
                <div ref={el => addToRefs(el, 4, inputRefs)} className="lg:col-span-2 opacity-0">
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full bg-white/5 border border-white/20 text-white font-gotham-book px-4 py-3 focus:outline-none focus:border-red-600 transition-all duration-200 resize-none placeholder-white/40 text-sm sm:text-base"
                    placeholder="MENSAJE *"
                  />
                </div>
              </div>

              {/* Botón de envío responsivo */}
              <button
                type="submit"
                className="w-full bg-red-600 text-white font-gotham-cond-black text-base sm:text-lg uppercase tracking-wider py-3 sm:py-4 px-6 hover:bg-red-700 transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group"
              >
                <span className="relative z-10">ENVIAR PROYECTO</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
    </section>
  );
};

export default ContactForm;