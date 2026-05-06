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
          eyebrow="התמחויות הבית"
          title="מה אנחנו בונים."
          sub="פתרונות אחסון, משרדים, קליניקות, מחסנים ושיפוצים — בהתאמה אישית מלאה."
        />
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.article
              key={s.t}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-pg-surface border border-white/8 rounded-2xl p-8 flex flex-col min-h-[280px] group hover:border-pg-gold/30 hover:bg-pg-surfaceHi transition-all duration-300 overflow-hidden"
            >
              {/* Watermark number */}
              <div className="absolute -top-5 -left-2 text-[130px] font-black text-white/[0.03] leading-none select-none pointer-events-none">
                0{i + 1}
              </div>

              {/* Blueprint mini-visual */}
              <div className="w-full h-20 rounded-xl bg-gradient-to-br from-pg-surfaceHi to-pg-bgAlt border border-white/8 mb-6 relative overflow-hidden flex items-center justify-center opacity-60 group-hover:opacity-80 transition-opacity">
                <BlueprintSVG index={i} />
              </div>

              {s.tag && (
                <span className="absolute top-5 left-5 text-[10px] font-bold tracking-widest bg-pg-gold text-[#1A1305] px-2.5 py-1 rounded-full">
                  {s.tag}
                </span>
              )}

              <h3 className="text-xl font-bold text-pg-text tracking-tight mb-3">{s.t}</h3>
              <p className="text-sm text-pg-dim leading-relaxed flex-1">{s.d}</p>
              <a
                href="#lead"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-pg-gold hover:text-pg-goldHi transition-colors"
              >
                לפרטים והצעת מחיר ←
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function BlueprintSVG({ index }) {
  const stroke = '#C9A24B'
  const svgs = [
    <><rect x="20" y="40" width="260" height="50" fill="none" stroke={stroke} strokeWidth="1"/><polygon points="20,40 150,15 280,40" fill="none" stroke={stroke} strokeWidth="1"/></>,
    <><rect x="40" y="30" width="220" height="60" fill="none" stroke={stroke} strokeWidth="1"/><rect x="50" y="50" width="20" height="30" fill={stroke} opacity="0.4"/></>,
    <><rect x="30" y="25" width="240" height="65" rx="6" fill="none" stroke={stroke} strokeWidth="1"/><circle cx="80" cy="58" r="14" fill="none" stroke={stroke} strokeWidth="1"/></>,
    <><polygon points="40,80 40,40 100,20 160,40 160,80" fill="none" stroke={stroke} strokeWidth="1"/><polygon points="160,80 160,40 220,20 280,40 280,80" fill="none" stroke={stroke} strokeWidth="1" opacity="0.6"/></>,
    <><rect x="30" y="30" width="240" height="60" fill="none" stroke={stroke} strokeWidth="1"/><line x1="30" y1="55" x2="270" y2="55" stroke={stroke} strokeWidth="0.5" strokeDasharray="4 2"/></>,
    <><rect x="50" y="50" width="40" height="40" fill="none" stroke={stroke} strokeWidth="1"/><rect x="100" y="35" width="50" height="55" fill="none" stroke={stroke} strokeWidth="1"/><rect x="160" y="20" width="60" height="70" fill="none" stroke={stroke} strokeWidth="1"/></>,
  ]
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none" style={{ opacity: 0.5 }}>
      {svgs[index]}
    </svg>
  )
}
