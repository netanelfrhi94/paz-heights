import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PHONE = '053-523-0998'
const WA    = '0535230998'

const types = ['מחסן', 'משרד', 'קליניקה', 'בנייה קלה', 'שיפוץ', 'אחר']
const areas = ['מרכז', 'שפלה', 'דרום']

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'שדה חובה'
  if (!form.phone.trim()) errors.phone = 'שדה חובה'
  else if (!/^0[0-9\-]{8,10}$/.test(form.phone.replace(/\s/g, ''))) errors.phone = 'מספר לא תקין'
  return errors
}

export default function LeadForm() {
  const [form, setForm]       = useState({ name: '', phone: '', type: '', area: '' })
  const [errors, setErrors]   = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSubmitted(true)
  }

  return (
    <section id="lead" className="bg-pg-bg section-pad relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-pg-gold/[0.06] rounded-full blur-[120px]" />
      </div>

      <div className="container-lg relative z-10">
        <div className="bg-pg-surface border border-white/10 rounded-3xl p-8 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">

          {/* Left: pitch */}
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-pg-gold" />
              <span className="text-xs font-semibold text-pg-gold tracking-[0.22em] uppercase">מוכנים לדבר?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-pg-text leading-tight tracking-tight mb-5">
              קבלו הצעת מחיר<br />
              <span className="text-pg-gold">תוך 24 שעות.</span>
            </h2>
            <p className="text-pg-dim text-lg leading-relaxed mb-8">
              ייעוץ ראשוני ללא עלות וללא התחייבות.
              נחזור אליכם עם הערכת מחיר וזמנים.
            </p>

            <ul className="flex flex-col gap-3.5 mb-10">
              {['תגובה תוך 30 דקות בשעות העבודה', 'הצעה מפורטת — לא הערכה כללית', 'אין התחייבות, אין לחץ'].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[15px] text-pg-text">
                  <span className="w-5 h-5 rounded-full bg-pg-gold/20 flex items-center justify-center shrink-0">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 pt-8 border-t border-white/8">
              <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 text-sm text-pg-text hover:text-pg-gold transition-colors">
                <PhoneIcon className="w-4 h-4 text-pg-gold" />
                <span dir="ltr">{PHONE}</span>
              </a>
              <a href={`https://wa.me/972${WA}`} className="inline-flex items-center gap-2 text-sm text-pg-text hover:text-[#25D366] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z"/></svg>
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-pg-surfaceHi border border-pg-gold/30 rounded-2xl p-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-pg-gold mx-auto mb-5 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1A1305" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-pg-text mb-2">קיבלנו את הפרטים!</h3>
                  <p className="text-pg-dim text-[15px]">נחזור אליכם בדקות הקרובות.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  <Field label="שם מלא" error={errors.name}>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="הקלידו שם"
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
                          className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all duration-150 ${
                            form.area === a
                              ? 'border-pg-gold bg-pg-gold/15 text-pg-gold'
                              : 'border-white/12 text-pg-text hover:border-pg-gold/40'
                          }`}
                        >{a}</button>
                      ))}
                    </div>
                  </Field>

                  <button
                    type="submit"
                    className="mt-2 py-4 rounded-xl bg-pg-gold text-[#1A1305] font-extrabold text-base shadow-[0_12px_30px_rgba(201,162,75,0.4)] hover:shadow-[0_16px_40px_rgba(201,162,75,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  >
                    שלחו — ונחזור אליכם תוך 30 דקות
                  </button>

                  <p className="text-[11px] text-pg-mute text-center">
                    הפרטים שלכם מוגנים. לא נמסור לצד ג׳, לא נשלח ספאם.
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
      <label className="block text-sm text-pg-dim mb-2.5">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  )
}

const inputCls = (err) =>
  `w-full px-4 py-3.5 rounded-xl bg-transparent border text-pg-text text-[15px] font-sans placeholder-pg-mute outline-none transition-colors duration-150 ${
    err ? 'border-red-500 focus:border-red-400' : 'border-white/12 focus:border-pg-gold'
  }`

const chipCls = (active) =>
  `px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-150 ${
    active
      ? 'border-pg-gold bg-pg-gold/15 text-pg-gold'
      : 'border-white/12 text-pg-text hover:border-pg-gold/40'
  }`

function PhoneIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}
