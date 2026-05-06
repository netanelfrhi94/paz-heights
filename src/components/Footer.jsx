const PHONE = '053-523-0998'

export default function Footer() {
  return (
    <footer className="bg-pg-bgAlt border-t border-white/8 pt-16 pb-8">
      <div className="container-lg px-5 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                <rect x="1" y="1" width="34" height="34" rx="8" stroke="#C9A24B" strokeWidth="1.2" opacity="0.5"/>
                <rect x="7"  y="20" width="3.5" height="9"  fill="#C9A24B"/>
                <rect x="13" y="14" width="3.5" height="15" fill="#C9A24B"/>
                <rect x="19" y="8"  width="3.5" height="21" fill="#C9A24B"/>
                <rect x="25" y="14" width="3.5" height="15" fill="#C9A24B" opacity="0.5"/>
              </svg>
              <div>
                <div className="text-base font-extrabold text-pg-text">פז גבהים</div>
                <div className="text-[9px] text-pg-gold font-semibold tracking-[0.18em]">BUILD · ELEVATE</div>
              </div>
            </div>
            <p className="text-sm text-pg-dim leading-relaxed max-w-xs">
              עסק משפחתי. שלושה אחים. בנייה, שיפוצים ופתרונות חלוקה — מרכז ודרום.
            </p>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-[11px] text-pg-mute tracking-[0.15em] uppercase mb-4">שירותים</h5>
            {['מחסנים', 'משרדים', 'קליניקות', 'שיפוצים', 'בנייה קלה'].map((l) => (
              <a key={l} href="#services" className="block text-sm text-pg-dim hover:text-pg-gold transition-colors mb-2.5">{l}</a>
            ))}
          </div>

          {/* Service area */}
          <div>
            <h5 className="text-[11px] text-pg-mute tracking-[0.15em] uppercase mb-4">אזור שירות</h5>
            {['מרכז', 'שפלה', 'דרום', 'מרעננה ועד באר שבע'].map((l) => (
              <div key={l} className="text-sm text-pg-dim mb-2.5">{l}</div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-[11px] text-pg-mute tracking-[0.15em] uppercase mb-4">צרו קשר</h5>
            <a href={`tel:${PHONE}`} className="block text-sm text-pg-text hover:text-pg-gold transition-colors mb-2.5" dir="ltr">{PHONE}</a>
            <div className="text-sm text-pg-dim mb-2.5">וואטסאפ זמין 24/7</div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-pg-mute">
          <span>© 2026 פז גבהים. כל הזכויות שמורות.</span>
          <span>תקנון · פרטיות · נגישות</span>
        </div>
      </div>
    </footer>
  )
}
