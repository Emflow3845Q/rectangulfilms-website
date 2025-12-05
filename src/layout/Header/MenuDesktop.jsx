// src/layout/Header/MenuDesktop.jsx
import React, { useRef } from 'react';
import { gsap } from 'gsap';

const MenuDesktop = ({ 
  menuItems, 
  menuItemsRef, 
  menuLogoRef, 
  mediaContainerRef,
  handleMenuItemClick,
  handleMenuItemHover,
  renderMediaContent 
}) => {
  const menuLogoImageRef = useRef(null);

  // Animación de zoom para el logo en el menú
  const handleMenuLogoMouseEnter = () => {
    if (menuLogoImageRef.current) {
      gsap.to(menuLogoImageRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMenuLogoMouseLeave = () => {
    if (menuLogoImageRef.current) {
      gsap.to(menuLogoImageRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  // Animación de click para el logo en el menú
  const handleMenuLogoClick = (e) => {
    e.preventDefault();
    
    if (menuLogoImageRef.current) {
      // Pequeña animación de feedback al hacer clic
      gsap.timeline()
        .to(menuLogoImageRef.current, {
          scale: 0.95,
          duration: 0.1,
          ease: "power2.out"
        })
        .to(menuLogoImageRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "elastic.out(1, 0.5)",
          onComplete: () => {
            // Navegar a la página de inicio
            window.location.href = '/';
          }
        });
    }
  };

  return (
    <>
      <div className="w-full md:w-1/2 relative z-10 flex flex-col justify-center pl-12 xl:pl-24">
        {/* LOGO EN DESKTOP - MISMO TAMAÑO QUE HEADERNAV */}
        <div 
          ref={menuLogoRef}
          className="absolute top-8 left-12"
        >
          <img
            ref={menuLogoImageRef}
            src="/logo.png"
            alt="Rectángulo Films"
            // MISMO TAMAÑO QUE HEADERNAV
            className="h-7 sm:h-8 lg:h-10 w-auto cursor-pointer transition-transform duration-300"
            onClick={handleMenuLogoClick}
            onMouseEnter={handleMenuLogoMouseEnter}
            onMouseLeave={handleMenuLogoMouseLeave}
            style={{
              transformOrigin: 'center',
              willChange: 'transform',
              display: 'block'
            }}
          />
        </div>

        <div className="w-full max-w-2xl">
          <div className="flex flex-col">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                ref={el => {
                  if (el) {
                    menuItemsRef.current[index] = el;
                  }
                }}
                onClick={() => handleMenuItemClick(item)}
                onMouseEnter={() => handleMenuItemHover(item)}
                className="text-white text-6xl xl:text-7xl 2xl:text-8xl font-gotham font-bold uppercase tracking-tighter text-left py-0 hover:text-red-600 transition-all duration-500 hover:translate-x-6 group block cursor-pointer"
                style={{ letterSpacing: '-0.08em' }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={mediaContainerRef}
        className="hidden md:block w-1/2 relative overflow-hidden"
      >
        {renderMediaContent()}
      </div>
    </>
  );
};

export default MenuDesktop;