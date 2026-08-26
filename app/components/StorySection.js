"use client"

export default function StorySection() {
  return (
    <section id="story" style={{ padding: '100px 24px', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <p className="reveal reveal-delay-1" style={{ color: 'var(--color-gold)', fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16, fontWeight: 500 }}>Nossa História</p>
        <h2 className="reveal reveal-delay-2" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-text)', marginBottom: 48, fontWeight: 400 }}>
          O início de <span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>tudo</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, textAlign: 'left', alignItems: 'center' }}>
          <div className="reveal reveal-delay-2">
            <div style={{ width: '100%', aspectRatio: '3/4', background: 'linear-gradient(135deg, #e8e4df, #d4cfc7)', borderRadius: 'var(--radius-2xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: 14, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, transparent 40%, rgba(201,169,110,0.08) 50%, transparent 60%)' }} />
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>💍</div>
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Foto do casal</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p className="reveal reveal-delay-3" style={{ color: 'var(--color-text-light)', fontSize: 16, lineHeight: 1.8, fontWeight: 300 }}>
              Nos conhecemos em uma tarde que parecia comum, mas que se tornou o dia mais importante das nossas vidas. Entre risos, conversas e olhares, descobrimos que estávamos diante de algo verdadeiramente especial.
            </p>
            <p className="reveal reveal-delay-3" style={{ color: 'var(--color-text-light)', fontSize: 16, lineHeight: 1.8, fontWeight: 300 }}>
              Depois de anos juntos, enfrentando desafios e celebrando conquistas, chegou o momento de oficializar o nosso amor diante de quem mais amamos. Queremos compartilhar esse momento único com você.
            </p>
            <div className="reveal reveal-delay-4" style={{ width: 40, height: 1, background: 'var(--color-gold)', marginTop: 8 }} />
            <p className="reveal reveal-delay-4" style={{ color: 'var(--color-text-muted)', fontSize: 13, fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
              "O amor não se vê com os olhos, mas com o coração."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
