import React, { useEffect, useRef } from "react";

const VideoModal = ({ fullscreenVideo, onClose }) => {
  const videoRef = useRef(null);

  // Manejar la tecla Escape para cerrar el modal y ocultar/mostrar header
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (fullscreenVideo) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevenir scroll del body
      
      // Ocultar el header
      const header = document.querySelector('header');
      if (header) {
        header.style.display = 'none';
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      
      // Mostrar el header nuevamente al cerrar
      const header = document.querySelector('header');
      if (header) {
        header.style.display = 'block';
      }
    };
  }, [fullscreenVideo, onClose]);

  // Pausar video cuando se cierra el modal
  useEffect(() => {
    if (!fullscreenVideo && videoRef.current) {
      videoRef.current.pause();
    }
  }, [fullscreenVideo]);

  if (!fullscreenVideo) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-1 xs:p-2 sm:p-3"
      onClick={onClose}
    >
      {/* Contenedor principal del modal - Más grande y minimalista */}
      <div
        className="relative bg-black overflow-hidden w-full max-w-[98vw] h-[98vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar - CON LA MISMA ANIMACIÓN QUE EL HEADER */}
        <button
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[110] flex items-center justify-center w-auto h-10 sm:h-12 px-4 sm:px-6 group"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Cerrar video"
        >
          <div className="relative h-6 overflow-hidden">
            <div className="flex flex-col transition-all duration-300 group-hover:-translate-y-6">
              {/* "CLOSE" normal - sube con animación */}
              <span 
                className="text-white text-sm sm:text-base uppercase tracking-tighter font-gotham font-bold h-6 flex items-center justify-center"
                style={{ letterSpacing: '-0.05em' }}
              >
                CLOSE
              </span>
              {/* "CLOSE" rojo que aparece desde abajo */}
              <span 
                className="text-red-600 text-sm sm:text-base uppercase tracking-tighter font-gotham font-bold h-6 flex items-center justify-center"
                style={{ letterSpacing: '-0.05em' }}
              >
                CLOSE
              </span>
            </div>
          </div>
        </button>

        {/* Contenedor del video - Ocupa toda el área disponible */}
        <div className="w-full h-full bg-black relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            controls
            controlsList="nodownload noplaybackrate"
            playsInline
            className="w-full h-full object-contain"
            preload="metadata"
          >
            <source src={fullscreenVideo.video} type="video/mp4" />
            <source src={fullscreenVideo.video} type="video/webm" />
            Your browser does not support the video tag.
          </video>

          {/* Loading indicator */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 video-loading">
            <div className="w-12 h-12 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Estilos para el estado de loading del video */
        video:not([ready]) + .video-loading {
          opacity: 1;
        }

        /* Mejoras de accesibilidad y focus */
        button:focus-visible {
          outline: 2px solid #EF4444;
          outline-offset: 2px;
        }

        /* Animación de entrada del modal */
        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .relative {
          animation: modalEnter 0.3s ease-out;
        }

        /* Mejoras de rendimiento para móviles */
        @media (max-width: 768px) {
          .backdrop-blur-sm {
            backdrop-filter: blur(2px);
          }
        }
      `}</style>
    </div>
  );
};

export default VideoModal;