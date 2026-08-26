/**
 * UTILITÁRIOS GLOBAIS
 */

export function formatCurrency(value) {
  if (typeof value !== 'number') return 'R$ 0,00'
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatNumber(value) {
  return value.toLocaleString('pt-BR')
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'
    document.body.appendChild(ta); ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  }
}

export function scrollToElement(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

export function truncate(text, max) {
  if (!text || text.length <= max) return text
  return text.slice(0, max - 3) + '...'
}
