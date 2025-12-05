import React, { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import * as THREE from 'three';

const VideoBackground = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);
  
  // Referencias para el mouse con suavizado
  const mousePosition = useRef({ x: 0.5, y: 0.5 });
  const targetMousePosition = useRef({ x: 0.5, y: 0.5 });
  const prevMousePosition = useRef({ x: 0.5, y: 0.5 });
  const easeFactor = useRef(0.02);

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

    // Shaders
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
      uniform vec2 u_resolution;

      void main() {
        vec2 gridUV = floor(vUv * vec2(25.0, 25.0)) / vec2(25.0, 25.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/50.0, 1.0/50.0);
        
        vec2 mouseDirection = u_mouse - u_prevMouse;
        float mouseSpeed = length(mouseDirection);
        
        vec4 baseColor = texture2D(u_texture, vUv);
        
        if (mouseSpeed > 0.0001) {
          mouseDirection = normalize(mouseDirection) * min(mouseSpeed * 10.0, 1.0);
          
          // Ajustar por aspect ratio para que el círculo sea circular
          vec2 aspectRatio = vec2(u_resolution.x / u_resolution.y, 1.0);
          vec2 mouseAdjusted = u_mouse * aspectRatio;
          vec2 pixelAdjusted = centerOfPixel * aspectRatio;
          
          vec2 pixelToMouseDirection = pixelAdjusted - mouseAdjusted;
          float pixelDistanceToMouse = length(pixelToMouseDirection);
          
          float strength = 1.0 - smoothstep(0.0, 0.4, pixelDistanceToMouse);
          strength = pow(strength, 0.5);
          
          vec2 uvOffset = strength * -mouseDirection * 0.8;
          vec2 distortedUV = vUv + uvOffset;
          
          vec4 colorR = texture2D(u_texture, distortedUV + vec2(strength * 0.02, 0.0));
          vec4 colorG = texture2D(u_texture, distortedUV);
          vec4 colorB = texture2D(u_texture, distortedUV - vec2(strength * 0.02, 0.0));
          
          vec4 distortedColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
          
          gl_FragColor = mix(baseColor, distortedColor, strength);
        } else {
          gl_FragColor = baseColor;
        }
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

      // Camera setup - Usar OrthographicCamera para cubrir toda la pantalla
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      // Uniforms
      let shaderUniforms = {
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_prevMouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_texture: { value: videoTexture },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
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

      // Actualizar uniforms
      planeMesh.material.uniforms.u_mouse.value.set(
        mousePosition.current.x,
        mousePosition.current.y
      );

      planeMesh.material.uniforms.u_prevMouse.value.set(
        prevMousePosition.current.x,
        prevMousePosition.current.y
      );

      renderer.render(scene, camera);
    }

    // Event listeners
    const handleMouseMove = (event) => {
      const canvas = renderer?.domElement;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      
      prevMousePosition.current.x = targetMousePosition.current.x;
      prevMousePosition.current.y = targetMousePosition.current.y;
      
      targetMousePosition.current.x = (event.clientX - rect.left) / rect.width;
      targetMousePosition.current.y = 1.0 - (event.clientY - rect.top) / rect.height;
      
      easeFactor.current = 0.08;
    };

    const handleMouseEnter = () => {
      easeFactor.current = 0.08;
    };

    const handleMouseLeave = () => {
      easeFactor.current = 0.02;
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
      if (renderer && planeMesh) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        planeMesh.material.uniforms.u_resolution.value.set(width, height);
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
        backgroundColor: '#000'
      }}
      title="Video background con efecto de distorsión"
    />
  );
});

export default VideoBackground;