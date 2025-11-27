// src/layout/Header/hooks/useMenuAnimation.js
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap'; // IMPORTAR GSAP DIRECTAMENTE

export const useMenuAnimation = (isMenuOpen, menuItems, initializeMedia) => {
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const mediaContainerRef = useRef(null);
  const menuLogoRef = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    menuItemsRef.current = menuItemsRef.current.slice(0, menuItems.length);

    tl.current = gsap.timeline({ // USAR GSAP DIRECTAMENTE
      paused: true,
      onReverseComplete: () => {
        document.body.style.overflow = 'unset';
      },
      onStart: () => {
        if (menuItems[0]?.media && window.innerWidth > 768) {
          initializeMedia(menuItems[0].media, menuItems[0].mediaType);
        }
      }
    });

    if (menuRef.current) {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        tl.current
          .to(menuRef.current, {
            duration: 0.5,
            y: 0,
            ease: "power3.out"
          })
          .fromTo(menuLogoRef.current,
            {
              y: -30,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out"
            },
            "-=0.3"
          )
          .fromTo(menuItemsRef.current,
            {
              y: 20,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.06,
              ease: "power2.out"
            },
            "-=0.2"
          );
      } else {
        tl.current
          .to(menuRef.current, {
            duration: 0.8,
            x: 0,
            ease: "power3.inOut"
          })
          .fromTo(menuLogoRef.current,
            {
              x: -50,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out"
            },
            "-=0.6"
          )
          .fromTo(menuItemsRef.current,
            {
              x: -50,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out"
            },
            "-=0.4"
          )
          .fromTo(mediaContainerRef.current,
            {
              x: 50,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out"
            },
            "-=0.4"
          );
      }
    }
  }, []);

  const playAnimation = () => {
    if (tl.current) tl.current.play();
  };

  const reverseAnimation = () => {
    if (tl.current) tl.current.reverse();
  };

  return {
    menuRef,
    menuItemsRef,
    mediaContainerRef,
    menuLogoRef,
    playAnimation,
    reverseAnimation
  };
};