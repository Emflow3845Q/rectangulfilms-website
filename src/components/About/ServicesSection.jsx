import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const ServicesSection = () => {
  const { t } = useLanguage();

  const ServiceColumn = ({ 
    title, 
    services, 
    delay = 0.2,
    serviceKey 
  }) => (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      <h3 className="text-white-pure text-sm sm:text-base uppercase tracking-[0.3em] mb-3 font-gotham font-bold">
        {title}
      </h3>
      <ul className="space-y-0.5">
        {services.map((service, index) => (
          <motion.li 
            key={index} 
            className="text-white-pure text-xs sm:text-sm tracking-wide font-gotham font-light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.2 + index * 0.05 }}
          >
            {service}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <div className="section">
      <div className="min-h-[90vh] bg-black-pure text-white-pure flex items-center py-12">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-20 w-full">
          <div className="max-w-7xl mx-auto">
            <motion.p
              className="text-xs sm:text-sm text-white-pure uppercase tracking-[0.3em] text-left mb-3 font-gotham font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              OUR CAPABILITIES
            </motion.p>

            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-gotham font-black uppercase tracking-tight text-white-pure text-center mb-12 sm:mb-16 lg:mb-20"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {t("about.servicesTitle")}
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 xl:gap-8">
              <ServiceColumn
                title={t("about.services.production")}
                services={t("about.serviceItems.production", { returnObjects: true })}
                delay={0.2}
              />
              
              <ServiceColumn
                title={t("about.services.photography")}
                services={t("about.serviceItems.photography", { returnObjects: true })}
                delay={0.3}
              />
              
              <ServiceColumn
                title={t("about.services.liveEvents")}
                services={t("about.serviceItems.liveEvents", { returnObjects: true })}
                delay={0.4}
              />
              
              <ServiceColumn
                title={t("about.services.equipment")}
                services={t("about.serviceItems.equipment", { returnObjects: true })}
                delay={0.5}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;