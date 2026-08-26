/**
 * MÓDULO DE API — Google Apps Script Integration
 * Comunicação com backend (Google Sheets via Apps Script).
 */

const SCRIPT_URL = process.env.NEXT_PUBLIC_SCRIPT_URL
const DEFAULT_TIMEOUT = 15000
const MAX_RETRIES = 2

async function fetchWithRetry(url, options = {}, retries = MAX_RETRIES) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT)
  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (retries > 0 && error.name !== 'AbortError') {
      await new Promise(r => setTimeout(r, 1000))
      return fetchWithRetry(url, options, retries - 1)
    }
    throw error
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
    body: JSON.stringify({ action: 'confirmPayment', giftValue, guestName: guestName.trim(), guestEmail: guestEmail.trim(), message: message.trim() }),
  })
  if (!res.ok) { const text = await res.text(); throw new Error(`HTTP ${res.status}: ${text}`) }
  return res.json()
}
