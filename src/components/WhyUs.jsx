import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const items = [
  { n: '01', t: 'אחריות בכתב',                      d: 'כל פרויקט מסופק עם אחריות מלאה ומסמך התחייבות חתום. אם משהו לא תקין — אנחנו חוזרים.',                                                  icon: ShieldIcon  },
  { n: '02', t: 'לוח זמנים מדויק',                  d: 'מחויבים לתאריך מסירה. אם חורגים בלי סיבה מוצדקת — קנס יומי על חשבוננו, בכתב.',                                                        icon: ClockIcon   },
  { n: '03', t: 'חומרים פרימיום',                    d: 'פנל מבודד איכותי, פרזול גרמני, חיבורים תקניים. בלי חומרים זולים — עובדים רק עם ספקים מאושרים.',                                         icon: GemIcon     },
  { n: '04', t: 'מדברים עם הבעלים',                 d: 'לא קבלן משנה, לא מתווך, לא צ׳ט בוט. שלושה אחים מילואימניקים, זמינים אישית לכל לקוח.',                                                  icon: UsersIcon   },
  { n: '05', t: 'עבודה נקייה',                       d: 'אחרי כל יום עבודה — האתר מסודר. בסיום הפרויקט מקבלים מבנה נקי לכניסה, לא תיק כאב ראש.',                                               icon: SparkleIcon },
  { n: '06', t: 'תמחור שקוף',                        d: 'הצעת מחיר מפורטת בכתב. בלי תוספות מפתיעות, בלי "גילינו ש...", בלי הפתעות בחשבונית.',                                                   icon: CheckIcon   },
]

export default function WhyUs() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="bg-pg-bgAlt section-pad">
      <div className="container-lg">
        <SectionTitle
          eyebrow="למה דווקא פז גבהים"
          title="6 סיבות שלקוחות חוזרים אלינו — וממליצים."
          sub="לא נעמיד פנים. תמצאו קבלנים זולים יותר. אבל לא תמצאו עבודה עם הסטנדרט הזה, בלוח זמנים הזה, באחריות הזו."
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8">
          {items.map((it, i) => {
            const Icon = it.icon
            return (
              <motion.div
                key={it.n}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="bg-pg-surface p-8 md:p-10 flex flex-col gap-4 group hover:bg-pg-surfaceHi transition-colors duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl bg-pg-gold/10 flex items-center justify-center text-pg-gold group-hover:bg-pg-gold/20 transition-colors">
                    <Icon />
                  </div>
                  <span className="text-xs font-bold text-pg-gold tracking-widest">{it.n}</span>
                </div>
                <h3 className="text-xl font-bold text-pg-text tracking-tight">{it.t}</h3>
                <p className="text-sm text-pg-dim leading-relaxed">{it.d}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function SectionTitle({ eyebrow, title, sub, center = false }) {
  return (
    <div className={`mb-14 ${center ? 'text-center mx-auto' : ''} max-w-3xl`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="w-6 h-px bg-pg-gold" />
          <span className="text-xs font-semibold text-pg-gold tracking-[0.22em] uppercase">{eyebrow}</span>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-extrabold text-pg-text tracking-tight leading-tight">{title}</h2>
      {sub && <p className="text-lg text-pg-dim mt-4 leading-relaxed max-w-2xl">{sub}</p>}
    </div>
  )
}

function ShieldIcon()  { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z"/></svg> }
function ClockIcon()   { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg> }
function GemIcon()     { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 12L2 9l4-6z"/><path d="M2 9h20M12 3l4 6-4 12-4-12 4-6z"/></svg> }
function UsersIcon()   { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="9" r="2.5"/><path d="M22 19c0-2.5-2-4.5-5-4.5"/></svg> }
function SparkleIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"/></svg> }
function CheckIcon()   { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg> }
