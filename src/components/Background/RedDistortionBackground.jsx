import React, { useRef, useEffect } from "react";
import * as THREE from 'three';

const RedDistortionBackground = () => {
  const containerRef = useRef(null);
  const animationIdRef = useRef(null);
  
  // Referencias para el mouse con suavizado
  const mousePosition = useRef({ x: 0.5, y: 0.5 });
  const targetMousePosition = useRef({ x: 0.5, y: 0.5 });
  const prevMousePosition = useRef({ x: 0.5, y: 0.5 });
  const easeFactor = useRef(0.02);

  // Control de tipo de movimiento
  const movementType = useRef(0); // 0: Original, 1: Espiral, 2: Pulso, 3: Caótico, 4: Grid

  useEffect(() => {
    if (!containerRef.current) return;

    // Limpiar contenedor
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: false,
      alpha: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    
    containerRef.current.appendChild(renderer.domElement);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec2 u_mouse;
      uniform vec2 u_prevMouse;
      uniform int u_movementType;
      varying vec2 vUv;

      #define speed 0.35
      #define scale 2.0

      vec3 hash(vec3 p) {
        p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
                 dot(p, vec3(269.5, 183.3, 246.1)),
                 dot(p, vec3(113.5, 271.9, 124.6)));
        p = -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
        return p;
      }

      float noise(in vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        vec3 u = f * f * (3.0 - 2.0 * f);
        
        return mix(
          mix(
            mix(dot(hash(i + vec3(0.0, 0.0, 0.0)), f - vec3(0.0, 0.0, 0.0)), 
                dot(hash(i + vec3(1.0, 0.0, 0.0)), f - vec3(1.0, 0.0, 0.0)), u.x),
            mix(dot(hash(i + vec3(0.0, 1.0, 0.0)), f - vec3(0.0, 1.0, 0.0)), 
                dot(hash(i + vec3(1.0, 1.0, 0.0)), f - vec3(1.0, 1.0, 0.0)), u.x), u.y),
          mix(
            mix(dot(hash(i + vec3(0.0, 0.0, 1.0)), f - vec3(0.0, 0.0, 1.0)), 
                dot(hash(i + vec3(1.0, 0.0, 1.0)), f - vec3(1.0, 0.0, 1.0)), u.x),
            mix(dot(hash(i + vec3(0.0, 1.0, 1.0)), f - vec3(0.0, 1.0, 1.0)), 
                dot(hash(i + vec3(1.0, 1.0, 1.0)), f - vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
      }

      // MOVIMIENTO 0: ORIGINAL (TEXTURA BASE)
      vec2 movementOriginal(vec2 p, float time) {
        // MOVIMIENTOS ORIGINALES CON AJUSTES SUTILES
        float bigWaveX = sin(p.x * 1.6 + time * 0.85) * cos(p.y * 1.3 - time * 0.65) * 0.75;
        float bigWaveY = cos(p.x * 1.3 - time * 0.75) * sin(p.y * 1.6 + time * 0.95) * 0.75;
        
        float largeWave1 = sin(length(p) * 2.2 - time * 1.3) * 0.55;
        float largeWave2 = cos(length(p) * 1.9 + time * 1.0) * 0.35;
        
        float globalRotation = time * 0.25;
        p = mat2(cos(globalRotation), -sin(globalRotation), 
                sin(globalRotation), cos(globalRotation)) * p;
        
        float expansion = sin(time * 0.6) * 0.25 + 1.0;
        p *= expansion;
        
        p.x += bigWaveX * 1.1 + largeWave1 * p.x * 0.65 + bigWaveY * 0.45;
        p.y += bigWaveY * 1.1 + largeWave1 * p.y * 0.65 + bigWaveX * 0.45;
        
        p.x += sin(time * 0.35) * 0.35;
        p.y += cos(time * 0.45) * 0.25;
        
        float pattern1 = sin(p.x * 2.2 + p.y * 1.6 + time * 0.55) * 0.35;
        float pattern2 = cos(p.x * 1.9 - p.y * 2.3 + time * 0.75) * 0.25;
        
        p.x += pattern1 + pattern2 * 0.45;
        p.y += pattern2 + pattern1 * 0.45;
        
        return p;
      }

      // MOVIMIENTO 1: ESPIRAL SUAVE
      vec2 movementSpiral(vec2 p, float time) {
        float angle = atan(p.y, p.x);
        float radius = length(p);
        
        // Espiral suave que mantiene la textura
        angle += time * 1.2 + radius * 1.5;
        radius += sin(angle * 2.0 + time * 1.5) * 0.08;
        
        p.x = cos(angle) * radius;
        p.y = sin(angle) * radius;
        
        // Añadir movimiento original sutil
        p.x += sin(time * 0.4) * 0.2;
        p.y += cos(time * 0.3) * 0.15;
        
        return p;
      }

      // MOVIMIENTO 2: PULSO RÍTMICO
      vec2 movementPulse(vec2 p, float time) {
        float dist = length(p);
        
        // Pulsos expansivos
        float pulse1 = sin(time * 1.5) * 0.3;
        float pulse2 = cos(time * 0.9) * 0.2;
        float expansion = 1.0 + (pulse1 + pulse2) * (1.0 - dist * 0.5);
        
        p *= expansion;
        
        // Ondas concéntricas suaves
        float concentric = sin(dist * 8.0 - time * 2.0) * 0.15;
        p += normalize(p) * concentric;
        
        // Movimiento base preservado
        p.x += sin(time * 0.3) * 0.25;
        p.y += cos(time * 0.4) * 0.2;
        
        return p;
      }

      // MOVIMIENTO 3: CAÓTICO CONTROLADO
      vec2 movementChaotic(vec2 p, float time) {
        // Ruido controlado que no cambia la textura base
        float n1 = noise(vec3(p * 1.5, time * 0.6));
        float n2 = noise(vec3(p * 2.5 + 50.0, time * 0.9));
        
        p.x += (n1 - 0.5) * 0.25;
        p.y += (n2 - 0.5) * 0.25;
        
        // Movimiento browniano suave
        p.x += sin(time * 0.5 + p.y * 2.0) * 0.15;
        p.y += cos(time * 0.6 + p.x * 2.0) * 0.15;
        
        return p;
      }

      // MOVIMIENTO 4: GRID DINÁMICO
      vec2 movementGrid(vec2 p, float time) {
        // Grid sutil que no domina la textura
        float gridSize = 4.0 + sin(time * 0.2) * 1.0;
        vec2 gridPos = floor(p * gridSize);
        vec2 gridOffset = fract(p * gridSize) - 0.5;
        
        // Movimiento leve de celdas
        float cellPhase = sin(gridPos.x * 3.0 + gridPos.y * 2.0 + time * 1.0) * 0.1;
        gridOffset += normalize(gridOffset) * cellPhase;
        
        p = gridPos + (gridOffset + 0.5) / gridSize;
        
        return p;
      }

      vec3 generateBackground(vec2 uv, float time, int movementType) {
        vec2 p = uv;
        
        // APLICAR MOVIMIENTO SELECCIONADO
        if (movementType == 0) {
          p = movementOriginal(p, time);
        } else if (movementType == 1) {
          p = movementSpiral(p, time);
        } else if (movementType == 2) {
          p = movementPulse(p, time);
        } else if (movementType == 3) {
          p = movementChaotic(p, time);
        } else if (movementType == 4) {
          p = movementGrid(p, time);
        }
        
        // GENERACIÓN DE COLOR ORIGINAL (MISMA TEXTURA VISUAL)
        float redValue = 0.5 * sin(p.x) + 0.5;
        float greenValue = 0.5 * sin(p.x + p.y) + 0.5;
        float blueValue = 0.5 * sin(p.y) + 0.4;

        float finalRed = (redValue + greenValue + blueValue) / 3.0;
        finalRed = pow(finalRed, 2.5);
        finalRed = finalRed * 0.8 + 0.05;

        vec3 brandRed = vec3(0.925, 0.137, 0.235);
        vec3 brandBlack = vec3(0.0, 0.0, 0.0);
        
        vec3 col = mix(brandBlack, brandRed, finalRed);
        
        return col;
      }

      void main() {
        vec2 originalUV = (vUv * iResolution.xy - iResolution.xy * 0.5) / iResolution.y;
        originalUV.x = -originalUV.x;
        
        float t = iTime * speed;
        vec2 uv = originalUV * scale;
        
        // Generar el fondo base con el movimiento seleccionado
        vec3 baseColor = generateBackground(uv, t, u_movementType);
        
        // EFECTO DE DISTORSIÓN POR MOUSE (igual que antes)
        vec2 gridUV = floor(vUv * vec2(25.0, 25.0)) / vec2(25.0, 25.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/50.0, 1.0/50.0);
        
        vec2 mouseDirection = u_mouse - u_prevMouse;
        float mouseSpeed = length(mouseDirection);
        
        vec3 finalColor = baseColor;
        
        if (mouseSpeed > 0.0001) {
          mouseDirection = normalize(mouseDirection) * min(mouseSpeed * 10.0, 1.0);
          
          vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
          float pixelDistanceToMouse = length(pixelToMouseDirection);
          
          float strength = 1.0 - smoothstep(0.0, 0.4, pixelDistanceToMouse);
          strength = pow(strength, 0.5);
          
          vec2 uvOffset = strength * -mouseDirection * 0.8;
          vec2 distortedUV = uv + uvOffset;
          
          vec3 colorR = generateBackground(distortedUV + vec2(strength * 0.02, 0.0), t, u_movementType);
          vec3 colorG = generateBackground(distortedUV, t, u_movementType);
          vec3 colorB = generateBackground(distortedUV - vec2(strength * 0.02, 0.0), t, u_movementType);
          
          vec3 distortedColor = vec3(colorR.r, colorG.g, colorB.b);
          
          finalColor = mix(baseColor, distortedColor, strength);
        }
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_prevMouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_movementType: { value: 0 }
      }
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let startTime = Date.now();

    // Función para renderizado inicial
    const forceInitialRender = () => {
      material.uniforms.iTime.value = 0.001;
      material.uniforms.u_mouse.value.set(0.5, 0.5);
      material.uniforms.u_prevMouse.value.set(0.5, 0.5);
      material.uniforms.u_movementType.value = movementType.current;
      renderer.render(scene, camera);
    };

    // Función para cambiar el tipo de movimiento con las teclas 1-5
    const handleKeyPress = (event) => {
      if (event.key >= '1' && event.key <= '5') {
        movementType.current = parseInt(event.key) - 1;
        material.uniforms.u_movementType.value = movementType.current;
        console.log('Movimiento cambiado a tipo:', movementType.current + 1);
      }
    };

    // Función para manejar el movimiento del mouse
    const handleMouseMove = (event) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      
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

    // Agregar event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('keydown', handleKeyPress);

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      const currentTime = (Date.now() - startTime) / 1000;
      
      // Suavizar el movimiento del mouse
      mousePosition.current.x += (targetMousePosition.current.x - mousePosition.current.x) * easeFactor.current;
      mousePosition.current.y += (targetMousePosition.current.y - mousePosition.current.y) * easeFactor.current;
      
      // Actualizar uniforms
      material.uniforms.iTime.value = currentTime;
      material.uniforms.u_mouse.value.set(mousePosition.current.x, mousePosition.current.y);
      material.uniforms.u_prevMouse.value.set(prevMousePosition.current.x, prevMousePosition.current.y);
      material.uniforms.u_movementType.value = movementType.current;
      
      renderer.render(scene, camera);
    };

    // Ejecutar renderizado inicial
    forceInitialRender();
    
    // Iniciar animación
    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      material.uniforms.iResolution.value.set(width, height);
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('keydown', handleKeyPress);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
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
        zIndex: 0,
        overflow: 'hidden',
        background: 'transparent',
        cursor: 'none'
      }}
      title="Presiona las teclas 1-5 para cambiar el tipo de movimiento"
    />
  );
};

export default RedDistortionBackground;