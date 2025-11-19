// components/Background/NoiseGradientBackgroundV2.jsx
import React, { useRef, useEffect } from "react";
import * as THREE from 'three';

const NoiseGradientBackgroundV2 = () => {
  const containerRef = useRef(null);
  const animationIdRef = useRef(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const targetDistortion = useRef(0);
  const currentDistortion = useRef(0);

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
      varying vec2 vUv;

      #define layers 5
      #define speed 0.35
      #define scale 1.2

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

      float hash21(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void main() {
        // Coordenadas invertidas (MISMO que el original)
        vec2 uv = (vUv * iResolution.xy - iResolution.xy * 0.5) / iResolution.y;
        uv.x = -uv.x;
        
        float t = iTime * speed;
        uv *= scale;
        
        // Calcular distancia al mouse (en coordenadas de pantalla)
        vec2 screenUV = gl_FragCoord.xy / iResolution.xy;
        float mouseDist = distance(screenUV, uMouse);
        
        // Intensidad de distorsión basada en la distancia al mouse
        float distortionIntensity = uDistortion * (1.0 - smoothstep(0.0, 0.2, mouseDist));
        
        // EFECTOS DE DISTORSIÓN SUTILES - sin pixelación fuerte
        vec2 distortedUV = uv;
        
        if (distortionIntensity > 0.01) {
          // Distorsión de onda suave en lugar de pixelación
          float waveDistort = distortionIntensity * 0.3;
          distortedUV.x += sin(uv.y * 8.0 + t * 6.0) * waveDistort * 0.1;
          distortedUV.y += cos(uv.x * 6.0 + t * 4.0) * waveDistort * 0.1;
          
          // Micro-distorsión aleatoria (muy sutil)
          float microDistort = hash21(uv * 20.0 + t * 10.0) * distortionIntensity * 0.05;
          distortedUV += microDistort * 0.02;
          
          uv = distortedUV;
        }
        
        // NUEVO SISTEMA DE MOVIMIENTO - Preservando la textura pero con diferente animación
        float h = noise(vec3(uv * 2.0, t * 0.5));
        
        // DISTORSIÓN UV ALTERNATIVA - Misma estructura, diferentes parámetros
        for (int n = 1; n < layers; n++) {
          float i = float(n);
          // Movimiento de onda circular en lugar de lineal
          float waveX = 0.6 / i * cos(i * uv.y + i * 2.0 + t * 3.0 + h * i * 1.5) + 0.9;
          float waveY = 0.5 / i * sin(uv.x * 1.5 + 2.0 - i * 0.8 + h * 2.0 + t * 4.0 + 0.5 * i) + 1.4;
          uv -= vec2(waveX, waveY);
        }

        // Distorsión final con patrones circulares
        float circularDistort = sin(length(uv) * 3.0 - t * 2.0) * 0.3;
        uv -= vec2(
          1.0 * sin(uv.x * 1.2 + t * 1.5 + h) + 1.5 + circularDistort, 
          0.6 * cos(uv.y * 1.4 + t * 1.8 + 0.5 * h) + 1.3 + circularDistort
        );

        // GENERACIÓN DE COLOR - EXACTAMENTE IGUAL AL ORIGINAL
        float redValue = 0.5 * sin(uv.x) + 0.5;
        float greenValue = 0.5 * sin(uv.x + uv.y) + 0.5;
        float blueValue = 0.5 * sin(uv.y) + 0.8;
        
        // Combinamos todos los canales en el rojo
        float finalRed = (redValue + greenValue + blueValue) / 3.0;
        
        // AJUSTE PARA NEGRO MÁS INTENSO (EXACTO):
        finalRed = pow(finalRed, 1.5);
        finalRed *= 0.7;

        // COLORES EXACTOS DE LA MARCA:
        vec3 brandRed = vec3(0.925, 0.137, 0.235);
        vec3 brandBlack = vec3(0.0, 0.0, 0.0);
        
        // Mezclar entre negro y rojo de marca
        vec3 col = mix(brandBlack, brandRed, finalRed);
        
        // EFECTOS DE COLOR DURANTE LA DISTORSIÓN (más sutiles)
        if (distortionIntensity > 0.01) {
          // Shift RGB muy sutil
          float rgbShift = distortionIntensity * 0.015;
          vec3 shiftedCol = vec3(
            mix(brandBlack, brandRed, finalRed + rgbShift * hash21(uv * 5.0 + t * 3.0)).r,
            mix(brandBlack, brandRed, finalRed + rgbShift * hash21(uv * 6.0 + t * 4.0) * 0.7).g,
            mix(brandBlack, brandRed, finalRed + rgbShift * hash21(uv * 7.0 + t * 5.0) * 0.5).b
          );
          
          // Ruido digital sutil
          float digitalNoise = hash21(uv * 50.0 + t * 15.0) * distortionIntensity * 0.2;
          shiftedCol += digitalNoise * 0.1;
          
          // Mezcla suave con el color original
          col = mix(col, shiftedCol, distortionIntensity * 0.6);
          
          // Efecto de "vibración" sutil
          float vibrate = sin(t * 20.0) * distortionIntensity * 0.02;
          col += vec3(vibrate * 0.1);
        }

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uDistortion: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) }
      }
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let startTime = Date.now();

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      const currentTime = (Date.now() - startTime) / 1000;
      material.uniforms.iTime.value = currentTime;
      
      // Suavizar transición de distorsión
      currentDistortion.current += (targetDistortion.current - currentDistortion.current) * 0.15;
      material.uniforms.uDistortion.value = currentDistortion.current;
      
      // Actualizar posición del mouse
      material.uniforms.uMouse.value.set(mousePos.current.x, mousePos.current.y);
      
      renderer.render(scene, camera);
    };

    animate();

    const handleMouseMove = (event) => {
      // Normalizar coordenadas del mouse
      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current.x = (event.clientX - rect.left) / rect.width;
      mousePos.current.y = 1.0 - ((event.clientY - rect.top) / rect.height);
      targetDistortion.current = 1.0;
    };

    const handleMouseLeave = () => {
      targetDistortion.current = 0.0;
    };

    // Agregar event listeners al contenedor
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