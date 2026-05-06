import { useState, useEffect } from 'react'

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
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-pg-bg/95 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="container-lg flex items-center justify-between px-5 md:px-12 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="shrink-0">
            <rect x="1" y="1" width="34" height="34" rx="8" stroke="#C9A24B" strokeWidth="1.2" opacity="0.5"/>
            <rect x="7"  y="20" width="3.5" height="9"  fill="#C9A24B"/>
            <rect x="13" y="14" width="3.5" height="15" fill="#C9A24B"/>
            <rect x="19" y="8"  width="3.5" height="21" fill="#C9A24B"/>
            <rect x="25" y="14" width="3.5" height="15" fill="#C9A24B" opacity="0.5"/>
          </svg>
          <div>
            <div className="text-lg font-extrabold text-pg-text leading-none tracking-tight group-hover:text-pg-goldHi transition-colors">פז גבהים</div>
            <div className="text-[9px] text-pg-gold font-semibold tracking-[0.18em] mt-0.5">BUILD · ELEVATE</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-pg-dim hover:text-pg-text transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={`tel:${PHONE}`}
          className="hidden md:inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] text-pg-text text-sm font-semibold transition-all duration-200 hover:border-pg-gold/50"
        >
          <PhoneIcon className="w-3.5 h-3.5 text-pg-gold" />
          <span dir="ltr">{PHONE}</span>
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition"
          aria-label="תפריט"
        >
          <span className={`w-5 h-0.5 bg-pg-text transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-0.5 bg-pg-text transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-pg-text transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="bg-pg-bg/98 backdrop-blur-md border-t border-white/5 px-5 pb-6 pt-2 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-base font-medium text-pg-dim hover:text-pg-text border-b border-white/5 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 mt-4">
            <a href={`tel:${PHONE}`} className="flex-1 text-center py-3 rounded-xl bg-pg-gold text-[#1A1305] font-bold text-sm">
              התקשרו
            </a>
            <a href={`https://wa.me/972${WA}`} className="flex-1 text-center py-3 rounded-xl bg-[#25D366] text-[#072B17] font-bold text-sm">
              וואטסאפ
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

function PhoneIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}
