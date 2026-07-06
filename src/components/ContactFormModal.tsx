import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Send, ChevronRight, MessageSquare, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data';
import { QuoteRequest } from '../types';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: number | null;
}

export default function ContactFormModal({ isOpen, onClose, preselectedServiceId }: ContactFormModalProps) {
  const [formData, setFormData] = useState<QuoteRequest>({
    name: '',
    email: '',
    phone: '',
    company: '',
    selectedServices: [],
    message: '',
    urgency: 'medium',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingPhrases = [
    "Analisando requisitos do escopo...",
    "Estruturando escalabilidade operacional...",
    "Otimizando custos e orçamentos...",
    "Gerando proposta técnica final..."
  ];

  useEffect(() => {
    if (isOpen) {
      if (preselectedServiceId) {
        setFormData(prev => ({
          ...prev,
          selectedServices: [preselectedServiceId]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          selectedServices: []
        }));
      }
      setStatus('idle');
      setLoadingStep(0);
    }
  }, [isOpen, preselectedServiceId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'submitting') {
      if (loadingStep < loadingPhrases.length) {
        timer = setTimeout(() => {
          setLoadingStep(prev => prev + 1);
        }, 800);
      } else {
        setStatus('success');
      }
    }
    return () => clearTimeout(timer);
  }, [status, loadingStep]);

  const handleToggleService = (id: number) => {
    setFormData(prev => {
      const exists = prev.selectedServices.includes(id);
      if (exists) {
        return {
          ...prev,
          selectedServices: prev.selectedServices.filter(sid => sid !== id)
        };
      } else {
        return {
          ...prev,
          selectedServices: [...prev.selectedServices, id]
        };
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Por favor, preencha todos os campos obrigatórios (*)");
      return;
    }
    setStatus('submitting');
    setLoadingStep(0);
  };

  const handleWhatsAppRedirect = () => {
    const selectedNames = SERVICES_DATA
      .filter(s => formData.selectedServices.includes(s.id))
      .map(s => s.title)
      .join(', ');

    const text = `Olá ONCYBER, gostaria de solicitar um orçamento corporativo de TI.
*Nome:* ${formData.name}
*Empresa:* ${formData.company || 'Não informada'}
*E-mail:* ${formData.email}
*Telefone:* ${formData.phone}
*Serviços de interesse:* ${selectedNames || 'Geral'}
*Mensagem:* ${formData.message || 'Gostaria de uma avaliação inicial.'}`;

    const url = `https://wa.me/258867409518?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            id="quote-modal-container"
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600 animate-pulse" />
                <h3 className="font-display text-lg font-bold text-slate-900">
                  {status === 'success' ? 'Solicitação Recebida' : 'Falar com Especialista / Orçamento'}
                </h3>
              </div>
              <button
                id="close-modal-btn"
                onClick={onClose}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {status === 'idle' && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Selecione abaixo os serviços de TI que sua empresa necessita. Preencha seus dados corporativos para que nossa equipe técnica elabore uma proposta personalizada de alto nível.
                  </p>

                  {/* Services Selection Chips */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
                      Serviços Desejados <span className="text-blue-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SERVICES_DATA.map(service => {
                        const isSelected = formData.selectedServices.includes(service.id);
                        return (
                          <button
                            id={`select-service-${service.id}`}
                            key={service.id}
                            type="button"
                            onClick={() => handleToggleService(service.id)}
                            className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                              isSelected
                                ? 'bg-blue-50/70 border-blue-200 text-blue-900 ring-2 ring-blue-500/15'
                                : 'bg-slate-50/50 border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                              isSelected
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                            </span>
                            <span className="text-xs font-medium leading-tight">{service.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Seu Nome Completo <span className="text-blue-500">*</span>
                      </label>
                      <input
                        id="form-input-name"
                        type="text"
                        name="name"
                        required
                        placeholder="Ex: Carlos Simango"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Nome da Empresa
                      </label>
                      <input
                        id="form-input-company"
                        type="text"
                        name="company"
                        placeholder="Ex: Soluções Norte Lda"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        E-mail Corporativo <span className="text-blue-500">*</span>
                      </label>
                      <input
                        id="form-input-email"
                        type="email"
                        name="email"
                        required
                        placeholder="Ex: contato@suaempresa.co.mz"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Telefone / Celular (WhatsApp) <span className="text-blue-500">*</span>
                      </label>
                      <input
                        id="form-input-phone"
                        type="tel"
                        name="phone"
                        required
                        placeholder="Ex: +258 86 740 9518"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Nível de Urgência
                      </label>
                      <select
                        id="form-select-urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      >
                        <option value="low">Baixa — Apenas Planejamento / Cotação</option>
                        <option value="medium">Média — Necessário para próximas semanas</option>
                        <option value="high">Alta — Crítico / Problema ativo de infraestrutura</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Melhor Horário para Retorno
                      </label>
                      <input
                        id="form-input-time"
                        type="text"
                        placeholder="Ex: Período da manhã (8h às 12h)"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Descreva Brevemente o Desafio ou Infraestrutura Atual
                    </label>
                    <textarea
                      id="form-textarea-message"
                      name="message"
                      rows={3}
                      placeholder="Ex: Precisamos organizar nossos racks, estruturar um backup robusto e configurar um servidor local..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                    <button
                      id="cancel-modal-btn"
                      type="button"
                      onClick={onClose}
                      className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      id="submit-modal-btn"
                      type="submit"
                      className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/35 transition-all cursor-pointer"
                    >
                      <span>Solicitar Diagnóstico</span>
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}

              {status === 'submitting' && (
                <div className="py-16 flex flex-col items-center justify-center">
                  <div className="relative mb-6">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-100 border-t-blue-600" />
                    <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-blue-500 animate-pulse" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-slate-900 mb-2">
                    Processando sua Solicitação
                  </h4>
                  <p className="text-sm text-slate-500 animate-pulse min-h-[1.5rem] font-mono">
                    {loadingPhrases[Math.min(loadingStep, loadingPhrases.length - 1)]}
                  </p>
                </div>
              )}

              {status === 'success' && (
                <div className="py-8 text-center max-w-lg mx-auto">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <Check className="h-8 w-8 stroke-[3]" />
                  </div>
                  <h4 className="font-display text-2xl font-bold text-slate-900 mb-3">
                    Proposta Pré-Configurada!
                  </h4>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    Muito obrigado, <strong className="text-slate-900">{formData.name}</strong>. Nossa equipe técnica de analistas seniores em <strong>Cabo Delgado</strong> já recebeu seus dados e iniciou o estudo de viabilidade.
                  </p>

                  <div className="mb-8 rounded-2xl bg-slate-50 border border-slate-100 p-5 text-left space-y-3.5">
                    <h5 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Resumo da Cotação Corporativa
                    </h5>
                    <div className="grid grid-cols-2 gap-y-2 text-xs">
                      <span className="text-slate-500">Solicitante:</span>
                      <span className="font-medium text-slate-800 text-right">{formData.name}</span>
                      
                      <span className="text-slate-500">Empresa:</span>
                      <span className="font-medium text-slate-800 text-right">{formData.company || 'Pessoa Física'}</span>
                      
                      <span className="text-slate-500">Urgência:</span>
                      <span className={`font-semibold text-right ${
                        formData.urgency === 'high' ? 'text-red-600' : formData.urgency === 'medium' ? 'text-blue-600' : 'text-slate-600'
                      }`}>
                        {formData.urgency === 'high' ? 'Crítica (Atendimento Imediato)' : formData.urgency === 'medium' ? 'Média (Em Planejamento)' : 'Baixa'}
                      </span>
                    </div>
                    <div className="border-t border-slate-200/60 pt-3">
                      <span className="block text-xs text-slate-500 mb-1.5">Serviços Selecionados:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {formData.selectedServices.length > 0 ? (
                          SERVICES_DATA.filter(s => formData.selectedServices.includes(s.id)).map(s => (
                            <span key={s.id} className="inline-flex items-center gap-1 rounded bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-800">
                              <Check className="h-2.5 w-2.5" />
                              {s.title}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-500 italic">Atendimento Geral em TI</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                    <button
                      id="whatsapp-redirect-btn"
                      onClick={handleWhatsAppRedirect}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/35 transition-all cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Falar no WhatsApp Agora</span>
                    </button>
                    <button
                      id="close-success-btn"
                      onClick={onClose}
                      className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700 transition-all"
                    >
                      Voltar ao Portal
                    </button>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      pelagio985@gmail.com
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" />
                      +258 867409518
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
