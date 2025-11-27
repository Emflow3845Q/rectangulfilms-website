// src/layout/Header/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap'; // IMPORTAR GSAP DIRECTAMENTE
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useMenuImages } from './hooks/useMenuImages';
import { useScroll } from './hooks/useScroll';
import { useMenuAnimation } from './hooks/useMenuAnimation';
import HeaderNav from './HeaderNav';
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import CloseButton from './CloseButton';
import MediaCarousel from './MediaCarousel';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState('');
  const [currentMediaType, setCurrentMediaType] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const imageIntervalRef = useRef(null);
  const currentImageRef = useRef(null);
  const nextImageRef = useRef(null);
  const navigate = useNavigate();

  const { currentLanguage, toggleLanguage, t } = useLanguage();
  const { isScrolled, isVisible, setIsVisible } = useScroll();
  const { randomImageOrder, randomRentalsOrder, aboutMenuImagesArray } = useMenuImages();

  // Función para limpiar media
  const cleanupMedia = () => {
    if (imageIntervalRef.current) {
      clearInterval(imageIntervalRef.current);
      imageIntervalRef.current = null;
    }
    setIsTransitioning(false);
    setCurrentImageIndex(0);
    setNextImageIndex(1);
  };

  // Función para inicializar media
  const initializeMedia = (media, mediaType) => {
    cleanupMedia();

    if (mediaType === 'image' && Array.isArray(media)) {
      setCurrentMedia(media);
      setCurrentMediaType('image');
      setCurrentImageIndex(0);
      setNextImageIndex(1);
      
      setTimeout(() => {
        if (currentImageRef.current) {
          gsap.set(currentImageRef.current, { opacity: 1 }); // USAR GSAP DIRECTAMENTE
        }
        if (nextImageRef.current) {
          gsap.set(nextImageRef.current, { opacity: 0 }); // USAR GSAP DIRECTAMENTE
        }
      }, 50);
    } else if (mediaType === 'gif') {
      setCurrentMedia(media);
      setCurrentMediaType('gif');
    }
  };

  // Menú items
  const menuItems = [
    {
      id: 'motion',
      label: t('header.menu.motion'),
      path: '/motion',
      type: 'page',
      media: '/gifs/Gif_Video portada MOTION.gif',
      mediaType: 'gif'
    },
    {
      id: 'still',
      label: t('header.menu.still'),
      path: '/stills',
      type: 'page',
      media: randomImageOrder,
      mediaType: 'image'
    },
    {
      id: 'about',
      label: t('header.menu.about'),
      path: '/about',
      type: 'page',
      media: aboutMenuImagesArray,
      mediaType: 'image'
    },
    {
      id: 'rentals',
      label: t('header.menu.rentals'),
      path: '/rentals',
      type: 'page',
      media: randomRentalsOrder,
      mediaType: 'image'
    },
  ];

  // Hook de animación
  const {
    menuRef,
    menuItemsRef,
    mediaContainerRef,
    menuLogoRef,
    playAnimation,
    reverseAnimation
  } = useMenuAnimation(isMenuOpen, menuItems, initializeMedia);

  // Función para transición entre imágenes
  const transitionToNextImage = () => {
    if (!currentMedia || !Array.isArray(currentMedia) || currentMedia.length === 0 || isTransitioning) return;
    if (currentMedia.length === 1) return;

    setIsTransitioning(true);
    const newNextIndex = (currentImageIndex + 1) % currentMedia.length;
    setNextImageIndex(newNextIndex);

    const nextImage = new Image();
    nextImage.src = currentMedia[newNextIndex].image;
    
    nextImage.onload = () => {
      gsap.timeline({ // USAR GSAP DIRECTAMENTE
        onComplete: () => {
          setCurrentImageIndex(newNextIndex);
          setIsTransitioning(false);
        }
      })
      .to(currentImageRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut"
      }, 0)
      .fromTo(nextImageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.inOut" },
        0
      );
    };
  };

  // Toggle del menú
  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      document.body.style.overflow = 'hidden';
      playAnimation();
      setIsVisible(false);
    } else {
      reverseAnimation();
      setTimeout(() => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'unset';
        setCurrentMedia('');
        setCurrentMediaType('');
        cleanupMedia();
        setIsVisible(true);
      }, 500);
    }
  };

  // Navegación
  const navigateToPage = (path) => {
    navigate(path);
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const handleMenuItemClick = (item) => {
    navigateToPage(item.path);
  };

  const handleMenuItemHover = (item) => {
    if (window.innerWidth > 768 && item.media) {
      gsap.to(mediaContainerRef.current, { // USAR GSAP DIRECTAMENTE
        y: -30,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          initializeMedia(item.media, item.mediaType);
          gsap.set(mediaContainerRef.current, { y: 30 }); // USAR GSAP DIRECTAMENTE
          gsap.to(mediaContainerRef.current, { // USAR GSAP DIRECTAMENTE
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
    }
  };

  // Render media content para desktop
  const renderMediaContent = () => (
    <MediaCarousel
      currentMedia={currentMedia}
      currentMediaType={currentMediaType}
      currentImageIndex={currentImageIndex}
      nextImageIndex={nextImageIndex}
      isTransitioning={isTransitioning}
      transitionToNextImage={transitionToNextImage}
      imageIntervalRef={imageIntervalRef}
    />
  );

  // Precargar imágenes
  useEffect(() => {
    menuItems.forEach(item => {
      if (item.mediaType === 'image' && Array.isArray(item.media)) {
        item.media.forEach(mediaItem => {
          const img = new Image();
          img.src = mediaItem.image;
        });
      } else if (item.mediaType === 'gif' && item.media) {
        const img = new Image();
        img.src = item.media;
      }
    });
  }, [menuItems]);

  // Cerrar menú al cambiar tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        toggleMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <>
      <HeaderNav
        isVisible={isVisible}
        isMenuOpen={isMenuOpen}
        toggleLanguage={toggleLanguage}
        currentLanguage={currentLanguage}
        toggleMenu={toggleMenu}
        t={t}
      />

      {/* MENÚ DESPLEGABLE */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-xl overflow-hidden"
        style={{
          transform: window.innerWidth <= 768 ? 'translateY(-100%)' : 'translateX(-100%)',
          zIndex: 99,
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
      >
        <CloseButton toggleMenu={toggleMenu} t={t} />

        <div className={`h-full ${window.innerWidth <= 768 ? '' : 'flex flex-col md:flex-row'}`}>
          {window.innerWidth <= 768 ? (
            <MenuMobile
              menuItems={menuItems}
              menuItemsRef={menuItemsRef}
              menuLogoRef={menuLogoRef}
              handleMenuItemClick={handleMenuItemClick}
            />
          ) : (
            <MenuDesktop
              menuItems={menuItems}
              menuItemsRef={menuItemsRef}
              menuLogoRef={menuLogoRef}
              mediaContainerRef={mediaContainerRef}
              handleMenuItemClick={handleMenuItemClick}
              handleMenuItemHover={handleMenuItemHover}
              renderMediaContent={renderMediaContent}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;