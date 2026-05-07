import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const STORAGE_KEY = 'pg-a11y-prefs'
const PHONE = '053-523-0998'
const EMAIL = 'accessibility@pazgavohim.co.il'
const STATEMENT_DATE = '01/05/2025'

/* ─── All 12 grid options ─── */
const GRID_OPTIONS = [
  { id: 'large-text',       label: 'הגדלת טקסט',        cls: 'a11y-large-text',       group: 'textSize', icon: <BigTextIcon /> },
  { id: 'small-text',       label: 'הקטנת טקסט',        cls: 'a11y-small-text',       group: 'textSize', icon: <SmallTextIcon /> },
  { id: 'high-contrast',    label: 'ניגודיות גבוהה',    cls: 'a11y-high-contrast',    group: 'contrast', icon: <ContrastDarkIcon /> },
  { id: 'light-contrast',   label: 'ניגודיות בהירה',    cls: 'a11y-light-contrast',   group: 'contrast', icon: <ContrastLightIcon /> },
  { id: 'grayscale',        label: 'גווני אפור',         cls: 'a11y-grayscale',                           icon: <GrayIcon /> },
  { id: 'highlight-links',  label: 'הדגשת קישורים',     cls: 'a11y-highlight-links',                     icon: <LinksIcon /> },
  { id: 'stop-animations',  label: 'עצירת אנימציות',    cls: 'a11y-stop-animations',                     icon: <StopAnimIcon /> },
  { id: 'readable-font',    label: 'פונט קריא',          cls: 'a11y-readable-font',                       icon: <FontReadIcon /> },
  { id: 'line-height',      label: 'רווח בין שורות',    cls: 'a11y-line-height',                         icon: <LineHIcon /> },
  { id: 'letter-spacing',   label: 'רווח בין אותיות',   cls: 'a11y-letter-spacing',                      icon: <LetterSpacingIcon /> },
  { id: 'dyslexia-font',    label: 'פונט דיסלקציה',     cls: 'a11y-dyslexia-font',    group: 'font',     icon: <DyslexiaIcon /> },
  { id: 'reading-guide',    label: 'מדריך קריאה',        cls: null,                                       icon: <ReadingGuideIcon /> },
]

function loadPrefs() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}
function savePrefs(p) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)) } catch {}
}
function applyPrefs(prefs) {
  const body = document.body
  GRID_OPTIONS.forEach(({ cls }) => { if (cls) body.classList.remove(cls) })
  Object.entries(prefs).forEach(([id, active]) => {
    if (!active) return
    const opt = GRID_OPTIONS.find(o => o.id === id)
    if (opt?.cls) body.classList.add(opt.cls)
  })
}

