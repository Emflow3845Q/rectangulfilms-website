import React from "react";
import { Link } from 'react-router-dom';
import { 
  FaYoutube, 
  FaLinkedinIn, 
  FaInstagram, 
  FaTiktok 
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import ClientLogosCarousel from '../components/ClientLogosCarousel';

const Footer = () => {
  const { t } = useLanguage();

  const menuItems = [
    { label: t('header.menu.about'), path: "/about" },
    { label: t('header.menu.motion'), path: "/motion" },
    { label: t('header.menu.still'), path: "/still" },
    { label: t('header.menu.rentals'), path: "/rentals" },
    { label: t('header.menu.services'), path: "/services" }
  ];

  const socialLinks = [
    { icon: FaYoutube, name: "YouTube", url: "#" },
    { icon: FaLinkedinIn, name: "LinkedIn", url: "#" },
    { icon: FaInstagram, name: "Instagram", url: "#" },
    { icon: FaTiktok, name: "TikTok", url: "#" }
  ];

  return (
    <footer className="bg-black">
      
      {/* Carrusel de Logos de Clientes - USANDO EL COMPONENTE */}
      <ClientLogosCarousel />

      {/* Contenido Principal */}
      <div className="container mx-auto px-6 py-12">
        
        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Columna 1: Logo y Descripción COMPLETA */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img 
                src="/logo.svg" 
                alt="Rectángulo" 
                className="h-12 w-auto mb-4"
              />
            </div>
            
            <p className="text-white text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="text-white font-gotham-cond-black text-lg uppercase tracking-wider mb-6">
              {t('footer.navigation')}
            </h3>
            <div className="space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-white/80 hover:text-red-primary transition-colors duration-300 text-base block font-gotham-cond-black"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Columna 3: Contacto y Redes */}
          <div>
            <h3 className="text-white font-gotham-cond-black text-lg uppercase tracking-wider mb-6">
              {t('footer.contact')}
            </h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <a 
                  href={`mailto:${t('common.email')}`} 
                  className="text-white hover:text-red-primary transition-colors duration-300 text-base block mb-2"
                >
                  {t('common.email')}
                </a>
                <a 
                  href={`tel:${t('common.phone')}`} 
                  className="text-white hover:text-red-primary transition-colors duration-300 text-base block"
                >
                  {t('common.phone')}
                </a>
              </div>
            </div>

            {/* Redes Sociales */}
            <div>
              <h4 className="text-white font-gotham-cond-black text-md uppercase tracking-wider mb-4">
                {t('common.followUs')}
              </h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      className="w-10 h-10 bg-white/10 hover:bg-red-primary flex items-center justify-center text-white hover:text-white transition-all duration-300 rounded-sm"
                      title={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-red-primary pt-6">
          <div className="text-center">
            <p className="text-white/60 text-sm">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;