"use client"

import { useGifts } from '@/app/hooks/useGifts'
import { getGiftStatus, findGiftConfig } from '@/app/data/gifts'
import { formatCurrency } from '@/lib/utils'
import { generatePixPayload, generateQRCodeUrl } from '@/lib/pix'

export default function GiftsSection({ onSelectGift }) {
  const { gifts, loading, error } = useGifts()

  if (loading) {
    return (
      <section id="gifts" style={{ padding: '100px 24px', background: 'linear-gradient(180deg, var(--color-bg) 0%, var(--color-cream) 100%)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '3px solid var(--color-border)', borderTopColor: 'var(--color-gold)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>Carregando presentes...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="gifts" style={{ padding: '100px 24px', background: 'linear-gradient(180deg, var(--color-bg) 0%, var(--color-cream) 100%)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <p className="reveal reveal-delay-1" style={{ color: 'var(--color-gold)', fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16, fontWeight: 500 }}>Lista de Presentes</p>
          <h2 className="reveal reveal-delay-2" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-text)', marginBottom: 20, fontWeight: 400 }}>
            Presentes em <span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>dinheiro</span>
          </h2>
          <p className="reveal reveal-delay-2" style={{ color: 'var(--color-text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.8, fontSize: 15 }}>
            Sua presença é nosso maior presente! Caso queira nos presentear, escolha um valor abaixo e contribua via PIX.
          </p>
        </div>

        {error && (
          <div className="reveal" style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', padding: 14, marginBottom: 32, maxWidth: 600, margin: '0 auto 32px', textAlign: 'center' }}>
            <p style={{ color: '#b91c1c', fontSize: 13 }}>⚠️ {error}</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {gifts.map((gift, i) => {
            const status = getGiftStatus(gift)
            const config = findGiftConfig(gift.value)
            const isSoldOut = status.status === 'soldout'
            const payload = generatePixPayload(gift.value)
            const qrUrl = generateQRCodeUrl(payload, 200)

            const colors = {
              ok: { bg: '#fff', border: 'var(--color-border)', badgeBg: '#ecfdf5', badgeText: '#065f46', dot: '#22c55e', btn: '#059669' },
              low: { bg: '#fff9f0', border: '#f0d9a8', badgeBg: '#fef3c7', badgeText: '#92400e', dot: '#f59e0b', btn: '#d97706' },
              soldout: { bg: '#f5f3f0', border: '#e8e4df', badgeBg: '#e8e4df', badgeText: '#a8a29e', dot: '#d6d3d1', btn: '#e8e4df' },
            }[status.status]

            return (
              <div key={gift.value} className={`reveal reveal-delay-${(i % 4) + 1}`} style={{
                background: colors.bg, border: `1px solid ${colors.border}`, borderRadius: 'var(--radius-2xl)', padding: 28,
                position: 'relative', overflow: 'hidden', transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span style={{ fontSize: 36 }}>{config?.icon || '🎁'}</span>
                  <span style={{ background: colors.badgeBg, color: colors.badgeText, fontSize: 10, fontWeight: 700, padding: '5px 12px', borderRadius: 'var(--radius-full)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {isSoldOut ? 'Esgotado' : `${status.remaining} vagas`}
                  </span>
                </div>

                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--color-text)', marginBottom: 4, fontWeight: 500 }}>{config?.title || 'Presente'}</h4>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 26, color: 'var(--color-text)', marginBottom: 16, fontWeight: 600 }}>{formatCurrency(gift.value)}</p>

                {!isSoldOut && (
                  <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 20, border: '1px solid var(--color-border-light)', display: 'flex', justifyContent: 'center' }}>
                    <img src={qrUrl} alt={`QR PIX ${gift.value}`} style={{ width: 140, height: 140, borderRadius: 'var(--radius-sm)' }}
                      onError={e => { e.target.style.display = 'none' }} />
                  </div>
                )}

                <button onClick={() => !isSoldOut && onSelectGift(gift)} disabled={isSoldOut} style={{
                  width: '100%', background: colors.btn, color: isSoldOut ? '#a8a29e' : '#fff', border: 'none',
                  borderRadius: 'var(--radius-md)', padding: '14px', fontSize: 13, fontWeight: 600,
                  cursor: isSoldOut ? 'not-allowed' : 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase',
                  transition: 'all 0.2s', opacity: isSoldOut ? 0.6 : 1,
                }}>
                  {isSoldOut ? 'Esgotado' : 'Presentear'}
                </button>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, fontSize: 12, color: '#a8a29e' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} /> Disponível</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} /> Poucas vagas</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#d6d3d1' }} /> Esgotado</span>
        </div>
      </div>
    </section>
  )
}
