import { motion } from 'framer-motion'

const PHONE = '053-523-0998'
const WA    = '0535230998'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-pg-bg">
      {/* Hero image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hero.jpeg)', backgroundPosition: 'center 40%' }}
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-pg-bg/50 via-pg-bg/30 to-pg-bg/85" />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-pg-bg/50 to-pg-bg/95" />
      {/* Blueprint grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#C9A24B" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>

      <div className="relative z-10 container-lg section-pad pt-36 md:pt-44">
        {/* Eyebrow */}
        <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 mb-6">
          <span className="w-6 h-px bg-pg-gold" />
          <span className="text-xs font-semibold text-pg-gold tracking-[0.22em] uppercase">
            פתרונות בנייה מתקדמים · מרכז ודרום
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          {...fadeUp(0.2)}
          className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.95] tracking-tight max-w-4xl"
        >
          בונים גבוה.<br />
          <span className="text-pg-gold italic">בונים נכון.</span><br />
          <span className="text-gradient-gold">בהתאמה אישית.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p {...fadeUp(0.3)} className="mt-7 text-lg md:text-xl text-pg-dim leading-relaxed max-w-xl">
          עסק משפחתי בניהול שלושה אחים — לוחמי מילואים — שבונה לכם
          מחסנים, משרדים, קליניקות ומבנים בהתאמה אישית.{' '}
          <strong className="text-pg-text font-semibold">בלי קיצורי דרך, בלי הפתעות, בלוח זמנים.</strong>
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3 mt-10">
          <a
            href={`https://wa.me/972${WA}`}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-[#25D366] text-[#072B17] font-bold text-base shadow-[0_12px_40px_rgba(37,211,102,0.3)] hover:shadow-[0_16px_48px_rgba(37,211,102,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <WAIcon />
            לחצו לוואטסאפ — תגובה תוך דקות
          </a>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-pg-gold text-[#1A1305] font-bold text-base shadow-[0_12px_40px_rgba(201,162,75,0.35)] hover:shadow-[0_16px_48px_rgba(201,162,75,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <PhoneIcon className="w-4 h-4" />
            התקשרו עכשיו
          </a>
          <a
            href="#lead"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-xl border border-white/15 text-pg-text font-semibold text-base hover:border-pg-gold/50 hover:bg-white/5 transition-all duration-200"
          >
            הצעת מחיר ללא עלות
            <span className="text-pg-gold">←</span>
          </a>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          {...fadeUp(0.5)}
          className="flex flex-wrap gap-8 md:gap-12 mt-16 pt-8 border-t border-white/8"
        >
          {[
            { val: '100%', label: 'אחריות בכתב' },
            { val: '24/7', label: 'זמינות לפניות' },
            { val: 'אמינות', label: 'ושקיפות מלאה', icon: 'shield' },
            { val: 'עמידה', label: 'בלוחות זמנים', icon: 'clock' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-black text-pg-text tracking-tight leading-none">
                {s.val}
              </div>
              <div className="text-sm text-pg-dim mt-1.5 font-medium">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-pg-bg to-transparent pointer-events-none" />
    </section>
  )
}

function WAIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
    </svg>
  )
}

function PhoneIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}
