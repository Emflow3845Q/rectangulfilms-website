import React, { useEffect, useRef } from "react";

const VideoModal = ({ fullscreenVideo, onClose }) => {
  const videoRef = useRef(null);

  // Manejar la tecla Escape para cerrar el modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (fullscreenVideo) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
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
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8"
      onClick={onClose}
    >
      {/* Contenedor principal del modal */}
      <div
        className="relative bg-black rounded-xl xs:rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl w-full max-w-[95vw] xs:max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[75vw] xl:max-w-[70vw] 2xl:max-w-[65vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar - Mejorado para touch */}
        <button
          className="absolute top-2 xs:top-3 sm:top-4 md:top-5 lg:top-6 right-2 xs:right-3 sm:right-4 md:right-5 lg:right-6 z-20 bg-black/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 border border-white/30 hover:border-red-500 shadow-lg active:scale-95"
          style={{
            width: 'clamp(2rem, 6vw, 3.5rem)',
            height: 'clamp(2rem, 6vw, 3.5rem)',
            minWidth: '2rem',
            minHeight: '2rem'
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Cerrar video"
        >
          <svg 
            className="flex-shrink-0"
            style={{
              width: 'clamp(0.875rem, 3vw, 1.5rem)',
              height: 'clamp(0.875rem, 3vw, 1.5rem)'
            }}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Contenedor del video */}
        <div className="aspect-video bg-black relative">
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

        {/* Información del video - Mejorada para responsive */}
        <div className="bg-gradient-to-t from-black via-black/95 to-transparent p-3 xs:p-4 sm:p-5 md:p-6 lg:p-7 border-t border-white/10">
          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start gap-2 xs:gap-3 sm:gap-4">
            {/* Información principal */}
            <div className="flex-1 min-w-0 space-y-1 xs:space-y-1.5 sm:space-y-2">
              <h3 
                className="text-white font-accent uppercase font-bold truncate"
                style={{
                  fontSize: 'clamp(0.875rem, 3vw, 1.5rem)',
                  lineHeight: 1.2
                }}
                title={fullscreenVideo.client}
              >
                {fullscreenVideo.client}
              </h3>
              
              <p 
                className="text-white/80 font-gotham font-medium line-clamp-2 xs:line-clamp-3"
                style={{
                  fontSize: 'clamp(0.75rem, 2.5vw, 1.125rem)',
                  lineHeight: 1.4
                }}
                title={fullscreenVideo.title}
              >
                {fullscreenVideo.title}
              </p>
            </div>

            {/* Categoría */}
            <div className="flex-shrink-0 xs:text-right">
              <p 
                className="text-red-primary uppercase tracking-widest font-gotham font-bold whitespace-nowrap bg-red-primary/10 px-2 xs:px-3 py-1 rounded-lg"
                style={{
                  fontSize: 'clamp(0.625rem, 2vw, 0.875rem)'
                }}
              >
                {fullscreenVideo.category}
              </p>
            </div>
          </div>

          {/* Controles adicionales para móvil */}
          <div className="flex justify-between items-center mt-3 xs:mt-4 sm:hidden">
            <button
              onClick={() => videoRef.current?.play()}
              className="text-white text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
            >
              Reproducir
            </button>
            <button
              onClick={() => videoRef.current?.pause()}
              className="text-white text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
            >
              Pausar
            </button>
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

        /* Mejoras para tablets en landscape */
        @media (max-width: 1024px) and (orientation: landscape) {
          .aspect-video {
            aspect-ratio: 16/9;
            max-height: 70vh;
          }
        }

        /* Mejoras para móviles muy pequeños */
        @media (max-width: 360px) {
          .max-w-\[95vw\] {
            max-width: 98vw !important;
          }
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