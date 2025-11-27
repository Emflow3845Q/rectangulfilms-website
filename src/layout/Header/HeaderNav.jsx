// src/layout/Header/HeaderNav.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderNav = ({ 
  isVisible, 
  isMenuOpen, 
  toggleLanguage, 
  currentLanguage, 
  toggleMenu, 
  t 
}) => {
  return (
    <header className={`fixed top-0 left-0 w-full z-[100] py-2 md:py-3 transform transition-all duration-500 ${
      !isVisible || isMenuOpen 
        ? '-translate-y-full opacity-0' 
        : 'translate-y-0 opacity-100'
    } bg-transparent`}>
      <nav className="w-full px-4 sm:px-6 relative">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Rectángulo Films"
                className="h-7 sm:h-8 lg:h-10 w-auto cursor-pointer"
              />
            </Link>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={toggleLanguage}
              className="text-white text-sm uppercase tracking-tighter hover:text-red-600 transition-colors duration-300 px-2 py-1 font-gotham font-bold"
              style={{ letterSpacing: '-0.05em' }}
            >
              {currentLanguage === 'en' ? 'ES' : 'EN'}
            </button>

            <button
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 relative group"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? t('header.aria.closeMenu') : t('header.aria.openMenu')}
            >
              {!isMenuOpen ? (
                <div className="flex flex-col justify-center items-center w-5 sm:w-6 gap-1 sm:gap-1.5">
                  <span className="w-full h-0.5 bg-white transition-all duration-300 group-hover:bg-red-600"></span>
                  <span className="w-full h-0.5 bg-white transition-all duration-300 group-hover:bg-red-600"></span>
                  <span className="w-full h-0.5 bg-white transition-all duration-300 group-hover:bg-red-600"></span>
                </div>
              ) : (
                <div className="relative h-6 overflow-hidden">
                  <div className="flex flex-col transition-all duration-300 group-hover:-translate-y-6">
                    <span className="text-white text-xs uppercase tracking-tighter font-gotham font-bold h-6 flex items-center justify-center"
                      style={{ letterSpacing: '-0.05em' }}>
                      CLOSE
                    </span>
                    <span className="text-red-600 text-xs uppercase tracking-tighter font-gotham font-bold h-6 flex items-center justify-center"
                      style={{ letterSpacing: '-0.05em' }}>
                      CLOSE
                    </span>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderNav;