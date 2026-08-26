"use client"

import { PHOTOS, STORY_TEXT, COUPLE_NAMES } from '@/app/config/couple'

export default function StorySection() {
  return (
    <section id="story" style={{ padding: 'var(--space-5xl) 24px', background: 'var(--ivory)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p className="reveal rd1 section-label" style={{ marginBottom: 16 }}>Nossa História</p>
          <h2 className="reveal rd2" style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            color: 'var(--charcoal)', fontWeight: 500, lineHeight: 1.15,
          }}>
            O início de <span style={{ fontStyle: 'italic', color: 'var(--champagne)' }}>tudo</span>
          </h2>
          <div className="reveal rd3" style={{ width: 50, height: 1, background: 'var(--champagne)', margin: '20px auto 0', opacity: 0.6 }} />
        </div>

        {/* Conteúdo */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 56, alignItems: 'center' }}>

          {/* Fotos */}
          <div className="reveal-left rd2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transform: 'translateY(-20px)' }}>
              <img src={PHOTOS.story1} alt={`${COUPLE_NAMES.groom} e ${COUPLE_NAMES.bride}`} style={{ width: '100%', height: 320, objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
            </div>
            <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transform: 'translateY(20px)' }}>
              <img src={PHOTOS.story2} alt={`${COUPLE_NAMES.groom} e ${COUPLE_NAMES.bride}`} style={{ width: '100%', height: 320, objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
            </div>
          </div>

          {/* Texto */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <p className="reveal-right rd2" style={{ color: 'var(--charcoal-light)', fontSize: 16, lineHeight: 1.85, fontWeight: 300 }}>
              {STORY_TEXT.paragraph1}
            </p>
            <p className="reveal-right rd3" style={{ color: 'var(--charcoal-light)', fontSize: 16, lineHeight: 1.85, fontWeight: 300 }}>
              {STORY_TEXT.paragraph2}
            </p>
            <div className="reveal-right rd4" style={{ width: 40, height: 1, background: 'var(--champagne)', marginTop: 8, opacity: 0.5 }} />
            <p className="reveal-right rd4" style={{ color: 'var(--taupe)', fontSize: 14, fontStyle: 'italic', fontFamily: 'var(--font-serif)', lineHeight: 1.6 }}>
              {STORY_TEXT.quote}
            </p>
          </div>
        </div>

        {/* Mini galeria */}
        <div style={{ marginTop: 72, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[PHOTOS.gallery1, PHOTOS.gallery2, PHOTOS.gallery3].map((src, i) => (
            <div key={i} className={`reveal rd${i + 2}`} style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', aspectRatio: '16/10' }}>
              <img src={src} alt={`Momento ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
