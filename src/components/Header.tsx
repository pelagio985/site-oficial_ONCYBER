import { useState, useEffect } from 'react';
import { Menu, X, Cpu, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onOpenQuoteModal: (serviceId?: number | null) => void;
  onViewPortfolio: () => void;
}

export default function Header({ onOpenQuoteModal, onViewPortfolio }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Serviços', href: '#services' },
    { name: 'Diferenciais', href: '#differentials' },
    { name: 'Depoimentos', href: '#testimonials' },
  ];

  const handleMobileLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    // Smooth scroll to element
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-xs border-b border-slate-100/80 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              id="header-logo-link"
              href="#home"
              className="flex items-center gap-2.5 focus:outline-hidden group"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/15 group-hover:bg-blue-700 transition-colors">
                <Cpu className="h-5 w-5 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-black text-slate-900 tracking-tight leading-none">
                  ON<span className="text-blue-600">CYBER</span>
                </span>
                <span className="text-[10px] font-mono font-medium tracking-widest text-slate-500 uppercase mt-0.5">
                  TECNOLOGIA & TI
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors focus:outline-hidden"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={onViewPortfolio}
                className="text-sm font-extrabold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer flex items-center gap-1 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100"
              >
                <span className="flex h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                Portfólio do Especialista
              </button>
            </nav>

            {/* Header Actions */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:+258867409518"
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>+258 86 740 9518</span>
              </a>
              <button
                id="header-cta-btn"
                onClick={() => onOpenQuoteModal()}
                className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 text-xs font-bold shadow-sm transition-all focus:outline-hidden cursor-pointer hover:shadow-md hover:shadow-slate-900/10 active:scale-98"
              >
                Falar com Especialista
              </button>
            </div>

            {/* Hamburger Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus:outline-hidden transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[73px] left-0 right-0 z-30 bg-white border-b border-slate-200/80 shadow-lg md:hidden overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleMobileLinkClick(link.href)}
                    className="text-left py-2 text-base font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onViewPortfolio();
                  }}
                  className="text-left py-2 text-base font-extrabold text-rose-600 flex items-center gap-1.5"
                >
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                  Ver Portfólio do Especialista
                </button>
              </nav>
              <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                <a
                  href="tel:+258867409518"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-600"
                >
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span>+258 86 740 9518</span>
                </a>
                <button
                  id="mobile-header-cta"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenQuoteModal();
                  }}
                  className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3 text-center text-sm font-bold shadow-md shadow-blue-500/15 transition-all"
                >
                  Solicitar Orçamento
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
