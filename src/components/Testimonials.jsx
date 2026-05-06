import { motion } from 'framer-motion'
import { SectionTitle } from './WhyUs'

const reviews = [
  { proj: 'מחסן 240מ״ר · מושב', loc: 'אזור רחובות',    rating: 5 },
  { proj: 'קליניקה רפואית',      loc: 'באר שבע',        rating: 5 },
  { proj: 'משרדי חברה',          loc: 'ראשון לציון',    rating: 5 },
  { proj: 'שיפוץ בית פרטי',      loc: 'אשדוד',          rating: 5 },
]

export default function Testimonials() {
  return (
    <section className="bg-pg-bg section-pad">
      <div className="container-lg">
        <SectionTitle
          eyebrow="לקוחות מספרים"
          title="ככה לקוחות מתארים את העבודה איתנו."
          sub="(placeholders — ממתין לציטוטים אמיתיים שתמלאו)"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="bg-pg-surface border border-white/8 rounded-2xl p-9 flex flex-col gap-5 relative group hover:border-pg-gold/20 transition-colors"
            >
              {/* Decorative quote */}
              <div className="absolute top-6 left-7 text-7xl text-pg-gold/15 font-serif leading-none select-none">״</div>

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <svg key={k} width="15" height="15" viewBox="0 0 24 24" fill="#C9A24B">
                    <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/>
                  </svg>
                ))}
              </div>

              {/* Placeholder quote lines */}
              <div className="py-6 border-y border-dashed border-white/10">
                <div className="text-[10px] text-pg-mute tracking-[0.15em] mb-3">○ ציטוט הלקוח — מקום שמור</div>
                <div className="h-3.5 bg-white/[0.07] rounded mb-2.5" />
                <div className="h-3.5 bg-white/[0.07] rounded mb-2.5 w-11/12" />
                <div className="h-3.5 bg-white/[0.07] rounded w-3/4" />
              </div>

              {/* Attribution */}
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-pg-gold/20 border border-dashed border-pg-gold/40 flex items-center justify-center text-pg-gold font-bold text-base shrink-0">
                  ?
                </div>
                <div>
                  <div className="text-sm font-semibold text-pg-mute">שם הלקוח · יוזן</div>
                  <div className="text-xs text-pg-mute mt-0.5">{r.proj} · {r.loc}</div>
                </div>
                <div className="mr-auto text-[10px] text-pg-mute tracking-widest">○ צילום</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
