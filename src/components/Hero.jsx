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

  const guarantee = useCounter(100, 2000, countersStarted)
  const years     = useCounter(12,  1800, countersStarted)
  const clients   = useCounter(98,  2000, countersStarted)
  const response  = useCounter(30,  1600, countersStarted)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-pg-bg">

      {/* Full-bleed background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hero.jpeg)', backgroundPosition: 'center 35%' }}
      />

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-pg-bg/80 via-pg-bg/50 to-pg-bg/95" />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-pg-bg/20 to-pg-bg/85" />

      {/* Gold ambient orb */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-pg-gold/[0.04] rounded-full blur-[140px] pointer-events-none animate-orb" />

      {/* Content */}
      <div className="relative z-10 container-lg px-5 md:px-12 pt-36 pb-24">
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
          <motion.p {...fadeUp(0.32)} className="text-[17px] text-pg-dim leading-[1.85] max-w-xl mb-10">
            עסק משפחתי בניהול שלושה אחים — מחסנים, משרדים,
            קליניקות ושיפוצים. לוח זמנים מחייב, תמחור שקוף,
            אחריות בכתב.
          </motion.p>

          {/* Three CTA buttons */}
          <motion.div {...fadeUp(0.42)} className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10">

            {/* 1 — Phone (gold shimmer) */}
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl btn-shimmer text-[#1A1305] font-bold text-[15px] shadow-[0_8px_32px_rgba(201,162,75,0.45)] hover:shadow-[0_16px_48px_rgba(201,162,75,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <PhoneIcon />
              <span>חייגו עכשיו</span>
              <span dir="ltr" className="font-extrabold tracking-wide">{PHONE}</span>
            </a>

            {/* 2 — WhatsApp (green) */}
            <a
              href={`https://wa.me/972${WA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#25D366] text-[#072B17] font-bold text-[15px] shadow-[0_8px_28px_rgba(37,211,102,0.35)] hover:shadow-[0_14px_40px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <WAIcon />
              וואטסאפ
            </a>

            {/* 3 — Free consultation (ghost) */}
            <a
              href="#lead"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl border border-white/20 text-pg-text font-semibold text-[15px] backdrop-blur-sm bg-white/[0.06] hover:border-white/35 hover:bg-white/[0.10] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              לייעוץ חינמי
              <ArrowIcon />
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div {...fadeUp(0.54)} className="flex items-stretch gap-0 w-fit border border-white/8 rounded-xl overflow-hidden backdrop-blur-sm bg-pg-bg/30">
            {[
              { val: guarantee, suffix: '%', label: 'אחריות מובטחת' },
              { val: years,     suffix: '',  label: 'שנות אמינות'   },
              { val: clients,   suffix: '%', label: 'ממליצים'        },
              { val: response,  suffix: '′', label: 'מענה מהיר'      },
            ].map((s, i) => (
              <div key={i} className={`px-6 py-5 text-center ${i < 3 ? 'border-l border-white/8' : ''}`}>
                <div className="text-[28px] font-black text-pg-text leading-none tracking-tight">
                  {s.val}<span className="text-pg-gold text-xl">{s.suffix}</span>
                </div>
                <div className="text-[11px] text-pg-mute mt-2 tracking-wide">{s.label}</div>
              </div>
            ))}
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

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}

function WAIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
      <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z"/>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 2"/>
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#C9A24B">
      <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/>
    </svg>
  )
}
