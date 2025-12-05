import React, { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import * as THREE from 'three';

const VideoBackground = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // Exponer métodos al padre
  useImperativeHandle(ref, () => ({
    getCanvas: () => null,
    isThreeJsBackground: () => false,
    forceWhiteHeader: () => true
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    // Limpiar contenedor
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    // Crear contenedor para el video
    const videoContainer = document.createElement('div');
    videoContainer.style.position = 'absolute';
    videoContainer.style.top = '0';
    videoContainer.style.left = '0';
    videoContainer.style.width = '100%';
    videoContainer.style.height = '100%';
    videoContainer.style.zIndex = '0';
    videoContainer.style.overflow = 'hidden';
    
    // Crear elemento video
    const video = document.createElement('video');
    video.src = '/leeroy-background.mp4';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    
    videoRef.current = video;
    videoContainer.appendChild(video);
    containerRef.current.appendChild(videoContainer);

    // Intentar reproducir el video
    const playVideo = () => {
      video.play().catch(e => {
        console.log("Autoplay prevented:", e);
        // Intentar de nuevo con interacción del usuario
        const playOnInteraction = () => {
          video.play();
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('touchstart', playOnInteraction);
        };
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
      });
    };

    // Esperar a que el video esté listo
    video.addEventListener('loadeddata', playVideo);
    video.load();

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="video-background-container"
      style={{
        position: 'absolute', 
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden'
      }}
    />
  );
});

export default VideoBackground;