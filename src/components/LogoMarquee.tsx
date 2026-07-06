import { Chrome, Share2, Flame, Satellite } from 'lucide-react';

export default function LogoMarquee() {
  const logos = [
    { name: "Google", icon: Chrome, bg: "hover:bg-red-50 hover:text-red-500" },
    { name: "Meta", icon: Share2, bg: "hover:bg-blue-50 hover:text-blue-600" },
    { name: "Starlink", icon: Satellite, bg: "hover:bg-cyan-50 hover:text-cyan-600" },
    { name: "NVIDIA", icon: Flame, bg: "hover:bg-emerald-50 hover:text-emerald-600" }
  ];

  // Duplicate for seamless infinite loop scroll
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

  return (
    <section id="partner-logos-marquee" className="py-12 bg-white border-y border-slate-100/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
          Sistemas & Integrações Certificadas
        </p>
      </div>

      {/* Track Container */}
      <div className="relative w-full flex overflow-x-hidden">
        {/* Gradients on the side for fading edge effect */}
        <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-12 py-3">
          {repeatedLogos.map((logo, index) => {
            const Icon = logo.icon;
            return (
              <div
                key={`${logo.name}-${index}`}
                className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl border border-slate-100 bg-slate-50/50 text-slate-500 font-display font-black tracking-tight text-sm select-none transition-all duration-300 ${logo.bg} cursor-default`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span>{logo.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
