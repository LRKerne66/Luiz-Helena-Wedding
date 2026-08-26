"use client"

const EVENTS = [
  {
    icon: '⛪', title: 'Cerimônia Religiosa', time: '12 de Dezembro de 2026 às 16h',
    location: 'Paróquia Nossa Senhora Aparecida', address: 'Rua Alfredo Diener, 87\nSão Bento do Sul — SC',
    accent: 'var(--color-gold)', badge: 'var(--color-gold)',
  },
  {
    icon: '🥂', title: 'Recepção', time: 'Após a cerimônia',
    location: 'Salão de Festas Oxford', address: 'São Bento do Sul — SC',
    accent: 'var(--color-green)', badge: 'var(--color-green)', note: 'Traje: Social Completo',
  },
]

export default function CeremonySection() {
  return (
    <section id="ceremony" style={{ padding: '100px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <p className="reveal reveal-delay-1" style={{ color: 'var(--color-gold)', fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16, fontWeight: 500 }}>O Grande Dia</p>
          <h2 className="reveal reveal-delay-2" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-text)', fontWeight: 400 }}>
            Cerimônia <span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>&</span> Recepção
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {EVENTS.map((event, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 2}`} style={{
              background: 'var(--color-bg)', borderRadius: 'var(--radius-2xl)', padding: 40,
              border: '1px solid var(--color-border-light)', textAlign: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{
                width: 64, height: 64, background: `linear-gradient(135deg, ${event.accent}, ${event.badge})`,
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 28,
              }}>
                {event.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--color-text)', marginBottom: 8, fontWeight: 500 }}>{event.title}</h3>
              <p style={{ color: event.accent, fontSize: 13, letterSpacing: '0.1em', marginBottom: 20, textTransform: 'uppercase' }}>{event.time}</p>
              <div style={{ width: 30, height: 1, background: 'var(--color-border)', margin: '0 auto 20px' }} />
              <p style={{ color: 'var(--color-text-light)', fontSize: 15, lineHeight: 1.7, marginBottom: 4 }}>{event.location}</p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{event.address}</p>
              {event.note && (
                <div style={{ marginTop: 16, display: 'inline-block', background: 'var(--color-cream)', borderRadius: 'var(--radius-sm)', padding: '6px 14px' }}>
                  <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{event.note}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
