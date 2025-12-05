import React, { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import * as THREE from 'three';

const VideoBackground = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);
  
  // Referencias para el mouse
  const mousePosition = useRef({ x: 0.5, y: 0.5 });
  const targetMousePosition = useRef({ x: 0.5, y: 0.5 });
  const prevMousePosition = useRef({ x: 0.5, y: 0.5 });
  const easeFactor = useRef(0.02);
  const aberrationIntensity = useRef(0.0);

  // Exponer métodos al padre
  useImperativeHandle(ref, () => ({
    getCanvas: () => rendererRef.current?.domElement || null,
    isThreeJsBackground: () => true,
    forceWhiteHeader: () => true
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    // Limpiar contenedor
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    let scene, camera, renderer, planeMesh, videoTexture;

    // Crear elemento video
    const video = document.createElement('video');
    video.src = '/leeroy-background.mp4';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    video.style.display = 'none';
    
    videoRef.current = video;
    document.body.appendChild(video);

    // Shaders - Versión modificada con tu efecto
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      uniform sampler2D u_texture;    
      uniform vec2 u_mouse;
      uniform vec2 u_prevMouse;
      uniform float u_aberrationIntensity;

      void main() {
        // Grid de 40x40 (ajustable)
        vec2 gridUV = floor(vUv * vec2(25.0, 25.0)) / vec2(25.0, 25.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/80.0, 1.0/80.0);
        
        // Dirección del movimiento del mouse
        vec2 mouseDirection = u_mouse - u_prevMouse;
        
        // Distancia lineal desde el pixel al mouse (sin aspect ratio)
        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        
        // Fuerza basada en distancia lineal - se activa cerca del mouse
        // smoothstep(0.3, 0.0, ...) da 1.0 cuando distance=0 y 0.0 cuando distance=0.3
        float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);
        
        // Offset basado en la dirección del mouse
        vec2 uvOffset = strength * -mouseDirection * 0.2;
        vec2 uv = vUv - uvOffset;

        // Aberración cromática (separación de colores RGB)
        vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
        vec4 colorG = texture2D(u_texture, uv);
        vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

        gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
      }
    `;

    // Función para inicializar la escena
    function initializeScene() {
      // Crear textura desde el video
      videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;

      // Scene creation
      scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera setup - OrthographicCamera para cubrir toda la pantalla
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      // Uniforms - incluyendo u_aberrationIntensity
      let shaderUniforms = {
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_prevMouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_aberrationIntensity: { value: 0.0 },
        u_texture: { value: videoTexture }
      };

      // Creating a plane mesh with materials
      planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          uniforms: shaderUniforms,
          vertexShader,
          fragmentShader
        })
      );

      // Add mesh to scene
      scene.add(planeMesh);

      // Render
      renderer = new THREE.WebGLRenderer({ 
        alpha: false,
        antialias: false,
        powerPreference: "high-performance"
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      rendererRef.current = renderer;

      // Add canvas to container
      containerRef.current.appendChild(renderer.domElement);
      
      // Asegurar que el canvas reciba eventos de mouse
      renderer.domElement.style.pointerEvents = 'auto';

      // Start animation
      animate();
    }

    function animate() {
      animationIdRef.current = requestAnimationFrame(animate);

      // Suavizar el movimiento del mouse
      mousePosition.current.x += (targetMousePosition.current.x - mousePosition.current.x) * easeFactor.current;
      mousePosition.current.y += (targetMousePosition.current.y - mousePosition.current.y) * easeFactor.current;

      // Reducir la aberración cromática gradualmente
      aberrationIntensity.current = Math.max(0.0, aberrationIntensity.current - 0.05);

      // Actualizar uniforms
      if (planeMesh && planeMesh.material) {
        planeMesh.material.uniforms.u_mouse.value.set(
          mousePosition.current.x,
          mousePosition.current.y
        );

        planeMesh.material.uniforms.u_prevMouse.value.set(
          prevMousePosition.current.x,
          prevMousePosition.current.y
        );

        planeMesh.material.uniforms.u_aberrationIntensity.value = aberrationIntensity.current;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    }

    // Event listeners
    const handleMouseMove = (event) => {
      const canvas = renderer?.domElement;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      
      // Guardar posición anterior
      prevMousePosition.current.x = targetMousePosition.current.x;
      prevMousePosition.current.y = targetMousePosition.current.y;
      
      // Actualizar posición objetivo
      targetMousePosition.current.x = (event.clientX - rect.left) / rect.width;
      targetMousePosition.current.y = 1.0 - (event.clientY - rect.top) / rect.height;
      
      // Aumentar velocidad de seguimiento
      easeFactor.current = 0.08;
      
      // Activar aberración cromática
      aberrationIntensity.current = 1.0;
    };

    const handleMouseEnter = (event) => {
      const canvas = renderer?.domElement;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      
      easeFactor.current = 0.08;
      
      // Posicionar el mouse donde entra
      mousePosition.current.x = targetMousePosition.current.x = (event.clientX - rect.left) / rect.width;
      mousePosition.current.y = targetMousePosition.current.y = 1.0 - (event.clientY - rect.top) / rect.height;
    };

    const handleMouseLeave = () => {
      easeFactor.current = 0.02;
      // Regresar al centro cuando el mouse sale
      targetMousePosition.current = { x: 0.5, y: 0.5 };
    };

    // Intentar reproducir el video
    const playVideo = () => {
      video.play().then(() => {
        initializeScene();
        // Agregar event listeners después de crear la escena
        addEventListeners();
      }).catch(e => {
        console.log("Autoplay prevented:", e);
        // Intentar de nuevo con interacción del usuario
        const playOnInteraction = () => {
          video.play().then(() => {
            if (!scene) {
              initializeScene();
              addEventListeners();
            }
          });
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

    // Agregar event listeners al canvas cuando esté listo
    const addEventListeners = () => {
      const canvas = renderer.domElement;
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseenter', handleMouseEnter);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    };

    // Handle window resize
    const handleResize = () => {
      if (renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      // Cleanup
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (renderer && renderer.domElement) {
        const canvas = renderer.domElement;
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseenter', handleMouseEnter);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
        if (videoRef.current.parentNode) {
          videoRef.current.parentNode.removeChild(videoRef.current);
        }
      }
      
      if (rendererRef.current && containerRef.current) {
        if (containerRef.current.contains(rendererRef.current.domElement)) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }
      
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (object.material.map) object.material.map.dispose();
            object.material.dispose();
          }
        });
      }
      
      if (videoTexture) {
        videoTexture.dispose();
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
        overflow: 'hidden',
      }}
      title="Video background con efecto de distorsión"
    />
  );
});

export default VideoBackground;