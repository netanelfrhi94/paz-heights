import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PHONE = '053-523-0998'
const WA    = '0535230998'

const links = [
  { label: 'שירותים',  href: '#services'  },
  { label: 'פרויקטים', href: '#gallery'   },
  { label: 'תהליך',    href: '#process'   },
  { label: 'שאלות',    href: '#faq'       },
  { label: 'צרו קשר',  href: '#lead'      },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [banner, setBanner]     = useState(true)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Announcement banner — refined */}
      <AnimatePresence>
        {banner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 inset-x-0 z-[60] overflow-hidden"
            style={{ background: 'linear-gradient(90deg, #9C7B33 0%, #C9A24B 50%, #9C7B33 100%)' }}
          >
            <div className="container-lg px-5 md:px-12 py-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-[#1A1305] text-[11px] font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A1305]/50 animate-pulse shrink-0" />
                <span>3 פרויקטים פנויים לחודש הקרוב — הזדמנות מוגבלת</span>
                <a href="#lead" className="hidden sm:inline opacity-70 hover:opacity-100 transition-opacity border-b border-[#1A1305]/40 pb-px">
                  קבעו ייעוץ עכשיו
                </a>
              </div>
              <button
                onClick={() => setBanner(false)}
                className="text-[#1A1305]/50 hover:text-[#1A1305] text-sm leading-none transition-colors shrink-0 w-5 h-5 flex items-center justify-center"
                aria-label="סגור הודעה"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={`fixed inset-x-0 z-50 transition-all duration-500 ${banner ? 'top-8' : 'top-0'} ${
          scrolled
            ? 'bg-pg-bg/96 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container-lg flex items-center justify-between px-5 md:px-12 py-4">

          {/* Logo */}
          <a href="#" className="flex items-center group">
            <div className="relative">
              <img
                src="/images/logo.jpeg"
                alt="פז גבהים"
                className="h-14 w-14 object-contain rounded-full transition-opacity duration-300 group-hover:opacity-90"
              />
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: '0 0 24px rgba(201,162,75,0.3)' }} />
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="ניווט ראשי">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13px] font-medium text-pg-mute hover:text-pg-text transition-colors duration-200 relative group tracking-wide"
              >
                {l.label}
                <span className="absolute -bottom-0.5 inset-x-0 h-px bg-pg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href={`https://wa.me/972${WA}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366]/8 border border-[#25D366]/20 text-[#25D366] text-[13px] font-semibold hover:bg-[#25D366]/15 transition-all duration-200"
            >
              <WADot />
              וואטסאפ
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-pg-gold text-[#1A1305] text-[13px] font-bold hover:bg-pg-goldHi transition-colors duration-200"
              style={{ boxShadow: '0 2px 12px rgba(201,162,75,0.25)' }}
            >
              <PhoneIcon className="w-3 h-3" />
              <span dir="ltr">{PHONE}</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 transition"
            aria-label={menuOpen ? 'סגור תפריט' : 'פתח תפריט'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              className="block w-5 h-px bg-pg-text origin-center"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              className="block w-5 h-px bg-pg-text origin-center"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              className="block w-5 h-px bg-pg-text origin-center"
            />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden bg-pg-bg/98 backdrop-blur-xl border-t border-white/5"
              role="navigation"
              aria-label="תפריט ניווט נייד"
            >
              <div className="px-5 pb-6 pt-2 flex flex-col gap-0">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMenuOpen(false)}
                    className="py-3.5 text-[15px] font-medium text-pg-dim hover:text-pg-text border-b border-white/5 transition-colors flex items-center justify-between"
                  >
                    {l.label}
                    <span className="text-pg-gold/40 text-xs">←</span>
                  </motion.a>
                ))}
                <div className="flex gap-2 mt-5">
                  <a
                    href={`tel:${PHONE}`}
                    className="flex-1 text-center py-3 rounded-lg bg-pg-gold text-[#1A1305] font-bold text-sm"
                  >
                    התקשרו
                  </a>
                  <a
                    href={`https://wa.me/972${WA}`}
                    className="flex-1 text-center py-3 rounded-lg bg-[#25D366] text-[#072B17] font-bold text-sm"
                  >
                    וואטסאפ
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

function PhoneIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}

function WADot() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z"/>
    </svg>
  )
}
