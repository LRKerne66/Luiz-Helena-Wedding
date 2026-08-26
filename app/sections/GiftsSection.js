"use client"

import { useGifts } from '@/app/hooks/useGifts'
import { getGiftStatus, findGiftConfig } from '@/app/config/gifts'
import { formatCurrency, copyToClipboard } from '@/lib/utils'
import { generatePixPayload, generateQRCodeUrl, PIX_KEY } from '@/lib/pix'
import { useToast } from '@/app/hooks/useToast'

export default function GiftsSection({ onSelectGift }) {
  const { gifts, loading, error } = useGifts()
  const { toast, showToast } = useToast()

  const copyPix = () => {
    copyToClipboard(PIX_KEY)
    showToast('Chave PIX copiada!')
  }

  if (loading) {
    return (
      <section id="gifts" style={{ padding: 'var(--space-5xl) 24px', background: 'var(--ivory)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 44, height: 44, border: '3px solid var(--cream-dark)', borderTopColor: 'var(--champagne)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }} />
          <p style={{ color: 'var(--taupe)', fontSize: 14 }}>Carregando presentes...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="gifts" style={{ padding: 'var(--space-5xl) 24px', background: 'var(--ivory)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="reveal rd1 section-label" style={{ marginBottom: 16 }}>Lista de Presentes</p>
          <h2 className="reveal rd2" style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            color: 'var(--charcoal)', fontWeight: 500, lineHeight: 1.15,
          }}>
            Presentes em <span style={{ fontStyle: 'italic', color: 'var(--champagne)' }}>dinheiro</span>
          </h2>
          <div className="reveal rd3" style={{ width: 50, height: 1, background: 'var(--champagne)', margin: '20px auto 24px', opacity: 0.6 }} />
          <p className="reveal rd3" style={{ color: 'var(--taupe)', maxWidth: 520, margin: '0 auto', lineHeight: 1.8, fontSize: 15, fontWeight: 300 }}>
            Sua presença é nosso maior presente! Caso queira nos presentear, escolha um valor abaixo e contribua via PIX.
          </p>
        </div>

        {error && (
          <div className="reveal" style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', padding: 16, marginBottom: 36, maxWidth: 600, margin: '0 auto 36px', textAlign: 'center' }}>
            <p style={{ color: '#b91c1c', fontSize: 13 }}>⚠️ {error}</p>
          </div>
        )}

        {/* PIX Key Banner */}
        <div className="reveal rd2" style={{
          background: 'var(--white)', border: '1px solid var(--cream-dark)', borderRadius: 'var(--radius-xl)',
          padding: '28px 32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, maxWidth: 640, margin: '0 auto 48px', boxShadow: 'var(--shadow-sm)',
        }}>
          <div>
            <p style={{ color: 'var(--charcoal)', fontWeight: 600, fontSize: 13, marginBottom: 6, fontFamily: 'var(--font-serif)', letterSpacing: '0.05em' }}>Chave PIX</p>
            <p style={{ color: 'var(--taupe)', fontSize: 12, fontFamily: 'monospace', letterSpacing: '0.04em' }}>{PIX_KEY}</p>
          </div>
          <button onClick={copyPix} style={{
            background: 'var(--charcoal)', color: 'var(--white)', border: 'none', borderRadius: 'var(--radius-md)',
            padding: '10px 24px', fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.06em',
            textTransform: 'uppercase', transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => e.target.style.background = 'var(--champagne)'}
          onMouseLeave={e => e.target.style.background = 'var(--charcoal)'}>
            Copiar Chave
          </button>
        </div>

        {/* Gift Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
          {gifts.map((gift, i) => {
            const status = getGiftStatus(gift)
            const cfg = findGiftConfig(gift.value)
            const isSoldOut = status.status === 'soldout'
            const payload = generatePixPayload(gift.value)
            const qr = generateQRCodeUrl(payload, 180)

            const colors = {
              ok: { bg: 'var(--white)', border: 'var(--cream-dark)', badgeBg: '#ecfdf5', badgeText: '#065f46', btn: 'var(--sage)', btnHover: 'var(--sage-dark)' },
              low: { bg: '#fff9f0', border: '#f0d9a8', badgeBg: '#fef3c7', badgeText: '#92400e', btn: 'var(--champagne)', btnHover: 'var(--champagne-dark)' },
              soldout: { bg: 'var(--cream)', border: 'var(--cream-dark)', badgeBg: 'var(--cream-dark)', badgeText: 'var(--taupe)', btn: 'var(--cream-dark)', btnHover: 'var(--cream-dark)' },
            }[status.status]

            return (
              <div key={gift.value} className={`reveal rd${(i % 4) + 2}`} style={{
                background: colors.bg, border: `1px solid ${colors.border}`, borderRadius: 'var(--radius-xl)', padding: 28,
                position: 'relative', overflow: 'hidden', transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                boxShadow: 'var(--shadow-sm)',
              }}
              onMouseEnter={e => { if (!isSoldOut) { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  <span style={{ fontSize: 32 }}>{cfg?.icon || '🎁'}</span>
                  <span style={{ background: colors.badgeBg, color: colors.badgeText, fontSize: 10, fontWeight: 700, padding: '5px 12px', borderRadius: 'var(--radius-full)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    {isSoldOut ? 'Esgotado' : `${status.remaining} vagas`}
                  </span>
                </div>

                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, color: 'var(--charcoal)', marginBottom: 3, fontWeight: 600 }}>{cfg?.title || 'Presente'}</h4>
                <p style={{ fontSize: 12, color: 'var(--taupe)', marginBottom: 14 }}>{cfg?.desc}</p>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: 'var(--charcoal)', marginBottom: 16, fontWeight: 600 }}>{formatCurrency(gift.value)}</p>

                {!isSoldOut && (
                  <div style={{ background: 'var(--ivory)', borderRadius: 'var(--radius-md)', padding: 14, marginBottom: 18, border: '1px solid var(--cream-dark)', display: 'flex', justifyContent: 'center' }}>
                    <img src={qr} alt={`QR PIX ${gift.value}`} style={{ width: 120, height: 120, borderRadius: 'var(--radius-sm)' }}
                      onError={e => { e.target.style.display = 'none' }} />
                  </div>
                )}

                <button onClick={() => !isSoldOut && onSelectGift(gift)} disabled={isSoldOut} style={{
                  width: '100%', background: colors.btn, color: isSoldOut ? 'var(--taupe)' : 'var(--white)', border: 'none',
                  borderRadius: 'var(--radius-md)', padding: '13px', fontSize: 12, fontWeight: 600,
                  cursor: isSoldOut ? 'not-allowed' : 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase',
                  transition: 'all 0.25s ease', opacity: isSoldOut ? 0.7 : 1,
                }}
                onMouseEnter={e => !isSoldOut && (e.target.style.background = colors.btnHover)}
                onMouseLeave={e => !isSoldOut && (e.target.style.background = colors.btn)}>
                  {isSoldOut ? 'Esgotado' : 'Presentear'}
                </button>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div style={{ marginTop: 44, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 28, fontSize: 12, color: 'var(--taupe)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--sage)' }} /> Disponível</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--champagne)' }} /> Poucas vagas</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cream-dark)' }} /> Esgotado</span>
        </div>
      </div>

      <Toast message={toast} />
    </section>
  )
}

function Toast({ message }) {
  if (!message) return null
  return (
    <div style={{
      position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)',
      background: 'var(--charcoal)', color: '#fff', padding: '14px 32px',
      borderRadius: 'var(--radius-lg)', fontSize: 14, fontWeight: 500,
      boxShadow: '0 20px 50px rgba(0,0,0,0.18)', zIndex: 200,
      animation: 'fadeInUp 0.35s ease',
    }}>
      {message}
    </div>
  )
}
