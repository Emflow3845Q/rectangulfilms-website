import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaDribbble,
  FaMapMarkerAlt,
  FaPhone,
  FaClock
} from 'react-icons/fa';

const Footer = () => {
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const menuRefs = useRef([]);
  const contactRefs = useRef([]);
  const bottomSocialRefs = useRef([]);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          startAnimations();
          hasAnimatedRef.current = true;
        }
      },
      { 
        threshold: 0.1, // Menos threshold para trigger más rápido
        rootMargin: "0px 0px -10px 0px" // Trigger más temprano
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startAnimations = () => {
    const tl = gsap.timeline();

    // Animación MÁS RÁPIDA - Logo y todo junto
    tl.fromTo(logoRef.current,
      {
        scale: 0.8,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      }
    )
    .fromTo(textRef.current,
      {
        y: 20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      },
      "-=0.1" // Menos overlap
    )
    .fromTo(menuRefs.current,
      {
        x: -10,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.25,
        stagger: 0.03, // Stagger más rápido
        ease: "power2.out"
      },
      "-=0.1"
    )
    .fromTo(contactRefs.current,
      {
        x: 10,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.25,
        stagger: 0.03,
        ease: "power2.out"
      },
      "-=0.2"
    )
    .fromTo(bottomSocialRefs.current,
      {
        y: 5,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.2,
        stagger: 0.02, // Muy rápido
        ease: "power2.out"
      },
      "-=0.1"
    );
  };

  const addToRefs = (el, index, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current[index] = el;
    }
  };

  return (
    <footer ref={sectionRef} className="relative bg-black border-t border-red-600/30 overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div ref={logoRef} className="mb-8 opacity-0">
              <img 
                src="/logo.svg" 
                alt="Rectángulo Films" 
                className="h-12 lg:h-16 w-auto"
              />
            </div>

            {/* Inspirational Text */}
            <p 
              ref={textRef}
              className="text-white font-gotham-book text-lg lg:text-xl leading-relaxed max-w-2xl mb-8 opacity-0"
            >
              Trabajamos con talentos valientes y mentes creativas para llevar ideas 
              poderosas desde el papel hasta la pantalla, conectando con públicos de 
              todo el mundo.
            </p>
          </div>

          {/* Menu Column */}
          <div className="lg:col-span-1">
            <h3 className="text-red-600 font-gotham-cond-black text-sm tracking-widest uppercase mb-6">
              Menu
            </h3>
            <div className="space-y-3">
              {["Acerca de", "Servicios", "Proyectos", "Contacto"].map((item, index) => (
                <a
                  key={item}
                  ref={el => addToRefs(el, index, menuRefs)}
                  href="#"
                  className="block text-white font-gotham-book text-base hover:text-red-600 transition-all duration-200 transform hover:translate-x-1 opacity-0"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-1">
            <h3 className="text-red-600 font-gotham-cond-black text-sm tracking-widest uppercase mb-6">
              Contacto
            </h3>
            
            <div className="space-y-3">
              {/* Location */}
              <div 
                ref={el => addToRefs(el, 0, contactRefs)}
                className="flex items-start gap-3 text-white font-gotham-book text-base opacity-0"
              >
                <FaMapMarkerAlt className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                <span>Guadalajara Jalisco Mexico</span>
              </div>

              {/* Phone */}
              <div 
                ref={el => addToRefs(el, 1, contactRefs)}
                className="flex items-center gap-3 text-white font-gotham-cond-bold text-lg opacity-0"
              >
                <FaPhone className="w-4 h-4 text-red-600" />
                <span>+52 33 23 88 13 33</span>
              </div>

              {/* Schedule */}
              <div 
                ref={el => addToRefs(el, 2, contactRefs)}
                className="flex items-center gap-3 text-white font-gotham-book text-sm opacity-0"
              >
                <FaClock className="w-4 h-4 text-red-600" />
                <span>Lun-Vir 9am-6pm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          
          {/* Copyright */}
          <div className="text-white/60 font-gotham-book text-sm text-center lg:text-left mb-4 lg:mb-0">
            © 2025 Rectángulo Films. All Rights Reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center lg:justify-end gap-2">
            {[
              { icon: FaFacebookF, name: "Facebook" },
              { icon: FaTwitter, name: "Twitter" },
              { icon: FaLinkedinIn, name: "LinkedIn" },
              { icon: FaInstagram, name: "Instagram" },
              { icon: FaDribbble, name: "Dribbble" }
            ].map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  ref={el => addToRefs(el, index, bottomSocialRefs)}
                  href="#"
                  className="w-10 h-10 bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-all duration-300 opacity-0 transform-gpu group"
                  title={social.name}
                >
                  <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 w-2 h-2 bg-red-600/40 rounded-full"></div>
      <div className="absolute top-10 right-10 w-1 h-1 bg-white/50 rounded-full"></div>
    </footer>
  );
};

export default Footer;