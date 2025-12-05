import React, { useRef, useEffect } from "react";
import * as THREE from 'three';

const RedDistortionBackground = () => {
  const containerRef = useRef(null);
  const animationIdRef = useRef(null);
  
  // Referencias para el mouse con suavizado
  const mousePosition = useRef({ x: 0.5, y: 0.5 });
  const targetMousePosition = useRef({ x: 0.5, y: 0.5 });
  const prevMousePosition = useRef({ x: 0.5, y: 0.5 });
  const easeFactor = useRef(0.08);
  const mouseTrail = useRef([]);
  const lastMouseTime = useRef(Date.now());

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
      alpha: false,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 1);
    
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
      uniform float u_mouseSpeed;
      uniform vec2 u_mouseTrail[10];
      uniform float u_trailIntensity[10];
      varying vec2 vUv;

      float hash(vec2 p)
      {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p)
      {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p)
      {
          float value = 0.0;
          float amplitude = 0.5;
          
          for(int i = 0; i < 4; i++)
          {
              value += amplitude * noise(p);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      // Función para generar grano/ruido granular
      float grain(vec2 uv, float time) {
          float grainNoise = 0.0;
          grainNoise += noise(uv * 500.0 + time * 10.0) * 0.1;
          grainNoise += noise(uv * 200.0 + time * 5.0) * 0.05;
          grainNoise += noise(uv * 50.0 + time * 2.0) * 0.02;
          return grainNoise * 0.15;
      }

      vec3 generateBackground(vec2 uv, float time) {
          vec2 drift1 = vec2(time * 0.5, 0.0);
          vec2 drift2 = vec2(-time * 0.3, 0.0);
          vec2 drift3 = vec2(time * 0.7, 0.0);
          
          // COLORES DE LA MARCA
          vec3 black = vec3(0.0, 0.0, 0.0);
          vec3 redPrimary = vec3(0.925, 0.137, 0.235);
          vec3 redDark = vec3(0.839, 0.016, 0.161);
          vec3 redDarker = vec3(0.604, 0.039, 0.0);
          
          float y = uv.y;
          vec3 color;
          
          color = mix(black, redDarker, smoothstep(0.0, 0.3, y));
          color = mix(color, redDark, smoothstep(0.3, 0.5, y));
          color = mix(color, redPrimary, smoothstep(0.5, 0.7, y));
          color = mix(color, redPrimary * 1.1, smoothstep(0.7, 0.9, y));
          
          float layer1 = fbm((uv + drift1) * vec2(3.0, 2.0));
          layer1 = (layer1 - 0.5) * 0.25;
          
          float layer2 = fbm((uv + drift2) * vec2(2.5, 1.5));
          layer2 = (layer2 - 0.5) * 0.2;
          
          float layer3 = fbm((uv + drift3) * vec2(4.0, 3.0));
          layer3 = (layer3 - 0.5) * 0.15;
          
          float verticalDrift = fbm(vec2(uv.x * 2.0, uv.y * 2.0 + time * 0.2));
          verticalDrift = (verticalDrift - 0.5) * 0.1;
          
          color += vec3(layer1 + layer2 + layer3 + verticalDrift) * 0.8;
          color = clamp(color, 0.0, 1.0);
          
          float vignette = 1.0 - length(uv - 0.5) * 0.2;
          color *= vignette;
          
          return color;
      }

      void main() {
        float t = iTime * 0.1;
        vec2 uv = vUv;
        
        // FONDO BASE (siempre visible)
        vec3 baseColor = generateBackground(uv, t);
        vec3 finalColor = baseColor;
        
        // Solo procesar efectos de mouse si hay velocidad significativa
        if (u_mouseSpeed > 0.0) {
          // GRID para efectos de distorsión
          float gridSize = 15.0;
          vec2 squareUV = vUv * vec2(iResolution.x / iResolution.y, 1.0) * gridSize;
          vec2 gridUV = floor(squareUV) / gridSize;
          vec2 centerOfPixel = gridUV + vec2(0.5/gridSize);
          
          vec2 normalizedCenter = centerOfPixel * vec2(iResolution.y / iResolution.x, 1.0);
          
          // Calcular distancia al mouse actual
          float pixelDistanceToMouse = length(normalizedCenter - u_mouse);
          
          // EFECTO DE DISTORSIÓN (grid/gris) - activo con cualquier movimiento
          vec2 mouseDirection = u_mouse - u_prevMouse;
          float mouseSpeed = length(mouseDirection);
          mouseDirection = normalize(mouseDirection) * min(mouseSpeed * 10.0, 1.0);
          
          float strength = 1.0 - smoothstep(0.0, 0.4, pixelDistanceToMouse);
          strength = pow(strength, 0.5);
          
          if (strength > 0.01) {
            vec2 uvOffset = strength * -mouseDirection * 0.8;
            vec2 distortedUV = uv + uvOffset;
            
            vec3 colorR = generateBackground(distortedUV + vec2(strength * 0.02, 0.0), t);
            vec3 colorG = generateBackground(distortedUV, t);
            vec3 colorB = generateBackground(distortedUV - vec2(strength * 0.02, 0.0), t);
            
            vec3 chromaticDistorted = vec3(colorR.r, colorG.g, colorB.b);
            
            float cellHash = hash(gridUV * 10.0);
            float showDistortion = 0.0;
            
            if (cellHash > 0.6 && strength > 0.1) {
              showDistortion = strength * 0.8;
            }
            
            float totalDistortionEffect = max(showDistortion, strength * 0.5);
            finalColor = mix(baseColor, chromaticDistorted, totalDistortionEffect);
            
            float pixelation = mod(gridUV.x * 100.0 + gridUV.y * 100.0, 2.0);
            if (pixelation < 1.0 && strength > 0.2) {
              finalColor = mix(finalColor, chromaticDistorted, strength * 0.9);
            }
          }
          
          // EFECTO BLANCO SOLO CON MOVIMIENTO MUY RÁPIDO - EN LA MISMA UBICACIÓN DEL MOUSE
          if (u_mouseSpeed > 2.0) { // Umbral MUY alto para movimiento rápido
            // Distancia muy cercana al mouse actual (solo donde está el cursor)
            float whiteDistance = smoothstep(0.0, 0.06, pixelDistanceToMouse);
            float whiteStrength = (1.0 - whiteDistance) * clamp((u_mouseSpeed - 2.0) / 3.0, 0.0, 1.0);
            
            if (whiteStrength > 0.0) {
              // Blanco difuminado y suave
              vec3 softWhite = vec3(0.95, 0.95, 0.96);
              
              // Aplicar con curva suave
              whiteStrength = pow(whiteStrength, 0.7);
              
              // Mezclar con el color actual
              finalColor = mix(finalColor, softWhite, whiteStrength * 0.6);
            }
          }
        }
        
        // APLICAR EFECTO DE GRANO
        float luminance = dot(finalColor, vec3(0.299, 0.587, 0.114));
        float grainIntensity = mix(0.03, 0.01, luminance);
        
        vec2 grainUV = uv * iResolution.xy / 500.0;
        float grainValue = noise(vec2(
          grainUV.x + sin(t * 0.5) * 0.1,
          grainUV.y + cos(t * 0.3) * 0.1
        ));
        
        grainValue = (grainValue - 0.5) * grainIntensity;
        finalColor += grainValue;
        
        finalColor = clamp(finalColor, 0.0, 1.0);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: false,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_prevMouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_mouseSpeed: { value: 0 },
        u_mouseTrail: { value: Array(10).fill().map(() => new THREE.Vector2(0.5, 0.5)) },
        u_trailIntensity: { value: Array(10).fill(0) }
      }
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let startTime = Date.now();

    // Función para manejar el movimiento del mouse
    const handleMouseMove = (event) => {
      const currentTime = Date.now();
      
      const deltaTime = Math.max((currentTime - lastMouseTime.current) / 1000, 0.016);
      lastMouseTime.current = currentTime;
      
      const newX = event.clientX / window.innerWidth;
      const newY = 1.0 - (event.clientY / window.innerHeight);
      
      const deltaX = newX - targetMousePosition.current.x;
      const deltaY = newY - targetMousePosition.current.y;
      const currentSpeed = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime;
      
      // Guardar posición anterior
      prevMousePosition.current.x = targetMousePosition.current.x;
      prevMousePosition.current.y = targetMousePosition.current.y;
      
      // Actualizar posición objetivo
      targetMousePosition.current.x = newX;
      targetMousePosition.current.y = newY;
      
      // NO guardar estela para el efecto blanco (solo queremos el mouse actual)
      // Solo guardamos para posibles otros efectos
      if (currentSpeed > 0.5) {
        mouseTrail.current.unshift({
          x: targetMousePosition.current.x,
          y: targetMousePosition.current.y,
          intensity: Math.min(currentSpeed * 0.3, 1.0),
          time: currentTime
        });
        
        if (mouseTrail.current.length > 10) {
          mouseTrail.current = mouseTrail.current.slice(0, 10);
        }
      }
    };

    // Agregar event listeners
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      const currentTime = (Date.now() - startTime) / 1000;
      
      // Suavizar el movimiento del mouse
      mousePosition.current.x += (targetMousePosition.current.x - mousePosition.current.x) * easeFactor.current;
      mousePosition.current.y += (targetMousePosition.current.y - mousePosition.current.y) * easeFactor.current;
      
      // Calcular velocidad actual para el shader
      const currentSpeed = Math.sqrt(
        Math.pow(targetMousePosition.current.x - prevMousePosition.current.x, 2) +
        Math.pow(targetMousePosition.current.y - prevMousePosition.current.y, 2)
      ) * 100;
      
      // Actualizar uniforms
      material.uniforms.iTime.value = currentTime;
      material.uniforms.u_mouse.value.set(mousePosition.current.x, mousePosition.current.y);
      material.uniforms.u_prevMouse.value.set(prevMousePosition.current.x, prevMousePosition.current.y);
      material.uniforms.u_mouseSpeed.value = currentSpeed;
      
      // Actualizar la estela (aunque no se use para el blanco)
      mouseTrail.current.forEach((point, index) => {
        if (point) {
          material.uniforms.u_mouseTrail.value[index].set(point.x, point.y);
          const age = (Date.now() - point.time) / 150;
          material.uniforms.u_trailIntensity.value[index] = Math.max(0, point.intensity - age);
        }
      });
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      material.uniforms.iResolution.value.set(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
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

export default RedDistortionBackground;