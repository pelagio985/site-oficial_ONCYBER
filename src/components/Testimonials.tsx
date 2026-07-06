import { Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS_DATA } from '../data';

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 bg-slate-50/70 border-t border-slate-100 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Prova Social
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Aprovado por Quem Lidera o Mercado
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            Confira o relato de gerentes, diretores e administradores de escritórios e negócios que confiam no suporte de TI da ONCYBER.
          </p>
        </div>

        {/* 6 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((item, index) => {
            return (
              <motion.div
                id={`testimonial-card-${item.id}`}
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 flex flex-col justify-between hover:shadow-lg hover:border-blue-100/50 transition-all duration-300 relative group"
              >
                {/* Decorative Quote Icon */}
                <Quote className="absolute right-6 top-6 h-8 w-8 text-slate-100 group-hover:text-blue-50/70 transition-colors pointer-events-none" />

                <div className="space-y-4 text-left">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>

                  {/* Feedback Text */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic min-h-[4.5rem]">
                    "{item.feedback}"
                  </p>
                </div>

                {/* User Bio */}
                <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-slate-50">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="h-10 w-10 rounded-full object-cover border border-slate-100 grayscale-30 group-hover:grayscale-0 transition-all"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 leading-none mt-1">
                      {item.role} na <span className="font-semibold text-slate-700">{item.company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
