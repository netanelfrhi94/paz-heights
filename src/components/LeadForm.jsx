import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PHONE = '053-523-0998'
const WA    = '0535230998'

// הדביקו כאן את כתובת ה-Web App של Google Apps Script לאחר ההגדרה
const SHEET_URL = 'https://script.google.com/macros/s/AKfycby4ZXHxeQnt9HwbKucyOpUD0FIYaLyficsqEludibqefLisa4JrUrjMecDwpUGYycOs/exec'

const types = ['מחסן', 'משרד', 'קליניקה', 'בנייה קלה', 'שיפוץ', 'אחר']
const areas = ['מרכז', 'שפלה', 'דרום']

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'שדה חובה'
  if (!form.phone.trim()) errors.phone = 'שדה חובה'
  else if (!/^0[0-9\-]{8,10}$/.test(form.phone.replace(/\s/g, ''))) errors.phone = 'מספר לא תקין'
  return errors
}

function openWhatsApp(form) {
  const msg = [
    '👋 פנייה חדשה מהאתר — פז גבהים',
    '',
    `*שם:* ${form.name}`,
    `*טלפון:* ${form.phone}`,
    form.type ? `*סוג פרויקט:* ${form.type}` : '',
    form.area ? `*אזור:* ${form.area}` : '',
  ].filter(Boolean).join('\n')

  const a = document.createElement('a')
  a.href = `https://wa.me/972${WA}?text=${encodeURIComponent(msg)}`
  a.target = '_blank'
  a.rel = 'noopener noreferrer'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

async function sendToSheets(form) {
  if (SHEET_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') return
  try {
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({
        name:  form.name,
        phone: form.phone,
        type:  form.type  || '—',
        area:  form.area  || '—',
        date:  new Date().toLocaleString('he-IL'),
      }),
    })
  } catch (_) {}
}

