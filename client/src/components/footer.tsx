import { Link } from "wouter";
import { Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-white py-16">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-bold">
              <span className="font-serif text-[#C45B3E]">Ta</span>{" "}
              <span className="text-white">Khongsap</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Essays on AI and knowledge work
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            <a
              href="https://linkedin.com/in/totrakool-k-b504a912"
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
              &copy; {currentYear} Ta Khongsap
            </p>

            {/* Navigation Links */}
            <nav className="flex items-center gap-6 text-sm">
              <Link
                href="/"
                className="text-gray-400 hover:text-[#C45B3E] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-400 hover:text-[#C45B3E] transition-colors"
              >
                About
              </Link>
              <Link
                href="/writing"
                className="text-gray-400 hover:text-[#C45B3E] transition-colors"
              >
                Writing
              </Link>
              <Link
                href="/portfolio"
                className="text-gray-400 hover:text-[#C45B3E] transition-colors"
              >
                Projects
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
