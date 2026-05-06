import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { SectionTitle } from './WhyUs'

const services = [
  { t: 'מחסנים מפנל מבודד', d: 'מחסנים חקלאיים, תעשייתיים ופרטיים בכל גודל. בידוד תרמי-אקוסטי מלא, עמידות מקסימלית.', tag: 'הכי מבוקש' },
  { t: 'משרדים',             d: 'משרדים מודולריים בהתאמה אישית — מחללים פתוחים ועד מתחמים מחולקים. מוכנים לכניסה.',     tag: null         },
  { t: 'קליניקות',           d: 'קליניקות רפואיות העומדות בכל התקנים. תכנון נגיש, אקוסטיקה, מערכות תשתית מלאות.',      tag: null         },
  { t: 'בנייה קלה',          d: 'תוספות בנייה, יחידות דיור, מבני שירות וחללי עבודה — תוצרת איכותית בזמן קצר.',         tag: null         },
  { t: 'שיפוצים',            d: 'שיפוצי דירות, בתים פרטיים ועסקים. עבודה נקייה, גמרים פרימיום, ניהול פרויקט מלא.',     tag: null         },
  { t: 'מבנים בהתאמה',       d: 'תכנון וביצוע מותאמים בדיוק לצורך שלכם. שיתוף פעולה הדוק לאורך כל הדרך.',             tag: 'פרימיום'   },
]

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="services" className="bg-pg-bg section-pad">
      <div className="container-lg">
        <SectionTitle
          num="001"
          eyebrow="התמחויות הבית"
          title="מה אנחנו בונים."
          sub="פתרונות אחסון, משרדים, קליניקות, מחסנים ושיפוצים — בהתאמה אישית מלאה."
        />

        {/* Hover-reveal list */}
        <div ref={ref}>
          {services.map((s, i) => (
            <motion.a
              key={s.t}
              href="#lead"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-center justify-between py-7 border-b border-white/6 cursor-pointer relative block"
              style={{ textDecoration: 'none' }}
            >
              {/* Hover bg */}
              <div className="absolute inset-0 bg-pg-iron/0 group-hover:bg-pg-iron/50 transition-colors duration-300 -mx-4 px-4 rounded-lg pointer-events-none" />

              {/* Left: index + title + description */}
              <div className="flex items-start gap-8 flex-1 relative z-10">
                <span className="text-[11px] font-bold text-pg-gold/25 tracking-widest mt-1 shrink-0 w-6 group-hover:text-pg-gold/50 transition-colors duration-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-0">
                    <h3 className="text-2xl font-bold text-pg-text group-hover:text-pg-gold transition-colors duration-300 tracking-tight">
                      {s.t}
                    </h3>
                    {s.tag && (
                      <span className="text-[10px] font-bold tracking-widest bg-pg-gold/15 text-pg-gold border border-pg-gold/25 px-2.5 py-0.5 rounded-full">
                        {s.tag}
                      </span>
                    )}
                  </div>
                  {/* Description — hover reveal */}
                  <div className="max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-300 ease-in-out">
                    <p className="text-sm text-pg-dim leading-relaxed pt-2">{s.d}</p>
                  </div>
                </div>
              </div>

              {/* Right: arrow */}
              <div className="relative z-10 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-300 shrink-0 mr-4">
                <div className="w-9 h-9 rounded-full border border-pg-gold/30 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
