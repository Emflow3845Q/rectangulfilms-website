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
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start px-6 md:px-10 py-10 gap-8 md:gap-12">
        {/* Logo principal - bajado un poco */}
        <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start mt-2 md:mt-1">
          <img
            src="/logo1.png"
            alt="Rectángulo Films"
            className="w-52"
          />
        </div>

        {/* Menú - Columna separada - bajado un poco */}
        <div className="text-xs uppercase tracking-wide mt-2 md:mt-1">
          <ul className="space-y-1">
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
        </div>

        {/* Redes sociales - Columna separada - bajado un poco */}
        <div className="text-xs uppercase tracking-wide mt-2 md:mt-1">
          <ul className="space-y-1">
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

        {/* Descripción con contacto debajo - se mantiene en su posición */}
        <div className="max-w-md w-full">
          <div className="text-xs leading-relaxed text-gray-300 mb-3 text-justify w-full">
            <p className="font-gotham font-light w-full" style={{ textAlignLast: 'justify' }}>
              Rectángulo es una productora audiovisual creativa ubicada en Guadalajara México, con un crew multidisciplinario, especializado en áreas como <strong className="font-gotham font-bold">producción</strong>, <strong className="font-gotham font-bold">dirección</strong>, <strong className="font-gotham font-bold">cinefotografía</strong>, <strong className="font-gotham font-bold">diseño sonoro</strong>, <strong className="font-gotham font-bold">dirección de arte</strong> y entre otras. Nuestra meta es realizar producciones de alta calidad con pensamiento juicioso, logrando el resultado esperado por cada uno de nuestros clientes. ¿Cómo lo logramos? Estableciendo estándares de calidad, aplicando nuestras metodologías, talento y creatividad.
            </p>
          </div>
          
          {/* Contacto - correo a la izquierda y número a la derecha */}
          <div className="text-xs text-gray-400">
            <div className="flex flex-row justify-between w-full">
              <a 
                href="mailto:contacto@hotmail.com"
                className="hover:text-red-primary transition-colors duration-300 font-gotham font-light"
              >
                contacto@hotmail.com
              </a>
              <a 
                href="https://wa.me/523323881333"
                className="hover:text-red-primary transition-colors duration-300 font-gotham font-light"
                target="_blank" 
                rel="noopener noreferrer"
              >
                +52 3323 88 1333
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Línea roja inferior con derechos reservados */}
      <div className="bg-red-primary py-[2px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center">
            <span className="text-white text-[9px] font-gotham font-bold tracking-tight">
              © {new Date().getFullYear()} RECTÁNGULO FILMS. TODOS LOS DERECHOS RESERVADOS.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;