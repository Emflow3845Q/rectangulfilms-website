import React, { useRef, useEffect } from "react";
import * as THREE from 'three';

const VideoBackground = () => {
  const containerRef = useRef(null);
  const animationIdRef = useRef(null);
  
  const scene = useRef(null);
  const camera = useRef(null);
  const renderer = useRef(null);
  const video = useRef(null);
  const videoTexture = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Limpiar contenedor
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    // 1. CREAR ELEMENTO DE VIDEO
    video.current = document.createElement('video');
    video.current.src = '/leeroy-background.mp4';
    video.current.loop = true;
    video.current.muted = true;
    video.current.playsInline = true;
    video.current.preload = 'auto';
    video.current.crossOrigin = 'anonymous';
    video.current.style.display = 'none';

    video.current.setAttribute('webkit-playsinline', 'true');
    video.current.setAttribute('playsinline', 'true');

    document.body.appendChild(video.current);

    // 2. CONFIGURAR THREE.JS CON CORRECCIÓN DE COLOR
    scene.current = new THREE.Scene();
    camera.current = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    renderer.current = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false
    });
    
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    renderer.current.setSize(width, height);
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.current.setClearColor(0x000000, 0);
    
    // Configuración de color space
    if (THREE.SRGBColorSpace) {
      renderer.current.outputColorSpace = THREE.SRGBColorSpace;
    } else {
      renderer.current.outputEncoding = THREE.sRGBEncoding;
    }
    
    const canvas = renderer.current.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.objectFit = 'cover';
    
    containerRef.current.appendChild(canvas);

    // 3. CONFIGURACIÓN DE TEXTURA DE VIDEO CON CORRECCIÓN DE COLOR
    const initVideoTexture = () => {
      videoTexture.current = new THREE.VideoTexture(video.current);
      
      videoTexture.current.minFilter = THREE.LinearFilter;
      videoTexture.current.magFilter = THREE.LinearFilter;
      videoTexture.current.format = THREE.RGBAFormat;
      
      // Color space de la textura
      if (THREE.SRGBColorSpace) {
        videoTexture.current.colorSpace = THREE.SRGBColorSpace;
      } else {
        videoTexture.current.encoding = THREE.sRGBEncoding;
      }
      
      videoTexture.current.anisotropy = renderer.current.capabilities.getMaxAnisotropy();
      videoTexture.current.generateMipmaps = false;
      videoTexture.current.wrapS = THREE.ClampToEdgeWrapping;
      videoTexture.current.wrapT = THREE.ClampToEdgeWrapping;

      const material = new THREE.MeshBasicMaterial({
        map: videoTexture.current,
        transparent: true,
        opacity: 1,
        toneMapped: false
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.current.add(mesh);

      video.current.addEventListener('loadeddata', () => {
        playVideo();
      });

      video.current.addEventListener('error', (e) => {
        console.error('Error de video:', e);
      });

      const playVideo = () => {
        const playPromise = video.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {})
            .catch(error => {
              const handleUserInteraction = () => {
                video.current.play().catch(console.error);
                document.removeEventListener('click', handleUserInteraction);
                document.removeEventListener('touchstart', handleUserInteraction);
              };
              
              document.addEventListener('click', handleUserInteraction);
              document.addEventListener('touchstart', handleUserInteraction);
            });
        }
      };

      video.current.load();
    };

    initVideoTexture();

    // 4. ANIMACIÓN
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (videoTexture.current && video.current.readyState >= video.current.HAVE_CURRENT_DATA) {
        videoTexture.current.needsUpdate = true;
      }
      
      renderer.current.render(scene.current, camera.current);
    };

    animate();

    // 5. MANEJAR RESIZE
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      renderer.current.setSize(width, height);
      
      if (videoTexture.current) {
        videoTexture.current.needsUpdate = true;
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    window.addEventListener('resize', handleResize);

    // 6. CLEANUP
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      
      if (renderer.current) {
        renderer.current.dispose();
      }
      
      if (video.current) {
        video.current.pause();
        video.current.src = '';
        video.current.load();
        if (video.current.parentNode) {
          video.current.parentNode.removeChild(video.current);
        }
      }
      
      if (videoTexture.current) {
        videoTexture.current.dispose();
      }
      
      if (scene.current) {
        scene.current.traverse((object) => {
          if (object.isMesh) {
            if (object.geometry) {
              object.geometry.dispose();
            }
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0
      }}
    />
  );
};

export default VideoBackground;