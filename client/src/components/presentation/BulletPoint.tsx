import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

// Animation variants for bullet points
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

interface BulletPointProps {
  children: ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export const BulletPoint: React.FC<BulletPointProps> = ({ 
  children, 
  icon: Icon, 
  className = "" 
}) => {
  return (
    <motion.div 
      variants={itemVariants}
      className={`flex items-start gap-3 ${className}`}
    >
      {Icon && (
        <div className="flex-shrink-0 mt-1">
          <Icon className="h-5 w-5 text-modern-primary" />
        </div>
      )}
      <div className="flex-1">{children}</div>
    </motion.div>
  );
};

interface BulletListProps {
  children: ReactNode;
  className?: string;
}

export const BulletList: React.FC<BulletListProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <motion.div 
      variants={itemVariants}
      className={`space-y-4 ${className}`}
    >
      {children}
    </motion.div>
  );
};