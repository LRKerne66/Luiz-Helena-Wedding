"use client"

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { generatePixPayload, generateQRCodeUrl, PIX_KEY } from '@/lib/pix'
import { findGiftConfig } from '@/app/data/gifts'
import { confirmPayment } from '@/lib/api'

export default function GiftModal({ gift, onClose, onConfirm, showToast }) {
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!gift) return null

  const config = findGiftConfig(gift.value)
  const payload = generatePixPayload(gift.value)
  const qrUrl = generateQRCodeUrl(payload, 260)

  const handleConfirm = async () => {
    if (!guestName.trim()) return
    setSubmitting(true)
    try {
      const result = await confirmPayment(gift.value, guestName, guestEmail, message)
      if (result.success) {
        onClose()
        onConfirm?.()
        showToast('Obrigado! Presente registrado com sucesso 💚')
      } else {
        showToast(result.error || 'Erro ao registrar.')
      }
    } catch {
      showToast('Erro de conexão. Verifique se o Apps Script está publicado como "Qualquer pessoa".')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,24,22,0.7)', backdropFilter: 'blur(12px)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, overflow: 'auto' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="animate-scale-in" style={{ background: '#fff', borderRadius: 'var(--radius-2xl)', maxWidth: 440, width: '100%', padding: 36, position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.2)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: 'var(--color-cream)', border: 'none', width: 36, height: 36, borderRadius: '50%', color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, transition: 'all 0.2s' }}
          onMouseEnter={e => { e.target.style.background = 'var(--color-border)'; e.target.style.color = 'var(--color-text)' }}
          onMouseLeave={e => { e.target.style.background = 'var(--color-cream)'; e.target.style.color = 'var(--color-text-muted)' }}>
          ×
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>{config?.icon || '🎁'}</div>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--color-text)', marginBottom: 4, fontWeight: 500 }}>{config?.title || 'Presente'}</h4>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--color-gold)', marginBottom: 8, fontWeight: 600 }}>{formatCurrency(gift.value)}</p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 13, marginBottom: 24 }}>Escaneie o QR code com o app do seu banco</p>

          <div style={{ background: 'var(--color-bg)', borderRadius: 'var(--radius-xl)', padding: 24, marginBottom: 24, border: '1px solid var(--color-border-light)' }}>
            <img src={qrUrl} alt="QR Code PIX" style={{ width: 220, height: 220, margin: '0 auto', borderRadius: 'var(--radius-sm)' }} />
          </div>

          <div style={{ background: 'var(--color-cream)', borderRadius: 'var(--radius-sm)', padding: 10, marginBottom: 20 }}>
            <p style={{ fontSize: 10, color: 'var(--color-text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Chave PIX</p>
            <code style={{ fontSize: 11, color: 'var(--color-text)', fontFamily: 'monospace', wordBreak: 'break-all' }}>{PIX_KEY}</code>
          </div>

          <div style={{ textAlign: 'left', marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text)', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Seu nome *</label>
            <input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Como quer ser identificado?" style={{
              width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
              fontSize: 14, fontFamily: 'inherit', outline: 'none', background: 'var(--color-bg)', transition: 'border 0.2s',
            }} onFocus={e => e.target.style.borderColor = 'var(--color-gold)'} onBlur={e => e.target.style.borderColor = 'var(--color-border)'} />
          </div>
          <div style={{ textAlign: 'left', marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text)', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>E-mail (opcional)</label>
            <input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} placeholder="seu@email.com" style={{
              width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
              fontSize: 14, fontFamily: 'inherit', outline: 'none', background: 'var(--color-bg)', transition: 'border 0.2s',
            }} onFocus={e => e.target.style.borderColor = 'var(--color-gold)'} onBlur={e => e.target.style.borderColor = 'var(--color-border)'} />
          </div>
          <div style={{ textAlign: 'left', marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text)', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Mensagem (opcional)</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Deixe um recado carinhoso..." rows={3} style={{
              width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
              fontSize: 14, fontFamily: 'inherit', outline: 'none', background: 'var(--color-bg)', resize: 'vertical', transition: 'border 0.2s',
            }} onFocus={e => e.target.style.borderColor = 'var(--color-gold)'} onBlur={e => e.target.style.borderColor = 'var(--color-border)'} />
          </div>

          <button onClick={handleConfirm} disabled={!guestName.trim() || submitting} style={{
            width: '100%', background: guestName.trim() && !submitting ? 'var(--color-gold)' : 'var(--color-border)',
            color: guestName.trim() && !submitting ? '#1a1816' : '#a8a29e', border: 'none', borderRadius: 'var(--radius-md)',
            padding: '16px', fontSize: 14, fontWeight: 600, cursor: guestName.trim() && !submitting ? 'pointer' : 'not-allowed',
            letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'all 0.2s',
          }}>
            {submitting ? 'Registrando...' : 'Já fiz o PIX ✓'}
          </button>
          <p style={{ fontSize: 11, color: '#a8a29e', marginTop: 12, lineHeight: 1.5 }}>Ao confirmar, a vaga será reservada e a lista será atualizada.</p>
        </div>
      </div>
    </div>
  )
}
