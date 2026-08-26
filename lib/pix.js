/**
 * MÓDULO PIX PAYLOAD GENERATOR
 * -----------------------------------------------------------
 * Gera payloads QR Code PIX conforme especificação BACEN (EMV).
 * 
 * CORREÇÃO PRINCIPAL: cidade truncada para 15 caracteres (limite EMV)
 * 
 * PARA MODIFICAR:
 * - Chave PIX: altere PIX_KEY
 * - Nome do recebedor: altere MERCHANT_NAME (max 25 chars)
 * - Cidade: altere MERCHANT_CITY (max 15 chars, truncado auto)
 * ============================================================
 */

/** Chave PIX do recebedor (UUID aleatória) */
export const PIX_KEY = "d2b5d67b-c62a-41d9-af5f-c4162b9c1a8d"

const MERCHANT_NAME = "Luiz e Helena"      // max 25 chars
const MERCHANT_CITY = "SAO BENTO DO SUL"   // max 15 chars (truncado abaixo)
const CURRENCY_CODE = "986"                // BRL
const COUNTRY_CODE = "BR"
const MCC = "0000"                         // Merchant Category Code

/** Calcula CRC16-CCITT-FALSE (polinômio 0x1021, inicial 0xFFFF) */
export function calculateCRC16(data) {
  let crc = 0xFFFF
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1)
      crc &= 0xFFFF
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

/** Constrói campo TLV: Tag + Length + Value */
function buildField(tag, value) {
  return `${tag}${String(value.length).padStart(2, '0')}${value}`
}

/** Constrói Merchant Account Information (tag 26) */
function buildMerchantAccountInfo(pixKey) {
  const gui = buildField('00', 'br.gov.bcb.pix')
  const key = buildField('01', pixKey)
  return buildField('26', gui + key)
}

/** Constrói Additional Data Field (tag 62) com TXID automático */
function buildAdditionalData() {
  return buildField('62', buildField('05', '***'))
}

/**
 * Gera o payload PIX completo para um valor.
 * @param {number} value - Valor em reais (ex: 100, 200)
 * @returns {string} Payload PIX válido
 */
export function generatePixPayload(value) {
  if (typeof value !== 'number' || value <= 0) {
    throw new Error(`Valor PIX inválido: ${value}`)
  }

  const amount = value.toFixed(2)
  const city = MERCHANT_CITY.slice(0, 15) // ⬅️ TRUNCADO para 15 chars (limite EMV!)

  let payload = ''
  payload += buildField('00', '01')           // Payload Format Indicator
  payload += buildMerchantAccountInfo(PIX_KEY) // Merchant Account Information
  payload += buildField('52', MCC)            // Merchant Category Code
  payload += buildField('53', CURRENCY_CODE)  // Transaction Currency
  payload += buildField('54', amount)         // Transaction Amount
  payload += buildField('58', COUNTRY_CODE)   // Country Code
  payload += buildField('59', MERCHANT_NAME)  // Merchant Name
  payload += buildField('60', city)           // Merchant City (truncado!)
  payload += buildAdditionalData()            // Additional Data Field

  const payloadWithCRCTag = payload + '6304'
  const crc = calculateCRC16(payloadWithCRCTag)
  return payloadWithCRCTag + crc
}

/** Gera URL do QR Code via API pública */
export function generateQRCodeUrl(payload, size = 300) {
  if (!payload) throw new Error('Payload inválido')
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(payload)}`
}

/** Valida um payload PIX */
export function validatePixPayload(payload) {
  const errors = []
  if (!payload || payload.length < 50) errors.push('Payload muito curto')
  if (!payload.startsWith('0002')) errors.push('PFI inválido')
  if (!payload.includes('br.gov.bcb.pix')) errors.push('GUI não encontrado')
  if (!payload.includes(PIX_KEY)) errors.push('Chave PIX não encontrada')

  const crcIndex = payload.lastIndexOf('6304')
  if (crcIndex === -1 || payload.length - crcIndex !== 8) {
    errors.push('CRC inválido')
  } else {
    const dataForCRC = payload.slice(0, crcIndex + 4)
    const expectedCRC = calculateCRC16(dataForCRC)
    const actualCRC = payload.slice(crcIndex + 4)
    if (expectedCRC !== actualCRC) {
      errors.push(`CRC incorreto: esperado ${expectedCRC}, encontrado ${actualCRC}`)
    }
  }
  return { valid: errors.length === 0, errors }
}
