import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const items = [
  { n: '01', t: 'אחריות בכתב',       d: 'כל פרויקט מסופק עם אחריות מלאה ומסמך התחייבות חתום. אם משהו לא תקין — אנחנו חוזרים ומתקנים, על חשבוננו.',          icon: ShieldIcon  },
  { n: '02', t: 'לוח זמנים מחייב',   d: 'מחויבים לתאריך המסירה. אם חורגים בלי סיבה מוצדקת — קנס יומי בכתב על חשבוננו. לא הבטחה — חוזה.',               icon: ClockIcon   },
  { n: '03', t: 'חומרים פרימיום',     d: 'פנל מבודד איכותי, פרזול גרמני, חיבורים תקניים. עובדים רק עם ספקים מאושרים ומוכחים — בלי פשרות.',               icon: GemIcon     },
  { n: '04', t: 'מדברים עם הבעלים',  d: 'לא קבלן משנה, לא מתווך, לא מוקד שירות. שלושה אחים מילואימניקים — זמינים אישית לכל לקוח, לכל שאלה.',          icon: UsersIcon   },
  { n: '05', t: 'אתר נקי כל יום',    d: 'בסיום כל יום עבודה — האתר מסודר. בסיום הפרויקט מקבלים מבנה נקי ומוכן לשימוש, לא תיק כאב ראש.',               icon: SparkleIcon },
  { n: '06', t: 'תמחור שקוף לחלוטין', d: 'הצעת מחיר מפורטת פריט-פריט, בכתב. אפס תוספות מפתיעות, אפס "גילינו ש...", אפס הפתעות בחשבונית הסופית.',       icon: CheckIcon   },
]

export default function WhyUs() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section className="bg-pg-bgAlt section-pad relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/2 w-[500px] h-[300px] bg-pg-gold/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="container-lg relative z-10">
        <SectionTitle
          eyebrow="למה דווקא פז גבהים"
          title="6 סיבות שלקוחות חוזרים אלינו — וממליצים."
          sub="לא נעמיד פנים. תמצאו קבלנים זולים יותר. אבל לא תמצאו את הסטנדרט הזה, הלוח-זמנים הזה, והאחריות הזו — ביחד."
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => {
            const Icon = it.icon
            return (
              <motion.div
                key={it.n}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="bg-pg-surface border border-white/8 rounded-2xl p-8 md:p-10 flex flex-col gap-5 group card-gold-hover relative overflow-hidden"
              >
                {/* Hover shimmer overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(201,162,75,0.06) 0%, transparent 70%)' }}
                />

                <div className="flex items-start justify-between relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-pg-gold/10 flex items-center justify-center text-pg-gold group-hover:bg-pg-gold/20 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(201,162,75,0.3)] transition-all duration-400">
                    <Icon />
                  </div>
                  <span className="text-xs font-bold text-pg-gold/50 tracking-widest group-hover:text-pg-gold transition-colors duration-300">{it.n}</span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-pg-text tracking-tight mb-3 group-hover:text-pg-goldHi transition-colors duration-300">{it.t}</h3>
                  <p className="text-sm text-pg-dim leading-relaxed">{it.d}</p>
                </div>

                {/* Bottom gold line on hover */}
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-l from-transparent via-pg-gold/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 bg-pg-surface border border-white/8 rounded-2xl px-8 py-6"
        >
          <p className="text-pg-dim text-base">
            <strong className="text-pg-text">רוצים לראות את העבודה שלנו?</strong>{' '}
            צפו בפרויקטים שביצענו או בואו לשוחח איתנו ישירות.
          </p>
          <div className="flex gap-3 shrink-0">
            <a href="#gallery" className="px-5 py-2.5 rounded-xl border border-white/15 text-pg-text text-sm font-semibold hover:border-pg-gold/40 transition-colors">
              לפרויקטים
            </a>
            <a href="#lead" className="px-5 py-2.5 rounded-xl bg-pg-gold text-[#1A1305] text-sm font-bold hover:bg-pg-goldHi transition-colors shadow-[0_8px_24px_rgba(201,162,75,0.3)]">
              לייעוץ חינמי
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function SectionTitle({ eyebrow, title, sub, center = false }) {
  return (
    <div className={`mb-16 ${center ? 'text-center mx-auto' : ''} max-w-3xl`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-pg-gold" />
          <span className="text-xs font-semibold text-pg-gold tracking-[0.22em] uppercase">{eyebrow}</span>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-extrabold text-pg-text tracking-tight leading-[1.1]">{title}</h2>
      {sub && <p className="text-lg text-pg-dim mt-5 leading-relaxed max-w-2xl">{sub}</p>}
    </div>
  )
}

function ShieldIcon()  { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z"/></svg> }
function ClockIcon()   { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg> }
function GemIcon()     { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 12L2 9l4-6z"/><path d="M2 9h20M12 3l4 6-4 12-4-12 4-6z"/></svg> }
function UsersIcon()   { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="9" r="2.5"/><path d="M22 19c0-2.5-2-4.5-5-4.5"/></svg> }
function SparkleIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"/></svg> }
function CheckIcon()   { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg> }
