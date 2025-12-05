// src/hooks/useBackgroundColor.js
import { useState, useEffect, useRef } from 'react';

const useBackgroundColor = () => {
  const [useBlackLogo, setUseBlackLogo] = useState(true); // Por defecto negro
  const checkIntervalRef = useRef(null);

  const isWhiteBackground = (bgColor) => {
    if (!bgColor || bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') {
      return false; // Transparente NO es blanco, usar negro
    }

    // Extraer valores RGB
    const rgb = bgColor.match(/\d+/g);
    if (rgb && rgb.length >= 3) {
      const [r, g, b] = rgb.map(Number);
      
      // Verificar si es BLANCO puro o casi blanco
      // Si todos los canales están cerca de 255, es blanco
      const isWhite = r > 240 && g > 240 && b > 240;
      return isWhite;
    }
    
    return false; // Por defecto NO es blanco, usar negro
  };

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
        
        const style = window.getComputedStyle(element);
        const bgColor = style.backgroundColor;
        const opacity = style.opacity;
        
        // Si el elemento es visible
        if (opacity > 0 && style.display !== 'none' && style.visibility !== 'hidden') {
          // Si encuentra un fondo BLANCO, NO usar logo negro
          if (isWhiteBackground(bgColor)) {
            return false; // false = NO usar negro (usar blanco)
          }
          // Cualquier otro color: usar negro
          return true;
        }
      }
    } catch (error) {
      console.error('Error checking background:', error);
    }
    
    return true; // Por defecto usar negro
  };

  useEffect(() => {
    const checkBackground = () => {
      if (document.readyState !== 'complete') return;
      
      // Verificar en múltiples puntos cerca del logo
      const checkPoints = [
        { x: 60, y: 30 }, // Izquierda del logo
        { x: 100, y: 30 }, // Centro del logo
        { x: 140, y: 30 }, // Derecha del logo
      ];
      
      let useBlackCount = 0;
      let totalChecks = 0;
      
      checkPoints.forEach(point => {
        const shouldUseBlack = checkBackgroundAtPosition(point.x, point.y);
        if (shouldUseBlack) useBlackCount++;
        totalChecks++;
      });
      
      // Si la mayoría de los puntos indica usar negro
      const shouldUseBlackLogo = useBlackCount > totalChecks / 2;
      setUseBlackLogo(shouldUseBlackLogo);
    };

    // Verificar inmediatamente
    checkBackground();
    
    // Configurar intervalo para verificar periódicamente
    checkIntervalRef.current = setInterval(checkBackground, 500);
    
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