// src/layout/Header/MenuMobile.jsx
import React from 'react';

const MenuMobile = ({ 
  menuItems, 
  menuItemsRef, 
  menuLogoRef, 
  handleMenuItemClick 
}) => {
  return (
    <div className="w-full h-full flex flex-col pt-16 pb-8">
      {/* LOGO EN MÓVIL - VISIBLE INMEDIATAMENTE */}
      <div 
        ref={menuLogoRef}
        className="absolute top-6 left-6"
      >
        <img
          src="/logo.png"
          alt="Rectángulo Films"
          className="h-12 w-auto"
        />
      </div>

      <div className="w-full max-w-md px-6 flex-1 flex flex-col justify-center">
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
              className="text-white text-5xl font-gotham font-bold uppercase tracking-tighter text-left py-0 transition-all duration-300 active:bg-white/10 active:scale-95 group cursor-pointer"
              style={{ letterSpacing: '-0.08em' }}
            >
              <div className="flex items-center justify-between">
                <span className="group-hover:text-red-600 transition-colors duration-300">
                  {item.label}
                </span>
                <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2 text-4xl">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuMobile;