import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import VideoBackground from "../Background/RedDistortionBackground";

const HeroSection = ({ 
  dynamicTexts, 
  isMobile, 
  isTablet, 
  onButtonClick 
}) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const weAreTextRef = useRef(null);
  const dynamicTextRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const buttonTextRef = useRef(null);
  const timelineRef = useRef(null);
  
  // Referencias para los slices
  const slice1Ref = useRef(null);
  const slice2Ref = useRef(null);

  // Texto fijo para la entrada - siempre "RECTÁNGULO"
  const ENTRY_TEXT = "RECTÁNGULO";

  // Efecto principal - TODO aparece simultáneamente con RevealText
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // Inicializar timeline
    timelineRef.current = gsap.timeline();

    // Configuración inicial - TODO el contenido está visible pero oculto
    gsap.set(contentRef.current, {
      opacity: 1
    });

    // Preparar textos para animación RevealText
    prepareTextsForReveal();

    // ANIMACIÓN SIMULTÁNEA DE TODO
    // 1. "we are" aparece con RevealText
    if (weAreTextRef.current) {
      const weAreLetters = weAreTextRef.current.querySelectorAll('.letter-inner');
      timelineRef.current.to(weAreLetters, {
        y: "0%",
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.03
      }, "start");
    }

    // 2. Texto fijo "RECTÁNGULO" aparece con RevealText - AL MISMO TIEMPO
    if (dynamicTextRef.current) {
      const dynamicLetters = dynamicTextRef.current.querySelectorAll('.letter-inner');
      timelineRef.current.to(dynamicLetters, {
        y: "0%",
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.03,
        onComplete: () => {
          // Después de que aparece, convertir a texto plano y comenzar ciclo
          setTimeout(() => {
            convertToPlainTextAndStartCycle();
          }, 1500);
        }
      }, "start");
    }

    // 3. Botón aparece (fade in simple) - AL MISMO TIEMPO
    if (buttonContainerRef.current) {
      timelineRef.current.to(buttonContainerRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, "start");
    }

    // 4. Crear slices del botón - se crean inmediatamente
    createButtonSlices();

    // 5. Slices aparecen (fade in) - AL MISMO TIEMPO
    timelineRef.current.add(() => {
      animateSlices();
    }, "start");

    // 6. Texto del botón NO tiene animación de entrada - aparece DESPUÉS de los slices
    if (buttonTextRef.current) {
      // El texto empieza completamente transparente
      buttonTextRef.current.style.opacity = '0';
      
      // Aparece DESPUÉS de que los slices estén visibles
      timelineRef.current.to(buttonTextRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "start+=1.0"); // 1 segundo después del inicio
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  // Preparar textos para animación RevealText
  const prepareTextsForReveal = () => {
    // Preparar "we are"
    if (weAreTextRef.current) {
      const text = "we are";
      const letters = text.split('');
      const wrappedHTML = letters.map(letter => 
        `<span class="letter-wrapper" style="display:inline-block;overflow:hidden;vertical-align:top;">
          <span class="letter-inner" style="display:inline-block;transform:translateY(100%);">
            ${letter}
          </span>
        </span>`
      ).join('');

      weAreTextRef.current.innerHTML = wrappedHTML;
      weAreTextRef.current.style.opacity = '1';
      weAreTextRef.current.style.color = '#ffffff';
    }

    // Preparar texto fijo "RECTÁNGULO" con RevealText
    if (dynamicTextRef.current) {
      const letters = ENTRY_TEXT.split('');
      const wrappedHTML = letters.map(letter => 
        `<span class="letter-wrapper" style="display:inline-block;overflow:hidden;vertical-align:top;">
          <span class="letter-inner" style="display:inline-block;transform:translateY(100%);">
            ${letter}
          </span>
        </span>`
      ).join('');

      dynamicTextRef.current.innerHTML = wrappedHTML;
      dynamicTextRef.current.style.opacity = '1';
      
      // Calcular tamaño del contenedor
      calculateDynamicTextSize();
    }

    // Para el botón - el texto está visible pero transparente
    if (buttonTextRef.current) {
      // Texto simple, sin animación RevealText
      buttonTextRef.current.textContent = "who we are";
      buttonTextRef.current.style.opacity = '0'; // Comienza invisible
      buttonTextRef.current.style.color = '#000000';
      buttonTextRef.current.style.position = 'relative';
      buttonTextRef.current.style.zIndex = '30'; // Alto z-index para estar sobre los slices
    }
  };

  // Convertir a texto plano y comenzar ciclo
  const convertToPlainTextAndStartCycle = () => {
    if (!dynamicTextRef.current || !dynamicTexts?.length) return;
    
    // 1. Convertir a texto plano (manteniendo estilos)
    const textElements = dynamicTextRef.current.querySelectorAll('.letter-inner');
    let currentText = '';
    textElements.forEach(el => {
      currentText += el.textContent;
    });
    
    // Crear nuevo elemento con estilos preservados
    const plainSpan = document.createElement('span');
    plainSpan.textContent = currentText;
    
    // Copiar estilos del contenedor padre
    const styles = window.getComputedStyle(dynamicTextRef.current);
    plainSpan.style.fontFamily = styles.fontFamily;
    plainSpan.style.fontWeight = styles.fontWeight;
    plainSpan.style.fontSize = styles.fontSize;
    plainSpan.style.letterSpacing = styles.letterSpacing;
    plainSpan.style.textTransform = styles.textTransform;
    plainSpan.style.lineHeight = styles.lineHeight;
    plainSpan.style.color = styles.color;
    
    // Limpiar y agregar texto plano
    dynamicTextRef.current.innerHTML = '';
    dynamicTextRef.current.appendChild(plainSpan);
    
    // 2. Comenzar ciclo typewriter con TODO el array dinámico
    startDynamicTextCycle();
  };

  // Calcular tamaño del contenedor de texto dinámico
  const calculateDynamicTextSize = () => {
    if (!dynamicTextRef.current || !dynamicTexts?.length) return;

    // Encontrar la palabra más larga (incluyendo "RECTÁNGULO" y todas las dinámicas)
    const allTexts = [ENTRY_TEXT, ...dynamicTexts];
    const longestText = allTexts.reduce((a, b) => a.length > b.length ? a : b);
    
    const temp = document.createElement('span');
    Object.assign(temp.style, {
      visibility: 'hidden',
      position: 'absolute',
      whiteSpace: 'nowrap',
      fontFamily: 'GOTHAM',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '-0.05em',
      lineHeight: '0.95',
      fontSize: isMobile ? '3rem' : isTablet ? '4.2rem' : '5.4rem'
    });
    temp.textContent = longestText;
    document.body.appendChild(temp);
    dynamicTextRef.current.style.minWidth = `${temp.offsetWidth}px`;
    dynamicTextRef.current.style.height = `${temp.offsetHeight}px`;
    document.body.removeChild(temp);
  };

  // Función para crear slices del botón
  const createButtonSlices = () => {
    if (!buttonContainerRef.current) return;

    const container = buttonContainerRef.current;
    
    // Limpiar slices existentes
    container.querySelectorAll('.slice-image').forEach(slice => slice.remove());

    // Crear 2 slices
    for (let i = 0; i < 2; i++) {
      const slice = document.createElement('div');
      slice.className = 'slice-image';
      Object.assign(slice.style, {
        position: 'absolute',
        left: '0',
        width: '100%',
        height: '50%',
        top: `${i * 50}%`,
        backgroundImage: 'url(/horizontal.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: `center ${i * 100}%`,
        zIndex: '20', // z-index medio, entre el fondo y el texto
        opacity: '0', // Empiezan invisibles
        pointerEvents: 'none'
      });
      container.appendChild(slice);
      
      // Guardar referencia
      if (i === 0) slice1Ref.current = slice;
      if (i === 1) slice2Ref.current = slice;
    }
  };

  // Animar slices para que aparezcan
  const animateSlices = () => {
    const slices = [slice1Ref.current, slice2Ref.current].filter(Boolean);
    
    if (slices.length > 0) {
      gsap.to(slices, {
        opacity: 1,
        duration: 0.8,
        stagger: 0, // Aparecen simultáneamente
        ease: "power2.out"
      });
    }
  };

  // Iniciar ciclo de cambio de texto dinámico
  const startDynamicTextCycle = () => {
    if (!dynamicTexts?.length) return;

    let currentIndex = 0;
    let animationInterval = null;
    let isTyping = false;

    const typeWriterEffect = (element, text, callback) => {
      isTyping = true;
      element.textContent = '';
      
      let currentChar = 0;
      
      const typeChar = () => {
        if (currentChar < text.length) {
          element.textContent += text[currentChar];
          currentChar++;
          const speed = Math.random() * 40 + 40;
          setTimeout(typeChar, speed);
        } else {
          isTyping = false;
          if (callback) setTimeout(callback, 1000);
        }
      };
      
      typeChar();
    };

    const deleteEffect = (element, callback) => {
      isTyping = true;
      const text = element.textContent;
      let currentChar = text.length;
      
      const deleteChar = () => {
        if (currentChar > 0) {
          element.textContent = text.substring(0, currentChar - 1);
          currentChar--;
          const speed = Math.random() * 25 + 25;
          setTimeout(deleteChar, speed);
        } else {
          isTyping = false;
          if (callback) callback();
        }
      };
      
      deleteChar();
    };

    const switchToNextText = () => {
      if (isTyping) return;

      const nextText = dynamicTexts[currentIndex];
      
      // Borrar el texto actual
      deleteEffect(dynamicTextRef.current, () => {
        // Escribir el nuevo texto
        typeWriterEffect(dynamicTextRef.current, nextText, () => {
          currentIndex = (currentIndex + 1) % dynamicTexts.length;
        });
      });
    };

    // Iniciar el intervalo inmediatamente
    animationInterval = setInterval(switchToNextText, 3500);

    // Limpiar
    return () => {
      if (animationInterval) clearInterval(animationInterval);
    };
  };

  return (
    <section 
      ref={sectionRef}
      className="h-screen snap-start relative overflow-hidden"
      style={{ background: 'transparent' }}
    >
      <VideoBackground />
      
      {/* Contenedor principal */}
      <div 
        ref={contentRef}
        className="absolute inset-0 flex items-end justify-start px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-24 xs:pb-28 sm:pb-32 md:pb-36 lg:pb-40 xl:pb-44"
        style={{ opacity: 1 }}
      >
        <div className="relative z-10 text-left w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-0 px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8">
          <div className="flex flex-col items-start space-y-3 xs:space-y-3 sm:space-y-4 md:space-y-4 lg:space-y-4 xl:space-y-4">
            <h1 className="text-white uppercase flex flex-col xs:flex-row items-start xs:items-end justify-start flex-nowrap gap-1 xs:gap-2 sm:gap-2 md:gap-2 w-full leading-none overflow-hidden">
              {/* "we are" - se anima con RevealText */}
              <div className="block flex-shrink-0 whitespace-nowrap font-accent font-normal text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl pb-0 overflow-hidden">
                <div style={{ lineHeight: '0.95' }}>
                  <span ref={weAreTextRef} style={{ opacity: 1, color: '#ffffff' }}>
                    {/* El texto se inserta dinámicamente */}
                  </span>
                </div>
              </div>
              
              {/* Texto dinámico - "RECTÁNGULO" fijo aparece con RevealText, luego ciclo normal */}
              <span
                ref={dynamicTextRef}
                className="inline-block relative flex-shrink-0 pointer-events-none min-w-0 font-gotham font-bold text-left overflow-visible tracking-tighter leading-none"
                style={{ 
                  minHeight: '0.95em',
                  fontSize: isMobile ? '3rem' : isTablet ? '4.2rem' : '5.4rem',
                  letterSpacing: '-0.05em',
                  lineHeight: '0.95',
                  marginTop: '-0.02em',
                  opacity: 1,
                  color: '#ffffff'
                }}
              />
            </h1>

            {/* Botón - solo las imágenes (slices) tienen animación de entrada */}
            <div 
              ref={buttonContainerRef}
              className="js-slice-image relative overflow-hidden inline-block mt-4 xs:mt-5 sm:mt-6 md:mt-7 lg:mt-8 xl:mt-9"
              style={{
                borderRadius: '0px',
                opacity: 0 // El contenedor empieza invisible
              }}
            >
              <button
                onClick={onButtonClick}
                className="relative px-6 xs:px-7 sm:px-8 md:px-9 lg:px-10 xl:px-11 py-2.5 xs:py-3 sm:py-3.5 md:py-4 lg:py-4.5 font-gotham font-bold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-widest overflow-hidden group"
                style={{
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  position: 'relative',
                  zIndex: 25,
                }}
              >
                {/* Texto del botón - SIN animación de entrada, aparece después */}
                <div className="relative">
                  <span 
                    ref={buttonTextRef} 
                    style={{ 
                      opacity: 0, // Empieza invisible
                      color: '#000000',
                      position: 'relative',
                      zIndex: 30 // Alto para estar sobre los slices
                    }}
                  >
                    who we are
                  </span>
                </div>
                
                {/* Overlay hover */}
                <div 
                  className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300 z-15"
                  style={{
                    pointerEvents: 'none'
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;