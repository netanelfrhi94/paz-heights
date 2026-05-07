import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const STORAGE_KEY = 'pg-a11y-prefs'
const PHONE = '053-523-0998'
const EMAIL = 'accessibility@pazgavohim.co.il'
const STATEMENT_DATE = '01/05/2025'

const OPTIONS = [
  { id: 'large-text',       label: 'הגדלת טקסט',           cls: 'a11y-large-text',      group: 'textSize', icon: <TextPlusIcon /> },
  { id: 'small-text',       label: 'הקטנת טקסט',           cls: 'a11y-small-text',      group: 'textSize', icon: <TextMinusIcon /> },
  { id: 'reset-text',       label: 'איפוס גודל טקסט',      cls: null,                   resetGroup: 'textSize', icon: <ResetTextIcon /> },
  { id: 'high-contrast',    label: 'ניגודיות גבוהה',       cls: 'a11y-high-contrast',   group: 'contrast', icon: <ContrastHighIcon /> },
  { id: 'light-contrast',   label: 'ניגודיות בהירה',       cls: 'a11y-light-contrast',  group: 'contrast', icon: <ContrastLowIcon /> },
  { id: 'grayscale',        label: 'גווני אפור',            cls: 'a11y-grayscale',                          icon: <GrayscaleIcon /> },
  { id: 'highlight-links',  label: 'הדגשת קישורים',        cls: 'a11y-highlight-links',                    icon: <LinkIcon /> },
  { id: 'stop-animations',  label: 'עצירת אנימציות',       cls: 'a11y-stop-animations',                    icon: <PauseIcon /> },
  { id: 'readable-font',    label: 'פונט קריא',             cls: 'a11y-readable-font',                      icon: <FontIcon /> },
  { id: 'line-height',      label: 'הגדלת רווח שורות',     cls: 'a11y-line-height',                        icon: <LineHeightIcon /> },
  { id: 'reset-all',        label: 'איפוס כל ההתאמות',     cls: null,                   resetAll: true,     icon: <ResetAllIcon /> },
  { id: 'statement',        label: 'הצהרת נגישות',          cls: null,                   isStatement: true,  icon: <StatementIcon /> },
]

function loadPrefs() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}
function savePrefs(prefs) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)) } catch {}
}

function applyPrefs(prefs) {
  const body = document.body
  OPTIONS.forEach(({ cls }) => { if (cls) body.classList.remove(cls) })
  Object.entries(prefs).forEach(([id, active]) => {
    if (!active) return
    const opt = OPTIONS.find(o => o.id === id)
    if (opt?.cls) body.classList.add(opt.cls)
  })
}

