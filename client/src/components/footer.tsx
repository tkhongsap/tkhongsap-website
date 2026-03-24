import { Link } from "wouter";
import { Linkedin, Github, Mail, Twitter, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-white py-16">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <div className="mb-8 md:mb-0">
            <h2 className="text-xl font-bold mb-2">
              <span className="font-serif text-[#C45B3E]">Ta</span>{" "}
              <span className="text-white">Khongsap</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xs">
              Builder, engineer, writer. Shipping AI systems and sharing what I
              learn along the way.
            </p>
          </div>

          {/* Newsletter CTA */}
          <div className="w-full md:w-auto">
            <p className="text-sm font-medium text-gray-300 mb-3">
              Stay updated with new essays & projects
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[#C45B3E] hover:text-[#E8704E] font-medium text-sm transition-colors"
            >
              Subscribe to updates
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Middle Section: Links + Social */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          {/* Navigation Links */}
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="text-gray-400 hover:text-[#C45B3E] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/portfolio"
              className="text-gray-400 hover:text-[#C45B3E] transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/writing"
              className="text-gray-400 hover:text-[#C45B3E] transition-colors"
            >
              Writing
            </Link>
            <Link
              href="/about"
              className="text-gray-400 hover:text-[#C45B3E] transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            <a
              href="https://x.com/tkhongsap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#C45B3E] transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://linkedin.com/in/totrakool-khongsap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#C45B3E] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/tkhongsap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#C45B3E] transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="mailto:ta.khongsap@gmail.com"
              className="text-gray-400 hover:text-[#C45B3E] transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Ta Khongsap. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs">
              Built with React, TypeScript & a lot of coffee.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
