import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, scrollToElement } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  // Portfolio hidden temporarily - under construction
  { name: "Weekend Projects", path: "/portfolio" },
  { name: "Writing", path: "/writing" },
  // Contact hidden temporarily during initial launch
  // { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLinkClick = (path: string) => {
    closeMenu();
    
    // If we're on the home page and the link has a hash, scroll to that section
    if (location === "/" && path.startsWith("/#")) {
      const id = path.substring(2);
      scrollToElement(id);
    }
  };

  return (
    <header className={cn(
      "fixed w-full bg-white z-50 transition-all duration-200",
      isScrolled ? "shadow-sm" : ""
    )}>
      <div className="container">
        <div className="flex justify-between items-center py-6">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-primary">Ta</span> <span className="text-[#333333]">Khongsap</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.path}
                className={cn(
                  "font-medium text-[#444444] hover:text-primary transition-colors",
                  location === link.path && "text-primary"
                )}
                onClick={() => handleLinkClick(link.path)}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-white rounded-md px-6">
              <Link href="/#newsletter" onClick={() => handleLinkClick("/#newsletter")}>
                Subscribe
              </Link>
            </Button>
          </nav>
          
          {/* Mobile Navigation Button */}
          <button 
            type="button" 
            className="md:hidden text-[#333333] focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div className={cn("md:hidden overflow-hidden transition-all duration-300", 
          isOpen ? "max-h-96" : "max-h-0"
        )}>
          <div className="flex flex-col space-y-5 pb-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.path}
                className={cn(
                  "font-medium text-lg text-[#444444] hover:text-primary transition-colors",
                  location === link.path && "text-primary"
                )}
                onClick={() => handleLinkClick(link.path)}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-white rounded-md w-full py-3 mt-4">
              <Link 
                href="/#newsletter"
                onClick={() => handleLinkClick("/#newsletter")}
              >
                Subscribe
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
