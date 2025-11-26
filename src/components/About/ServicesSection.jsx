import React from "react";
import { motion } from "framer-motion";

const ServicesSection = () => {
  // Versión ULTRA FORZADA - arrays congelados
  const serviceColumns = Object.freeze([
    Object.freeze({
      title: "Production",
      services: Object.freeze([
        "Corporate and institutional productions",
        "Testimonial capsules and interviews",
        "Advertising and commercial videos",
        "High-end social media content",
        "Series and cinematic projects",
        "Product and fashion spots",
        "Aerial drone filming",
        "Event coverage",
        "Music videos"
      ]),
      key: "production"
    }),
    Object.freeze({
      title: "Photography",
      services: Object.freeze([
        "Fashion and editorial campaigns",
        "Corporate and artistic portraits",
        "Advertising photography",
        "Event photo coverage",
        "Product photography",
        "Film and video stills"

      ]),
      key: "photography"
    }),
    Object.freeze({
      title: "Live Events & Broadcasts",
      services: Object.freeze([
        "Live graphics integration (visuals and overlays)",
        "Event recording and post-event recap videos",
        "Multicam closed-circuit operation (CCTV)",
        "Live event production and coverage",
        "Technical and creative coordination",
        "Real-time multiplatform streaming",
        "Screen setup and AV equipment"
      ]),
      key: "liveEvents"
    }),
    Object.freeze({
      title: "Equipment Rental",
      services: Object.freeze([
        "Monitors, transmitters, and on-set accessories",
        "Grip gear, tripods, C-stands, and rigging",
        "Professional audio and microphones",
        "Cinema lenses and accessories",
        "Fully equipped soundstage",
        "Digital cinema cameras",
        "Professional lighting"
      ]),
      key: "equipment"
    })
  ]);

  const ServiceColumn = ({ title, services, delay = 0.2, serviceKey }) => (
    <motion.div className="text-center min-w-0" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay }}>
      <div className="bg-black-pure p-6 lg:p-8 h-full">
        {/* Títulos de columnas un poquito más grandes */}
        <h3 className="text-white-pure text-[13px] uppercase tracking-[0.3em] mb-4 font-gotham font-bold">{title}</h3>
        <ul className="space-y-2">
          {services.map((service, index) => (
            <motion.li
              key={index}
              className="text-white-pure text-[12px] tracking-wide font-gotham font-light leading-tight break-keep whitespace-nowrap overflow-hidden text-ellipsis"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: delay + 0.2 + index * 0.05 }}
            >
              {service}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );

  return (
    <div className="section">
      <div className="min-h-[90vh] bg-black-pure text-white-pure flex items-center py-12">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-20 w-full">
          <div className="w-full">
            {/* Texto "OUR CAPABILITIES" un poquito más grande */}
            <motion.p className="text-[12px] text-white-pure uppercase tracking-[0.3em] text-left mb-3 font-gotham font-medium" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>OUR CAPABILITIES</motion.p>

            {/* Título principal UN POQUITO MÁS GRANDE */}
            <motion.h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-gotham font-black uppercase tracking-tight text-white-pure text-center mb-12 sm:mb-16 lg:mb-20" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>How We Can Help</motion.h2>

            {/* Grid de 4 columnas fijas - MÁS ESPACIO ENTRE COLUMNAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-16 xl:gap-20 justify-items-center">
              {serviceColumns.map((column, index) => (
                <ServiceColumn
                  key={column.key}
                  title={column.title}
                  services={column.services}
                  delay={0.2 + index * 0.1}
                  serviceKey={column.key}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;