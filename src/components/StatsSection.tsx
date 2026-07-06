import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Users, Briefcase, Trophy, Award, TrendingUp, ShieldCheck, HeartHandshake } from 'lucide-react';

interface StatCardProps {
  key?: string | number;
  targetNum: number;
  suffix: string;
  label: string;
  description: string;
  icon: any;
  delay: number;
}

function StatCard({ targetNum, suffix, label, description, icon: IconComp, delay }: StatCardProps) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = targetNum;
      if (start === end) return;

      const duration = 2000; // 2 seconds total duration
      const incrementTime = Math.max(Math.floor(duration / end), 15);
      
      const timer = setInterval(() => {
        start += Math.ceil(end / 100); // dynamic step sizes for smooth fast counting
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, targetNum]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-blue-100 transition-all duration-300 text-left overflow-hidden group"
    >
      {/* Decorative top background stripe */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-50 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 transition-all duration-300" />
      
      <div className="space-y-4">
        {/* Stat Icon */}
        <div className="h-12 w-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-all duration-300">
          <IconComp className="h-5.5 w-5.5" />
        </div>

        {/* Counter Number */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-0.5 text-slate-900 group-hover:text-blue-600 transition-colors">
            <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {count.toLocaleString('pt-BR')}
            </span>
            <span className="font-display text-2xl sm:text-3xl font-bold text-blue-600">
              {suffix}
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-800 tracking-tight leading-none">
            {label}
          </h4>
        </div>

        {/* Short description */}
        <p className="text-xs text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Trust Indicator bullet */}
      <div className="mt-5 pt-4 border-t border-slate-100/60 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-500 transition-colors">
        <ShieldCheck className="h-3.5 w-3.5 text-blue-500 shrink-0" />
        <span>Dados Auditados</span>
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const statsList = [
    {
      targetNum: 450,
      suffix: "+",
      label: "Clientes Satisfeitos",
      description: "Escritórios corporativos, clínicas, hotéis e consultorias com TI monitorada.",
      icon: Users,
      delay: 0.1
    },
    {
      targetNum: 1200,
      suffix: "+",
      label: "Projetos Finalizados",
      description: "Instalações de rede, migrações em nuvem e organizações estruturadas completas.",
      icon: Briefcase,
      delay: 0.2
    },
    {
      targetNum: 8,
      suffix: "+ Anos",
      label: "Tempo de Experiência",
      description: "Ampla bagagem de mercado consolidada garantindo agilidade técnica exemplar.",
      icon: Trophy,
      delay: 0.3
    },
    {
      targetNum: 15,
      suffix: "+ Globais",
      label: "Certificações Técnicas",
      description: "Engenheiros certificados nas melhores práticas mundiais de cibersegurança e redes.",
      icon: Award,
      delay: 0.4
    }
  ];

  return (
    <section id="stats" className="py-20 bg-white border-b border-slate-100 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/20 via-white to-slate-50/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro Block */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Métricas de Credibilidade
          </span>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
            Nossa Trajetória em Números Reais
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Garantimos alta disponibilidade operacional através de experiência comprovada no mercado de infraestrutura corporativa de Moçambique.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsList.map((stat, index) => (
            <StatCard
              key={stat.label}
              targetNum={stat.targetNum}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
              icon={stat.icon}
              delay={stat.delay}
            />
          ))}
        </div>

        {/* Banner with continuous high commitment */}
        <div className="mt-12 p-5 rounded-2xl bg-blue-50/40 border border-blue-100/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <TrendingUp className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Taxa de Resolução de Incidentes Primários (SLA)</p>
              <p className="text-[11px] text-slate-500">Mais de 98.7% dos chamados de helpdesk resolvidos remotamente nos primeiros 15 minutos.</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 bg-white px-3.5 py-1.5 rounded-xl border border-blue-100 text-xs font-extrabold text-blue-700">
            <HeartHandshake className="h-3.5 w-3.5" />
            <span>Compromisso ONCYBER</span>
          </div>
        </div>

      </div>
    </section>
  );
}
