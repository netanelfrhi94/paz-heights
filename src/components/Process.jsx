import { motion } from 'framer-motion'
import { SectionTitle } from './WhyUs'

const steps = [
  { n: '01', t: 'ייעוץ ראשוני', d: 'שיחה של 15 דקות. מבינים מה אתם צריכים, באיזה תקציב, באיזה לוח זמנים.',                           dur: '15 דק׳'       },
  { n: '02', t: 'תכנון',         d: 'מגיעים אליכם, מודדים, מתכננים. מקבלים שרטוט מקצועי של הפרויקט.',                                  dur: '3–7 ימים'     },
  { n: '03', t: 'הצעת מחיר',    d: 'הצעת מחיר מפורטת בכתב. כל פריט, כל חומר. בלי כוכביות, בלי הפתעות.',                              dur: '24–48 שעות'   },
  { n: '04', t: 'ביצוע',         d: 'מתחילים לבנות. עדכון יומי, אתר נקי, צוות צמוד. אתם מעורבים לאורך כל הדרך.',                     dur: 'לפי הפרויקט'  },
  { n: '05', t: 'מסירה',         d: 'בדיקה משותפת, רשימת תיקונים אם נדרש, חתימה על אחריות. מוכנים לשימוש.',                           dur: 'יום אחד'      },
]

export default function Process() {
  return (
    <section id="process" className="bg-pg-bgAlt section-pad">
      <div className="container-lg">
        <SectionTitle
          eyebrow="התהליך"
          title="חמישה שלבים. בלי משחקים."
        />

        {/* Desktop horizontal */}
        <div className="hidden md:block relative">
          {/* Connector line */}
          <div className="absolute top-9 right-[4%] left-[4%] h-px bg-gradient-to-l from-transparent via-pg-gold/40 to-transparent" />

          <div className="grid grid-cols-5 gap-4 relative">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-right"
              >
                {/* Circle */}
                <div className="relative w-[72px] h-[72px] rounded-full bg-pg-surface border border-white/12 flex items-center justify-center mb-6 group-hover:border-pg-gold/40 transition-colors">
                  <span className="text-2xl font-black text-pg-gold tracking-tight">{s.n}</span>
                  <div className="absolute -inset-1 rounded-full border border-dashed border-pg-gold/20" />
                </div>

                <h4 className="text-base font-bold text-pg-text tracking-tight mb-2">{s.t}</h4>
                <p className="text-xs text-pg-dim leading-relaxed">{s.d}</p>
                <div className="mt-3 text-[10px] font-bold text-pg-gold tracking-widest uppercase">{s.dur}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden flex flex-col gap-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-5 pb-8 relative"
            >
              {/* Line */}
              {i < steps.length - 1 && (
                <div className="absolute top-14 right-6 bottom-0 w-px bg-gradient-to-b from-pg-gold/30 to-transparent" />
              )}
              {/* Circle */}
              <div className="w-12 h-12 rounded-full bg-pg-surface border border-white/12 flex items-center justify-center shrink-0 text-pg-gold font-black text-sm">
                {s.n}
              </div>
              <div>
                <h4 className="text-base font-bold text-pg-text mb-1">{s.t}</h4>
                <p className="text-sm text-pg-dim leading-relaxed">{s.d}</p>
                <div className="mt-2 text-[10px] font-bold text-pg-gold tracking-widest uppercase">{s.dur}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
