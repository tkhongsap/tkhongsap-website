import React, { ReactNode } from "react";

interface SlideProps {
  children: ReactNode;
  className?: string;
}

const Slide: React.FC<SlideProps> = ({ children, className = "" }) => {
  return (
    <div 
      className={`min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 ${className}`}
    >
      <div className="max-w-6xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
};

export default Slide;