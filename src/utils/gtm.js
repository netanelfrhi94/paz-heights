/**
 * ─────────────────────────────────────────────────────────────────
 * Google Tag Manager — dataLayer utility
 * ─────────────────────────────────────────────────────────────────
 *
 * All GTM events for the Paz Heights landing page are defined here.
 * Import the typed helpers into components — do NOT push to
 * window.dataLayer directly from component files.
 *
 * GTM Container ID is set in index.html (search for GTM-XXXXXXX).
 * ─────────────────────────────────────────────────────────────────
 */

/**
 * Base push — initialises dataLayer if GTM hasn't loaded yet.
 * GTM will replay queued events once the snippet loads.
 *
 * @param {Object} eventData - Any valid GTM dataLayer object.
 */
export function pushEvent(eventData) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(eventData)
}

// ─── Typed event helpers ──────────────────────────────────────────────────────

/**
 * WhatsApp button or link click.
 *
 * @param {'navbar'|'hero'|'lead_form'|'footer'|'floating_button'} source
 */
export function trackWAClick(source) {
  pushEvent({
    event: 'whatsapp_click',
    click_source: source,
  })
}

/**
 * Phone number click (tel: link).
 *
 * @param {'navbar'|'hero'|'lead_form'|'footer'} source
 */
export function trackPhoneClick(source) {
  pushEvent({
    event: 'phone_click',
    click_source: source,
    phone_number: '053-523-0998',
  })
}

/**
 * Lead form successful submission.
 *
 * @param {{ type: string, area: string }} formData - Selected project type and area.
 */
export function trackLeadFormSubmit({ type, area }) {
  pushEvent({
    event: 'lead_form_submit',
    project_type: type || 'לא נבחר',
    area: area || 'לא נבחר',
  })
}

/**
 * CTA button/link that navigates to a page section.
 *
 * @param {{ source: string, destination: 'lead'|'gallery', text: string }} params
 *   source      — component where the CTA lives (e.g. 'hero', 'why_us', 'navbar')
 *   destination — anchor target ('lead' or 'gallery')
 *   text        — visible button label
 */
export function trackCTAClick({ source, destination, text }) {
  pushEvent({
    event: 'cta_click',
    cta_source: source,
    cta_destination: destination,
    cta_text: text,
  })
}

/**
 * FAQ accordion item opened (not closed).
 *
 * @param {{ question: string, index: number }} params
 */
export function trackFAQOpen({ question, index }) {
  pushEvent({
    event: 'faq_open',
    faq_question: question,
    faq_index: index,
  })
}
