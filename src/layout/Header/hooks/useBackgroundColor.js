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
        
        // DETECCIÓN DIRECTA DEL CANVAS DE THREE.JS
        // Verificar por clase
        if (element.classList.contains('threejs-background') ||
            element.classList.contains('threejs-red-distortion') ||
            element.classList.contains('threejs-canvas')) {
          return false; // false = usar logo BLANCO sobre fondo Three.js
        }
        
        // Verificar por tag y z-index
        if (element.tagName.toLowerCase() === 'canvas') {
          const style = window.getComputedStyle(element);
          const zIndex = style.zIndex;
          // Si es un canvas con z-index bajo (probablemente fondo)
          if (zIndex === '0' || zIndex === '-1' || zIndex === '') {
            return false; // Usar logo BLANCO
          }
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
              
              // Detectar si es blanco o muy claro
              const isWhite = r > 240 && g > 240 && b > 240;
              const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
              const isLight = luminance > 0.7;
              
              if (isWhite || isLight) {
                return true; // true = usar logo NEGRO en fondos claros
              }
              
              // Para cualquier otro color (incluido rojo), usar logo blanco
              return false;
            }
          }
        }
      }
      
      // Si llegamos aquí, no encontramos ningún elemento con fondo claro
      return false; // Usar logo BLANCO por defecto
      
    } catch (error) {
      console.error('Error checking background:', error);
      return false; // En caso de error, usar logo blanco (más seguro)
    }
  };

  useEffect(() => {
    const checkBackground = () => {
      if (document.readyState !== 'complete') return;
      
      const now = Date.now();
      // Evitar checks demasiado frecuentes
      if (now - lastCheckRef.current < 200) return;
      lastCheckRef.current = now;
      
      // Verificar solo en un punto central (donde está el logo)
      const shouldUseBlack = checkBackgroundAtPosition(100, 30);
      
      setUseBlackLogo(prev => {
        if (prev !== shouldUseBlack) {
          return shouldUseBlack;
        }
        return prev;
      });
    };

    // Verificar inmediatamente con delay para que Three.js se renderice
    setTimeout(checkBackground, 500);
    
    // Configurar intervalo para verificar periódicamente
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