import React, { useState, useRef, useEffect } from "react"; 
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const Home = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fullscreenVideo, setFullscreenVideo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const sloganRef = useRef(null);
  const dynamicTextRef = useRef(null);
  const buttonRef = useRef(null);
  const marqueeRef = useRef(null);
  const particlesRef = useRef(null);
  
  const dynamicTexts = [
    "rectángulo",
    "Cine",
    "publicity", 
    "music video",
    "comercial",
    "events"
  ];

  // Proyectos destacados - diseño responsive
  const featuredProjects = [
    {
      id: 1,
      client: "Nike",
      title: "Air Max Revolution",
      category: "Commercial",
      video: "/videos/DemoRectangulo2025.mp4",
      width: "col-span-2 lg:col-span-2",
      height: "row-span-1 lg:row-span-2",
      rotation: "rotate-1",
      mobileWidth: "col-span-2"
    },
    {
      id: 2,
      client: "National Geographic",
      title: "Urban Wilderness",
      category: "Documentary",
      video: "/videos/CamiloRegresa.mp4",
      width: "col-span-1 lg:col-span-1",
      height: "row-span-1",
      rotation: "-rotate-2",
      mobileWidth: "col-span-1"
    },
    {
      id: 3,
      client: "Coca-Cola",
      title: "Summer Festival",
      category: "Advertising",
      video: "/videos/DemoRectangulo2025.mp4",
      width: "col-span-1 lg:col-span-1",
      height: "row-span-1",
      rotation: "rotate-3",
      mobileWidth: "col-span-1"
    },
    {
      id: 4,
      client: "Bad Bunny",
      title: "Concert Tour",
      category: "Music Video",
      video: "/videos/MotionGraphics.mp4",
      width: "col-span-2 lg:col-span-2",
      height: "row-span-1",
      rotation: "-rotate-1",
      mobileWidth: "col-span-2"
    },
    {
      id: 5,
      client: "Microsoft",
      title: "Tech Summit",
      category: "Event",
      video: "/videos/DemoRectangulo2025.mp4",
      width: "col-span-1 lg:col-span-1",
      height: "row-span-1 lg:row-span-2",
      rotation: "rotate-2",
      mobileWidth: "col-span-1"
    },
    {
      id: 6,
      client: "Apple",
      title: "Product Launch",
      category: "Commercial",
      video: "/videos/CamiloRegresa.mp4",
      width: "col-span-1 lg:col-span-1",
      height: "row-span-1",
      rotation: "-rotate-3",
      mobileWidth: "col-span-1"
    }
  ];

  // Detectar dispositivo
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Controlar visibilidad del header
  useEffect(() => {
    if (fullscreenVideo) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [fullscreenVideo]);

  // Sistema de fondo con partículas MÁS ROJIZO
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let waves = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = isMobile ? Math.random() * 1.5 + 0.5 : Math.random() * 2.5 + 0.8;
        this.speedX = Math.random() * 0.15 - 0.075;
        this.speedY = Math.random() * 0.15 - 0.075;
        this.alpha = Math.random() * 0.5 + 0.3; // Más opaco
        this.originalSize = this.size;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.015 + 0.008;
      }

      update() {
        this.pulsePhase += this.pulseSpeed;
        const pulse = Math.sin(this.pulsePhase) * 0.15 + 0.9;
        
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;

        // Solo interacción en desktop para performance
        if (!isMobile) {
          const dx = mousePosition.x - this.x;
          const dy = mousePosition.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            const force = (200 - distance) / 200;
            this.size = this.originalSize * (1 + force * 1.8);
            this.alpha = Math.min(0.8, this.alpha + force * 0.4);
            this.x -= dx * force * 0.015;
            this.y -= dy * force * 0.015;
          } else {
            this.size = this.originalSize * pulse;
            this.alpha = Math.max(0.2, this.alpha - 0.008);
          }
        }
      }

      draw() {
        // Usar el rojo primario de la marca (rgb(236, 35, 60))
        ctx.fillStyle = `rgba(236, 35, 60, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Wave {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = isMobile ? 180 : 350;
        this.alpha = 0.9;
        this.speed = isMobile ? 1.2 : 1.8;
        this.lineWidth = isMobile ? 1.2 : 1.8;
      }

      update() {
        this.radius += this.speed;
        this.alpha = 0.9 * (1 - (this.radius / this.maxRadius));
        this.lineWidth = (isMobile ? 1.2 : 1.8) * (1 - (this.radius / this.maxRadius));
      }

      draw() {
        if (this.alpha > 0) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(236, 35, 60, ${this.alpha * 0.6})`; // Más rojo
          ctx.lineWidth = this.lineWidth;
          ctx.stroke();
        }
      }

      isDead() {
        return this.radius >= this.maxRadius;
      }
    }

    const initParticles = () => {
      particles = [];
      // Más partículas para un fondo más rojizo
      const particleCount = isMobile ? 
        Math.min(80, Math.floor((canvas.width * canvas.height) / 20000)) : 
        Math.min(150, Math.floor((canvas.width * canvas.height) / 12000));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Fondo base MÁS ROJIZO
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 1.1
      );
      gradient.addColorStop(0, '#9a0a00'); // Rojo más oscuro de la marca
      gradient.addColorStop(0.4, '#720600'); // Más rojo
      gradient.addColorStop(0.7, '#4d0400'); // Rojo muy oscuro
      gradient.addColorStop(1, '#000000');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      waves = waves.filter(wave => !wave.isDead());
      waves.forEach(wave => {
        wave.update();
        wave.draw();
      });
      
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Más conexiones para un efecto más denso
        if (!isMobile) {
          for (let j = index + 1; j < particles.length; j++) {
            const dx = particle.x - particles[j].x;
            const dy = particle.y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) { // Rango aumentado
              const opacity = 0.3 * (1 - distance / 150); // Más opaco
              ctx.beginPath();
              ctx.strokeStyle = `rgba(236, 35, 60, ${opacity})`;
              ctx.lineWidth = 0.8; // Líneas más gruesas
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      });

      // Efecto de resplandor más rojizo
      if (!isMobile && mousePosition.x > 0 && mousePosition.y > 0) {
        const cursorGradient = ctx.createRadialGradient(
          mousePosition.x, mousePosition.y, 0,
          mousePosition.x, mousePosition.y, 300
        );
        cursorGradient.addColorStop(0, 'rgba(236, 35, 60, 0.2)'); // Más rojo
        cursorGradient.addColorStop(0.4, 'rgba(236, 35, 60, 0.08)');
        cursorGradient.addColorStop(1, 'rgba(236, 35, 60, 0)');
        
        ctx.fillStyle = cursorGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    let lastWaveTime = 0;
    const handleMouseMove = (e) => {
      if (isMobile) return;
      
      const newPos = {
        x: e.clientX,
        y: e.clientY
      };
      
      const now = Date.now();
      if (now - lastWaveTime > 400) { // Más frecuente
        waves.push(new Wave(newPos.x, newPos.y));
        lastWaveTime = now;
      }
      
      setMousePosition(newPos);
    };

    const handleClick = () => {
      if (isMobile) return;
      
      for (let i = 0; i < 3; i++) { // Más ondas
        setTimeout(() => {
          waves.push(new Wave(mousePosition.x, mousePosition.y));
        }, i * 150);
      }
    };

    if (!isMobile) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('click', handleClick);
    }
    
    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (!isMobile) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('click', handleClick);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition, isMobile]);

  useEffect(() => {
    const masterTL = gsap.timeline();
    
    masterTL.fromTo(particlesRef.current,
      {
        opacity: 0,
        scale: 1.1
      },
      {
        opacity: 1,
        scale: 1,
        duration: isMobile ? 1.2 : 2,
        ease: "power2.out"
      }
    );

    // Animación del slogan - MEJOR ALINEACIÓN
    masterTL.fromTo(sloganRef.current,
      {
        y: isMobile ? 20 : 60,
        opacity: 0,
        scale: 1.05
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.9 : 1.5,
        ease: "power2.out"
      },
      isMobile ? "-=0.8" : "-=1.2"
    );

    masterTL.fromTo(buttonRef.current,
      {
        y: isMobile ? 20 : 40,
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.7 : 1.2,
        ease: "power2.out"
      },
      isMobile ? "-=0.6" : "-=0.8"
    );

    // Animación marquee responsive
    if (marqueeRef.current) {
      if (isMobile) {
        gsap.to(marqueeRef.current, {
          x: `-=${marqueeRef.current.scrollWidth / 2}`,
          duration: 20,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % (marqueeRef.current.scrollWidth / 2))
          }
        });
      } else {
        gsap.to(marqueeRef.current, {
          y: "+=8",
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        const marqueeContent = marqueeRef.current;
        const contentWidth = marqueeContent.scrollWidth / 2;
        
        gsap.to(marqueeContent, {
          x: `-=${contentWidth}`,
          duration: 25,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
          }
        });
      }
    }

    // Animación de entrada para proyectos
    gsap.fromTo(".project-card",
      {
        opacity: 0,
        y: isMobile ? 20 : 50,
        scale: 0.9,
        rotation: isMobile ? 0 : -5
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: isMobile ? 0.7 : 1.1,
        stagger: isMobile ? 0.07 : 0.12,
        ease: "power2.out",
        delay: isMobile ? 0.3 : 0.6
      }
    );

    startTextAnimation();

    return () => {};
  }, [isMobile]);

  useEffect(() => {
    if (!isAnimating) return;

    const textAnimation = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        setTimeout(() => {
          setCurrentTextIndex((prev) => 
            prev === dynamicTexts.length - 1 ? 0 : prev + 1
          );
        }, isMobile ? 1000 : 1500);
      }
    });

    textAnimation
      .to(dynamicTextRef.current, {
        y: isMobile ? -8 : -15,
        opacity: 0,
        scale: 0.97,
        duration: isMobile ? 0.3 : 0.5,
        ease: "power2.inOut"
      })
      .call(() => {
        gsap.set(dynamicTextRef.current, { 
          y: isMobile ? 8 : 15,
          scale: 1.03 
        });
      })
      .to(dynamicTextRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.4 : 0.6,
        ease: "power2.out"
      });
  }, [currentTextIndex, isAnimating, isMobile]);

  const startTextAnimation = () => {
    setIsAnimating(true);
  };

  const handleButtonClick = () => {
    window.location.href = "/about";
  };

  const handleProjectClick = (project) => {
    setFullscreenVideo(project);
  };

  const closeFullscreen = () => {
    setFullscreenVideo(null);
  };

  // Prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (fullscreenVideo) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [fullscreenVideo]);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black hide-scrollbar">
      {/* Sección 1: Hero - FONDO MÁS ROJIZO Y TEXTO ALINEADO */}
      <section 
        ref={section1Ref}
        className="h-screen snap-start relative bg-red-darker flex items-center justify-center overflow-hidden px-4 sm:px-6"
      >
        <canvas
          ref={particlesRef}
          className="absolute inset-0 z-0 opacity-0"
        />
        
        {/* Overlay más sutil */}
        <div className="absolute inset-0 bg-black/10 z-1 pointer-events-none"></div>

        <div className="relative z-10 text-center w-full max-w-6xl mx-auto px-2 sm:px-4">
          <h1 
            ref={sloganRef}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-gotham-cond-black text-white uppercase tracking-tight mb-4 sm:mb-6 md:mb-8 opacity-0 leading-tight sm:leading-normal flex flex-col items-center justify-center"
          >
            <span className="block mb-2 sm:mb-4">we are</span>
            <span 
              ref={dynamicTextRef}
              className="inline-block text-white border-b-2 sm:border-b-3 md:border-b-4 border-white pb-1 sm:pb-2 bg-black/20 backdrop-blur-sm px-4 sm:px-6 rounded-lg text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl min-w-[200px] xs:min-w-[250px] sm:min-w-[300px] text-center"
            >
              {dynamicTexts[currentTextIndex]}
            </span>
          </h1>

          <button
            ref={buttonRef}
            onClick={handleButtonClick}
            className="relative z-20 bg-white text-red-primary px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 font-gotham-cond-black text-base sm:text-lg md:text-xl uppercase tracking-widest hover:bg-gray-100 transition-all duration-300 border-2 border-white hover:scale-105 transform opacity-0 hover:shadow-xl mt-4 sm:mt-6"
          >
            who we are
          </button>
        </div>
      </section>

      {/* Sección 2: Video de fondo */}
      <section 
        ref={section2Ref}
        className="h-screen snap-start relative bg-black overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://www.youtube.com/embed/Csyu_yJK-Sg?autoplay=1&mute=1&loop=1&playlist=Csyu_yJK-Sg&controls=0&modestbranding=1&rel=0&showinfo=0"
            className="w-full h-full object-cover"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Background Video"
            style={{
              transform: isMobile ? 'scale(1.1)' : 'none'
            }}
          />
          <div className={`absolute inset-0 ${
            isMobile ? 'bg-black/40' : 'bg-black/60'
          }`}></div>
        </div>

        <div className="absolute top-1/2 transform -translate-y-1/2 w-full overflow-hidden z-10">
          <div 
            ref={marqueeRef}
            className="flex whitespace-nowrap"
            style={{ willChange: 'transform' }}
          >
            {[...Array(isMobile ? 6 : 10)].map((_, i) => (
              <span 
                key={i}
                className={`font-gotham-cond-black text-white uppercase tracking-tighter ${
                  isMobile 
                    ? 'text-3xl xs:text-4xl mx-4 xs:mx-6 opacity-90' 
                    : 'text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl mx-6 sm:mx-8 md:mx-10 lg:mx-12 opacity-80'
                }`}
              >
                everything is a rectangle
              </span>
            ))}
          </div>
        </div>

        <div className={`absolute inset-0 bg-gradient-to-t ${
          isMobile ? 'from-black/60 via-transparent to-black/60' : 'from-black/50 via-transparent to-black/50'
        } z-5`}></div>
      </section>

      {/* Sección 3: Proyectos Destacados */}
      <section 
        ref={section3Ref}
        className="h-screen snap-start relative bg-black flex items-center justify-center overflow-hidden"
      >
        <div className="w-full h-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className={`grid grid-cols-2 ${
            isMobile ? 'gap-2' : 'sm:gap-3 lg:gap-4'
          } w-full h-full ${
            isMobile ? 'grid-rows-3' : 'lg:grid-cols-4 lg:grid-rows-2'
          }`}>
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`project-card group cursor-pointer bg-black rounded-none overflow-hidden relative ${
                  isMobile ? project.mobileWidth : project.width
                } ${project.height} ${
                  isMobile ? '' : project.rotation
                } transition-all duration-500 ${
                  isMobile ? '' : 'hover:rotate-0'
                }`}
                whileHover={{ 
                  scale: isMobile ? 1 : 1.02,
                  rotate: isMobile ? 0 : 0,
                  transition: { duration: 0.3 }
                }}
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative w-full h-full bg-black">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                  
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/80 opacity-0 group-hover:opacity-100"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 p-2 xs:p-3 sm:p-3 lg:p-4 transform translate-y-4 group-hover:translate-y-0"
                      whileHover={{ y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-white font-gotham-cond-black text-xs sm:text-xs lg:text-sm uppercase mb-1">
                        {project.client}
                      </h3>
                      <p className="text-white/95 text-xs sm:text-xs leading-tight">
                        {isMobile ? 
                          (project.title.length > 20 ? project.title.substring(0, 20) + '...' : project.title) 
                          : project.title
                        }
                      </p>
                      <motion.div 
                        className="w-4 xs:w-5 sm:w-6 lg:w-8 h-0.5 bg-red-primary mt-1 lg:mt-2"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className="absolute inset-0 border border-white/0 group-hover:border-white/30"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {fullscreenVideo && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-3 xs:p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeFullscreen}
          >
            <motion.div 
              className="relative bg-black rounded-lg overflow-hidden shadow-2xl w-full mx-2 xs:mx-4 sm:mx-6 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button 
                className="absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 z-10 bg-black/80 hover:bg-red-600 text-white w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 border border-white/30 hover:border-red-500"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  closeFullscreen();
                }}
              >
                <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              
              <div className="aspect-video bg-black">
                <video
                  autoPlay
                  controls
                  controlsList="nodownload"
                  className="w-full h-full object-contain"
                >
                  <source src={fullscreenVideo.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <motion.div 
                className="bg-gradient-to-t from-black to-black/80 p-3 xs:p-4 sm:p-4 md:p-6 border-t border-white/10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.15 }}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div className="flex-1">
                    <h3 className="text-white font-gotham-cond-black text-base xs:text-lg sm:text-xl md:text-2xl uppercase mb-1">
                      {fullscreenVideo.client}
                    </h3>
                    <p className="text-white/80 text-sm xs:text-base sm:text-lg md:text-xl">
                      {fullscreenVideo.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-primary text-xs xs:text-sm sm:text-base md:text-lg uppercase tracking-widest">
                      {fullscreenVideo.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Home;