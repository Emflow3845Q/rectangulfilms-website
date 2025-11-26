import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const HeaderSection = ({ projects }) => {
  const { t } = useLanguage();

  return (
    <div className="px-4 lg:px-20 mb-8 lg:mb-16">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
        <motion.h1
          className="text-5xl lg:text-9xl font-gotham font-black uppercase tracking-tight text-white-pure"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t("motion.title")}
        </motion.h1>
        
      </div>
    </div>
  );
};

export default HeaderSection;