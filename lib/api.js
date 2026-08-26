/**
 * MÓDULO DE API — Google Apps Script
 * -----------------------------------------------------------
 * Comunicação com backend (Google Sheets via Apps Script).
 * Inclui timeout, retry automático e tratamento de erros.
 * ============================================================
 */

const SCRIPT_URL = process.env.NEXT_PUBLIC_SCRIPT_URL
const TIMEOUT = 15000
const RETRIES = 2

async function fetchWithRetry(url, opts = {}, retries = RETRIES) {
  const ctrl = new AbortController()
  const tid = setTimeout(() => ctrl.abort(), TIMEOUT)
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal })
    clearTimeout(tid)
    return res
  } catch (err) {
    clearTimeout(tid)
    if (retries > 0 && err.name !== 'AbortError') {
      await new Promise(r => setTimeout(r, 1000))
      return fetchWithRetry(url, opts, retries - 1)
    }
    throw err
  }
}

export async function fetchGifts() {
  if (!SCRIPT_URL) throw new Error('NEXT_PUBLIC_SCRIPT_URL não configurada')
  const res = await fetchWithRetry(`${SCRIPT_URL}?action=getGifts`, { method: 'GET', cache: 'no-store' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  if (!Array.isArray(data)) throw new Error('Resposta inválida')
  return data
}

export async function confirmPayment(giftValue, guestName, guestEmail = '', message = '') {
  if (!SCRIPT_URL) throw new Error('NEXT_PUBLIC_SCRIPT_URL não configurada')
  if (!guestName?.trim()) throw new Error('Nome obrigatório')
  const res = await fetchWithRetry(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'confirmPayment',
      giftValue,
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim(),
      message: message.trim(),
    }),
  })
  if (!res.ok) { const text = await res.text(); throw new Error(`HTTP ${res.status}: ${text}`) }
  return res.json()
}
