"use client"

import { CEREMONY, WEDDING_DATE_TEXT } from '@/app/config/couple'

const EVENTS = [
  {
    icon: '⛪', title: 'Cerimônia Religiosa', time: CEREMONY.church.time,
    location: CEREMONY.church.name, address: CEREMONY.church.address + '\n' + CEREMONY.church.city,
    accent: 'var(--champagne)', gradient: 'linear-gradient(135deg, var(--champagne), var(--champagne-dark))',
  },
  {
    icon: '🥂', title: 'Recepção', time: CEREMONY.reception.time,
    location: CEREMONY.reception.name, address: CEREMONY.reception.address,
    accent: 'var(--sage)', gradient: 'linear-gradient(135deg, var(--sage), var(--sage-dark))',
    note: CEREMONY.reception.dressCode,
  },
]

export default function CeremonySection() {
  return (
    <section id="ceremony" style={{ padding: 'var(--space-5xl) 24px', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p className="reveal rd1 section-label" style={{ marginBottom: 16 }}>O Grande Dia</p>
          <h2 className="reveal rd2" style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            color: 'var(--charcoal)', fontWeight: 500, lineHeight: 1.15,
          }}>
            Cerimônia <span style={{ fontStyle: 'italic', color: 'var(--champagne)' }}>&</span> Recepção
          </h2>
          <div className="reveal rd3" style={{ width: 50, height: 1, background: 'var(--champagne)', margin: '20px auto 0', opacity: 0.6 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
          {EVENTS.map((event, i) => (
            <div key={i} className={`reveal rd${i + 2}`} style={{
              background: 'var(--white)', borderRadius: 'var(--radius-xl)', padding: 44,
              border: '1px solid rgba(201,169,110,0.08)', textAlign: 'center',
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              boxShadow: 'var(--shadow-sm)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>

              <div style={{
                width: 68, height: 68, background: event.gradient,
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 26px', fontSize: 26, boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              }}>
                {event.icon}
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: 'var(--charcoal)', marginBottom: 10, fontWeight: 600 }}>
                {event.title}
              </h3>
              <p style={{ color: event.accent, fontSize: 12, letterSpacing: '0.12em', marginBottom: 24, textTransform: 'uppercase', fontWeight: 600 }}>
                {event.time}
              </p>
              <div style={{ width: 30, height: 1, background: 'var(--cream-dark)', margin: '0 auto 24px' }} />
              <p style={{ color: 'var(--charcoal-light)', fontSize: 15, lineHeight: 1.7, marginBottom: 6, fontWeight: 500 }}>
                {event.location}
              </p>
              <p style={{ color: 'var(--taupe)', fontSize: 13, lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                {event.address}
              </p>
              {event.note && (
                <div style={{ marginTop: 20, display: 'inline-block', background: 'var(--ivory)', borderRadius: 'var(--radius-sm)', padding: '8px 18px', border: '1px solid var(--cream-dark)' }}>
                  <span style={{ fontSize: 12, color: 'var(--taupe)', fontWeight: 500 }}>{event.note}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
