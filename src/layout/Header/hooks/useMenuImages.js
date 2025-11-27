// src/layout/Header/hooks/useMenuImages.js
import { useState, useEffect } from 'react';
import { aboutMenuImages, stillsMenuImages, rentalsMenuImages } from '../../../assets/images';

export const useMenuImages = () => {
  const [randomImageOrder, setRandomImageOrder] = useState([]);
  const [randomRentalsOrder, setRandomRentalsOrder] = useState([]);

  // Crear arrays de imágenes
  const stillsImagesArray = Object.values(stillsMenuImages).map((image, index) => ({
    id: index + 1,
    image: image,
    alt: `Still production ${index + 1}`
  }));

  const rentalsImagesArray = Object.values(rentalsMenuImages).map((image, index) => ({
    id: index + 1,
    image: image,
    alt: `Rentals ${index + 1}`
  }));

  const aboutMenuImagesArray = Object.values(aboutMenuImages).map((image, index) => ({
    id: index + 1,
    image: image,
    alt: `About ${index + 1}`
  }));

  // Función para mezclar array aleatoriamente
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Inicializar órdenes aleatorios
  useEffect(() => {
    setRandomImageOrder(shuffleArray(stillsImagesArray));
    setRandomRentalsOrder(shuffleArray(rentalsImagesArray));
  }, []);

  return {
    randomImageOrder,
    randomRentalsOrder,
    aboutMenuImagesArray,
    stillsImagesArray,
    rentalsImagesArray
  };
};