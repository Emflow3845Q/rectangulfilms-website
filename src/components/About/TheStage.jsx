import React, { useEffect, useRef } from 'react';
import RevealText from '../RevealText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const TheStage = () => {
  const features = [
    {
      title: 'DRESSING ROOM',
      image: 'https://res.cloudinary.com/dl416umfa/image/upload/v1764812746/_1389534_srwpji.jpg'
    },
    {
      title: 'MEDIA',
      image: 'https://res.cloudinary.com/dl416umfa/image/upload/v1764812741/_1389516_pvgkj0.jpg'
    },
    {
      title: 'LOUNGE',
      image: 'https://res.cloudinary.com/dl416umfa/image/upload/v1764812742/_1389503_nphbmb.jpg'
    },
    {
      title: 'EQUIPPED FOOD BAR',
      image: 'https://res.cloudinary.com/dl416umfa/image/upload/v1764812744/_1389528_fwq7ll.jpg'
    }
  ];

  const imageRefs = useRef([]);
  const containerRefs = useRef([]);
  const paragraphRef = useRef(null);
  const paragraphContainerRef = useRef(null);

  useEffect(() => {
    // Animación de entrada para todas las imágenes
    containerRefs.current.forEach((container, index) => {
      if (!container) return;

      const image = imageRefs.current[index];
      if (!image) return;

      // Configurar estado inicial (como en el carrusel)
      gsap.set(container, { 
        opacity: 0,
        clipPath: "inset(0 0 100% 0)"
      });
      
      gsap.set(image, { 
        scale: 1.2,
        opacity: 0
      });

      // Animación de entrada con ScrollTrigger
      ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          
          tl.to(container, {
            opacity: 1,
            duration: 0.1,
            onComplete: () => {
              // Animación de clip-path
              tl.to(container, {
                clipPath: "inset(0 0 0% 0)",
                duration: 1,
                ease: "power2.out"
              }, 0);
              
              // Animación de escala de la imagen
              tl.to(image, {
                scale: 1,
                opacity: 1,
                duration: 1.8,
                ease: "power3.out"
              }, 0);
            }
          });
        }
      });
    });

    // Animación para el párrafo (revelado de izquierda a derecha con clipPath)
    if (paragraphRef.current && paragraphContainerRef.current) {
      const paragraph = paragraphRef.current;
      
      // Configurar estado inicial del párrafo
      gsap.set(paragraph, {
        clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)" // Comienza completamente oculto (ancho 0%)
      });

      // Animación del párrafo con ScrollTrigger
      ScrollTrigger.create({
        trigger: paragraphContainerRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(paragraph, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", // Se expande completamente
            duration: 1.5,
            ease: "power2.out"
          });
        }
      });
    }

    // Limpiar
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Función para manejar errores de imagen
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const parent = e.target.parentElement;
    if (parent) {
      const placeholder = parent.querySelector('.placeholder-bg');
      if (placeholder) {
        placeholder.style.zIndex = '10';
      }
    }
  };

  return (
    <section className="w-full bg-black text-white py-8 md:py-12">
      {/* Header Section */}
      <div className="w-full px-4 md:px-8 lg:px-16 mb-6 md:mb-8">
        {/* Contenedor principal con ancho fijo */}
        <div className="w-full max-w-4xl">
          {/* Title - Alineado con el párrafo */}
          <h2 className="font-accent text-white text-5xl md:text-7xl lg:text-[5.5rem] mb-2 tracking-tight uppercase leading-none whitespace-nowrap">
            <RevealText as="span" splitLines={true}>
              THE STAGE
            </RevealText>
          </h2>

          {/* Subtitle */}
          <h3 className="font-gotham font-bold text-xl md:text-3xl lg:text-4xl mb-3 md:mb-4">
            <RevealText as="span" splitLines={true}>
              A space ready for any project
            </RevealText>
          </h3>

          {/* Description - Alineado verticalmente con el título */}
          <div 
            ref={paragraphContainerRef}
            className="text-justify overflow-hidden"
          >
            <p 
              ref={paragraphRef}
              className="font-gotham font-medium text-xs md:text-sm lg:text-base text-white leading-relaxed mb-4 md:mb-6"
              style={{
                textAlign: 'justify',
                textJustify: 'inter-word',
                willChange: 'clip-path' // Optimización para animaciones
              }}
            >
              We have our own soundstage designed for high-level audiovisual productions. It's a versatile space
              equipped with professional lighting, 3 cycloramas, essential sound tools, and a controlled environment that
              includes air conditioning. This stage also has a variety of video production cameras, lenses, drones, stabilizers,
              and audiovisual equipment available to production companies, brands, and creators who need a
              reliable, fully prepared space for filming.
            </p>
          </div>

          {/* CTA Button */}
          <button className="font-accent bg-transparent border-2 border-white text-white px-5 py-2 text-sm md:text-base hover:bg-white hover:text-black transition-all duration-300 uppercase">
            RESERVE ONLINE
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="w-full px-4 md:px-8 lg:px-16 mb-6 md:mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 md:gap-4">
          {/* Studio Image - Left Side (2 columns) */}
          <div className="relative w-full h-[200px] md:h-[250px] lg:h-[280px] bg-gray-900 lg:col-span-2 overflow-hidden">
            <div 
              ref={el => containerRefs.current[0] = el}
              className="w-full h-full overflow-hidden"
            >
              <img
                ref={el => imageRefs.current[0] = el}
                src="https://res.cloudinary.com/dhoyps3vk/image/upload/v1764645724/_1389486_u2ogz6.jpg"
                alt="The Stage Studio"
                className="w-full h-full object-cover object-center"
                onError={handleImageError}
                style={{ transformOrigin: 'center center' }}
              />
            </div>
          </div>

          {/* Dimensions Diagram - Right Side (3 columns) */}
          <div className="relative w-full h-[200px] md:h-[250px] lg:h-[280px] bg-black flex items-center justify-center lg:col-span-3 overflow-hidden">
            <div 
              ref={el => containerRefs.current[1] = el}
              className="w-full h-full overflow-hidden bg-black"
            >
              <img
                ref={el => imageRefs.current[1] = el}
                src="https://res.cloudinary.com/dhoyps3vk/image/upload/v1764645737/Asset_1_dsaqok.png"
                alt="Stage Dimensions Diagram"
                className="w-full h-full object-contain object-top"
                onError={handleImageError}
                style={{ transformOrigin: 'center center' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Studio Features Section */}
      <div className="w-full px-4 md:px-8 lg:px-16">
        {/* Título de features - Usando SplitType normal */}
        <h3 className="font-gotham font-bold text-sm md:text-base lg:text-lg mb-4 md:mb-6 uppercase tracking-wide">
          <RevealText as="span" splitLines={true}>
            STUDIO FEATURES
          </RevealText>
        </h3>

        {/* Features Grid - 4 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] bg-gray-900 overflow-hidden cursor-pointer"
            >
              <div 
                ref={el => containerRefs.current[index + 2] = el}
                className="absolute inset-0 overflow-hidden"
              >
                <img
                  ref={el => imageRefs.current[index + 2] = el}
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={handleImageError}
                  style={{ transformOrigin: 'center center' }}
                />
              </div>
              
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Title - Usando SplitType normal */}
              <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 z-20">
                <h4 className="font-gotham font-bold text-white text-[10px] md:text-xs lg:text-sm uppercase leading-tight">
                  <RevealText as="span" splitLines={true}>
                    {feature.title}
                  </RevealText>
                </h4>
              </div>

              {/* Placeholder background */}
              <div className="placeholder-bg absolute inset-0 flex items-center justify-center bg-gray-800 -z-10">
                <span className="text-gray-600 text-[9px] md:text-xs text-center px-2">
                  {feature.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheStage;