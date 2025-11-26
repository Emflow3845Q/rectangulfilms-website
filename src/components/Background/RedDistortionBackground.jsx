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

    // 1. CREAR ELEMENTO DE VIDEO CON MEJORES CONFIGURACIONES
    video.current = document.createElement('video');
    video.current.src = '/leeroy-background.mp4';
    video.current.loop = true;
    video.current.muted = true;
    video.current.playsInline = true;
    video.current.preload = 'auto';
    video.current.crossOrigin = 'anonymous';
    video.current.style.display = 'none';

    // Configurar calidad de video
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
    
    // Configurar renderer con corrección de color
    renderer.current.setSize(width, height);
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.current.setClearColor(0x000000, 0);
    
    // CORRECCIÓN CRÍTICA: Configuración de color space
    if (THREE.SRGBColorSpace) {
      // Three.js r152+
      renderer.current.outputColorSpace = THREE.SRGBColorSpace;
    } else {
      // Versiones anteriores
      renderer.current.outputEncoding = THREE.sRGBEncoding;
    }
    
    const canvas = renderer.current.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.objectFit = 'cover';
    
    containerRef.current.appendChild(canvas);

    // 3. CONFIGURACIÓN MEJORADA DE TEXTURA DE VIDEO CON CORRECCIÓN DE COLOR
    const initVideoTexture = () => {
      videoTexture.current = new THREE.VideoTexture(video.current);
      
      // CONFIGURACIÓN CORREGIDA PARA COLOR
      videoTexture.current.minFilter = THREE.LinearFilter;
      videoTexture.current.magFilter = THREE.LinearFilter;
      videoTexture.current.format = THREE.RGBAFormat;
      
      // CORRECCIÓN MÁS IMPORTANTE: Color space de la textura
      if (THREE.SRGBColorSpace) {
        // Three.js r152+
        videoTexture.current.colorSpace = THREE.SRGBColorSpace;
      } else {
        // Versiones anteriores
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
        toneMapped: false // Importante para mantener colores fieles al video original
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.current.add(mesh);

      video.current.addEventListener('loadeddata', () => {
        console.log('✅ Video cargado - Dimensiones:', 
          video.current.videoWidth, 'x', video.current.videoHeight);
        
        // Verificar metadata de color
        console.log('🎨 Configuración de color aplicada:');
        if (THREE.SRGBColorSpace) {
          console.log('- Color Space:', videoTexture.current.colorSpace);
          console.log('- Output Color Space:', renderer.current.outputColorSpace);
        } else {
          console.log('- Encoding:', videoTexture.current.encoding);
          console.log('- Output Encoding:', renderer.current.outputEncoding);
        }
        
        playVideo();
      });

      // Manejar errores de video
      video.current.addEventListener('error', (e) => {
        console.error('❌ Error de video:', e);
        console.error('Detalles del error:', video.current.error);
      });

      // Cuando el video puede reproducirse completamente
      video.current.addEventListener('canplaythrough', () => {
        console.log('🎬 Video listo para reproducirse sin interrupciones');
      });

      // Evento para cuando el video realmente comienza a reproducirse
      video.current.addEventListener('playing', () => {
        console.log('🔊 Video reproduciéndose correctamente');
      });

      const playVideo = () => {
        console.log('🔄 Intentando reproducir video...');
        const playPromise = video.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('▶️ Video reproduciéndose correctamente');
              console.log('📊 Estado del video:', {
                duración: video.current.duration,
                estado: video.current.readyState,
                pausado: video.current.paused,
                acabado: video.current.ended
              });
            })
            .catch(error => {
              console.log('⚠️ Esperando interacción del usuario:', error);
              
              const handleUserInteraction = () => {
                video.current.play().then(() => {
                  console.log('🎮 Video iniciado por interacción del usuario');
                }).catch(e => {
                  console.error('❌ Error al reproducir después de interacción:', e);
                });
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

    // 4. ANIMACIÓN OPTIMIZADA
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (videoTexture.current && video.current.readyState >= video.current.HAVE_CURRENT_DATA) {
        videoTexture.current.needsUpdate = true;
      }
      
      renderer.current.render(scene.current, camera.current);
    };

    animate();

    // 5. MANEJAR RESIZE MÁS PRECISO
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      renderer.current.setSize(width, height);
      
      // Forzar actualización de textura después del resize
      if (videoTexture.current) {
        videoTexture.current.needsUpdate = true;
      }
    };

    // Usar ResizeObserver para cambios más precisos
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    window.addEventListener('resize', handleResize);

    // 6. CLEANUP MEJORADO
    return () => {
      console.log('🧹 Limpiando recursos del video...');
      
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
        video.current.src = ''; // Limpiar source
        video.current.load(); // Reiniciar
        if (video.current.parentNode) {
          video.current.parentNode.removeChild(video.current);
        }
      }
      
      if (videoTexture.current) {
        videoTexture.current.dispose();
      }
      
      // Limpiar materiales y geometrías
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