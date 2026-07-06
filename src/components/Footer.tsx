import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  BookOpen,
  Cpu,
  ArrowUp,
  Send,
  CheckCircle2,
  Github,
  MessageCircle
} from 'lucide-react';
import React, { useState } from 'react';

interface FooterProps {
  onViewPortfolio?: () => void;
}

export default function Footer({ onViewPortfolio }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-slate-900 text-slate-400 pt-20 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-slate-800">
          
          {/* Logo Brand Info Column */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/10">
                <Cpu className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-black text-white tracking-tight leading-none">
                  ON<span className="text-blue-500">CYBER</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase mt-0.5">
                  TECNOLOGIA & TI
                </span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Consolidando a infraestrutura de TI corporativa de grandes e médios escritórios em Cabo Delgado. Segurança, inovação tecnológica, agilidade e excelência consultiva.
            </p>

            {/* Social Media Link Icons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="https://instagram.com/oncyber985"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-slate-800/80 hover:bg-pink-600 hover:text-white hover:border-pink-500/50 flex items-center justify-center text-slate-400 transition-all border border-slate-800"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://wa.me/258867409518?text=Olá%20ONCYBER%2C%20gostaria%20de%20saber%20mais%20sobre%20as%20soluções%20de%20TI."
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-slate-800/80 hover:bg-emerald-600 hover:text-white hover:border-emerald-500/50 flex items-center justify-center text-slate-400 transition-all border border-slate-800"
                aria-label="WhatsApp Business"
                title="WhatsApp Business"
              >
                <MessageCircle className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://github.com/oncyber985"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:text-white hover:border-slate-600 flex items-center justify-center text-slate-400 transition-all border border-slate-800"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://oncyber985.blogspot.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-slate-800/80 hover:bg-orange-600 hover:text-white hover:border-orange-500/50 flex items-center justify-center text-slate-400 transition-all border border-slate-800"
                aria-label="Blogger"
                title="Blogger"
              >
                <BookOpen className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/pelagio-raipo"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-slate-800/80 hover:bg-blue-600 hover:text-white hover:border-blue-500/50 flex items-center justify-center text-slate-400 transition-all border border-slate-800"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://twitter.com/oncyber985"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-slate-800/80 hover:bg-sky-500 hover:text-white hover:border-sky-400/50 flex items-center justify-center text-slate-400 transition-all border border-slate-800"
                aria-label="Twitter"
                title="Twitter"
              >
                <Twitter className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-slate-800/80 hover:bg-red-600 hover:text-white hover:border-red-500/50 flex items-center justify-center text-slate-400 transition-all border border-slate-800"
                aria-label="YouTube"
                title="YouTube"
              >
                <Youtube className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links Navigation Column */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">Navegação</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-blue-500 transition-colors">Início</a></li>
              <li><a href="#services" className="hover:text-blue-500 transition-colors">Nossos Serviços</a></li>
              <li><a href="#differentials" className="hover:text-blue-500 transition-colors">Diferenciais</a></li>
              <li><a href="#testimonials" className="hover:text-blue-500 transition-colors">Casos de Sucesso</a></li>
              {onViewPortfolio && (
                <li>
                  <button
                    onClick={onViewPortfolio}
                    className="text-rose-400 hover:text-rose-300 font-bold transition-colors cursor-pointer text-left"
                  >
                    🛡️ Portfólio Pelágio
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Direct Contacts Info Column */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">Fale Conosco</h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Cabo Delgado — Pemba Cariacó<br />
                  Moçambique
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-blue-500 shrink-0" />
                <a href="mailto:pelagio985@gmail.com" className="hover:text-blue-500 transition-colors">
                  pelagio985@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-blue-500 shrink-0" />
                <a href="tel:+258867409518" className="hover:text-blue-500 transition-colors">
                  +258 867 409 518
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe Column */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">Newsletter TI</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Receba insights técnicos, atualizações de cibersegurança e novidades da ONCYBER.
            </p>
            {isSubscribed ? (
              <div className="flex items-center gap-2 rounded-xl bg-slate-800 p-3.5 text-xs text-emerald-400 border border-slate-700">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Cadastro realizado com sucesso!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  placeholder="Seu e-mail..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
                />
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-3.5 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Inscrever"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Lower row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} <span className="font-bold text-slate-300">ONCYBER</span> todos os direitos reservados, desenvolvido por <span className="text-slate-300 font-semibold">pelagio marrune raipo</span>.
          </p>
          <div className="flex items-center gap-6">
            <a href="#services" className="hover:text-blue-500 transition-colors">Políticas de TI</a>
            <a href="#contact" className="hover:text-blue-500 transition-colors">Termos de Serviço</a>
            <button
              id="back-to-top-btn"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-blue-500 transition-all text-[11px] font-bold uppercase tracking-wider"
            >
              <span>Topo</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
