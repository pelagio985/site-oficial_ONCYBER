import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import ServicesGrid from './components/ServicesGrid';
import Differentials from './components/Differentials';
import Testimonials from './components/Testimonials';
import LogoMarquee from './components/LogoMarquee';
import Footer from './components/Footer';
import ContactFormModal from './components/ContactFormModal';
import DeveloperPortfolio from './components/DeveloperPortfolio';
import DeviceSimulatorFrame from './components/DeviceSimulatorFrame';
import WorkspaceDashboard from './components/WorkspaceDashboard';
import { MessageSquare, ShieldCheck, Mail, Phone, ExternalLink, ArrowRight, Shield, Laptop, Smartphone, Tablet as TabletIcon, Cloud } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<'corporate' | 'portfolio' | 'workspace'>('corporate');
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'android' | 'tablet' | 'iphone'>('desktop');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<number | null>(null);

  const handleOpenQuoteModal = (serviceId: number | null = null) => {
    setPreselectedServiceId(serviceId);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setPreselectedServiceId(null);
  };

  const handleWhatsAppDirect = () => {
    const text = "Olá ONCYBER, estou navegando no portal de TI e gostaria de iniciar um atendimento consultivo.";
    const url = `https://wa.me/258867409518?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleSwitchToPortfolio = () => {
    setCurrentView('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchToWorkspace = () => {
    setCurrentView('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchToCorporate = () => {
    setCurrentView('corporate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'portfolio') {
    return (
      <DeviceSimulatorFrame activeDevice={activeDevice} onDeviceChange={setActiveDevice}>
        <DeveloperPortfolio
          onBackToCorporate={handleSwitchToCorporate}
          onOpenQuoteModal={handleOpenQuoteModal}
        />
        {/* Modal - Budget Request and Interactive Form */}
        <ContactFormModal
          isOpen={isQuoteModalOpen}
          onClose={handleCloseQuoteModal}
          preselectedServiceId={preselectedServiceId}
        />
      </DeviceSimulatorFrame>
    );
  }

  if (currentView === 'workspace') {
    return (
      <DeviceSimulatorFrame activeDevice={activeDevice} onDeviceChange={setActiveDevice}>
        <WorkspaceDashboard onBackToCorporate={handleSwitchToCorporate} />
      </DeviceSimulatorFrame>
    );
  }

  return (
    <DeviceSimulatorFrame activeDevice={activeDevice} onDeviceChange={setActiveDevice}>
      <div className="min-h-screen bg-slate-50/30 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        
        {/* Dynamic connection banner with Multi-Device Version Selector */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white text-xs py-2.5 px-4 text-center border-b border-slate-800/80 flex flex-col xl:flex-row items-center justify-between gap-4 z-50">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-mono font-bold text-rose-400 uppercase tracking-wider">
              <Shield className="h-3.5 w-3.5 animate-pulse text-rose-500" />
              Especialista Cyber:
            </span>
            <span className="text-slate-300">Pelágio Marrune Raipo</span>
            <button
              onClick={handleSwitchToPortfolio}
              className="text-white hover:text-rose-400 font-extrabold underline flex items-center gap-1 transition-colors cursor-pointer ml-1"
            >
              <span>Ver Portfólio</span>
              <ArrowRight className="h-3 w-3" />
            </button>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <button
              onClick={handleSwitchToWorkspace}
              className="text-blue-400 hover:text-blue-300 font-extrabold underline flex items-center gap-1 transition-colors cursor-pointer ml-1"
            >
              <Cloud className="h-3 w-3 text-blue-500" />
              <span>ONCYBER Cloud Hub (Workspace)</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Quick Version Switcher */}
          <div className="flex items-center gap-2 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mr-1">Versão do Projeto:</span>
            
            <button
              onClick={() => setActiveDevice('desktop')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition-all ${
                activeDevice === 'desktop'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Versão Web (Site Corporativo)"
            >
              <Laptop className="h-3.5 w-3.5" />
              <span className="text-[11px]">Site</span>
            </button>

            <button
              onClick={() => setActiveDevice('android')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition-all ${
                activeDevice === 'android'
                  ? 'bg-rose-600/20 text-rose-400 border border-rose-500/30 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Versão App Android"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span className="text-[11px]">App Android</span>
            </button>

            <button
              onClick={() => setActiveDevice('iphone')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition-all ${
                activeDevice === 'iphone'
                  ? 'bg-rose-600/20 text-rose-400 border border-rose-500/30 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Versão App Apple iOS"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span className="text-[11px]">App Apple</span>
            </button>

            <button
              onClick={() => setActiveDevice('tablet')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition-all ${
                activeDevice === 'tablet'
                  ? 'bg-rose-600/20 text-rose-400 border border-rose-500/30 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Versão App Tablet"
            >
              <TabletIcon className="h-3.5 w-3.5" />
              <span className="text-[11px]">Tablet</span>
            </button>
          </div>
        </div>

        {/* Sticky Premium Header */}
        <Header onOpenQuoteModal={handleOpenQuoteModal} onViewPortfolio={handleSwitchToPortfolio} />

      {/* Main Page Content */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero onOpenQuoteModal={handleOpenQuoteModal} />

        {/* Dynamic Animated Stats Section */}
        <StatsSection />

        {/* 8-Column Services Grid Portfólio Section */}
        <ServicesGrid onOpenQuoteModal={handleOpenQuoteModal} />

        {/* Logo Scroll Marquee (Google, Meta, Nvidia, Xbox, Playstation, X) */}
        <LogoMarquee />

        {/* Differentials section */}
        <Differentials />

        {/* Testimonials Review Social Proof Section */}
        <Testimonials />

        {/* Elegant Bottom Call to Action banner before footer */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white relative overflow-hidden">
          {/* Subtle tech grid elements in the background */}
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              Garantia de Disponibilidade & Segurança
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto">
              Pronto para Otimizar e Proteger a Infraestrutura Digital da Sua Empresa?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Fale diretamente com os nossos analistas seniores em Moçambique e agende um diagnóstico técnico gratuito da sua rede corporativa.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                id="footer-banner-primary-cta"
                onClick={() => handleOpenQuoteModal()}
                className="w-full sm:w-auto rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-sm font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all text-center cursor-pointer"
              >
                Solicitar Diagnóstico Técnico
              </button>
              <button
                id="footer-banner-whatsapp-cta"
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-800/80 hover:bg-slate-800 text-slate-200 px-8 py-4 text-sm font-bold transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Falar via WhatsApp</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Support Details */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-500 pt-6">
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-blue-400" />
                +258 867 409 518
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-blue-400" />
                pelagio985@gmail.com
              </span>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Section */}
      <Footer onViewPortfolio={handleSwitchToPortfolio} />

      {/* Floating Interactive WhatsApp Chat FAB (Bottom-Right) */}
      <motion.button
        id="floating-whatsapp-fab"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', delay: 1, stiffness: 260, damping: 20 }}
        onClick={handleWhatsAppDirect}
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white h-14 w-14 rounded-full flex items-center justify-center shadow-xl shadow-emerald-600/20 hover:shadow-emerald-600/45 hover:-translate-y-1 active:translate-y-0 transition-all cursor-pointer group"
        title="Falar no WhatsApp"
      >
        <MessageSquare className="h-6 w-6 group-hover:scale-110 transition-transform" />
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
          Fale Conosco Online
        </span>
      </motion.button>

      {/* Modal - Budget Request and Interactive Form */}
      <ContactFormModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
        preselectedServiceId={preselectedServiceId}
      />
    </div>
    </DeviceSimulatorFrame>
  );
}
