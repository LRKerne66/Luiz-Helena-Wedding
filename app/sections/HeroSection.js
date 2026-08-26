"use client"

import { useCountdown } from '@/app/hooks/useCountdown'
import { scrollToElement } from '@/lib/utils'
import { COUPLE_NAMES, WEDDING_DATE_TEXT, VENUE, PHOTOS } from '@/app/config/couple'

function CountdownUnit({ value, label }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(201,169,110,0.25)',
      borderRadius: 'var(--radius-md)',
      padding: '18px 14px',
      textAlign: 'center',
      minWidth: 76,
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 600, color: 'var(--champagne)', lineHeight: 1 }}>
        {String(value).padStart(2, '0')}
      </div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginTop: 6, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>
        {label}
      </div>
    </div>
  )
}

export default function HeroSection() {
  const countdown = useCountdown()

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* Imagem de fundo com zoom sutil */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${PHOTOS.hero})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        animation: 'gentleZoom 20s ease-in-out infinite alternate',
      }} />

      {/* Overlay gradiente escuro */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(45,45,45,0.35) 0%, rgba(45,45,45,0.55) 50%, rgba(45,45,45,0.75) 100%)',
      }} />

      {/* Anel decorativo pulsante */}
      <div style={{ position: 'absolute', top: '12%', right: '12%', width: 100, height: 100, border: '1.5px solid rgba(201,169,110,0.2)', borderRadius: '50%', animation: 'pulse-ring 4s ease-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '18%', left: '10%', width: 70, height: 70, border: '1px solid rgba(201,169,110,0.12)', borderRadius: '50%', animation: 'pulse-ring 5s ease-out infinite 1.5s' }} />

      {/* Conteúdo */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '140px 24px 100px', maxWidth: 800 }}>

        <p className="animate-fade-up d1" style={{ color: 'var(--champagne)', fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 28, fontWeight: 600 }}>
          Save the Date
        </p>

        <h1 className="animate-fade-up d2" style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 9vw, 6.5rem)',
          fontWeight: 400, lineHeight: 1.05, marginBottom: 20, color: '#fff',
        }}>
          {COUPLE_NAMES.groom} <span style={{ fontStyle: 'italic', color: 'var(--champagne)', fontWeight: 400 }}>&</span> {COUPLE_NAMES.bride}
        </h1>

        <div className="animate-fade-up d3" style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, var(--champagne), transparent)', margin: '0 auto 28px' }} />

        <p className="animate-fade-up d3" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, marginBottom: 8, fontWeight: 300, letterSpacing: '0.02em' }}>
          {WEDDING_DATE_TEXT}
        </p>
        <p className="animate-fade-up d3" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 48 }}>
          {VENUE.full}
        </p>

        <div className="animate-fade-up d4" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <CountdownUnit value={countdown.days} label="Dias" />
          <CountdownUnit value={countdown.hours} label="Horas" />
          <CountdownUnit value={countdown.minutes} label="Min" />
          <CountdownUnit value={countdown.seconds} label="Seg" />
        </div>

        <div className="animate-fade-up d5" style={{ marginTop: 52 }}>
          <button onClick={() => scrollToElement('gifts')} style={{
            background: 'transparent', color: 'var(--champagne)', border: '1.5px solid var(--champagne)',
            borderRadius: 'var(--radius-full)', padding: '14px 40px', fontSize: 12, letterSpacing: '0.18em',
            textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
            transition: 'all 0.35s ease',
          }}
          onMouseEnter={e => { e.target.style.background = 'var(--champagne)'; e.target.style.color = '#1a1816'; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--champagne)'; }}>
            Ver Lista de Presentes
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="animate-fade d6" style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 30, background: 'linear-gradient(180deg, var(--champagne), transparent)', animation: 'float 2s ease-in-out infinite' }} />
      </div>
    </section>
  )
}
