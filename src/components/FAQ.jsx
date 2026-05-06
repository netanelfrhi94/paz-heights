import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionTitle } from './WhyUs'

const items = [
  { q: 'כמה זמן לוקח פרויקט?',             a: 'תלוי בגודל ובמורכבות. מחסן פנל מבודד סטנדרטי — 2–3 שבועות מהזמנה למסירה. שיפוץ דירה — 4–8 שבועות. בהצעת המחיר תקבלו לוח זמנים מחייב, בכתב.' },
  { q: 'האם יש אחריות?',                    a: 'כן. כל פרויקט מסופק עם אחריות מלאה בכתב — 12 חודשי ביצוע, ועד 25 שנה לפנל מבודד איכותי. אם משהו לא תקין — אנחנו חוזרים, על חשבוננו.' },
  { q: 'האם עובדים עם פנל מבודד איכותי?',  a: 'אנחנו עובדים רק עם פנל מבודד תעשייתי (Polyurethane / EPS) מספקים מאושרים. בידוד תרמי-אקוסטי מלא, עמידות באש לפי תקן, וגמר מקצועי. הצעת המחיר תכלול מפרט מדויק.' },
  { q: 'האם אפשר לקבל הצעת מחיר מהירה?',  a: 'כן — הצעת מחיר ראשונית תוך 24–48 שעות מרגע יצירת הקשר. שלחו וואטסאפ עם פרטים בסיסיים (גודל, מיקום, ייעוד) ותקבלו הערכה.' },
  { q: 'האם עובדים גם עם עסקים?',           a: 'בהחלט. רוב הפרויקטים שלנו הם לעסקים — מחסנים, משרדים, קליניקות, מבני שירות. עובדים עם חשבוניות מס, חוזה מסודר, וניהול פרויקט מקצועי.' },
  { q: 'באיזה אזורים אתם עובדים?',          a: 'מרכז ודרום הארץ — מרעננה ועד באר שבע. כולל מושבים, אזורים חקלאיים ויישובים פתוחים. ניידים עם צוות מלא וכל הציוד.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="bg-pg-bg section-pad">
      <div className="container-lg max-w-3xl">
        <SectionTitle
          eyebrow="שאלות נפוצות"
          title="כל מה שבדרך כלל שואלים אותנו."
        />

        <div className="divide-y divide-white/8">
          {items.map((it, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full text-right py-6 flex items-center justify-between gap-6 group"
              >
                <span className="text-base md:text-lg font-semibold text-pg-text group-hover:text-pg-goldHi transition-colors tracking-tight">
                  {it.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xl font-semibold shrink-0 transition-colors ${
                    open === i ? 'bg-pg-gold text-[#1A1305]' : 'bg-pg-surface text-pg-text'
                  }`}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-[15px] text-pg-dim leading-relaxed max-w-2xl">{it.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
