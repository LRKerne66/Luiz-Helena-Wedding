"use client"

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { generatePixPayload, generateQRCodeUrl, PIX_KEY } from '@/lib/pix'
import { findGiftConfig } from '@/app/config/gifts'
import { confirmPayment } from '@/lib/api'

export default function GiftModal({ gift, onClose, onConfirm, showToast }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!gift) return null

  const cfg = findGiftConfig(gift.value)
  const payload = generatePixPayload(gift.value)
  const qr = generateQRCodeUrl(payload, 260)

  const handleConfirm = async () => {
    if (!name.trim()) return
    setSubmitting(true)
    try {
      const res = await confirmPayment(gift.value, name, email, msg)
      if (res.success) {
        onClose(); onConfirm?.(); showToast('Obrigado! Presente registrado com sucesso 💚')
      } else {
        showToast(res.error || 'Erro ao registrar.')
      }
    } catch {
      showToast('Erro de conexão. Verifique o Apps Script.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(45,42,38,0.65)', backdropFilter: 'blur(14px)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, overflow: 'auto' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="animate-scale" style={{ background: 'var(--white)', borderRadius: 'var(--radius-xl)', maxWidth: 460, width: '100%', padding: '40px 36px', position: 'relative', boxShadow: 'var(--shadow-xl)' }}>

        <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 18, background: 'var(--cream)', border: 'none', width: 36, height: 36, borderRadius: '50%', color: 'var(--taupe)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, transition: 'all 0.2s' }}
          onMouseEnter={e => { e.target.style.background = 'var(--cream-dark)'; e.target.style.color = 'var(--charcoal)' }}
          onMouseLeave={e => { e.target.style.background = 'var(--cream)'; e.target.style.color = 'var(--taupe)' }}>×</button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 42, marginBottom: 10 }}>{cfg?.icon || '🎁'}</div>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: 'var(--charcoal)', marginBottom: 4, fontWeight: 600 }}>{cfg?.title || 'Presente'}</h4>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 30, color: 'var(--champagne)', marginBottom: 6, fontWeight: 600 }}>{formatCurrency(gift.value)}</p>
          <p style={{ color: 'var(--taupe)', fontSize: 13, marginBottom: 28 }}>Escaneie o QR code com o app do seu banco</p>

          <div style={{ background: 'var(--ivory)', borderRadius: 'var(--radius-lg)', padding: 24, marginBottom: 24, border: '1px solid var(--cream-dark)' }}>
            <img src={qr} alt="QR PIX" style={{ width: 210, height: 210, margin: '0 auto', borderRadius: 'var(--radius-md)' }} />
          </div>

          <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <code style={{ fontSize: 12, color: 'var(--charcoal)', fontFamily: 'monospace', wordBreak: 'break-all' }}>{PIX_KEY}</code>
          </div>

          <div style={{ textAlign: 'left', marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Seu nome *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Como quer ser identificado?" style={{
              width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--cream-dark)',
              fontSize: 14, fontFamily: 'inherit', outline: 'none', background: 'var(--ivory)', transition: 'border-color 0.2s, box-shadow 0.2s',
            }} onFocus={e => { e.target.style.borderColor = 'var(--champagne)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.12)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--cream-dark)'; e.target.style.boxShadow = 'none' }} />
          </div>
          <div style={{ textAlign: 'left', marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>E-mail (opcional)</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" style={{
              width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--cream-dark)',
              fontSize: 14, fontFamily: 'inherit', outline: 'none', background: 'var(--ivory)', transition: 'border-color 0.2s, box-shadow 0.2s',
            }} onFocus={e => { e.target.style.borderColor = 'var(--champagne)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.12)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--cream-dark)'; e.target.style.boxShadow = 'none' }} />
          </div>
          <div style={{ textAlign: 'left', marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Mensagem (opcional)</label>
            <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="Deixe um recado carinhoso..." rows={3} style={{
              width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--cream-dark)',
              fontSize: 14, fontFamily: 'inherit', outline: 'none', background: 'var(--ivory)', resize: 'vertical', transition: 'border-color 0.2s, box-shadow 0.2s',
            }} onFocus={e => { e.target.style.borderColor = 'var(--champagne)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.12)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--cream-dark)'; e.target.style.boxShadow = 'none' }} />
          </div>

          <button onClick={handleConfirm} disabled={!name.trim() || submitting} style={{
            width: '100%', background: name.trim() && !submitting ? 'var(--champagne)' : 'var(--cream-dark)',
            color: name.trim() && !submitting ? 'var(--white)' : 'var(--taupe)', border: 'none', borderRadius: 'var(--radius-md)',
            padding: '16px', fontSize: 14, fontWeight: 600, cursor: name.trim() && !submitting ? 'pointer' : 'not-allowed',
            letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'all 0.2s',
          }}>
            {submitting ? 'Registrando...' : 'Já fiz o PIX ✓'}
          </button>
          <p style={{ fontSize: 11, color: 'var(--taupe-light)', marginTop: 14, lineHeight: 1.5 }}>Ao confirmar, a vaga será reservada e a lista atualizada.</p>
        </div>
      </div>
    </div>
  )
}
