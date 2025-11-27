// src/layout/Header/CloseButton.jsx
import React from 'react';

const CloseButton = ({ toggleMenu, t }) => {
  return (
    <button
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[110] flex items-center justify-center w-auto h-10 sm:h-12 px-4 sm:px-6 group"
      onClick={toggleMenu}
      aria-label={t('header.aria.closeMenu')}
    >
      <div className="relative h-6 overflow-hidden">
        <div className="flex flex-col transition-all duration-300 group-hover:-translate-y-6">
          <span 
            className="text-white text-sm sm:text-base uppercase tracking-tighter font-gotham font-bold h-6 flex items-center justify-center"
            style={{ letterSpacing: '-0.05em' }}
          >
            CLOSE
          </span>
          <span 
            className="text-red-600 text-sm sm:text-base uppercase tracking-tighter font-gotham font-bold h-6 flex items-center justify-center"
            style={{ letterSpacing: '-0.05em' }}
          >
            CLOSE
          </span>
        </div>
      </div>
    </button>
  );
};

export default CloseButton;