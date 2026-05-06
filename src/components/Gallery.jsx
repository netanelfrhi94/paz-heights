import { useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { SectionTitle } from './WhyUs'

const pairs = [
  {
    before: '/images/before-after-before.jpeg',
    after:  '/images/before-after-after.jpeg',
    title:  'מחסן פנל מבודד · חצר פרטית',
    sub:    'מבסיס דק עץ — לעמדת מחסן מוגמרת עם פתח אוורור ודלת.',
  },
  {
    before: '/images/ba2-before.jpeg',
    after:  '/images/ba2-after.jpeg',
    title:  'חלל פנימי · גמר ועיצוב',
    sub:    'מחלל בעבודה לחדר מוגמר עם תאורה, ריצוף ווילונות.',
  },
]

const projects = [
  { src: '/images/project-01.jpeg', tag: 'מחסן', loc: 'שפלה'   },
  { src: '/images/project-02.jpeg', tag: 'בנייה קלה', loc: 'דרום' },
  { src: '/images/project-03.jpeg', tag: 'פנים', loc: 'מרכז'   },
  { src: '/images/project-04.jpeg', tag: 'מחסן', loc: 'דרום'   },
  { src: '/images/project-05.jpeg', tag: 'שיפוץ', loc: 'מרכז'  },
  { src: '/images/project-06.jpeg', tag: 'מחסן', loc: 'שפלה'   },
]

function BeforeAfterSlider({ before, after }) {
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const ref = useRef(null)

  const updatePos = (clientX) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos(Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100)))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft')  setPos((p) => Math.min(98, p + 2))
    if (e.key === 'ArrowRight') setPos((p) => Math.max(2, p - 2))
  }

  return (
    <div
      ref={ref}
      role="img"
      aria-label="השוואת לפני ואחרי — גררו לצפייה"
      tabIndex={0}
      className="ba-slider relative rounded-xl overflow-hidden border border-white/8 select-none"
      style={{ aspectRatio: '4/3' }}
      onMouseDown={(e) => { setDragging(true); updatePos(e.clientX) }}
      onMouseMove={(e) => { if (dragging) updatePos(e.clientX) }}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchStart={(e) => updatePos(e.touches[0].clientX)}
      onTouchMove={(e) => { e.preventDefault(); updatePos(e.touches[0].clientX) }}
      onKeyDown={handleKeyDown}
    >
      {/* After (full) */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${after})` }} />
      {/* Before (clipped from left) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${before})`, clipPath: `inset(0 0 0 ${pos}%)` }}
      />
      {/* Handle line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-pg-gold shadow-[0_0_20px_rgba(201,162,75,0.6)] pointer-events-none"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-pg-gold text-[#1A1305] flex items-center justify-center text-lg font-black shadow-lg">
          ‹›
        </div>
      </div>
      {/* Labels */}
      <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest bg-black/50 text-white px-2.5 py-1 rounded backdrop-blur-sm">אחרי</span>
      <span className="absolute top-3 left-3  text-[10px] font-bold tracking-widest bg-black/50 text-white px-2.5 py-1 rounded backdrop-blur-sm">לפני</span>
    </div>
  )
}

export default function Gallery() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="gallery" className="bg-pg-bgAlt section-pad">
      <div className="container-lg">
        {/* Before/After */}
        <SectionTitle
          eyebrow="לפני / אחרי"
          title="התוצאות מדברות בעצמן."
          sub="גררו את הפס לראות את הטרנספורמציה — מבסיס ריק למבנה מוגמר."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24">
          {pairs.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-xs font-bold text-pg-gold tracking-[0.2em]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-lg font-bold text-pg-text tracking-tight">{p.title}</h3>
              </div>
              <BeforeAfterSlider before={p.before} after={p.after} />
              <p className="text-sm text-pg-dim mt-3">{p.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Project grid */}
        <SectionTitle
          eyebrow="פרויקטים אחרונים"
          title="עבודות מהשטח."
          sub="מבחר פרויקטים שביצענו — מחסנים, משרדים ובנייה קלה במרכז ובדרום."
        />

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="relative rounded-xl overflow-hidden border border-white/8 group cursor-pointer"
              style={{ aspectRatio: '4/5' }}
            >
              <img
                src={p.src}
                alt={`פרויקט ${p.tag} — ${p.loc}`}
                loading="lazy"
                decoding="async"
                width="400"
                height="500"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pg-bg/90 via-transparent to-transparent" />
              <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest bg-pg-gold text-[#1A1305] px-2.5 py-1 rounded-full">
                {p.tag}
              </span>
              <div className="absolute bottom-4 right-4 left-4">
                <div className="text-[10px] text-pg-gold font-bold tracking-widest mb-1">{String(i+1).padStart(2,'0')} · {p.loc}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
