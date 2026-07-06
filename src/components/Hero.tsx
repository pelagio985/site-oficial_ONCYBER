import { Shield, Sparkles, Server, Clock, Users, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenQuoteModal: (serviceId?: number | null) => void;
}

export default function Hero({ onOpenQuoteModal }: HeroProps) {
  // Stats display
  const stats = [
    { value: "24/7", label: "Monitoramento", desc: "Suporte Preventivo Ativo", icon: Clock },
    { value: "450+", label: "Clientes", desc: "Escritórios & Empresas", icon: Users },
    { value: "100%", label: "Segurança", desc: "Conformidade e Backup", icon: Shield },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
    >
      {/* Decorative Background Glows */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-cyan-400/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Premium Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/70 px-4 py-1.5 text-xs font-semibold text-blue-800"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Sua Infraestrutura de TI Blindada & Eficiente</span>
            </motion.div>

            {/* Impactful Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]"
            >
              Infraestrutura de TI <span className="text-blue-600">Inteligente</span> e <span className="text-slate-900">Segura</span> para seu Negócio.
            </motion.h1>

            {/* Short descriptive subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              A <strong>ONCYBER</strong> lidera a transformação digital corporativa em Cabo Delgado. Fornecemos suporte técnico ágil, segurança cibernética avançada, implantações estruturadas de rede, soluções integradas em nuvem, montagem precisa, venda e instalação de hardware corporativo completo.
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                id="hero-primary-cta"
                onClick={() => onOpenQuoteModal()}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-sm font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all text-center cursor-pointer"
              >
                Falar com Especialista
              </button>
              <a
                id="hero-secondary-cta"
                href="#services"
                className="rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 text-sm font-bold transition-all text-center focus:outline-hidden"
              >
                Conhecer Serviços
              </a>
            </motion.div>

            {/* Bullet Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100"
            >
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-600">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Award className="h-3 w-3" />
                </div>
                <span>Atendimento Consultivo Customizado</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-600">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Server className="h-3 w-3" />
                </div>
                <span>Engenharia de Redes & Hardware</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Abstract/Corporate 3D Visual Asset */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Outer Glowing Border Card Frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              
              <div className="relative rounded-2xl border border-slate-200 bg-white p-2.5 shadow-2xl overflow-hidden group">
                {/* Hero Main Generated Tech Graphic */}
                <img
                  src="/src/assets/images/tech_hero_server_1783293491080.jpg"
                  alt="ONCYBER TI e Servidores"
                  className="rounded-xl w-full h-auto object-cover aspect-[16/9] lg:aspect-[4/3] hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Glassmorphic Overlay Card floating on top */}
                <div className="absolute bottom-5 left-5 right-5 bg-slate-900/80 backdrop-blur-md rounded-xl p-4 border border-white/10 text-white flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                      <Server className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold font-display tracking-tight text-white leading-none">Datacenter e Redes</p>
                      <p className="text-[10px] font-mono text-slate-400 mt-1 uppercase">Monitoramento Ativo 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">ONLINE</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Counter Stats Container below */}
        <div className="mt-16 sm:mt-24 pt-10 border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, i) => {
              const IconComp = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs group hover:border-blue-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight leading-none mb-1 group-hover:text-blue-600 transition-colors">
                      {stat.value}
                    </h3>
                    <p className="text-xs font-bold text-slate-700">{stat.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{stat.desc}</p>
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
