// src/hooks/useBackgroundColor.js
import { useState, useEffect, useRef } from 'react';

const useBackgroundColor = () => {
  const [useBlackLogo, setUseBlackLogo] = useState(false); // Por defecto usar logo blanco
  const checkIntervalRef = useRef(null);
  const lastCheckRef = useRef(0);

  const checkBackgroundAtPosition = (x, y) => {
    try {
      const elements = document.elementsFromPoint(x, y);
      
      for (let element of elements) {
        // Ignorar el header y elementos de menú
        if (element.tagName.toLowerCase() === 'header' || 
            element.classList.contains('header') ||
            element.id === 'menu-container' ||
            element.classList.contains('menu-container')) {
          continue;
        }
        
        // DETECCIÓN DE VIDEO Y CANVAS (FONDOS ANIMADOS)
        // Siempre usar logo BLANCO sobre videos y canvas
        if (element.tagName.toLowerCase() === 'video' ||
            element.tagName.toLowerCase() === 'canvas') {
          return false; // false = logo BLANCO
        }
        
        // Verificar por clases de Three.js
        if (element.classList.contains('threejs-background') ||
            element.classList.contains('threejs-red-distortion') ||
            element.classList.contains('threejs-canvas')) {
          return false; // logo BLANCO
        }
        
        const style = window.getComputedStyle(element);
        const bgColor = style.backgroundColor;
        const opacity = parseFloat(style.opacity);
        const display = style.display;
        const visibility = style.visibility;
        
        // Si el elemento es visible
        if (opacity > 0 && display !== 'none' && visibility !== 'hidden') {
          if (bgColor && bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)') {
            const rgb = bgColor.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
              const [r, g, b] = rgb.map(Number);
              
              // Calcular luminancia
              const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
              
              // SOLO usar logo NEGRO si el fondo es MUY claro (casi blanco)
              // Umbrales más estrictos para evitar logo negro sobre fondos rojos
              const isVeryLight = luminance > 0.85 && r > 230 && g > 230 && b > 230;
              
              if (isVeryLight) {
                return true; // logo NEGRO solo en fondos muy claros
              }
              
              // Para TODOS los demás colores (rojo, oscuro, etc.), usar logo BLANCO
              return false;
            }
          }
        }
      }
      
      // Por defecto: logo BLANCO
      return false;
      
    } catch (error) {
      console.error('Error checking background:', error);
      return false; // En caso de error, usar logo blanco
    }
  };

  useEffect(() => {
    const checkBackground = () => {
      if (document.readyState !== 'complete') return;
      
      const now = Date.now();
      // Evitar checks demasiado frecuentes
      if (now - lastCheckRef.current < 200) return;
      lastCheckRef.current = now;
      
      // Verificar en la posición del logo
      const shouldUseBlack = checkBackgroundAtPosition(100, 30);
      
      setUseBlackLogo(prev => {
        if (prev !== shouldUseBlack) {
          return shouldUseBlack;
        }
        return prev;
      });
    };

    // Verificar inmediatamente con delay para que el video/Three.js se cargue
    setTimeout(checkBackground, 500);
    
    // Verificar periódicamente
    checkIntervalRef.current = setInterval(checkBackground, 1000);
    
    // Verificar en eventos importantes
    const events = ['scroll', 'resize', 'load', 'DOMContentLoaded'];
    events.forEach(event => {
      window.addEventListener(event, checkBackground);
    });

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, checkBackground);
      });
    };
  }, []);

  return { useBlackLogo };
};

export default useBackgroundColor;