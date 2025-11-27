// src/layout/Header/hooks/useScroll.js
import { useState, useEffect, useRef } from 'react';

export const useScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const minDelta = 3;
    const hideThreshold = 10;

    lastScrollY.current = window.scrollY || window.pageYOffset || 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const delta = scrollTop - lastScrollY.current;

          if (scrollTop <= 10) {
            setIsVisible(true);
          } else if (Math.abs(delta) > minDelta) {
            if (delta > 0 && scrollTop > hideThreshold) {
              setIsVisible(false);
            } else if (delta < 0) {
              setIsVisible(true);
            }
          }

          setIsScrolled(scrollTop > 50);
          lastScrollY.current = scrollTop;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isScrolled, isVisible, setIsVisible };
};