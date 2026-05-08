import { trackWAClick, trackPhoneClick, trackCTAClick } from '../utils/gtm'

const PHONE = '053-523-0998'
const WA    = '0535230998'

export default function Footer() {
  return (
    <footer className="bg-pg-bgAlt border-t border-white/6 relative overflow-hidden">

      {/* Large faint watermark — ascending bars logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <svg width="700" height="400" viewBox="0 0 360 200" fill="none" opacity="0.018">
          <rect x="40"  y="120" width="40" height="60"  fill="#C9A24B"/>
          <rect x="100" y="90"  width="40" height="90"  fill="#C9A24B"/>
          <rect x="160" y="50"  width="40" height="130" fill="#C9A24B"/>
          <rect x="220" y="90"  width="40" height="90"  fill="#C9A24B"/>
          <rect x="280" y="120" width="40" height="60"  fill="#C9A24B"/>
        </svg>
      </div>

      <div className="container-lg px-5 md:px-12 relative z-10">

        {/* Large wordmark */}
        <div className="pt-20 pb-10 border-b border-white/6">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div
                className="font-extrabold text-pg-text leading-none tracking-tight"
                style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
              >
                פז גבהים
              </div>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-[10px] text-pg-gold/60 tracking-[0.3em] uppercase font-semibold">Build · Elevate</span>
                <span className="w-px h-3 bg-white/10" />
                <span className="text-[10px] text-pg-mute tracking-[0.2em]">Est. 2012</span>
              </div>
            </div>
            <div className="pb-2">
              <a
                href="#lead"
                onClick={() => trackCTAClick({ source: 'footer', destination: 'lead', text: 'לייעוץ חינמי' })}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-pg-gold text-[#1A1305] font-bold text-[13px] hover:bg-pg-goldHi transition-colors shadow-[0_4px_20px_rgba(201,162,75,0.2)]"
              >
                לייעוץ חינמי ←
              </a>
            </div>
          </div>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14 border-b border-white/6">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
                <rect x="1" y="1" width="34" height="34" rx="8" stroke="#C9A24B" strokeWidth="0.75" opacity="0.5"/>
                <rect x="7"  y="20" width="3.5" height="9"  fill="#C9A24B"/>
                <rect x="13" y="14" width="3.5" height="15" fill="#C9A24B"/>
                <rect x="19" y="8"  width="3.5" height="21" fill="#C9A24B"/>
                <rect x="25" y="14" width="3.5" height="15" fill="#C9A24B" opacity="0.4"/>
              </svg>
              <div>
                <div className="text-[13px] font-extrabold text-pg-text tracking-tight">פז גבהים</div>
                <div className="text-[8px] text-pg-gold/60 font-semibold tracking-[0.2em] uppercase mt-0.5">Build · Elevate</div>
              </div>
            </div>
            <p className="text-[13px] text-pg-mute leading-relaxed max-w-xs">
              עסק משפחתי. שלושה אחים. בנייה, שיפוצים ופתרונות חלוקה — מרכז ודרום.
            </p>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-[10px] text-pg-mute/60 tracking-[0.2em] uppercase mb-5 font-semibold">שירותים</h5>
            {['מחסנים', 'משרדים', 'קליניקות', 'שיפוצים', 'בנייה קלה'].map((l) => (
              <a key={l} href="#services" className="block text-[13px] text-pg-dim hover:text-pg-gold transition-colors mb-3 tracking-wide">{l}</a>
            ))}
          </div>

          {/* Service area */}
          <div>
            <h5 className="text-[10px] text-pg-mute/60 tracking-[0.2em] uppercase mb-5 font-semibold">אזור שירות</h5>
            {['מרכז', 'שפלה', 'דרום', 'מרעננה ועד באר שבע'].map((l) => (
              <div key={l} className="text-[13px] text-pg-mute mb-3 tracking-wide">{l}</div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-[10px] text-pg-mute/60 tracking-[0.2em] uppercase mb-5 font-semibold">צרו קשר</h5>
            <a
              href={`tel:${PHONE}`}
              onClick={() => trackPhoneClick('footer')}
              className="block text-[13px] text-pg-text hover:text-pg-gold transition-colors mb-3 tracking-wide"
              dir="ltr"
            >
              {PHONE}
            </a>
            <a
              href={`https://wa.me/972${WA}`}
              onClick={() => trackWAClick('footer')}
              className="block text-[13px] text-pg-dim hover:text-pg-gold transition-colors mb-3 tracking-wide"
            >
              וואטסאפ — זמין 24/7
            </a>
            <a
              href="#lead"
              onClick={() => trackCTAClick({ source: 'footer', destination: 'lead', text: 'השאירו פרטים' })}
              className="block text-[13px] text-pg-dim hover:text-pg-gold transition-colors tracking-wide"
            >
              השאירו פרטים ←
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-pg-mute/50 tracking-wide">© 2026 פז גבהים. כל הזכויות שמורות.</span>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-pg-mute/40 tracking-wide">תקנון · פרטיות · נגישות</span>
            <span className="w-px h-3 bg-white/8" />
            <span className="text-[11px] text-pg-mute/30 tracking-wide">made with care</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
