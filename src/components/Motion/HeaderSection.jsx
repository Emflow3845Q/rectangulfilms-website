import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const HeaderSection = ({ projects }) => {
  const { t } = useLanguage();

  return (
    <div className="px-4 lg:px-20 mb-8 lg:mb-16">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
        <motion.h1
          className="text-5xl lg:text-9xl font-accent uppercase tracking-tight text-white-pure font-black"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t("motion.title")}
        </motion.h1>
        
        <motion.div
          className="lg:text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-white text-sm uppercase tracking-widest mb-2 font-gotham font-medium">
            {projects.length} {t("motion.projects")}
          </p>
          <p className="text-white text-base lg:max-w-xs leading-relaxed font-gotham font-light">
            {t("motion.description")}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeaderSection;