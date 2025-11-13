import React from "react";
import ClientLogosCarousel from "../components/ClientLogosCarousel";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Carrusel de logos */}
      <ClientLogosCarousel />

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-stretch px-6 md:px-10 py-10 gap-10">
        {/* Logo principal - Centrado verticalmente en toda la altura de la sección */}
        <div className="flex-shrink-0 w-full md:w-auto flex justify-center items-center md:min-h-[200px]">
          <img
            src="/logo.svg"
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
              <a href="#" className="hover:text-red-primary transition-colors duration-300 font-gotham font-bold">
                LINKEDIN
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-primary transition-colors duration-300 font-gotham font-bold">
                INSTAGRAM
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-primary transition-colors duration-300 font-gotham font-bold">
                VIMEO
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-primary transition-colors duration-300 font-gotham font-bold">
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
          contacto@hotmail.com
          <br />
          +52 3323 88 1333
        </p>
      </div>

      {/* Línea roja inferior */}
      <div className="h-[6px] bg-red-primary"></div>
    </footer>
  );
};

export default Footer;