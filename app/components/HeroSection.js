"use client"

import { useCountdown } from '@/app/hooks/useCountdown'
import { scrollToElement } from '@/lib/utils'
import Particles from './Particles'

function CountdownUnit({ value, label }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,169,110,0.25)',
      borderRadius: 'var(--radius-lg)', padding: '16px 20px', textAlign: 'center', minWidth: 72, backdropFilter: 'blur(8px)',
    }}>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 600, color: 'var(--color-gold)', lineHeight: 1 }}>
        {String(value).padStart(2, '0')}
      </div>
      <div style={{ fontSize: 11, color: '#a89f91', marginTop: 6, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
    </div>
  )
}

export default function HeroSection() {
  const countdown = useCountdown()

  return (
    <section id="home" className="animated-gradient" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: `radial-gradient(circle at 30% 50%, var(--color-gold) 0%, transparent 50%), radial-gradient(circle at 70% 80%, #8b7355 0%, transparent 40%)` }} />
      <Particles count={25} color="#c9a96e" />
      <div style={{ position: 'absolute', top: '15%', right: '10%', width: 120, height: 120, border: '1px solid rgba(201,169,110,0.15)', borderRadius: '50%', animation: 'ringPulse 4s ease-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '20%', left: '8%', width: 80, height: 80, border: '1px solid rgba(201,169,110,0.1)', borderRadius: '50%', animation: 'ringPulse 5s ease-out infinite 1s' }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '120px 24px 80px' }}>
        <p className="animate-fade-in-up delay-1" style={{ color: 'var(--color-gold)', fontSize: 12, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 24, fontWeight: 500 }}>Save the Date</p>
        <h1 className="animate-fade-in-up delay-2" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3.5rem, 10vw, 7rem)', fontWeight: 400, lineHeight: 1.05, marginBottom: 16 }}>
          Luiz <span style={{ fontStyle: 'italic', color: 'var(--color-gold)', fontWeight: 400 }}>&</span> Helena
        </h1>
        <div className="animate-fade-in-up delay-3" style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)', margin: '0 auto 28px' }} />
        <p className="animate-fade-in-up delay-3" style={{ color: '#d4cfc7', fontSize: 18, marginBottom: 8, fontWeight: 300 }}>12 de Dezembro de 2026</p>
        <p className="animate-fade-in-up delay-3" style={{ color: '#8c8279', fontSize: 14, letterSpacing: '0.15em', marginBottom: 48 }}>SÃO BENTO DO SUL, SC</p>

        <div className="animate-fade-in-up delay-4" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <CountdownUnit value={countdown.days} label="Dias" />
          <CountdownUnit value={countdown.hours} label="Horas" />
          <CountdownUnit value={countdown.minutes} label="Min" />
          <CountdownUnit value={countdown.seconds} label="Seg" />
        </div>

        <div className="animate-fade-in-up delay-5" style={{ marginTop: 48 }}>
          <button onClick={() => scrollToElement('gifts')} style={{
            background: 'transparent', color: 'var(--color-gold)', border: '1px solid var(--color-gold)',
            borderRadius: 'var(--radius-full)', padding: '14px 36px', fontSize: 13, letterSpacing: '0.15em',
            textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500, transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => { e.target.style.background = 'var(--color-gold)'; e.target.style.color = '#1a1816'; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--color-gold)'; }}>
            Ver Lista de Presentes
          </button>
        </div>
      </div>
    </section>
  )
}
