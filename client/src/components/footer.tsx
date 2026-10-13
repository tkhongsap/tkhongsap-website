import { Link } from "wouter";
import { Linkedin, Github, Mail, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface text-ink py-16 border-t border-line">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-bold">
              <span className="font-serif text-brand-text">Ta</span>{" "}
              <span className="text-ink">Khongsap</span>
            </h2>
            <p className="text-ink-muted text-sm mt-1">
              Building AI systems that work while I sleep
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            <a
              href="https://x.com/tkhongsap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted hover:text-brand-text transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://linkedin.com/in/totrakool-khongsap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted hover:text-brand-text transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/tkhongsap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted hover:text-brand-text transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="mailto:ta.khongsap@gmail.com"
              className="text-ink-muted hover:text-brand-text transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-line pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-ink-faint text-sm">
              &copy; {currentYear} Ta Khongsap
            </p>

            {/* Navigation Links */}
            <nav aria-label="Footer navigation" className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-3 text-sm min-w-0">
              <Link
                href="/"
                className="text-ink-muted hover:text-brand-text transition-colors"
              >
                Home
              </Link>
              <Link
                href="/portfolio"
                className="text-ink-muted hover:text-brand-text transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/writing"
                className="text-ink-muted hover:text-brand-text transition-colors"
              >
                Writing
              </Link>
              <Link
                href="/about"
                className="text-ink-muted hover:text-brand-text transition-colors"
              >
                About
              </Link>
              <Link
                href="/privacy-policy"
                className="text-ink-muted hover:text-brand-text transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-use"
                className="text-ink-muted hover:text-brand-text transition-colors"
              >
                Terms of Use
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
