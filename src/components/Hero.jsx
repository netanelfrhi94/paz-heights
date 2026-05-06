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

  const projects = useCounter(120, 2200, countersStarted)
  const years    = useCounter(12,  1800, countersStarted)
  const clients  = useCounter(98,  2000, countersStarted)

  return (
    <section className="relative min-h-screen flex overflow-hidden bg-pg-bg">

      {/* RIGHT PANEL — content (RTL: this is visually on the right side) */}
      <div className="w-full lg:w-[48%] flex flex-col justify-center relative z-10 px-6 md:px-12 lg:px-16 pt-36 pb-20 lg:pt-44 lg:pb-24">

        {/* Eyebrow */}
        <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 mb-10">
          <span className="block w-10 h-px bg-pg-gold flex-shrink-0" />
          <span className="section-num tracking-[0.25em] uppercase text-pg-gold/60">
            בנייה קלה &nbsp;|&nbsp; שיפוצים &nbsp;|&nbsp; מחסנים
          </span>
        </motion.div>

        {/* H1 — three lines */}
        <motion.h1
          {...fadeUp(0.2)}
          className="text-display text-pg-text mb-8 max-w-lg"
          style={{ fontWeight: 800 }}
        >
          בונים ללא פשרות.<br />
          <span className="text-pg-gold">מוסרים ביום</span><br />
          שהובטח.
        </motion.h1>

        {/* Sub paragraph */}
        <motion.p {...fadeUp(0.3)} className="text-base text-pg-dim leading-[1.8] max-w-md mb-10">
          עסק משפחתי בניהול שלושה אחים — לוחמי מילואים — שבונה לכם
          מחסנים, משרדים, קליניקות ומבנים בהתאמה מלאה.
          בלי קיצורי דרך. בלי הפתעות. בלוח זמנים מחייב.
        </motion.p>

        {/* Stats row */}
        <motion.div {...fadeUp(0.38)} className="flex items-stretch gap-0 mb-12 border border-white/6 rounded-xl overflow-hidden max-w-sm">
          <div className="flex-1 px-5 py-4 text-center border-l border-white/6">
            <div className="text-2xl font-black text-pg-text leading-none">
              {projects}<span className="text-pg-gold text-lg">+</span>
            </div>
            <div className="text-[11px] text-pg-mute mt-1.5 tracking-wide">פרויקטים</div>
          </div>
          <div className="flex-1 px-5 py-4 text-center border-l border-white/6">
            <div className="text-2xl font-black text-pg-text leading-none">{years}</div>
            <div className="text-[11px] text-pg-mute mt-1.5 tracking-wide">שנות ניסיון</div>
          </div>
          <div className="flex-1 px-5 py-4 text-center">
            <div className="text-2xl font-black text-pg-text leading-none">
              {clients}<span className="text-pg-gold text-lg">%</span>
            </div>
            <div className="text-[11px] text-pg-mute mt-1.5 tracking-wide">ממליצים</div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div {...fadeUp(0.46)} className="flex flex-col sm:flex-row gap-3 mb-10">
          <a
            href="#lead"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg btn-shimmer text-[#1A1305] font-bold text-[15px] shadow-[0_8px_32px_rgba(201,162,75,0.35)] hover:shadow-[0_12px_40px_rgba(201,162,75,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            לייעוץ חינמי
            <ArrowIcon />
          </a>
          <a
            href="#gallery"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg border border-white/12 text-pg-text font-semibold text-[15px] hover:border-pg-gold/35 hover:bg-white/[0.03] transition-all duration-200"
          >
            לפרויקטים
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.div {...fadeUp(0.54)} className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-pg-gold animate-pulse flex-shrink-0" />
          <span className="text-[13px] text-pg-mute">
            3 מקומות פנויים לחודש הקרוב
          </span>
        </motion.div>

        {/* Scroll indicator — desktop only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="hidden lg:flex flex-col items-center gap-2 absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll pointer-events-none"
        >
          <div className="w-px h-10 bg-gradient-to-b from-pg-gold/50 to-transparent" />
          <div className="text-[9px] text-pg-mute tracking-[0.2em] uppercase">גלול</div>
        </motion.div>
      </div>

      {/* LEFT PANEL — full-bleed image (hidden on mobile) */}
      <div className="hidden lg:block lg:w-[52%] relative overflow-hidden">
        {/* Mobile image above content */}
        <img
          src="/images/hero.jpeg"
          alt="פז גבהים — פרויקט בנייה"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />

        {/* Gradient overlay — fades into the content panel on the right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(10,14,20,0.35) 0%, transparent 40%)' }}
        />

        {/* Architectural corner annotation */}
        <div className="absolute top-10 right-10 pointer-events-none select-none">
          <div className="relative w-14 h-14">
            <div className="absolute top-0 right-0 w-full h-px bg-pg-gold/50" />
            <div className="absolute top-0 right-0 w-px h-full bg-pg-gold/50" />
          </div>
          <div className="text-[9px] text-pg-gold/40 tracking-[0.2em] mt-2 font-mono">31.05°N 34.75°E</div>
        </div>

        {/* Bottom-left watermark */}
        <div className="absolute bottom-10 left-10 pointer-events-none select-none">
          <div className="text-[11px] text-white/15 tracking-[0.3em] font-bold">2012 — 2026</div>
          <div className="w-8 h-px bg-pg-gold/20 mt-2" />
        </div>

        {/* Bottom-right corner annotation */}
        <div className="absolute bottom-10 right-10 pointer-events-none select-none">
          <div className="relative w-10 h-10">
            <div className="absolute bottom-0 right-0 w-full h-px bg-pg-gold/40" />
            <div className="absolute bottom-0 right-0 w-px h-full bg-pg-gold/40" />
          </div>
        </div>
      </div>

      {/* MOBILE — hero image above content (stacks vertically) */}
      <div
        className="lg:hidden absolute top-0 inset-x-0 pointer-events-none"
        style={{ height: '60vw' }}
      >
        <img
          src="/images/hero.jpeg"
          alt="פז גבהים — פרויקט בנייה"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, #0A0E14 100%)' }} />
      </div>

      {/* Dark fade at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-pg-bg to-transparent pointer-events-none" />
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
