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

  // Sistema de fondo fluido interactivo con textura - OPTIMIZADO PARA MÓVIL
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
        this.size = isMobile ? Math.random() * 1 + 0.3 : Math.random() * 2 + 0.5; // Más pequeñas en móvil
        this.speedX = Math.random() * 0.1 - 0.05;
        this.speedY = Math.random() * 0.1 - 0.05;
        this.alpha = Math.random() * 0.3 + 0.1;
        this.originalSize = this.size;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.01 + 0.005;
      }

      update() {
        this.pulsePhase += this.pulseSpeed;
        const pulse = Math.sin(this.pulsePhase) * 0.1 + 0.9;
        
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
            this.size = this.originalSize * (1 + force * 1.5);
            this.alpha = Math.min(0.6, this.alpha + force * 0.3);
            this.x -= dx * force * 0.01;
            this.y -= dy * force * 0.01;
          } else {
            this.size = this.originalSize * pulse;
            this.alpha = Math.max(0.1, this.alpha - 0.005);
          }
        }
      }

      draw() {
        ctx.fillStyle = `rgba(220, 38, 38, ${this.alpha})`;
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
        this.maxRadius = isMobile ? 150 : 300; // Más pequeñas en móvil
        this.alpha = 0.8;
        this.speed = isMobile ? 1 : 1.5; // Más lento en móvil
        this.lineWidth = isMobile ? 1 : 1.5;
      }

      update() {
        this.radius += this.speed;
        this.alpha = 0.8 * (1 - (this.radius / this.maxRadius));
        this.lineWidth = (isMobile ? 1 : 1.5) * (1 - (this.radius / this.maxRadius));
      }

      draw() {
        if (this.alpha > 0) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(236, 35, 60, ${this.alpha * 0.4})`;
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
      // Menos partículas en móvil para mejor performance
      const particleCount = isMobile ? 
        Math.min(60, Math.floor((canvas.width * canvas.height) / 30000)) : 
        Math.min(120, Math.floor((canvas.width * canvas.height) / 15000));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 1.2
      );
      gradient.addColorStop(0, '#1a0505');
      gradient.addColorStop(0.3, '#0f0303');
      gradient.addColorStop(0.7, '#090202');
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

        // Menos conexiones en móvil para mejor performance
        if (!isMobile) {
          for (let j = index + 1; j < particles.length; j++) {
            const dx = particle.x - particles[j].x;
            const dy = particle.y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              const opacity = 0.2 * (1 - distance / 120);
              ctx.beginPath();
              ctx.strokeStyle = `rgba(236, 35, 60, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      });

      // Solo efecto cursor en desktop
      if (!isMobile && mousePosition.x > 0 && mousePosition.y > 0) {
        const cursorGradient = ctx.createRadialGradient(
          mousePosition.x, mousePosition.y, 0,
          mousePosition.x, mousePosition.y, 250
        );
        cursorGradient.addColorStop(0, 'rgba(236, 35, 60, 0.1)');
        cursorGradient.addColorStop(0.3, 'rgba(236, 35, 60, 0.03)');
        cursorGradient.addColorStop(1, 'rgba(236, 35, 60, 0)');
        
        ctx.fillStyle = cursorGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    let lastWaveTime = 0;
    const handleMouseMove = (e) => {
      if (isMobile) return; // No interacción en móvil
      
      const newPos = {
        x: e.clientX,
        y: e.clientY
      };
      
      const now = Date.now();
      if (now - lastWaveTime > 500) {
        waves.push(new Wave(newPos.x, newPos.y));
        lastWaveTime = now;
      }
      
      setMousePosition(newPos);
    };

    const handleClick = () => {
      if (isMobile) return; // No ondas en móvil
      
      for (let i = 0; i < 2; i++) {
        setTimeout(() => {
          waves.push(new Wave(mousePosition.x, mousePosition.y));
        }, i * 200);
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
        duration: isMobile ? 1.5 : 2.5, // Más rápido en móvil
        ease: "power2.out"
      }
    );

    masterTL.fromTo(sloganRef.current,
      {
        y: isMobile ? 40 : 80,
        opacity: 0,
        scale: 1.1
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: isMobile ? 1.2 : 1.8, // Más rápido en móvil
        ease: "power2.out"
      },
      isMobile ? "-=1" : "-=1.5"
    );

    masterTL.fromTo(buttonRef.current,
      {
        y: isMobile ? 30 : 50,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: isMobile ? 1 : 1.5, // Más rápido en móvil
        ease: "power2.out"
      },
      isMobile ? "-=0.8" : "-=1"
    );

    // Animación marquee responsive
    if (marqueeRef.current) {
      // Movimiento vertical adaptado
      gsap.to(marqueeRef.current, {
        y: isMobile ? "+=5" : "+=10",
        duration: isMobile ? 3 : 2, // Más lento en móvil
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Marquee horizontal con velocidad adaptada
      const marqueeContent = marqueeRef.current;
      const contentWidth = marqueeContent.scrollWidth / 2;
      
      gsap.to(marqueeContent, {
        x: `-=${contentWidth}`,
        duration: isMobile ? 35 : 25, // Más lento en móvil
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
        }
      });
    }

    // Animación de entrada para proyectos responsive
    gsap.fromTo(".project-card",
      {
        opacity: 0,
        y: isMobile ? 30 : 60,
        scale: 0.8,
        rotation: isMobile ? 0 : -5 // Sin rotación en móvil
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: isMobile ? 0.8 : 1.2,
        stagger: isMobile ? 0.08 : 0.15,
        ease: "power2.out",
        delay: isMobile ? 0.4 : 0.8
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
        }, isMobile ? 1200 : 1500); // Más rápido en móvil
      }
    });

    textAnimation
      .to(dynamicTextRef.current, {
        y: isMobile ? -15 : -20,
        opacity: 0,
        scale: 0.95,
        duration: isMobile ? 0.4 : 0.6,
        ease: "power2.inOut"
      })
      .call(() => {
        gsap.set(dynamicTextRef.current, { 
          y: isMobile ? 15 : 20,
          scale: 1.05 
        });
      })
      .to(dynamicTextRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.6 : 0.8,
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

  // Prevenir scroll en iframe
  const handleIframeWheel = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black hide-scrollbar">
      {/* Sección 1: Hero con Fondo Interactivo - RESPONSIVE */}
      <section 
        ref={section1Ref}
        className="h-screen snap-start relative bg-black flex items-center justify-center overflow-hidden px-4 sm:px-6"
      >
        <canvas
          ref={particlesRef}
          className="absolute inset-0 z-0 opacity-0"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/3 to-transparent z-1 pointer-events-none"></div>

        <div className="relative z-10 text-center px-2 sm:px-4">
          <h1 
            ref={sloganRef}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-gotham-cond-black text-white uppercase tracking-tight mb-6 sm:mb-8 opacity-0 leading-tight sm:leading-normal"
          >
            we are{" "}
            <span 
              ref={dynamicTextRef}
              className="inline-block text-white border-b-2 sm:border-b-4 border-red-primary pb-1 sm:pb-2 min-w-[200px] xs:min-w-[250px] sm:min-w-[300px] bg-black/10 backdrop-blur-sm px-3 sm:px-4 rounded-lg text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            >
              {dynamicTexts[currentTextIndex]}
            </span>
          </h1>

          <button
            ref={buttonRef}
            onClick={handleButtonClick}
            className="relative z-20 bg-white text-red-primary px-8 sm:px-12 py-3 sm:py-4 font-gotham-cond-black text-lg sm:text-xl uppercase tracking-widest hover:bg-gray-100 transition-all duration-500 border-2 border-white hover:scale-105 transform opacity-0 hover:shadow-2xl hover:shadow-red-500/20 text-base sm:text-lg"
          >
            who we are
          </button>
        </div>
      </section>

      {/* Sección 2: Marquee con video de fondo - RESPONSIVE */}
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
            onWheel={handleIframeWheel}
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="absolute top-1/2 transform -translate-y-1/2 w-full overflow-hidden z-10">
          <div 
            ref={marqueeRef}
            className="flex whitespace-nowrap"
            style={{ willChange: 'transform' }}
          >
            {[...Array(isMobile ? 8 : 10)].map((_, i) => (
              <span 
                key={i}
                className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-gotham-cond-black text-white uppercase tracking-tighter mx-6 sm:mx-8 md:mx-10 lg:mx-12 opacity-80"
              >
                everything is a rectangle
              </span>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 z-5"></div>
      </section>

      {/* Sección 3: Proyectos Destacados - COMPLETAMENTE RESPONSIVE */}
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
                } transition-all duration-1000 ${
                  isMobile ? '' : 'hover:rotate-0'
                }`}
                whileHover={{ 
                  scale: isMobile ? 1 : 1.02,
                  rotate: isMobile ? 0 : 0,
                  transition: { duration: 0.5 }
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
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 p-2 xs:p-3 sm:p-3 lg:p-4 transform translate-y-4 group-hover:translate-y-0"
                      whileHover={{ y: 0 }}
                      transition={{ duration: 0.5 }}
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
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className="absolute inset-0 border border-white/0 group-hover:border-white/30"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Video Modal - COMPLETAMENTE RESPONSIVE */}
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
        
        /* Mejoras de responsive para móviles muy pequeños */
        @media (max-width: 360px) {
          .xs\\:text-5xl {
            font-size: 2.5rem;
          }
          .xs\\:min-w-\\[250px\\] {
            min-width: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;