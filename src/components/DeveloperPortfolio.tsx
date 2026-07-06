import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldAlert,
  ShieldCheck,
  Cpu,
  Terminal,
  Server,
  Code,
  Globe,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Award,
  Lock,
  Eye,
  Activity,
  User,
  Chrome,
  Share2,
  Flame,
  Satellite,
  Smartphone,
  MessageCircle,
  Github,
  Linkedin,
  Twitter,
  BookOpen
} from 'lucide-react';

interface DeveloperPortfolioProps {
  onBackToCorporate: () => void;
  onOpenQuoteModal: (serviceId?: number | null) => void;
}

export default function DeveloperPortfolio({ onBackToCorporate, onOpenQuoteModal }: DeveloperPortfolioProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const qualities = [
    {
      title: "Red Team Ops (Ataque)",
      desc: "Simulação realista de adversários cibernéticos, testes de intrusão avançados (Pentesting), engenharia social autorizada e exploração de falhas em ativos digitais.",
      icon: Terminal,
      color: "border-rose-500/20 text-rose-500 bg-rose-500/5"
    },
    {
      title: "Blue Team Defense (Defesa)",
      desc: "Monitoramento contínuo de segurança (SOC), endurecimento de sistemas (Hardening), resposta a incidentes críticos, auditoria forense e blindagem preventiva.",
      icon: ShieldCheck,
      color: "border-blue-500/20 text-blue-500 bg-blue-500/5"
    },
    {
      title: "Arquitetura Cloud & Redes",
      desc: "Desenvolvimento de topologias de rede seguras, roteamento avançado, migração de datacenters e automação de infraestrutura em nuvem híbrida com resiliência.",
      icon: Server,
      color: "border-cyan-500/20 text-cyan-500 bg-cyan-500/5"
    },
    {
      title: "Desenvolvimento Seguro (DevSecOps)",
      desc: "Escrita de código otimizado, criação de Landing Pages de alta velocidade integrando APIs seguras e implementação de esteiras de integração contínua.",
      icon: Code,
      color: "border-emerald-500/20 text-emerald-500 bg-emerald-50/5"
    }
  ];

  const projects = [
    {
      id: 1,
      title: "Operação Cabo Delgado CyberShield",
      category: "Segurança Ofensiva & Defensiva",
      description: "Auditoria de segurança de ponta a ponta e simulação completa de intrusão em uma grande empresa de engenharia e logística de Pemba, resultando em 100% de blindagem pós-mitigação.",
      metrics: "Vulnerabilidades críticas mitigadas: 18 | Segurança elevada: 100%",
      techs: ["Pentest", "WAF Hardening", "Firewalling", "VLAN Segmentation"],
      scope: "Fizemos a simulação completa de ataque (Red Team) seguida da implementação dos controles definitivos de proteção e monitoramento (Blue Team)."
    },
    {
      id: 2,
      title: "Projeto Starlink CloudSync",
      category: "Infraestrutura de Redes em Nuvem",
      description: "Otimização de rede redundante corporativa integrando receptores Starlink a redes locais legadas em locais remotos de Moçambique, com backup em nuvem contínuo em tempo real.",
      metrics: "Latência reduzida em 40% | Uptime: 99.99%",
      techs: ["Starlink Ops", "AWS Cloud", "SD-WAN Routing", "Automated Backup"],
      scope: "Projeto pioneiro para escritórios rurais e corporações no norte de Moçambique que necessitam de conexão ininterrupta de dados confidenciais."
    },
    {
      id: 3,
      title: "Desenvolvimento de Plataforma SecureFin",
      category: "Full-Stack & APIs Seguras",
      description: "Criação de landing pages e portais web com integração a canais de atendimento e faturas digitais, focados na segurança de dados do cliente sob a LGPD/proteção de privacidade.",
      metrics: "Velocidade de carregamento: 98/100 | Proteção integral de cookies",
      techs: ["React 19", "Tailwind CSS v4", "API Proxying", "NodeJS Security"],
      scope: "Desenho estético sofisticado, responsividade milimétrica e validação total dos campos contra SQL Injection e Cross-Site Scripting (XSS)."
    }
  ];

  const partners = [
    { name: "Google", icon: Chrome },
    { name: "Meta", icon: Share2 },
    { name: "Starlink", icon: Satellite },
    { name: "NVIDIA", icon: Flame }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const handleWhatsAppDirect = () => {
    const text = "Olá Pelágio Raipo, li o seu portfólio profissional e gostaria de agendar uma consultoria técnica especializada de TI/Segurança.";
    const url = `https://wa.me/258867409518?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-rose-600 selection:text-white relative font-sans">
      
      {/* Decorative Grid and Ambient Lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-20" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-rose-600/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Floating Top Bar (Return Connection) */}
      <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              Cybersecurity Expert Portfolio
            </span>
          </div>
          <button
            onClick={onBackToCorporate}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-xs font-extrabold text-blue-400 px-4 py-2 transition-all cursor-pointer hover:border-blue-500/30"
          >
            <span>Voltar ao Portal ONCYBER</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Portfolio Hero */}
      <section className="relative pt-16 pb-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Texts */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/5 px-3.5 py-1.5 text-xs font-semibold text-rose-400">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Especialista Certificado em Cibersegurança</span>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm font-mono tracking-widest text-slate-400 uppercase">Consultor de TI & Infraestrutura</span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                  Pelágio Marrune Raipo
                </h1>
              </div>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
                Especialista focado em segurança ofensiva (<strong className="text-rose-400">Red Team</strong>) e defensiva (<strong className="text-blue-400">Blue Team</strong>). Combino anos de experiência prática na estruturação de redes de alto desempenho, migração de nuvem resiliente e administração de sistemas de alta criticidade. Desenhando soluções digitais seguras de ponta a ponta.
              </p>

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleWhatsAppDirect}
                  className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-6 py-3.5 text-xs font-bold transition-all shadow-lg shadow-rose-600/10 hover:shadow-rose-600/30 cursor-pointer"
                >
                  Agendar Consultoria Direta
                </button>
                <button
                  onClick={onBackToCorporate}
                  className="rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-300 px-6 py-3.5 text-xs font-bold transition-all"
                >
                  Ver Soluções Corporativas
                </button>
              </div>

              {/* Bio Meta details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-900 text-xs">
                <div>
                  <span className="block text-slate-500 mb-0.5">Disponibilidade</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Moçambique & Remoto
                  </span>
                </div>
                <div>
                  <span className="block text-slate-500 mb-0.5">Atuação Principal</span>
                  <span className="font-bold text-slate-300">Auditoria & Cibersegurança</span>
                </div>
                <div>
                  <span className="block text-slate-500 mb-0.5">Contato de TI</span>
                  <a href="mailto:pelagio985@gmail.com" className="font-bold text-blue-400 hover:underline">
                    pelagio985@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Beautiful Portrait Image preserving full vertical composition */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 rounded-2xl blur-lg opacity-40 animate-pulse" />
              <div className="relative rounded-2xl border border-slate-800 bg-slate-900/90 p-2.5 shadow-2xl overflow-hidden text-left group">
                
                {/* Scanner Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(244,63,94,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-10" />
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950/80 pointer-events-none z-10" />
                
                {/* Scanner Laser Bar Animation */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-rose-500/60 shadow-[0_0_10px_#f43f5e] animate-[bounce_5s_infinite] pointer-events-none z-20" />

                <img
                  src="/src/assets/images/hacker_mozambique_profile_1783334334937.jpg"
                  alt="Pelágio Marrune Raipo - Cybersecurity Specialist"
                  className="rounded-xl w-full h-auto object-cover aspect-[9/16] hover:scale-102 transition-transform duration-500 border border-slate-800/60 relative z-0"
                  referrerPolicy="no-referrer"
                />

                {/* Tactical Cyber HUD Overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-slate-950/90 backdrop-blur-md rounded-xl p-4 border border-slate-800/80 z-20">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono text-rose-500 font-bold tracking-widest">TACTICAL PROTOCOL</span>
                    <span className="text-[9px] font-mono text-slate-500">ACTIVE SESSION</span>
                  </div>
                  <p className="text-xs font-bold font-display text-white">Security Operation Level: SENIOR</p>
                  <div className="flex items-center gap-4 mt-2 text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Red Team
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Blue Team
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Skills / Qualities Section */}
      <section className="py-20 bg-slate-950/80 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-500">Expertise Técnica</span>
            <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">Qualidades & Domínio Profissional</h2>
            <p className="text-slate-400 text-sm">Abordagem analítica rigorosa para identificar falhas físicas, lógicas e operacionais em ambientes digitais.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualities.map((q) => {
              const Icon = q.icon;
              return (
                <div
                  key={q.title}
                  className="border border-slate-900 bg-slate-900/40 rounded-2xl p-6 text-left hover:border-slate-800 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className={`h-12 w-12 rounded-xl border flex items-center justify-center ${q.color}`}>
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-display font-bold text-white text-base">{q.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed min-h-[5rem]">{q.desc}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-950 flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Habilidade Consolidada</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Fictional/Realized Projects */}
      <section className="py-24 bg-slate-950 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-500">Histórico de Casos</span>
            <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">Projetos Executados de Alto Impacto</h2>
            <p className="text-slate-400 text-sm">Projetos reais e modelados aplicando arquitetura resiliente corporativa e resposta a incidentes.</p>
          </div>

          <div className="space-y-8">
            {projects.map((proj, i) => (
              <div
                id={`portfolio-project-${proj.id}`}
                key={proj.id}
                className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 sm:p-8 hover:border-slate-800 transition-all text-left flex flex-col lg:flex-row items-stretch gap-8 relative overflow-hidden"
              >
                {/* Visual marker index */}
                <div className="absolute top-0 right-0 p-4 font-mono font-extrabold text-slate-800/20 text-5xl">
                  0{i + 1}
                </div>

                <div className="flex-1 space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-rose-500 uppercase tracking-widest bg-rose-500/5 px-2.5 py-1 rounded-full border border-rose-500/10 inline-block">
                      {proj.category}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white">{proj.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">{proj.description}</p>
                  </div>

                  <div className="text-xs text-slate-300 font-mono bg-slate-950/60 p-3 rounded-lg border border-slate-900">
                    <strong className="text-rose-400">Escopo Técnico:</strong> {proj.scope}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {proj.techs.map((tech) => (
                      <span key={tech} className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] text-slate-400 font-mono font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full lg:w-72 bg-slate-900/50 p-6 rounded-xl border border-slate-800/80 flex flex-col justify-between relative z-10">
                  <div>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase mb-2">Métricas de Sucesso</span>
                    <p className="text-xs font-bold font-display text-white leading-relaxed">{proj.metrics}</p>
                  </div>
                  <button
                    onClick={handleWhatsAppDirect}
                    className="mt-6 flex items-center justify-center gap-1.5 w-full rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white py-2.5 transition-all cursor-pointer border border-slate-700"
                  >
                    <span>Ver Estudo de Caso</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-16 bg-slate-950 border-t border-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Empresas & Parceiros Conectados</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partners.map((p) => {
              const IconComp = p.icon;
              return (
                <div key={p.name} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors cursor-default select-none">
                  <IconComp className="h-5 w-5" />
                  <span className="font-display font-black text-sm tracking-tight">{p.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Contact Section */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-500">Fale Com o Especialista</span>
            <h2 className="font-display text-3xl font-extrabold text-white">Iniciar Cotação ou Consultoria de Segurança</h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              Traga os desafios de segurança da informação, suporte de rede ou backup de dados do seu negócio. Elaboramos soluções de excelência de forma direta e discreta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Direct Information / Official Channels */}
            <div className="md:col-span-6 bg-slate-900/40 border border-slate-900 rounded-2xl p-6 text-left space-y-6">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <h4 className="text-sm font-bold text-white">Canais Oficiais</h4>
                <span className="text-[9px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20 font-bold tracking-wider">VERIFICADO</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* 1. Telefone Celular */}
                <div className="bg-slate-950/40 border border-slate-900/80 p-3.5 rounded-xl space-y-1.5 hover:border-rose-500/30 transition-all group">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-rose-500 group-hover:scale-110 transition-transform shrink-0" />
                    <span className="font-bold text-slate-300">Telefone Celular</span>
                  </div>
                  <a href="tel:+258867409518" className="block text-slate-400 hover:text-white transition-colors">
                    +258 86 740 9518
                  </a>
                </div>

                {/* 2. Localização */}
                <div className="bg-slate-950/40 border border-slate-900/80 p-3.5 rounded-xl space-y-1.5 hover:border-rose-500/30 transition-all group">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-rose-500 group-hover:scale-110 transition-transform shrink-0" />
                    <span className="font-bold text-slate-300">Localização</span>
                  </div>
                  <span className="block text-slate-400 leading-tight">
                    Cabo Delgado — Pemba Cariacó
                  </span>
                </div>

                {/* 3. Email */}
                <div className="bg-slate-950/40 border border-slate-900/80 p-3.5 rounded-xl space-y-1.5 hover:border-rose-500/30 transition-all group">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-rose-500 group-hover:scale-110 transition-transform shrink-0" />
                    <span className="font-bold text-slate-300">E-mail</span>
                  </div>
                  <a href="mailto:pelagio985@gmail.com" className="block text-slate-400 hover:text-white transition-colors truncate" title="pelagio985@gmail.com">
                    pelagio985@gmail.com
                  </a>
                </div>

                {/* 4. WhatsApp Business */}
                <div className="bg-slate-950/40 border border-slate-900/80 p-3.5 rounded-xl space-y-1.5 hover:border-emerald-500/30 transition-all group">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-emerald-500 group-hover:scale-110 transition-transform shrink-0" />
                    <span className="font-bold text-slate-300 flex items-center gap-1">
                      WhatsApp <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1 rounded-sm font-black">BIZ</span>
                    </span>
                  </div>
                  <a 
                    href="https://wa.me/258867409518?text=Olá%20Pelágio%20Raipo,%20gostaria%20de%20agendar%20uma%20consultoria%20técnica." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    +258 86 740 9518
                  </a>
                </div>

                {/* 5. GitHub */}
                <div className="bg-slate-950/40 border border-slate-900/80 p-3.5 rounded-xl space-y-1.5 hover:border-blue-500/30 transition-all group">
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-slate-300 group-hover:scale-110 transition-transform shrink-0" />
                    <span className="font-bold text-slate-300">GitHub</span>
                  </div>
                  <a 
                    href="https://github.com/oncyber985" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block text-slate-400 hover:text-white transition-colors truncate"
                  >
                    github.com/oncyber985
                  </a>
                </div>

                {/* 6. Blogger */}
                <div className="bg-slate-950/40 border border-slate-900/80 p-3.5 rounded-xl space-y-1.5 hover:border-orange-500/30 transition-all group">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-orange-500 group-hover:scale-110 transition-transform shrink-0" />
                    <span className="font-bold text-slate-300">Blogger</span>
                  </div>
                  <a 
                    href="https://oncyber985.blogspot.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block text-slate-400 hover:text-white transition-colors truncate"
                  >
                    oncyber985.blogspot.com
                  </a>
                </div>

                {/* 7. LinkedIn */}
                <div className="bg-slate-950/40 border border-slate-900/80 p-3.5 rounded-xl space-y-1.5 hover:border-blue-400/30 transition-all group">
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform shrink-0" />
                    <span className="font-bold text-slate-300">LinkedIn</span>
                  </div>
                  <a 
                    href="https://www.linkedin.com/in/pelagio-raipo" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block text-slate-400 hover:text-white transition-colors truncate"
                  >
                    linkedin.com/in/pelagio-raipo
                  </a>
                </div>

                {/* 8. Twitter */}
                <div className="bg-slate-950/40 border border-slate-900/80 p-3.5 rounded-xl space-y-1.5 hover:border-sky-400/30 transition-all group">
                  <div className="flex items-center gap-2">
                    <Twitter className="h-4 w-4 text-sky-400 group-hover:scale-110 transition-transform shrink-0" />
                    <span className="font-bold text-slate-300">Twitter (X)</span>
                  </div>
                  <a 
                    href="https://twitter.com/oncyber985" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block text-slate-400 hover:text-white transition-colors truncate"
                  >
                    twitter.com/oncyber985
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-950/60">
                <button
                  onClick={handleWhatsAppDirect}
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 transition-all cursor-pointer shadow-lg shadow-emerald-600/10 active:scale-98"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Iniciar Conversa Rápida (WhatsApp)</span>
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-6 bg-slate-900/20 border border-slate-900 rounded-2xl p-6 text-left">
              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="font-display font-bold text-white text-base">Contato Enviado!</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Obrigado. Entrarei em contato o mais rápido possível para dar início ao seu projeto de infraestrutura de TI.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs font-bold text-rose-500 hover:underline"
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1.5">Nome Completo</label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: Carlos"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-rose-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1.5">E-mail de Contato</label>
                    <input
                      required
                      type="email"
                      placeholder="Ex: carlos@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-rose-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1.5">Sua Mensagem / Desafio</label>
                    <textarea
                      rows={3}
                      placeholder="Ex: Gostaria de simular um ataque cibernético na minha rede para avaliar vulnerabilidades..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-rose-500 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-slate-800 hover:bg-slate-700 hover:text-white text-rose-400 border border-slate-700 hover:border-rose-500/30 text-xs font-bold py-3 transition-all cursor-pointer"
                  >
                    Enviar Mensagem de Segurança
                  </button>
                </form>
              )}
            </div>

          </div>

          <div className="pt-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <p>&copy; {new Date().getFullYear()} Pelágio Marrune Raipo. Todos os direitos reservados de propriedade intelectual.</p>
            <button
              onClick={onBackToCorporate}
              className="hover:text-white transition-colors text-xs font-bold"
            >
              Portal Corporativo ONCYBER &rarr;
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
