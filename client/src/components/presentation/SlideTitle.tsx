import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface SlideTitleProps {
  children: ReactNode;
  className?: string;
}

const SlideTitle: React.FC<SlideTitleProps> = ({ children, className = "" }) => {
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        delay: 0.1 
      } 
    }
  };

  return (
    <motion.h2 
      variants={titleVariants}
      initial="hidden"
      animate="visible"
      className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-modern-foreground text-center ${className}`}
    >
      {children}
    </motion.h2>
  );
};

export default SlideTitle;