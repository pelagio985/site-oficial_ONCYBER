import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LifeBuoy,
  ShieldAlert,
  Network,
  Cloud,
  Cpu,
  Monitor,
  ShoppingCart,
  Zap,
  Check,
  ArrowRight,
  Search,
  SlidersHorizontal,
  X,
  MessageSquare
} from 'lucide-react';
import { SERVICES_DATA } from '../data';
import { Service } from '../types';

interface ServicesGridProps {
  onOpenQuoteModal: (serviceId?: number | null) => void;
}

// Icon Mapping helper to safely render Lucide icons in React 19
const IconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  LifeBuoy: LifeBuoy,
  ShieldAlert: ShieldAlert,
  Network: Network,
  Cloud: Cloud,
  Cpu: Cpu,
  Monitor: Monitor,
  ShoppingCart: ShoppingCart,
  Zap: Zap,
};

export default function ServicesGrid({ onOpenQuoteModal }: ServicesGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'suporte' | 'seguranca' | 'infra' | 'vendas'>('all');
  const [activeDetailService, setActiveDetailService] = useState<Service | null>(null);

  // Group services internally for easy filtering tags
  const categorizeService = (id: number): string => {
    if ([1, 5, 6].includes(id)) return 'suporte';
    if ([2].includes(id)) return 'seguranca';
    if ([3, 4].includes(id)) return 'infra';
    return 'vendas'; // 7, 8
  };

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const category = categorizeService(service.id);
      const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <section
      id="services"
      className="py-24 bg-slate-50/70 border-y border-slate-100 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title of Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Portfólio de Serviços
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Soluções Completas de TI em 8 Pilares Estratégicos
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            Disponibilizamos suporte consultivo inteligente e serviços de infraestrutura projetados sob medida para elevar a segurança e eficiência da sua empresa.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              id="service-search-input"
              type="text"
              placeholder="Pesquisar serviço (ex: backup, redes, suporte)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filtrar:
            </span>
            <button
              id="filter-category-all"
              onClick={() => setSelectedCategory('all')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100'
              }`}
            >
              Todos (8)
            </button>
            <button
              id="filter-category-support"
              onClick={() => setSelectedCategory('suporte')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                selectedCategory === 'suporte'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100'
              }`}
            >
              Suporte & Setup
            </button>
            <button
              id="filter-category-security"
              onClick={() => setSelectedCategory('seguranca')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                selectedCategory === 'seguranca'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100'
              }`}
            >
              Segurança
            </button>
            <button
              id="filter-category-infra"
              onClick={() => setSelectedCategory('infra')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                selectedCategory === 'infra'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100'
              }`}
            >
              Infra & Cloud
            </button>
            <button
              id="filter-category-vendas"
              onClick={() => setSelectedCategory('vendas')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                selectedCategory === 'vendas'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100'
              }`}
            >
              Equipamentos & Mkt
            </button>
          </div>
        </div>

        {/* 8-Service Columns Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service, index) => {
              const IconComp = IconMap[service.iconName] || LifeBuoy;
              return (
                <motion.div
                  id={`service-card-${service.id}`}
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-2xl border border-slate-100/90 shadow-sm p-6 flex flex-col justify-between group hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Subtle Top Accent Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-400 transition-colors" />

                  <div className="space-y-4">
                    {/* Service Icon Container */}
                    <div className="h-12 w-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100/50 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-all duration-300">
                      <IconComp className="h-5 w-5" />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        PILAR 0{service.id}
                      </p>
                      <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed min-h-[3.5rem]">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions in Footer of Card */}
                  <div className="mt-5 pt-4 border-t border-slate-100/60 flex items-center justify-between">
                    <button
                      id={`open-detail-btn-${service.id}`}
                      onClick={() => setActiveDetailService(service)}
                      className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1 transition-colors"
                    >
                      <span>Ver detalhes</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      id={`request-service-btn-${service.id}`}
                      onClick={() => onOpenQuoteModal(service.id)}
                      className="rounded-lg bg-slate-50 text-slate-700 hover:bg-blue-600 hover:text-white px-3 py-1.5 text-[10px] font-extrabold transition-all cursor-pointer"
                    >
                      Cotar
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-100/90 max-w-lg mx-auto">
            <p className="text-slate-400 text-sm">Nenhum serviço correspondente ao termo pesquisado.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="mt-4 text-xs font-bold text-blue-600 underline"
            >
              Resetar filtros e pesquisa
            </button>
          </div>
        )}
      </div>

      {/* Expanded Service Detail Modal */}
      <AnimatePresence>
        {activeDetailService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDetailService(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            <motion.div
              id="service-detail-modal"
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-xl p-6 overflow-hidden z-10 text-left"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                    {(() => {
                      const IconComp = IconMap[activeDetailService.iconName] || LifeBuoy;
                      return <IconComp className="h-5 w-5" />;
                    })()}
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Serviço Pilar 0{activeDetailService.id}</span>
                    <h4 className="font-display font-bold text-slate-900 leading-tight">{activeDetailService.title}</h4>
                  </div>
                </div>
                <button
                  id="close-detail-modal-btn"
                  onClick={() => setActiveDetailService(null)}
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Core Description */}
              <p className="text-xs text-slate-600 leading-relaxed mb-5">
                {activeDetailService.longDescription}
              </p>

              {/* Scope/Deliverables bullet list */}
              <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100/80">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Escopo & Entregáveis</span>
                <ul className="space-y-2">
                  {activeDetailService.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons inside dialog */}
              <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <button
                  onClick={() => setActiveDetailService(null)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-700"
                >
                  Voltar
                </button>
                <button
                  id="detail-modal-request-btn"
                  onClick={() => {
                    const id = activeDetailService.id;
                    setActiveDetailService(null);
                    onOpenQuoteModal(id);
                  }}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-xs font-bold shadow-md shadow-blue-500/10 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Solicitar Orçamento</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
