import React from "react";
import { useLocation } from "react-router-dom";
import ClientLogosCarousel from "../components/ClientLogosCarousel";
import RentalsLogosCarousel from "../components/RentalsLogosCarousel";

const Footer = () => {
  const location = useLocation();
  const isRentalsPage = location.pathname === "/rentals";

  return (
    <footer className="bg-black text-white">
      {/* Carrusel de logos - muestra el correspondiente según la página */}
      {isRentalsPage ? <RentalsLogosCarousel /> : <ClientLogosCarousel />}

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-stretch px-6 md:px-10 py-10 gap-10">
        {/* Logo principal - Centrado verticalmente en toda la altura de la sección */}
        <div className="flex-shrink-0 w-full md:w-auto flex justify-center items-center md:min-h-[200px]">
          <img
            src="/logo.png"
            alt="Rectángulo Films"
            className="w-52"
          />
        </div>

        {/* Menú - CON HOVER ROJO */}
        <div className="flex gap-20 text-sm uppercase tracking-wide justify-center md:justify-start items-center">
          <ul className="space-y-2">
            <li>
              <a href="/motion" className="hover:text-red-primary transition-colors duration-300 font-gotham font-bold">
                MOTION
              </a>
            </li>
            <li>
              <a href="/stills" className="hover:text-red-primary transition-colors duration-300 font-gotham font-bold">
                STILL
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-red-primary transition-colors duration-300 font-gotham font-bold">
                ABOUT
              </a>
            </li>
            <li>
              <a href="/rentals" className="hover:text-red-primary transition-colors duration-300 font-gotham font-bold">
                RENTALS
              </a>
            </li>
          </ul>

          <ul className="space-y-2">
            <li>
              <a href="https://www.linkedin.com/company/rectangulofilms/posts/?feedView=all" 
                 className="hover:text-red-primary transition-colors duration-300 font-gotham font-bold"
                 target="_blank" 
                 rel="noopener noreferrer">
                LINKEDIN
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/rectangulofilms/" 
                 className="hover:text-red-primary transition-colors duration-300 font-gotham font-bold"
                 target="_blank" 
                 rel="noopener noreferrer">
                INSTAGRAM
              </a>
            </li>
            <li>
              <a href="https://vimeo.com/userrectangulo" 
                 className="hover:text-red-primary transition-colors duration-300 font-gotham font-bold"
                 target="_blank" 
                 rel="noopener noreferrer">
                VIMEO
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/rectangulofilms" 
                 className="hover:text-red-primary transition-colors duration-300 font-gotham font-bold"
                 target="_blank" 
                 rel="noopener noreferrer">
                FACEBOOK
              </a>
            </li>
          </ul>
        </div>

        {/* Descripción */}
        <div className="max-w-md text-xs leading-relaxed text-gray-300 flex items-center">
          <p className="font-gotham font-light">
            Rectángulo es una productora audiovisual creativa ubicada en Guadalajara México, con un crew multidisciplinario, especializado en áreas como <strong className="font-gotham font-bold">producción</strong>, <strong className="font-gotham font-bold">dirección</strong>, <strong className="font-gotham font-bold">cinefotografía</strong>, <strong className="font-gotham font-bold">diseño sonoro</strong>, <strong className="font-gotham font-bold">dirección de arte</strong> y entre otras. Nuestra meta es realizar producciones de alta calidad con pensamiento juicioso, logrando el resultado esperado por cada uno de nuestros clientes. ¿Cómo lo logramos? Estableciendo estándares de calidad, aplicando nuestras metodologías, talento y creatividad.
          </p>
        </div>
      </div>

      {/* Contacto */}
      <div className="text-center text-xs text-gray-400 pb-4">
        <p className="font-gotham font-light">
          <a 
            href="mailto:contacto@hotmail.com"
            className="hover:text-red-primary transition-colors duration-300"
          >
            contacto@hotmail.com
          </a>
          <br />
          <a 
            href="https://wa.me/523323881333"
            className="hover:text-red-primary transition-colors duration-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            +52 3323 88 1333
          </a>
        </p>
      </div>

      {/* Línea roja inferior */}
      <div className="h-[6px] bg-red-primary"></div>
    </footer>
  );
};

export default Footer;