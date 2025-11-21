// components/Background/NoiseGradientBackgroundV2.jsx
import React, { useRef, useEffect } from "react";
import * as THREE from 'three';

const NoiseGradientBackgroundV2 = () => {
  const containerRef = useRef(null);
  const animationIdRef = useRef(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const targetDistortion = useRef(1.0);
  const currentDistortion = useRef(1.0);
  const mouseActive = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
      uniform float uDistortion;
      uniform vec2 uMouse;
      uniform bool uMouseActive;
      varying vec2 vUv;

      #define speed 0.3
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

      // MOVIMIENTO EXPANSIVO QUE CUBRE TODA LA PANTALLA
      vec3 generateBackground(vec2 uv, float time) {
        vec2 p = uv;
        
        // MOVIMIENTO PRINCIPAL: ONDAS GRANDES QUE CUBREN TODA LA PANTALLA
        float bigWaveX = sin(p.x * 1.5 + time * 0.8) * cos(p.y * 1.2 - time * 0.6) * 0.8;
        float bigWaveY = cos(p.x * 1.2 - time * 0.7) * sin(p.y * 1.5 + time * 0.9) * 0.8;
        
        // ONDAS SECUNDARIAS MÁS GRANDES
        float largeWave1 = sin(length(p) * 2.0 - time * 1.2) * 0.6;
        float largeWave2 = cos(length(p) * 1.8 + time * 0.9) * 0.4;
        
        // MOVIMIENTO ROTATORIO GRANDE
        float globalRotation = time * 0.2;
        p = mat2(cos(globalRotation), -sin(globalRotation), 
                sin(globalRotation), cos(globalRotation)) * p;
        
        // MOVIMIENTO DE EXPANSIÓN/CONTRACCIÓN
        float expansion = sin(time * 0.5) * 0.3 + 1.0;
        p *= expansion;
        
        // COMBINAR TODOS LOS MOVIMIENTOS
        p.x += bigWaveX * 1.2 + largeWave1 * p.x * 0.7 + bigWaveY * 0.5;
        p.y += bigWaveY * 1.2 + largeWave1 * p.y * 0.7 + bigWaveX * 0.5;
        
        // AÑADIR MOVIMIENTO DE DERIVA SUAVE
        p.x += sin(time * 0.3) * 0.4;
        p.y += cos(time * 0.4) * 0.3;
        
        // PATRONES DE ESCALA MÁS GRANDE
        float pattern1 = sin(p.x * 2.0 + p.y * 1.5 + time * 0.5) * 0.4;
        float pattern2 = cos(p.x * 1.8 - p.y * 2.2 + time * 0.7) * 0.3;
        
        p.x += pattern1 + pattern2 * 0.5;
        p.y += pattern2 + pattern1 * 0.5;
        
        // GENERACIÓN DE COLOR DEL SEGUNDO CÓDIGO
        float redValue = 0.5 * sin(p.x) + 0.5;
        float greenValue = 0.5 * sin(p.x + p.y) + 0.5;
        float blueValue = 0.5 * sin(p.y) + 0.8;
        
        float finalRed = (redValue + greenValue + blueValue) / 3.0;
        finalRed = pow(finalRed, 1.5);
        finalRed *= 0.7;

        vec3 brandRed = vec3(0.925, 0.137, 0.235);
        vec3 brandBlack = vec3(0.0, 0.0, 0.0);
        
        vec3 col = mix(brandBlack, brandRed, finalRed);
        
        return col;
      }

      void main() {
        // Coordenadas que cubren toda la pantalla
        vec2 originalUV = (vUv * iResolution.xy - iResolution.xy * 0.5) / iResolution.y;
        originalUV.x = -originalUV.x;
        
        float t = iTime * speed;
        vec2 uv = originalUV * scale;
        
        vec3 backgroundColor = generateBackground(uv, t);
        
        // EFECTO CORREGIDO: HALAR EL ROJO HACIA AFUERA SIN CREAR VACÍOS NEGROS
        if (uMouseActive) {
          vec2 screenUV = gl_FragCoord.xy / iResolution.xy;
          vec2 mouseDirection = screenUV - uMouse;
          float mouseDistance = length(mouseDirection);
          
          // Solo aplicar el efecto cerca del cursor
          if (mouseDistance < 0.4) {
            // Calcular la fuerza del efecto basada en la distancia
            float distanceFactor = 1.0 - smoothstep(0.0, 0.4, mouseDistance);
            float pullStrength = uDistortion * distanceFactor * 0.8;
            
            // Dirección del "halar" (desde el cursor hacia afuera)
            vec2 pullDirection = normalize(mouseDirection);
            
            // Aplicar deformación SUAVE - halar la textura hacia afuera
            vec2 pulledUV = uv + pullDirection * pullStrength * 0.3;
            
            // Generar color con las UV haladas
            vec3 pulledColor = generateBackground(pulledUV, t);
            
            // En lugar de mezclar, usar el color halado directamente en áreas afectadas
            // pero mantener la intensidad del rojo
            float effectIntensity = distanceFactor * pullStrength;
            
            // Preservar el rojo: si el área halada es más roja, úsala
            if (length(pulledColor) > length(backgroundColor)) {
              backgroundColor = mix(backgroundColor, pulledColor, effectIntensity * 0.6);
            } else {
              // Si no, aplicar un efecto de "concentración" de rojo
              vec3 enhancedRed = mix(backgroundColor, vec3(0.925, 0.137, 0.235), effectIntensity * 0.3);
              backgroundColor = mix(backgroundColor, enhancedRed, effectIntensity * 0.4);
            }
            
            // Efecto adicional: crear un patrón de ondas que refuerce el rojo
            if (mouseDistance < 0.2) {
              float wavePattern = sin(mouseDistance * 25.0 - t * 6.0) * pullStrength * 0.5;
              vec2 waveUV = uv + pullDirection * wavePattern * 0.1;
              vec3 waveColor = generateBackground(waveUV, t);
              
              // Asegurar que las ondas mantengan/intensifiquen el rojo
              if (length(waveColor) > 0.2) {
                backgroundColor = mix(backgroundColor, waveColor, wavePattern * 0.3);
              }
            }
          }
        }

        gl_FragColor = vec4(backgroundColor, 1.0);
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
        uDistortion: { value: 1.0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uMouseActive: { value: false }
      }
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let startTime = Date.now();

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      const currentTime = (Date.now() - startTime) / 1000;
      material.uniforms.iTime.value = currentTime;
      
      // Suavizar la transición de la distorsión
      currentDistortion.current += (targetDistortion.current - currentDistortion.current) * 0.1;
      material.uniforms.uDistortion.value = currentDistortion.current;
      
      material.uniforms.uMouse.value.set(mousePos.current.x, mousePos.current.y);
      material.uniforms.uMouseActive.value = mouseActive.current;
      
      renderer.render(scene, camera);
    };

    animate();

    const handleMouseMove = (event) => {
      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current.x = (event.clientX - rect.left) / rect.width;
      mousePos.current.y = 1.0 - ((event.clientY - rect.top) / rect.height);
      targetDistortion.current = 1.5; // Reducido para efecto más sutil
      mouseActive.current = true;
    };

    const handleMouseLeave = () => {
      targetDistortion.current = 1.0;
      mouseActive.current = false;
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      material.uniforms.iResolution.value.set(width, height);
    };

    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', debouncedResize);
      
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      
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
        overflow: 'hidden'
      }}
    />
  );
};

export default NoiseGradientBackgroundV2;