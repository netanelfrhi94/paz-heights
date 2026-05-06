import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const PHONE = '053-523-0998'
const WA    = '0535230998'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    const id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [start, target, duration])
  return count
}

export default function Hero() {
  const [countersStarted, setCountersStarted] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setCountersStarted(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const projects  = useCounter(120, 2200, countersStarted)
  const years     = useCounter(12, 1800, countersStarted)
  const clients   = useCounter(98, 2000, countersStarted)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-pg-bg">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: 'url(/images/hero.jpeg)', backgroundPosition: 'center 35%' }}
      />

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-pg-bg/70 via-pg-bg/40 to-pg-bg/90" />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-pg-bg/40 to-pg-bg/98" />

      {/* Gold ambient orbs */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-pg-gold/[0.04] rounded-full blur-[120px] pointer-events-none animate-orb" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-pg-gold/[0.03] rounded-full blur-[100px] pointer-events-none animate-float-slow" />

      {/* Blueprint grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C9A24B" strokeWidth="0.4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>

      <div className="relative z-10 container-lg section-pad pt-40 md:pt-48 pb-24">

        {/* Urgency badge */}
        <motion.div {...fadeUp(0.05)} className="mb-7">
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-pg-gold/10 border border-pg-gold/25 text-pg-gold text-xs font-bold tracking-widest uppercase animate-badge">
            <span className="w-2 h-2 rounded-full bg-pg-gold animate-pulse shrink-0" />
            3 פרויקטים פנויים לחודש הקרוב — צרו קשר עכשיו
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-pg-gold" />
          <span className="text-xs font-semibold text-pg-gold tracking-[0.22em] uppercase">
            פתרונות בנייה מתקדמים · מרכז ודרום הארץ
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          {...fadeUp(0.2)}
          className="text-5xl sm:text-7xl lg:text-[88px] font-black leading-[0.92] tracking-tight max-w-4xl"
        >
          בונים גבוה.<br />
          <span className="text-pg-gold italic font-black">בונים נכון.</span><br />
          <span className="text-gradient-gold">בהתאמה אישית.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p {...fadeUp(0.3)} className="mt-8 text-lg md:text-xl text-pg-dim leading-relaxed max-w-2xl">
          עסק משפחתי בניהול שלושה אחים — לוחמי מילואים — שבונה לכם
          מחסנים, משרדים, קליניקות ומבנים בהתאמה מלאה.{' '}
          <strong className="text-pg-text font-semibold">בלי קיצורי דרך. בלי הפתעות. בלוח זמנים מחייב.</strong>
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row flex-wrap gap-3 mt-10">
          {/* Primary: WhatsApp */}
          <a
            href={`https://wa.me/972${WA}?text=שלום, אני מעוניין בהצעת מחיר`}
            className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-[#25D366] text-[#072B17] font-extrabold text-base animate-wa-pulse hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200"
          >
            <WAIcon />
            לוואטסאפ — תגובה בדקות
          </a>

          {/* Secondary: Quote */}
          <a
            href="#lead"
            className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl btn-shimmer text-[#1A1305] font-extrabold text-base shadow-[0_12px_40px_rgba(201,162,75,0.4)] hover:shadow-[0_20px_50px_rgba(201,162,75,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            הצעת מחיר חינמית
            <ArrowIcon />
          </a>

          {/* Tertiary: Call */}
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl border border-white/15 text-pg-text font-semibold text-base hover:border-pg-gold/40 hover:bg-white/[0.04] hover:scale-[1.01] transition-all duration-200"
          >
            <PhoneIcon className="w-4 h-4 text-pg-gold" />
            <span dir="ltr">{PHONE}</span>
          </a>
        </motion.div>

        {/* Animated trust bar */}
        <motion.div
          {...fadeUp(0.55)}
          className="flex flex-wrap gap-10 md:gap-16 mt-20 pt-8 border-t border-white/8"
        >
          <div>
            <div className="text-4xl font-black text-pg-text tracking-tight leading-none">
              {projects}<span className="text-pg-gold">+</span>
            </div>
            <div className="text-sm text-pg-dim mt-2 font-medium">פרויקטים הושלמו</div>
          </div>
          <div>
            <div className="text-4xl font-black text-pg-text tracking-tight leading-none">
              {years}
            </div>
            <div className="text-sm text-pg-dim mt-2 font-medium">שנות ניסיון</div>
          </div>
          <div>
            <div className="text-4xl font-black text-pg-text tracking-tight leading-none">
              {clients}<span className="text-pg-gold">%</span>
            </div>
            <div className="text-sm text-pg-dim mt-2 font-medium">לקוחות ממליצים</div>
          </div>
          <div>
            <div className="text-4xl font-black text-pg-text tracking-tight leading-none">
              24/7
            </div>
            <div className="text-sm text-pg-dim mt-2 font-medium">זמינות בוואטסאפ</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll pointer-events-none"
      >
        <div className="w-px h-10 bg-gradient-to-b from-pg-gold/60 to-transparent" />
        <div className="text-[10px] text-pg-mute tracking-[0.2em] uppercase">גלול</div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-pg-bg to-transparent pointer-events-none" />
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

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}
