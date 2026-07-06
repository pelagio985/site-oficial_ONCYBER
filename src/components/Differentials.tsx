import { Check, ShieldCheck, Zap, Award, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export default function Differentials() {
  const items = [
    {
      title: "Atendimento Ativo 24/7",
      desc: "Nossos engenheiros monitoram seus servidores de rede ininterruptamente, prontos para atuar de forma remota ou presencial diante de qualquer anomalia técnica.",
      badge: "Sempre Disponível",
      icon: Zap
    },
    {
      title: "Equipe Altamente Certificada",
      desc: "Analistas com vasta bagagem prática e certificações globais renomadas. Oferecemos segurança de ponta baseada em rígidas melhores práticas e compliance internacional.",
      badge: "Know-how de Elite",
      icon: Award
    },
    {
      title: "Prevenção Absoluta de Problemas",
      desc: "Evitamos gargalos corporativos antes que eles impactem seu faturamento. Nosso foco é a manutenção preditiva contínua dos sistemas e proteção extrema de dados.",
      badge: "Foco em Segurança",
      icon: ShieldCheck
    }
  ];

  return (
    <section
      id="differentials"
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout split: Left Title block, Right details lists */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Box */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
              Diferenciais ONCYBER
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Por que Líderes e Grandes Empresas Escolhem Nossos Serviços?
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              Diferente de assistências convencionais de informática, a ONCYBER atua como parceira tecnológica estratégica, garantindo que toda a sua infraestrutura digital funcione sem falhas em tempo integral.
            </p>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100/80 space-y-3">
              <div className="flex items-center gap-2 text-blue-600">
                <Activity className="h-5 w-5 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">Compromisso de SLA</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Garantimos tempo de resposta imediato para incidentes de alta gravidade em escritórios empresariais de Pemba e região.
              </p>
            </div>
          </div>

          {/* Right Differentials Block */}
          <div className="lg:col-span-7 space-y-6">
            {items.map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  id={`differential-item-${index}`}
                  key={item.title}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-50/50 rounded-2xl border border-slate-100 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5 group hover:bg-white hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors shadow-xs">
                    <IconComp className="h-6 w-6" />
                  </div>

                  {/* Text Description */}
                  <div className="text-left space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">
                        {item.title}
                      </h3>
                      <span className="inline-flex items-center gap-0.5 rounded bg-blue-100/60 px-2 py-0.5 text-[9px] font-extrabold text-blue-800 uppercase tracking-wider">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 text-[10px] font-bold uppercase tracking-wider pt-1.5">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                      <span>Garantia de Entrega Técnica</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
