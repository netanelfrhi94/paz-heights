import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const PHONE = '053-523-0998'
const WA    = '0535230998'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
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
    const timer = setTimeout(() => setCountersStarted(true), 900)
    return () => clearTimeout(timer)
  }, [])

  const projects = useCounter(120, 2200, countersStarted)
  const years    = useCounter(12,  1800, countersStarted)
  const clients  = useCounter(98,  2000, countersStarted)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-pg-bg">

      {/* Full-bleed background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-[1.03] transition-transform duration-[8s] ease-out"
        style={{ backgroundImage: 'url(/images/hero.jpeg)', backgroundPosition: 'center 35%' }}
      />

      {/* Layered overlays — rich, dark, directional */}
      <div className="absolute inset-0 bg-gradient-to-b from-pg-bg/75 via-pg-bg/45 to-pg-bg/95" />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-pg-bg/30 to-pg-bg/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-pg-bg via-transparent to-transparent" />

      {/* Gold ambient orbs */}
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-pg-gold/[0.035] rounded-full blur-[140px] pointer-events-none animate-orb" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-pg-gold/[0.025] rounded-full blur-[100px] pointer-events-none animate-float-slow" />

      {/* Architectural corner frames */}
      <div className="absolute top-28 left-10 pointer-events-none select-none hidden lg:block">
        <div className="relative w-12 h-12">
          <div className="absolute top-0 left-0 w-full h-px bg-pg-gold/30" />
          <div className="absolute top-0 left-0 w-px h-full bg-pg-gold/30" />
        </div>
        <div className="text-[9px] text-pg-gold/30 tracking-[0.2em] mt-2 font-mono">31.05°N</div>
      </div>
      <div className="absolute bottom-20 right-10 pointer-events-none select-none hidden lg:block">
        <div className="text-[9px] text-pg-gold/30 tracking-[0.2em] mb-2 font-mono text-left">34.75°E</div>
        <div className="relative w-12 h-12">
          <div className="absolute bottom-0 right-0 w-full h-px bg-pg-gold/30" />
          <div className="absolute bottom-0 right-0 w-px h-full bg-pg-gold/30" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-lg px-5 md:px-12 pt-32 pb-24">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 mb-8">
            <span className="block w-10 h-px bg-pg-gold flex-shrink-0" />
            <span className="text-[11px] font-semibold text-pg-gold/70 tracking-[0.28em] uppercase">
              בנייה קלה · שיפוצים · מחסנים
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1 {...fadeUp(0.2)} className="text-display text-pg-text mb-7">
            בונים ללא פשרות.<br />
            <span className="text-pg-gold">מוסרים ביום</span><br />
            שהובטח.
          </motion.h1>

          {/* Sub */}
          <motion.p {...fadeUp(0.32)} className="text-[17px] text-pg-dim leading-[1.85] max-w-xl mb-12">
            עסק משפחתי בניהול שלושה אחים — מחסנים, משרדים,
            קליניקות ושיפוצים. לוח זמנים מחייב, תמחור שקוף,
            אחריות בכתב.
          </motion.p>

          {/* Stats */}
          <motion.div {...fadeUp(0.42)} className="flex items-stretch gap-0 mb-12 w-fit border border-white/8 rounded-xl overflow-hidden backdrop-blur-sm bg-pg-bg/30">
            {[
              { val: projects, suffix: '+', label: 'פרויקטים' },
              { val: years,    suffix: '',  label: 'שנות ניסיון' },
              { val: clients,  suffix: '%', label: 'ממליצים' },
            ].map((s, i) => (
              <div key={i} className={`px-8 py-5 text-center ${i < 2 ? 'border-l border-white/8' : ''}`}>
                <div className="text-[28px] font-black text-pg-text leading-none tracking-tight">
                  {s.val}<span className="text-pg-gold text-xl">{s.suffix}</span>
                </div>
                <div className="text-[11px] text-pg-mute mt-2 tracking-wide">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.52)} className="flex flex-col sm:flex-row gap-3 mb-10">
            <a
              href="#lead"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl btn-shimmer text-[#1A1305] font-bold text-[15px] shadow-[0_8px_32px_rgba(201,162,75,0.4)] hover:shadow-[0_16px_48px_rgba(201,162,75,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              לייעוץ חינמי
              <ArrowIcon />
            </a>
            <a
              href={`https://wa.me/972${WA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-bold text-[15px] backdrop-blur-sm hover:bg-[#25D366]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <WAIcon />
              וואטסאפ
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.div {...fadeUp(0.62)} className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-pg-gold animate-pulse flex-shrink-0" />
            <span className="text-[13px] text-pg-mute">
              3 מקומות פנויים לחודש הקרוב
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll pointer-events-none"
      >
        <div className="w-px h-10 bg-gradient-to-b from-pg-gold/40 to-transparent" />
        <div className="text-[9px] text-pg-mute/60 tracking-[0.25em] uppercase">גלול</div>
      </motion.div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}

function WAIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z"/>
    </svg>
  )
}
