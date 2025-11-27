import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugins de GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Componente principal que incluye todas las funciones
const AdvancedAnimations = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Inicializar todas las animaciones
    revealText(containerRef.current);
    initRevealAnimations();
    initCaseStudyHeader();
    initParallax();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // 1. Función revealText implementada en React
  const revealText = (container) => {
    const ze = (selector, staggerAmount) => {
      const elements = container.querySelectorAll(selector);
      
      if (elements.length > 0) {
        elements.forEach(element => {
          let types = "lines";
          if (element.dataset.split === "chars") {
            types = "lines, chars";
          }
          
          // Nota: Necesitarías la librería SplitType para esto
          // new SplitType(element, { types: types })
          
          element.querySelectorAll('.line').forEach(line => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("line-wrapper");
            wrapper.style.overflow = "hidden";
            line.parentNode.appendChild(wrapper);
            wrapper.appendChild(line);
          });
        });

        gsap.utils.toArray(selector).forEach(element => {
          const horizontalReveal = element.querySelector(".js-horizontal-reveal-text");
          let revealDelay = element.getAttribute("data-reveal") || 0;

          if (!element.closest(".s-timeline")) {
            const lines = element.querySelectorAll(".line");
            const chars = element.querySelectorAll(".char");
            let targets = lines;
            
            if (chars.length > 0) {
              targets = chars;
            }

            if (lines.length > 0) {
              gsap.fromTo(targets, {
                y: "115%"
              }, {
                y: 0,
                duration: 1,
                stagger: staggerAmount,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 75%"
                },
                delay: parseFloat(revealDelay),
                onComplete: function() {
                  if (element.classList.contains("is-revert")) {
                    // SplitType.revert(element);
                  }
                }
              });
            }

            const sliceWrapper = element.querySelector(".slice-wrapper");
            if (sliceWrapper) {
              gsap.to(sliceWrapper, {
                x: "-0.7rem",
                duration: 1,
                ease: "power3.out",
                delay: parseFloat(revealDelay) + 1
              }, ">-0.2");
            }

            if (horizontalReveal) {
              gsap.fromTo(horizontalReveal, {
                width: 0
              }, {
                scrollTrigger: {
                  trigger: element,
                  start: "top 75%"
                },
                width: horizontalReveal.querySelector("span").offsetWidth,
                duration: 1.5,
                ease: "expo.inOut",
                delay: parseFloat(revealDelay) + 0.5
              });
            }
          }

          if (element.closest(".a--auto")) {
            gsap.fromTo(element.querySelectorAll(".line"), {
              y: "115%"
            }, {
              y: 0,
              duration: 1,
              stagger: staggerAmount,
              ease: "power3.out",
              delay: parseFloat(revealDelay)
            });
          }
        });
      }
    };

    // Aplicar a diferentes selectores
    const textSelector = ".a--text";
    if (container.querySelector(textSelector)) {
      ze(textSelector, "0.08");
    }

    const smallTextSelector = ".a--sm-text p";
    if (container.querySelector(smallTextSelector)) {
      ze(smallTextSelector, "0.05");
    }

    // Manejar resize
    const handleResize = () => {
      const elements = container.querySelectorAll(".a--text, .a--sm-text p");
      if (elements.length > 0) {
        elements.forEach(element => {
          if (element.closest(".a--sm-text")) {
            if (!element.closest(".a--sm-text").classList.contains("no-resize")) {
              // SplitType.revert(element);
            }
          } else {
            if (!element.classList.contains("no-resize")) {
              // SplitType.revert(element);
            }
          }
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  };

  // 2. Función removeRevealText
  const removeRevealText = (container) => {
    const elements = container.querySelectorAll(".a--text");
    if (elements) {
      elements.forEach(element => {
        element.classList.remove("a--text");
      });
    }
  };

  // 3. Función reveal genérica
  const initRevealAnimations = () => {
    const reveal = (containerSelector, targetSelector) => {
      const containers = gsap.utils.toArray(containerSelector);
      if (containers.length > 0) {
        containers.forEach(container => {
          const targets = container.querySelectorAll(targetSelector);
          if (targets.length > 0) {
            gsap.from(targets, {
              opacity: 0,
              duration: 1,
              ease: "power1.inOut",
              stagger: 0.15,
              scrollTrigger: {
                trigger: container,
                start: "top bottom-=3%"
              }
            });
          }
        });
      }
    };

    // Ejemplo de uso
    reveal(".js-reveal-container", ".js-reveal-item");
  };

  // 4. Función forceScrollTop
  const forceScrollTop = () => {
    window.scrollTo(0, 0);
    // Si tienes Lenis configurado
    // if (typeof lenis !== "undefined") {
    //   lenis.scrollTo(0, { immediate: true });
    //   lenis.stop();
    // }
  };

  // 5. Case Study Header
  const initCaseStudyHeader = () => {
    const caseStudyHeader = () => {
      const mainTitle = document.querySelector(".js-case-study-main-title");
      const textLines = document.querySelectorAll(".js-case-study-h .a--text .line");
      const showTextElements = document.querySelectorAll(".v-show-text-el");
      const sliceImage = document.querySelector(".js-slice-image");
      const imageWrapper = document.querySelector(".case-study__h-image-wrapper");
      const images = document.querySelectorAll(".js-slice-image .img");
      const sliceImages = document.querySelectorAll(".js-case-study-h .slice-image");
      const transitionOverlays = document.querySelectorAll(".js-transition-overlay-slice");
      const bottomElements = document.querySelectorAll(".js-case-study-h-bottom");

      // Forzar scroll al top inicialmente
      gsap.ticker.add(forceScrollTop);

      function completeInitialAnim() {
        setTimeout(() => {
          gsap.ticker.remove(forceScrollTop);
          // lenis.start();
          // lenis.resize();
          if (window.innerWidth > 1023) {
            initScrollAnimation();
          }
        }, 500);
      }

      // Timeline inicial
      let initialTimeline = gsap.timeline();

      if (transitionOverlays.length > 0) {
        initialTimeline.from(transitionOverlays, {
          x: "200%",
          duration: 1,
          stagger: -0.1,
          ease: "power3.out"
        });
      }

      if (sliceImages.length > 0) {
        initialTimeline.from(sliceImages, {
          x: "100%",
          duration: 1,
          stagger: -0.1,
          ease: "power3.out"
        }, "<");
      }

      if (textLines.length > 0) {
        initialTimeline.from(textLines, {
          y: "100%",
          duration: 1,
          stagger: 0.08,
          ease: "power3.out"
        }, ">-0.7");
      }

      if (showTextElements.length > 0) {
        initialTimeline.to(showTextElements, {
          y: 0,
          duration: 1,
          ease: "power3.out"
        }, "<");
      }

      initialTimeline.add(completeInitialAnim);

      if (images.length > 0) {
        initialTimeline.to(images, {
          opacity: 1,
          duration: 0
        }, ">-0.1");
      }

      if (sliceImages.length > 0) {
        initialTimeline.to(sliceImages, {
          opacity: 0,
          duration: 1
        });
      }

      initialTimeline.delay(0.5);

      // Animación de scroll
      const initScrollAnimation = () => {
        let scrollTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: imageWrapper,
            scrub: true,
            pin: false,
            start: "top top",
            end: () => window.innerHeight * 2 + " bottom",
            invalidateOnRefresh: true
          },
          defaults: {
            ease: "power3.outIn"
          }
        });

        scrollTimeline.to(imageWrapper.querySelector(".js-slice-image"), {
          x: 0,
          duration: 0.95
        });

        if (transitionOverlays[0]) {
          scrollTimeline.to(transitionOverlays[0], {
            x: "-101%",
            duration: 1
          }, "<");
        }

        if (mainTitle) {
          scrollTimeline.to(mainTitle, {
            x: () => -window.innerWidth * 0.9 / 2,
            duration: 1.1
          }, "<");
        }

        if (transitionOverlays[1]) {
          scrollTimeline.to(transitionOverlays[1], {
            x: "-101%",
            duration: 1.1
          }, "<+=0.05");
        }

        if (transitionOverlays[2]) {
          scrollTimeline.to(transitionOverlays[2], {
            x: "-101%",
            duration: 1.2
          }, "<+=0.1");
        }

        if (bottomElements.length > 0) {
          scrollTimeline.to(bottomElements, {
            x: () => -window.innerWidth * 0.9 / 2,
            duration: 1.1
          }, "<");
        }
      };

      // Efectos parallax para la imagen
      if (sliceImage && window.innerWidth > 767) {
        const imageHeight = sliceImage.offsetHeight;
        
        gsap.to(sliceImage, {
          scrollTrigger: {
            trigger: sliceImage,
            scrub: true,
            start: "top top",
            end: () => `+=${imageHeight * 2}`
          },
          y: "25%",
          duration: 1,
          ease: "power3.out"
        });

        gsap.fromTo(sliceImage, {
          filter: "brightness(1)"
        }, {
          scrollTrigger: {
            trigger: sliceImage,
            scrub: true,
            start: "85% 50%",
            end: () => `+=${imageHeight / 2}`
          },
          filter: "brightness(0.4)",
          duration: 1,
          ease: "power2.inOut"
        });
      }
    };

    // Ejecutar si existe el elemento
    if (document.querySelector(".js-case-study-main-title")) {
      caseStudyHeader();
    }
  };

  // 6. Función Parallax
  const initParallax = () => {
    const parallaxElements = gsap.utils.toArray(".js-parallax");
    
    if (parallaxElements.length > 0) {
      parallaxElements.forEach(element => {
        let depth = element.dataset.depth;
        const mobileDepth = element.dataset.depthmb;
        
        if (window.innerWidth < 768 && mobileDepth) {
          depth = mobileDepth;
        }
        
        const yMovement = -(element.offsetHeight * depth);
        
        gsap.to(element, {
          y: yMovement,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }
  };

  return (
    <div ref={containerRef} className="advanced-animations-container">
      {/* Ejemplo de elementos con animaciones de texto */}
      <div className="a--text" data-reveal="0.5">
        <h1>Texto animado principal</h1>
      </div>

      <div className="a--sm-text">
        <p>Texto pequeño animado</p>
      </div>

      {/* Ejemplo de elementos con reveal */}
      <div className="js-reveal-container">
        <div className="js-reveal-item">Elemento 1</div>
        <div className="js-reveal-item">Elemento 2</div>
        <div className="js-reveal-item">Elemento 3</div>
      </div>

      {/* Ejemplo de parallax */}
      <div 
        className="js-parallax" 
        data-depth="0.5" 
        data-depthmb="0.3"
        style={{ height: '400px', background: '#ccc' }}
      >
        Elemento con efecto parallax
      </div>

      {/* Case Study Header Example */}
      <div className="js-case-study-h">
        <h1 className="js-case-study-main-title a--text">
          Case Study Title
        </h1>
        <div className="case-study__h-image-wrapper">
          <div className="js-slice-image">
            <img src="/image.jpg" alt="Case study" className="img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnimations;