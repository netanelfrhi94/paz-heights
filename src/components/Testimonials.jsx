import { motion } from 'framer-motion'
import { SectionTitle } from './WhyUs'

const reviews = [
  {
    name: 'דוד מזרחי',
    role: 'בעל עסק',
    proj: 'מחסן 240מ״ר',
    loc: 'אזור רחובות',
    quote: 'הזמנתי מחסן עם הרבה ספקנות — שמעתי סיפורים על קבלנים. פז גבהים הפתיעו אותי לגמרי. עמדו בכל מועד, הגיעו כל בוקר, והסבירו לי כל שלב. בסוף קיבלתי מוצר שעולה על הציפיות.',
  },
  {
    name: 'ד״ר מיכל כהן',
    role: 'רופאה',
    proj: 'קליניקה רפואית',
    loc: 'באר שבע',
    quote: 'בתור רופאה, הייתי צריכה שהכל יהיה מדויק — בידוד אקוסטי, חשמל, אוורור. הם הקשיבו לכל דרישה, הציעו פתרונות שלא חשבתי עליהם, ומסרו לי קליניקה שהמטופלים שלי מפרגנים עליה.',
  },
  {
    name: 'רמי ביטון',
    role: 'מנכ״ל',
    proj: 'משרדי חברה',
    loc: 'ראשון לציון',
    quote: 'חיפשנו מישהו שיבנה לנו משרדים תוך חודש — כולם אמרו שזה בלתי אפשרי. פז גבהים לקחו את האתגר ברצינות, הוסיפו עוד צוות, ומסרו לנו בזמן. שירות ענייני ומקצועי ממש.',
  },
  {
    name: 'יעל שפירא',
    role: 'בעלת נכס',
    proj: 'שיפוץ מלא',
    loc: 'אשדוד',
    quote: 'אחרי שני קבלנים שעזבו באמצע, הגיעו פז גבהים וסיימו את העבודה כמו שצריך. הם לקחו אחריות על מה שהאחרים השאירו, תיקנו, והוסיפו. אני ממליצה לכולם בעיניים עצומות.',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-pg-bg section-pad relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-pg-gold/[0.025] rounded-full blur-[130px] pointer-events-none" />

      <div className="container-lg relative z-10">
        <SectionTitle
          num="004"
          eyebrow="לקוחות מספרים"
          title="מה לקוחות אמיתיים אומרים עלינו."
          sub="לא שיווק. לא עריכה. ממש מה שאנשים אמרו אחרי שקיבלו את הפרויקט."
        />

        {/* Desktop: 2 large pull quotes | Mobile: all 4 stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`relative border-r-2 border-pg-gold/25 pr-8 ${i >= 2 ? 'lg:hidden' : ''}`}
            >
              {/* Large quote mark */}
              <div
                className="leading-none select-none text-pg-gold/10 font-serif mb-1"
                style={{ fontSize: '120px', lineHeight: 1 }}
                aria-hidden="true"
              >
                ״
              </div>

              {/* Quote text */}
              <blockquote className="text-xl leading-relaxed font-light text-pg-text mb-7">
                {r.quote}
              </blockquote>

              {/* Thin divider */}
              <div className="w-10 h-px bg-pg-gold/30 mb-5" />

              {/* Attribution — small caps style */}
              <div>
                <div className="text-sm font-bold text-pg-text tracking-wide uppercase">{r.name}</div>
                <div className="text-[12px] text-pg-mute tracking-widest uppercase mt-1">
                  {r.role} &nbsp;·&nbsp; {r.proj} &nbsp;·&nbsp; {r.loc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 pt-8 border-t border-white/6"
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