export default function Accessibility() {
  const [open, setOpen]           = useState(false)
  const [prefs, setPrefs]         = useState(loadPrefs)
  const [showStatement, setShowStatement] = useState(false)
  const btnRef    = useRef(null)
  const menuRef   = useRef(null)
  const modalRef  = useRef(null)

  /* Apply saved prefs on mount */
  useEffect(() => { applyPrefs(prefs) }, [])

  /* Persist & apply whenever prefs change */
  useEffect(() => {
    savePrefs(prefs)
    applyPrefs(prefs)
  }, [prefs])

  /* Close menu on Escape / outside click */
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus() } }
    const onClickOut = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !btnRef.current?.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClickOut)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClickOut) }
  }, [open])

  /* Close statement on Escape / outside click */
  useEffect(() => {
    if (!showStatement) return
    const onKey = (e) => { if (e.key === 'Escape') { setShowStatement(false); setOpen(true) } }
    const onClickOut = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) setShowStatement(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClickOut)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClickOut) }
  }, [showStatement])

  /* Focus trap inside menu */
  const trapFocus = useCallback((e) => {
    if (!menuRef.current) return
    const focusable = menuRef.current.querySelectorAll('button, [tabindex]:not([tabindex="-1"])')
    const first = focusable[0], last = focusable[focusable.length - 1]
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }, [])

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', trapFocus)
    /* Auto-focus first item */
    setTimeout(() => {
      const first = menuRef.current?.querySelector('button')
      first?.focus()
    }, 80)
    return () => document.removeEventListener('keydown', trapFocus)
  }, [open, trapFocus])

  /* Focus trap inside modal */
  const trapModal = useCallback((e) => {
    if (!modalRef.current) return
    const focusable = modalRef.current.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])')
    const first = focusable[0], last = focusable[focusable.length - 1]
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }, [])

  useEffect(() => {
    if (!showStatement) return
    document.addEventListener('keydown', trapModal)
    setTimeout(() => modalRef.current?.querySelector('button')?.focus(), 80)
    return () => document.removeEventListener('keydown', trapModal)
  }, [showStatement, trapModal])

  const handleOption = (opt) => {
    if (opt.isStatement) { setOpen(false); setShowStatement(true); return }
    if (opt.resetAll) { setPrefs({}); return }
    if (opt.resetGroup) {
      setPrefs(prev => {
        const next = { ...prev }
        OPTIONS.filter(o => o.group === opt.resetGroup).forEach(o => { delete next[o.id] })
        return next
      })
      return
    }
    if (opt.group) {
      setPrefs(prev => {
        const next = { ...prev }
        OPTIONS.filter(o => o.group === opt.group).forEach(o => { delete next[o.id] })
        if (!prev[opt.id]) next[opt.id] = true
        return next
      })
      return
    }
    setPrefs(prev => ({ ...prev, [opt.id]: !prev[opt.id] }))
  }

  const activeCount = Object.values(prefs).filter(Boolean).length

  return (
    <>
      {/* ── Floating toggle button ── */}
      <motion.button
        ref={btnRef}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls="a11y-menu"
        aria-label="פתח תפריט נגישות"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.8 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 left-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        style={{
          background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
          boxShadow: '0 8px 32px rgba(21,101,192,0.6), 0 0 0 0 rgba(21,101,192,0.4)',
          animation: 'a11y-pulse 2.8s infinite',
        }}
      >
        <WheelchairIcon />
        {activeCount > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
            style={{ background: '#C9A24B' }}
            aria-label={`${activeCount} התאמות פעילות`}
          >
            {activeCount}
          </span>
        )}
      </motion.button>

      {/* ── Dropdown menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="a11y-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="תפריט נגישות"
            dir="rtl"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[59] shadow-[0_24px_64px_rgba(0,0,0,0.7)] border border-white/10 rounded-2xl overflow-hidden"
            style={{
              bottom: 168,
              left: 16,
              width: 240,
              background: 'linear-gradient(160deg, #161C26 0%, #0F1420 100%)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#C9A24B]">נגישות</span>
              <button
                onClick={() => { setOpen(false); btnRef.current?.focus() }}
                aria-label="סגור תפריט נגישות"
                className="w-6 h-6 rounded-md flex items-center justify-center text-[#A0A6B2] hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A24B] focus-visible:outline-offset-1"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Options */}
            <ul role="list" className="py-2 max-h-[70vh] overflow-y-auto">
              {OPTIONS.map((opt, i) => {
                const isActive = !!prefs[opt.id]
                const isSeparator = opt.id === 'reset-all' || opt.id === 'statement'
                return (
                  <li key={opt.id} role="listitem">
                    {isSeparator && i > 0 && (
                      <div className="mx-4 my-1 border-t border-white/8" aria-hidden="true" />
                    )}
                    <button
                      onClick={() => handleOption(opt)}
                      aria-pressed={opt.cls ? isActive : undefined}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-right text-[13px] font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#C9A24B] focus-visible:outline-offset-[-2px] group ${
                        isActive
                          ? 'text-[#C9A24B] bg-[rgba(201,162,75,0.1)]'
                          : 'text-[#C8CDD8] hover:text-white hover:bg-white/[0.05]'
                      } ${opt.resetAll ? 'text-[#F87171] hover:text-[#FCA5A5] hover:bg-[rgba(239,68,68,0.07)]' : ''}`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-[rgba(201,162,75,0.2)] text-[#C9A24B]'
                            : opt.resetAll
                              ? 'bg-[rgba(239,68,68,0.1)] text-[#F87171]'
                              : 'bg-white/[0.06] text-[#A0A6B2] group-hover:text-white group-hover:bg-white/[0.1]'
                        }`}
                        aria-hidden="true"
                      >
                        {opt.icon}
                      </span>
                      <span className="flex-1">{opt.label}</span>
                      {isActive && opt.cls && (
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: '#C9A24B' }}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Accessibility Statement Modal ── */}
      <AnimatePresence>
        {showStatement && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="הצהרת נגישות"
            dir="rtl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg rounded-2xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden"
              style={{ background: 'linear-gradient(160deg, #161C26 0%, #0F1420 100%)' }}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[rgba(201,162,75,0.12)] flex items-center justify-center">
                    <StatementIcon />
                  </span>
                  <h2 className="text-base font-bold text-white" id="statement-title">הצהרת נגישות</h2>
                </div>
                <button
                  onClick={() => { setShowStatement(false); setOpen(true) }}
                  aria-label="סגור הצהרת נגישות"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#A0A6B2] hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A24B] focus-visible:outline-offset-1"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Modal body */}
              <div className="px-6 py-5 text-[14px] leading-relaxed text-[#A0A6B2] space-y-4 max-h-[65vh] overflow-y-auto">
                <p>
                  <strong className="text-white">פז גבהים</strong> פועלת לאפשר לכל אדם, לרבות אנשים עם מוגבלויות, לגלוש ולהשתמש באתר באופן שוויוני ונוח.
                </p>
                <p>
                  האתר עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג–2013, ומיושם בהתאם להנחיות WCAG 2.1 ברמה AA.
                </p>

                <div className="rounded-xl border border-white/8 p-4 space-y-1.5" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <h3 className="text-[12px] font-bold text-[#C9A24B] tracking-[0.15em] uppercase mb-2">פרטי אחראי נגישות</h3>
                  <p><strong className="text-white">שם:</strong> פז גבהים</p>
                  <p>
                    <strong className="text-white">טלפון:</strong>{' '}
                    <a href={`tel:${PHONE}`} className="text-[#C9A24B] hover:underline focus-visible:outline-2 focus-visible:outline-[#C9A24B] focus-visible:outline-offset-1 rounded" dir="ltr">
                      {PHONE}
                    </a>
                  </p>
                  <p>
                    <strong className="text-white">אימייל:</strong>{' '}
                    <a href={`mailto:${EMAIL}`} className="text-[#C9A24B] hover:underline focus-visible:outline-2 focus-visible:outline-[#C9A24B] focus-visible:outline-offset-1 rounded">
                      {EMAIL}
                    </a>
                  </p>
                  <p><strong className="text-white">תאריך עדכון הצהרה:</strong> {STATEMENT_DATE}</p>
                </div>

                <p>
                  נתקלתם בבעיית נגישות? אנחנו כאן. צרו איתנו קשר ונטפל בפנייה בהקדם האפשרי.
                </p>
              </div>

              {/* Modal footer */}
              <div className="px-6 py-4 border-t border-white/8 flex justify-end">
                <button
                  onClick={() => { setShowStatement(false); setOpen(true) }}
                  className="px-5 py-2.5 rounded-xl text-[13px] font-bold text-[#1A1305] focus-visible:outline-2 focus-visible:outline-[#C9A24B] focus-visible:outline-offset-2"
                  style={{ background: 'linear-gradient(90deg, #C9A24B 0%, #E5C57A 100%)' }}
                >
                  סגור
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Icons ── */
function WheelchairIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 64 64" fill="white" aria-hidden="true">
      {/* Head */}
      <circle cx="36" cy="7" r="5.5" />
      {/* Torso */}
      <path d="M36 13 L36 30 L24 30 L24 36 L40 36 L40 13 Z" />
      {/* Arm */}
      <path d="M36 18 L46 18 L46 22 L38 22" />
      {/* Seat back */}
      <rect x="22" y="28" width="4" height="18" rx="1.5" />
      {/* Seat */}
      <rect x="22" y="34" width="18" height="4" rx="1.5" />
      {/* Footrest */}
      <path d="M22 46 L14 46 L14 50 L22 50" strokeWidth="3.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Large rear wheel */}
      <circle cx="38" cy="50" r="12" fill="none" stroke="white" strokeWidth="4" />
      {/* Small front wheel */}
      <circle cx="18" cy="52" r="5" fill="none" stroke="white" strokeWidth="3.5" />
    </svg>
  )
}
function TextPlusIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><text x="1" y="17" fontSize="14" fontWeight="bold" fill="currentColor" stroke="none">A</text><path d="M18 12v6M15 15h6"/></svg>
}
function TextMinusIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><text x="1" y="17" fontSize="14" fontWeight="bold" fill="currentColor" stroke="none">A</text><path d="M15 15h6"/></svg>
}
function ResetTextIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><text x="3" y="16" fontSize="12" fill="currentColor" stroke="none">Aa</text></svg>
}
function ContrastHighIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 18V4a8 8 0 0 1 0 16z"/></svg>
}
function ContrastLowIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 1 0 20A10 10 0 0 1 12 2zm0 2v16a8 8 0 0 0 0-16z"/></svg>
}
function GrayscaleIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/></svg>
}
function LinkIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
}
function PauseIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
}
function FontIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
}
function LineHeightIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/><path d="M7 3l-4 3 4 3"/><path d="M7 21l-4-3 4-3"/></svg>
}
function ResetAllIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
}
function StatementIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
}
function CloseIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
}
