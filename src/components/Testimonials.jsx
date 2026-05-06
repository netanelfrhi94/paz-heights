import { motion } from 'framer-motion'
import { SectionTitle } from './WhyUs'

const reviews = [
  {
    name: 'דוד מזרחי',
    initials: 'דמ',
    role: 'בעל עסק',
    proj: 'מחסן 240מ״ר',
    loc: 'אזור רחובות',
    rating: 5,
    quote: 'הזמנתי מחסן עם הרבה ספקנות — שמעתי סיפורים על קבלנים. פז גבהים הפתיעו אותי לגמרי. עמדו בכל מועד, הגיעו כל בוקר, והסבירו לי כל שלב. בסוף קיבלתי מוצר שעולה על הציפיות.',
  },
  {
    name: 'ד״ר מיכל כהן',
    initials: 'מכ',
    role: 'רופאה',
    proj: 'קליניקה רפואית',
    loc: 'באר שבע',
    rating: 5,
    quote: 'בתור רופאה, הייתי צריכה שהכל יהיה מדויק — בידוד אקוסטי, חשמל, אוורור. הם הקשיבו לכל דרישה, הציעו פתרונות שלא חשבתי עליהם, ומסרו לי קליניקה שהמטופלים שלי מפרגנים עליה.',
  },
  {
    name: 'רמי ביטון',
    initials: 'רב',
    role: 'מנכ״ל',
    proj: 'משרדי חברה',
    loc: 'ראשון לציון',
    rating: 5,
    quote: 'חיפשנו מישהו שיבנה לנו משרדים תוך חודש — כולם אמרו שזה בלתי אפשרי. פז גבהים לקחו את האתגר ברצינות, הוסיפו עוד צוות, ומסרו לנו בזמן. שירות ענייני ומקצועי ממש.',
  },
  {
    name: 'יעל שפירא',
    initials: 'יש',
    role: 'בעלת נכס',
    proj: 'שיפוץ מלא',
    loc: 'אשדוד',
    rating: 5,
    quote: 'אחרי שני קבלנים שעזבו באמצע, הגיעו פז גבהים וסיימו את העבודה כמו שצריך. הם לקחו אחריות על מה שהאחרים השאירו, תיקנו, והוסיפו. אני ממליצה לכולם בעיניים עצומות.',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-pg-bg section-pad relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-pg-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container-lg relative z-10">
        <SectionTitle
          eyebrow="לקוחות מספרים"
          title="מה לקוחות אמיתיים אומרים עלינו."
          sub="לא שיווק. לא עריכה. ממש מה שאנשים אמרו אחרי שקיבלו את הפרויקט."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-pg-surface border border-white/8 rounded-2xl p-8 md:p-10 flex flex-col gap-6 group card-gold-hover relative overflow-hidden"
            >
              {/* Decorative quote mark */}
              <div className="absolute top-5 left-6 text-[80px] text-pg-gold/10 font-serif leading-none select-none group-hover:text-pg-gold/18 transition-colors duration-500">״</div>

              {/* Stars */}
              <div className="flex gap-1 relative z-10">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <motion.svg
                    key={k}
                    initial={{ scale: 0, rotate: -20 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + k * 0.06, duration: 0.4, ease: 'backOut' }}
                    width="16" height="16" viewBox="0 0 24 24" fill="#C9A24B"
                  >
                    <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/>
                  </motion.svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-[15px] text-pg-text leading-[1.8] font-medium relative z-10">
                ״{r.quote}״
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/8 relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pg-gold/30 to-pg-gold/10 border border-pg-gold/30 flex items-center justify-center text-pg-gold font-bold text-sm shrink-0 group-hover:border-pg-gold/60 transition-colors duration-300">
                  {r.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-pg-text">{r.name}</div>
                  <div className="text-xs text-pg-dim mt-0.5">{r.role} · {r.proj} · {r.loc}</div>
                </div>
                <div className="mr-auto">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[11px] text-pg-mute">לקוח מאומת</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-pg-mute">
            כל הביקורות אמיתיות — לקוחות שסיימו פרויקט עם פז גבהים ·{' '}
            <a href="#lead" className="text-pg-gold hover:text-pg-goldHi transition-colors">
              הצטרפו אליהם ←
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