export default function LeadForm() {
  const [form, setForm]           = useState({ name: '', phone: '', type: '', area: '' })
  const [errors, setErrors]       = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [requestCount, setRequestCount] = useState(17)

  useEffect(() => {
    const id = setInterval(() => {
      setRequestCount((n) => n + Math.floor(Math.random() * 2))
    }, 45000)
    return () => clearInterval(id)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    openWhatsApp(form)
    sendToSheets(form)
    setSubmitted(true)
  }

  return (
    <section id="lead" className="bg-pg-bg section-pad relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-pg-gold/[0.05] rounded-full blur-[140px]" />
      </div>

      <div className="container-lg relative z-10">

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
        >
          <div className="flex items-center gap-3 bg-pg-surface border border-white/8 rounded-full px-5 py-2.5">
            <div className="flex -space-x-2 space-x-reverse">
              {['דמ','מכ','רב','יש'].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-pg-gold/20 border-2 border-pg-bg flex items-center justify-center text-[10px] font-bold text-pg-gold">{i}</div>
              ))}
            </div>
            <span className="text-sm text-pg-dim">
              <strong className="text-pg-text">{requestCount} עסקים</strong> פנו השבוע
            </span>
          </div>
          <div className="flex items-center gap-2 bg-pg-surface border border-white/8 rounded-full px-5 py-2.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-pg-dim">מגיבים תוך <strong className="text-pg-text">30 דקות</strong></span>
          </div>
        </motion.div>

        <div className="bg-pg-surface border border-white/10 rounded-3xl p-8 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)]">

          {/* Left: pitch */}
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-pg-gold" />
              <span className="text-xs font-semibold text-pg-gold tracking-[0.22em] uppercase">מוכנים לדבר?</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-pg-text leading-tight tracking-tight mb-5">
              קבלו הצעת מחיר<br />
              <span className="text-pg-gold">תוך 24 שעות.</span>
            </h2>

            <p className="text-pg-dim text-lg leading-relaxed mb-10">
              ייעוץ ראשוני ללא עלות וללא התחייבות.
              נחזור אליכם עם הערכת מחיר ולוח זמנים ריאלי.
            </p>

            <ul className="flex flex-col gap-4 mb-10">
              {[
                { t: 'תגובה תוך 30 דקות בשעות העבודה',   icon: '⚡' },
                { t: 'הצעה מפורטת פריט-פריט — לא הערכה',  icon: '📋' },
                { t: 'ביקור מדידה ללא עלות באזורכם',       icon: '📍' },
                { t: 'אין התחייבות, אין לחץ, אין ספאם',    icon: '🔒' },
              ].map((item) => (
                <li key={item.t} className="flex items-center gap-3.5 text-[15px] text-pg-text">
                  <span className="w-8 h-8 rounded-xl bg-pg-gold/10 border border-pg-gold/20 flex items-center justify-center text-sm shrink-0">
                    {item.icon}
                  </span>
                  {item.t}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 pt-8 border-t border-white/8">
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2.5 text-sm text-pg-text hover:text-pg-gold transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-pg-gold/10 flex items-center justify-center group-hover:bg-pg-gold/20 transition-colors">
                  <PhoneIcon className="w-3.5 h-3.5 text-pg-gold" />
                </div>
                <span dir="ltr">{PHONE}</span>
              </a>
              <a
                href={`https://wa.me/972${WA}`}
                className="inline-flex items-center gap-2.5 text-sm text-pg-text hover:text-[#25D366] transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                  <WAMini />
                </div>
                וואטסאפ
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-pg-surfaceHi border border-pg-gold/30 rounded-2xl p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: 'backOut' }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-pg-gold to-pg-goldDeep mx-auto mb-6 flex items-center justify-center shadow-[0_0_40px_rgba(201,162,75,0.4)]"
                  >
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1A1305" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-pg-text mb-3">קיבלנו את הפרטים!</h3>
                  <p className="text-pg-dim text-base mb-6">נחזור אליכם תוך 30 דקות בשעות העבודה.</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-pg-mute">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    הצוות שלנו זמין עכשיו
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  {/* Header */}
                  <div className="bg-pg-surfaceHi rounded-xl px-5 py-3 flex items-center gap-3 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                    <span className="text-sm text-pg-dim">
                      <strong className="text-pg-text">זמינים עכשיו</strong> — ממלאים ואנחנו מתקשרים
                    </span>
                  </div>

                  <Field label="שם מלא" error={errors.name}>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="הקלידו שם מלא"
                      className={inputCls(errors.name)}
                    />
                  </Field>

                  <Field label="טלפון" error={errors.phone}>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="050-000-0000"
                      dir="ltr"
                      className={inputCls(errors.phone)}
                    />
                  </Field>

                  <Field label="סוג הפרויקט">
                    <div className="flex flex-wrap gap-2">
                      {types.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setForm({ ...form, type: t })}
                          className={chipCls(form.type === t)}
                        >{t}</button>
                      ))}
                    </div>
                  </Field>

                  <Field label="אזור">
                    <div className="flex gap-2">
                      {areas.map((a) => (
                        <button
                          type="button"
                          key={a}
                          onClick={() => setForm({ ...form, area: a })}
                          className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                            form.area === a
                              ? 'border-pg-gold bg-pg-gold/15 text-pg-gold shadow-[0_0_16px_rgba(201,162,75,0.2)]'
                              : 'border-white/12 text-pg-text hover:border-pg-gold/40 hover:bg-white/[0.03]'
                          }`}
                        >{a}</button>
                      ))}
                    </div>
                  </Field>

                  <button
                    type="submit"
                    className="mt-2 py-4 rounded-xl btn-shimmer text-[#1A1305] font-extrabold text-base shadow-[0_12px_40px_rgba(201,162,75,0.4)] hover:shadow-[0_20px_50px_rgba(201,162,75,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      שלחו — ונחזור תוך 30 דקות
                      <svg className="w-4 h-4 group-hover:translate-x-[-3px] transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </button>

                  <p className="text-[11px] text-pg-mute text-center leading-relaxed">
                    🔒 הפרטים שלכם מוגנים לחלוטין · לא נמסור לצד שלישי · לא נשלח ספאם
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-pg-dim mb-2.5">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
          >
            <span>⚠</span> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputCls = (err) =>
  `w-full px-4 py-3.5 rounded-xl bg-transparent border text-pg-text text-[15px] font-sans placeholder-pg-mute outline-none transition-all duration-200 ${
    err
      ? 'border-red-500 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]'
      : 'border-white/12 focus:border-pg-gold focus:shadow-[0_0_0_3px_rgba(201,162,75,0.12)]'
  }`

const chipCls = (active) =>
  `px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${
    active
      ? 'border-pg-gold bg-pg-gold/15 text-pg-gold shadow-[0_0_16px_rgba(201,162,75,0.2)]'
      : 'border-white/12 text-pg-text hover:border-pg-gold/40 hover:bg-white/[0.03]'
  }`

function PhoneIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}

function WAMini() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z"/>
    </svg>
  )
}
