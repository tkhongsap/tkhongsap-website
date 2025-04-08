import { Link } from "wouter";
import { Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#333333] text-white py-20">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold"><span className="text-primary">Ta</span> <span className="text-white">Khongsap</span></h2>
              <p className="text-gray-400 mt-2">Empowering Business with AI & Analytics</p>
            </div>
            
            <div className="flex items-center space-x-8">
              <a 
                href="https://linkedin.com/in/totrakool-k-b504a912" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={28} />
              </a>
              <a 
                href="https://github.com/tkhongsap" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={28} />
              </a>
              <a 
                href="mailto:ta.khongsap@gmail.com" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={28} />
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                &copy; {currentYear} Ta Khongsap. All rights reserved.
              </p>
              
              <div className="flex space-x-8">
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
                <Link href="/#newsletter" className="text-gray-400 hover:text-white transition-colors">
                  Newsletter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