export default function Accessibility() {
  const [open, setOpen]             = useState(false)
  const [prefs, setPrefs]           = useState(loadPrefs)
  const [showStatement, setShowStatement] = useState(false)
  const [mouseY, setMouseY]         = useState(-999)
  const btnRef   = useRef(null)
  const menuRef  = useRef(null)
  const modalRef = useRef(null)

  /* Apply on mount */
  useEffect(() => { applyPrefs(prefs) }, [])
  /* Persist + apply on change */
  useEffect(() => { savePrefs(prefs); applyPrefs(prefs) }, [prefs])

  /* Reading guide — track mouse Y */
  useEffect(() => {
    if (!prefs['reading-guide']) return
    const onMove = (e) => setMouseY(e.clientY)
    window.addEventListener('mousemove', onMove)
    return () => { window.removeEventListener('mousemove', onMove); setMouseY(-999) }
  }, [prefs['reading-guide']])

  /* Close menu on Escape / outside click */
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus() } }
    const onOut = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !btnRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onOut)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onOut) }
  }, [open])

  /* Close statement on Escape / outside click */
  useEffect(() => {
    if (!showStatement) return
    const onKey = (e) => { if (e.key === 'Escape') { setShowStatement(false); setOpen(true) } }
    const onOut = (e) => { if (modalRef.current && !modalRef.current.contains(e.target)) setShowStatement(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onOut)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onOut) }
  }, [showStatement])

  /* Focus trap — menu */
  const trapMenu = useCallback((e) => {
    if (!menuRef.current || e.key !== 'Tab') return
    const els = [...menuRef.current.querySelectorAll('button, a')]
    if (!els.length) return
    if (e.shiftKey && document.activeElement === els[0]) { e.preventDefault(); els[els.length - 1].focus() }
    else if (!e.shiftKey && document.activeElement === els[els.length - 1]) { e.preventDefault(); els[0].focus() }
  }, [])
  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', trapMenu)
    setTimeout(() => menuRef.current?.querySelector('button')?.focus(), 80)
    return () => document.removeEventListener('keydown', trapMenu)
  }, [open, trapMenu])

  /* Focus trap — modal */
  const trapModal = useCallback((e) => {
    if (!modalRef.current || e.key !== 'Tab') return
    const els = [...modalRef.current.querySelectorAll('button, a')]
    if (!els.length) return
    if (e.shiftKey && document.activeElement === els[0]) { e.preventDefault(); els[els.length - 1].focus() }
    else if (!e.shiftKey && document.activeElement === els[els.length - 1]) { e.preventDefault(); els[0].focus() }
  }, [])
  useEffect(() => {
    if (!showStatement) return
    document.addEventListener('keydown', trapModal)
    setTimeout(() => modalRef.current?.querySelector('button')?.focus(), 80)
    return () => document.removeEventListener('keydown', trapModal)
  }, [showStatement, trapModal])

  const handleOption = (opt) => {
    if (opt.isStatement) { setOpen(false); setShowStatement(true); return }
    if (opt.resetAll)    { setPrefs({}); return }
    if (opt.resetGroup)  {
      setPrefs(prev => { const n = { ...prev }; GRID_OPTIONS.filter(o => o.group === opt.resetGroup).forEach(o => delete n[o.id]); return n })
      return
    }
    if (opt.group) {
      setPrefs(prev => {
        const n = { ...prev }
        GRID_OPTIONS.filter(o => o.group === opt.group).forEach(o => delete n[o.id])
        if (!prev[opt.id]) n[opt.id] = true
        return n
      })
      return
    }
    setPrefs(prev => ({ ...prev, [opt.id]: !prev[opt.id] }))
  }

  const activeCount = Object.values(prefs).filter(Boolean).length

  return (
    <>
      {/* ─── Reading guide overlay ─── */}
      {prefs['reading-guide'] && mouseY > 0 && (
        <div
          aria-hidden="true"
          className="fixed inset-x-0 pointer-events-none z-[55]"
          style={{
            top: mouseY - 14,
            height: 32,
            background: 'rgba(255, 230, 0, 0.18)',
            borderTop: '1px solid rgba(200, 170, 0, 0.4)',
            borderBottom: '1px solid rgba(200, 170, 0, 0.4)',
          }}
        />
      )}

      {/* ─── Floating button ─── */}
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
          animation: 'a11y-pulse 2.8s infinite',
        }}
      >
        <WheelchairIcon />
        {activeCount > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
            style={{ background: '#C9A24B' }}
            aria-label={`${activeCount} התאמות נגישות פעילות`}
          >{activeCount}</span>
        )}
      </motion.button>

      {/* ─── Menu panel ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="a11y-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="a11y-title"
            dir="rtl"
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[59] flex flex-col"
            style={{
              bottom: 160,
              left: 16,
              width: 300,
              maxHeight: 'min(460px, calc(100dvh - 220px))',
              borderRadius: 20,
              overflow: 'hidden',
              background: '#ffffff',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 4px 16px rgba(0,0,0,0.15)',
              border: '1px solid #e0e0e0',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-3.5 shrink-0"
              style={{ background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}
            >
              <h2 id="a11y-title" className="text-white font-bold text-[17px] tracking-wide">נגישות</h2>
              <button
                onClick={() => { setOpen(false); btnRef.current?.focus() }}
                aria-label="סגור תפריט נגישות"
                className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-1"
              >
                <CloseSvg />
              </button>
            </div>

            {/* Grid */}
            <div className="p-3 overflow-y-auto flex-1" style={{ background: '#f8f9fa' }}>
              <div className="grid grid-cols-2 gap-2">
                {GRID_OPTIONS.map((opt) => {
                  const active = !!prefs[opt.id]
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOption(opt)}
                      aria-pressed={active}
                      className="relative flex flex-col items-center justify-center gap-2 rounded-xl py-4 px-2 text-center transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{
                        background: active ? '#E3F0FF' : '#ffffff',
                        border: `2px solid ${active ? '#1565C0' : '#e8e8e8'}`,
                        color: active ? '#1565C0' : '#333',
                        outlineColor: '#1565C0',
                      }}
                    >
                      {active && (
                        <span
                          className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: '#1565C0' }}
                          aria-hidden="true"
                        >
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                      <span
                        className="flex items-center justify-center w-12 h-12 rounded-xl"
                        style={{ background: active ? '#1565C0' : '#EEF2FF', color: active ? '#fff' : '#1565C0' }}
                        aria-hidden="true"
                      >
                        {opt.icon}
                      </span>
                      <span className="text-[12px] font-semibold leading-tight">{opt.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{ background: '#1565C0' }}
            >
              <button
                onClick={() => setPrefs({})}
                className="text-white/80 hover:text-white text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-1 rounded"
                aria-label="בטל את כל התאמות הנגישות"
              >
                בטל נגישות
              </button>
              <button
                onClick={() => { setOpen(false); setShowStatement(true) }}
                className="text-white/80 hover:text-white text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-1 rounded"
                aria-label="פתח הצהרת נגישות"
              >
                הצהרת נגישות
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Statement modal ─── */}
      <AnimatePresence>
        {showStatement && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="statement-title"
            dir="rtl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg overflow-hidden"
              style={{ background: '#fff', borderRadius: 16, boxShadow: '0 24px 80px rgba(0,0,0,0.35)' }}
            >
              {/* Modal header */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}
              >
                <h2 id="statement-title" className="text-white font-bold text-lg">הצהרת נגישות</h2>
                <button
                  onClick={() => { setShowStatement(false); setOpen(true) }}
                  aria-label="סגור הצהרת נגישות"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-white"
                >
                  <CloseSvg />
                </button>
              </div>

              {/* Modal body */}
              <div className="px-6 py-5 text-[14px] leading-[1.8] text-gray-600 space-y-4 max-h-[60vh] overflow-y-auto">
                <p>
                  <strong className="text-gray-900">פז גבהים</strong> מחויבת להנגשת האתר לאנשים עם מוגבלויות,
                  בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח–1998, ותקנות שוויון זכויות לאנשים עם מוגבלות
                  (התאמות נגישות לשירות), התשע"ג–2013.
                </p>

                <p>
                  האתר מיושם בהתאם לתקן ישראלי <strong className="text-gray-900">SI 5568</strong> ולהנחיות
                  הבינלאומיות <strong className="text-gray-900">WCAG 2.1 ברמה AA</strong>.
                </p>

                <div className="rounded-xl p-4 space-y-2.5 text-[13px]" style={{ background: '#f0f5ff', border: '1px solid #c7d9f8' }}>
                  <h3 className="font-bold text-blue-800 mb-3 text-[13px] uppercase tracking-wide">פרטי רכז הנגישות</h3>
                  <p><strong className="text-gray-800">שם:</strong> פז גבהים</p>
                  <p>
                    <strong className="text-gray-800">טלפון:</strong>{' '}
                    <a href={`tel:${PHONE}`} className="text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-blue-600 rounded" dir="ltr">{PHONE}</a>
                  </p>
                  <p>
                    <strong className="text-gray-800">אימייל:</strong>{' '}
                    <a href={`mailto:${EMAIL}`} className="text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-blue-600 rounded">{EMAIL}</a>
                  </p>
                  <p><strong className="text-gray-800">תאריך עדכון ההצהרה:</strong> {STATEMENT_DATE}</p>
                </div>

                <div className="rounded-xl p-4 text-[13px]" style={{ background: '#f9f9f9', border: '1px solid #e8e8e8' }}>
                  <h3 className="font-bold text-gray-800 mb-2">התאמות הנגישות הקיימות באתר</h3>
                  <ul className="space-y-1 text-gray-600 list-disc list-inside">
                    <li>שינוי גודל טקסט</li>
                    <li>ניגודיות גבוהה ובהירה</li>
                    <li>גווני אפור</li>
                    <li>הדגשת קישורים</li>
                    <li>עצירת אנימציות</li>
                    <li>פונט קריא ופונט לדיסלקציה</li>
                    <li>הגדלת רווח בין שורות ובין אותיות (WCAG 1.4.12)</li>
                    <li>מדריך קריאה (Reading Guide)</li>
                    <li>קישור "דלג לתוכן" בראש הדף</li>
                    <li>ניווט מלא במקלדת</li>
                    <li>תמיכה בקוראי מסך (ARIA labels)</li>
                  </ul>
                </div>

                <p className="text-[13px]">
                  <strong className="text-gray-800">פניות בנושא נגישות:</strong>{' '}
                  נתקלתם בבעיית נגישות? פנו אלינו ונטפל בהקדם.
                  ניתן לפנות בטלפון או באימייל המצוינים לעיל.
                </p>
              </div>

              {/* Modal footer */}
              <div className="px-6 py-4 flex justify-end" style={{ borderTop: '1px solid #e8e8e8' }}>
                <button
                  onClick={() => { setShowStatement(false); setOpen(true) }}
                  className="px-6 py-2.5 rounded-xl text-white font-bold text-[14px] focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                  style={{ background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}
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

/* ─── Floating button icon ─── */
function WheelchairIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 100 120" fill="white" aria-hidden="true">
      <circle cx="65" cy="10" r="10" />
      <path d="M65 22 C65 22 55 30 50 48 L72 48 L72 22 Z" />
      <path d="M68 30 L82 30 L82 38 L68 38 Z" rx="3" />
      <rect x="30" y="35" width="7" height="32" rx="3" />
      <rect x="30" y="46" width="28" height="7" rx="3" />
      <path d="M30 67 L18 67 L18 74" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="84" r="24" fill="none" stroke="white" strokeWidth="7" />
      <circle cx="60" cy="84" r="4" />
      <line x1="60" y1="60" x2="60" y2="108" stroke="white" strokeWidth="3" />
      <line x1="36" y1="84" x2="84" y2="84" stroke="white" strokeWidth="3" />
      <circle cx="22" cy="86" r="9" fill="none" stroke="white" strokeWidth="6" />
    </svg>
  )
}
function CloseSvg() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
}

