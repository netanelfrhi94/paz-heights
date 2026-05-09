import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { trackCTAClick } from '../utils/gtm'

const items = [
  { n: '01', t: 'אחריות בכתב',         d: 'כל פרויקט מסופק עם אחריות מלאה. אם משהו לא תקין — מטפלים בזה.' },
  { n: '02', t: 'לוח זמנים מחייב',     d: 'מחויבים לתאריך המסירה ועמידה בלוחות זמנים — לפי מה שסוכם.'         },
  { n: '03', t: 'חומרים פרימיום',       d: 'עובדים עם חומרים איכותיים ומתקדמים בהתאם לדרישות הפרויקט. ספקים מאושרים, גמר מקצועי — בלי פשרות.'         },
  { n: '04', t: 'מדברים עם הבעלים',    d: 'לא קבלן משנה, לא מתווך, לא מוקד שירות. שלושה אחים שסיימו תקופת מילואים ממושכת וחזרו לפעילות מלאה — זמינים אישית לכל לקוח, לכל שאלה.'    },
  { n: '05', t: 'אתר נקי כל יום',      d: 'בסיום כל יום עבודה — האתר מסודר. בסיום הפרויקט מקבלים מבנה נקי ומוכן לשימוש, לא תיק כאב ראש.'         },
  { n: '06', t: 'תמחור שקוף לחלוטין',  d: 'הצעת מחיר מפורטת פריט-פריט, בכתב. אפס תוספות מפתיעות, אפס "גילינו ש...", אפס הפתעות בחשבונית הסופית.' },
]

export default function WhyUs() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section className="bg-pg-bgAlt section-pad relative overflow-hidden">
      {/* Subtle ambient */}
      <div className="absolute top-0 right-1/2 w-[500px] h-[300px] bg-pg-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container-lg relative z-10">
        <SectionTitle
          num="002"
          eyebrow="למה דווקא פז גבהים"
          title="6 סיבות שלקוחות חוזרים אלינו — וממליצים."
          sub="לא נעמיד פנים. תמצאו קבלנים זולים יותר. אבל לא תמצאו את הסטנדרט הזה, הלוח-זמנים הזה, והאחריות הזו — ביחד."
        />

        {/* Editorial two-column list */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-x-20">
          {items.map((it, i) => (
            <motion.div
              key={it.n}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-start gap-7 py-9 border-b border-white/6 relative"
            >
              {/* Large decorative number */}
              <div className="text-[56px] font-black leading-none text-pg-gold/10 group-hover:text-pg-gold/20 transition-colors duration-400 shrink-0 select-none w-14 text-left">
                {it.n}
              </div>

              {/* Content */}
              <div className="flex-1 pt-1.5">
                <h3 className="text-lg font-bold text-pg-text tracking-tight mb-2.5 group-hover:text-pg-goldHi transition-colors duration-300">
                  {it.t}
                </h3>
                <p className="text-sm text-pg-dim leading-relaxed">{it.d}</p>
              </div>

              {/* Arrow — revealed on hover */}
              <div className="shrink-0 pt-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/6 rounded-xl px-8 py-6 bg-pg-iron/40"
        >
          <p className="text-pg-dim text-base">
            <strong className="text-pg-text">רוצים לראות את העבודה שלנו?</strong>{' '}
            צפו בפרויקטים שביצענו או בואו לשוחח איתנו ישירות.
          </p>
          <div className="flex gap-3 shrink-0">
            <a
              href="#gallery"
              onClick={() => trackCTAClick({ source: 'why_us', destination: 'gallery', text: 'לפרויקטים' })}
              className="px-5 py-2.5 rounded-lg border border-white/12 text-pg-text text-sm font-semibold hover:border-pg-gold/40 transition-colors"
            >
              לפרויקטים
            </a>
            <a
              href="#lead"
              onClick={() => trackCTAClick({ source: 'why_us', destination: 'lead', text: 'לייעוץ חינמי' })}
              className="px-5 py-2.5 rounded-lg bg-pg-gold text-[#1A1305] text-sm font-bold hover:bg-pg-goldHi transition-colors shadow-[0_4px_20px_rgba(201,162,75,0.25)]"
            >
              לייעוץ חינמי
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function SectionTitle({ num, eyebrow, title, sub, center = false }) {
  return (
    <div className={`mb-16 ${center ? 'text-center mx-auto' : ''} max-w-3xl`}>
      {num && (
        <div className="section-num mb-3">{num}</div>
      )}
      <span className="arch-divider" />
      {eyebrow && (
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-semibold text-pg-gold tracking-[0.22em] uppercase">{eyebrow}</span>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-extrabold text-pg-text tracking-tight leading-[1.08]">{title}</h2>
      {sub && <p className="text-base text-pg-dim mt-5 leading-relaxed max-w-2xl">{sub}</p>}
    </div>
  )
}
