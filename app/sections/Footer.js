"use client"

import { COUPLE_NAMES, WEDDING_DATE_TEXT, VENUE } from '@/app/config/couple'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--charcoal)', color: 'var(--taupe-light)', padding: '70px 24px 50px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Decorativo sutil */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, var(--champagne), transparent)', opacity: 0.4 }} />

      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 36, color: 'var(--champagne)', marginBottom: 10, fontWeight: 500, letterSpacing: '0.02em' }}>
        {COUPLE_NAMES.groom} <span style={{ fontStyle: 'italic', fontWeight: 400 }}>&</span> {COUPLE_NAMES.bride}
      </p>
      <p style={{ fontSize: 13, color: 'var(--taupe)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>
        {WEDDING_DATE_TEXT}
      </p>
      <p style={{ fontSize: 12, color: 'var(--taupe-light)', marginBottom: 24 }}>{VENUE.full}</p>

      <div style={{ width: 40, height: 1, background: 'var(--champagne)', margin: '0 auto 24px', opacity: 0.3 }} />

      <p style={{ fontSize: 13, color: 'var(--taupe)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
        Com carinho, esperamos você!
      </p>

      <p style={{ fontSize: 11, color: 'rgba(138,130,121,0.4)', marginTop: 40 }}>
        Feito com 💛 para o nosso grande dia
      </p>
    </footer>
  )
}