/* ─── Grid icons ─── */
function BigTextIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><text x="0" y="18" fontSize="18" fontWeight="900" fontFamily="Arial">A</text><text x="15" y="12" fontSize="10" fontWeight="700" fontFamily="Arial">+</text></svg>
}
function SmallTextIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><text x="0" y="18" fontSize="18" fontWeight="900" fontFamily="Arial">A</text><text x="15" y="12" fontSize="10" fontWeight="700" fontFamily="Arial">−</text></svg>
}
function ContrastDarkIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 1 0 20V2z" fill="currentColor"/><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.8"/></svg>
}
function ContrastLightIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M12 2a10 10 0 0 1 0 20V2z" fill="white"/><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.8"/></svg>
}
function GrayIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M7.5 5.5C8.8 7.2 9.5 9.5 9.5 12s-.7 4.8-2 6.5M16.5 5.5C15.2 7.2 14.5 9.5 14.5 12s.7 4.8 2 6.5"/></svg>
}
function LinksIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/><line x1="4" y1="20" x2="20" y2="20" strokeWidth="2.5"/></svg>
}
function StopAnimIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="4" width="4" height="16" rx="1.5"/><rect x="15" y="4" width="4" height="16" rx="1.5"/></svg>
}
function FontReadIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
}
function LineHIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/><polyline points="8 3 5 6 8 9"/><polyline points="8 21 5 18 8 15"/></svg>
}
function LetterSpacingIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><text x="1" y="16" fontSize="11" fontWeight="700" fontFamily="Arial" letterSpacing="3">A B</text><line x1="2" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1.5"/></svg>
}
function DyslexiaIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><text x="1" y="17" fontSize="14" fontWeight="700" fontFamily="'Comic Sans MS', cursive">dy</text></svg>
}
function ReadingGuideIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="2" y1="12" x2="22" y2="12"/><rect x="2" y="9" width="20" height="6" rx="2" fill="currentColor" opacity="0.2" stroke="none"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
}
