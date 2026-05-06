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
          num="003"
          eyebrow="התהליך"
          title="חמישה שלבים. בלי משחקים."
        />

        {/* Desktop horizontal */}
        <div className="hidden md:block relative">
          {/* Progressive gold top line */}
          <div className="flex gap-4 mb-0 relative">
            {steps.map((s, i) => (
              <motion.div
                key={s.n + '-bar'}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 h-px origin-right"
                style={{
                  background: `linear-gradient(to left, rgba(201,162,75,${0.15 + i * 0.18}) 0%, rgba(201,162,75,${0.08 + i * 0.1}) 100%)`,
                  marginBottom: 0,
                }}
              />
            ))}
          </div>

          <div className="grid grid-cols-5 gap-4 pt-10 relative">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-right group"
              >
                {/* Large step number */}
                <div className="text-5xl font-black text-pg-gold leading-none mb-5 group-hover:text-pg-goldHi transition-colors duration-300">
                  {s.n}
                </div>

                <h4 className="text-base font-bold text-pg-text tracking-tight mb-2">{s.t}</h4>
                <p className="text-[13px] text-pg-dim leading-relaxed">{s.d}</p>
                <div className="mt-3 text-[9px] font-bold text-pg-gold/60 tracking-[0.2em] uppercase">{s.dur}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden flex flex-col gap-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-6 pb-8 relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute top-12 right-5 bottom-0 w-px bg-gradient-to-b from-pg-gold/20 to-transparent" />
              )}

              {/* Step number */}
              <div className="shrink-0 w-10 text-right">
                <span className="text-3xl font-black text-pg-gold leading-none">{s.n}</span>
              </div>

              <div className="pt-0.5">
                <h4 className="text-[15px] font-bold text-pg-text mb-1.5">{s.t}</h4>
                <p className="text-sm text-pg-dim leading-relaxed">{s.d}</p>
                <div className="mt-2.5 text-[9px] font-bold text-pg-gold/60 tracking-[0.2em] uppercase">{s.dur}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
