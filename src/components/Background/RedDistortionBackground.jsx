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
      varying vec2 vUv;

      #define speed 0.4
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

      // MOVIMIENTO MULTI-CAPA CON GENERACIÓN CONSTANTE
      vec2 movementMultiLayer(vec2 p, float time) {
        // CAPA 1: Movimiento base original
        vec2 baseLayer = p;
        float bigWaveX = sin(baseLayer.x * 1.6 + time * 0.85) * cos(baseLayer.y * 1.3 - time * 0.65) * 0.75;
        float bigWaveY = cos(baseLayer.x * 1.3 - time * 0.75) * sin(baseLayer.y * 1.6 + time * 0.95) * 0.75;
        
        baseLayer.x += bigWaveX * 1.1 + bigWaveY * 0.45;
        baseLayer.y += bigWaveY * 1.1 + bigWaveX * 0.45;
        
        // CAPA 2: Generador de nuevas texturas - se mueve independientemente
        vec2 newTexLayer = p;
        float layer2Time = time * 1.3;
        float moveX2 = sin(layer2Time * 0.7) * 1.8;
        float moveY2 = cos(layer2Time * 0.5) * 1.5;
        newTexLayer.x += moveX2;
        newTexLayer.y += moveY2;
        
        float newWaveX = sin(newTexLayer.x * 1.8 + layer2Time * 1.1) * cos(newTexLayer.y * 1.5 - layer2Time * 0.9) * 0.6;
        float newWaveY = cos(newTexLayer.x * 1.5 - layer2Time * 0.8) * sin(newTexLayer.y * 1.8 + layer2Time * 1.2) * 0.6;
        
        // CAPA 3: Otro generador con diferente velocidad y posición
        vec2 layer3 = p;
        float layer3Time = time * 0.8;
        float moveX3 = cos(layer3Time * 0.9) * 2.2;
        float moveY3 = sin(layer3Time * 0.6) * 1.8;
        layer3.x += moveX3;
        layer3.y += moveY3;
        
        float wave3X = sin(layer3.x * 2.2 + layer3Time * 0.6) * cos(layer3.y * 1.9 - layer3Time * 1.1) * 0.5;
        float wave3Y = cos(layer3.x * 1.7 - layer3Time * 1.0) * sin(layer3.y * 2.1 + layer3Time * 0.7) * 0.5;
        
        // CAPA 4: Pulsos que aparecen y desaparecen en diferentes lugares
        float pulseTime = time * 2.0;
        float pulse1 = sin(pulseTime * 1.5) * 0.5 + 0.5;
        float pulse2 = cos(pulseTime * 1.2) * 0.5 + 0.5;
        
        vec2 pulseLayer1 = p;
        pulseLayer1.x += sin(time * 0.4) * 2.5;
        pulseLayer1.y += cos(time * 0.3) * 2.0;
        float pulseWave1 = sin(pulseLayer1.x * 2.5) * cos(pulseLayer1.y * 2.2) * pulse1 * 0.4;
        
        vec2 pulseLayer2 = p;
        pulseLayer2.x += cos(time * 0.5) * 2.8;
        pulseLayer2.y += sin(time * 0.6) * 2.3;
        float pulseWave2 = cos(pulseLayer2.x * 2.3) * sin(pulseLayer2.y * 2.6) * pulse2 * 0.3;
        
        // COMBINAR TODAS LAS CAPAS
        p.x = baseLayer.x + newWaveX * 0.7 + wave3X * 0.5 + pulseWave1 + pulseWave2;
        p.y = baseLayer.y + newWaveY * 0.7 + wave3Y * 0.5 + pulseWave1 + pulseWave2;
        
        // Movimientos globales adicionales
        p.x += sin(time * 0.35) * 0.3;
        p.y += cos(time * 0.45) * 0.25;
        
        // Patrones que aparecen constantemente
        float pattern1 = sin(p.x * 2.2 + p.y * 1.6 + time * 1.2) * 0.25;
        float pattern2 = cos(p.x * 1.9 - p.y * 2.3 + time * 1.5) * 0.2;
        
        p.x += pattern1 + pattern2 * 0.3;
        p.y += pattern2 + pattern1 * 0.3;
        
        return p;
      }

      vec3 generateBackground(vec2 uv, float time) {
        vec2 p = movementMultiLayer(uv, time);
        
        // GENERACIÓN DE COLOR ORIGINAL EXACTA (MISMA TEXTURA VISUAL)
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
        vec3 baseColor = generateBackground(uv, t);
        
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
          
          vec3 colorR = generateBackground(distortedUV + vec2(strength * 0.02, 0.0), t);
          vec3 colorG = generateBackground(distortedUV, t);
          vec3 colorB = generateBackground(distortedUV - vec2(strength * 0.02, 0.0), t);
          
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
        u_prevMouse: { value: new THREE.Vector2(0.5, 0.5) }
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
      renderer.render(scene, camera);
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
      title="Fondo rojo con generación constante de texturas"
    />
  );
};

export default RedDistortionBackground;