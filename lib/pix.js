/**
 * MÓDULO PIX PAYLOAD GENERATOR
 * Gera payloads QR Code PIX conforme especificação BACEN (EMV QR Code).
 * 
 * REFERÊNCIA: https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/
 * 
 * PARA MODIFICAR:
 * - Chave PIX: altere PIX_KEY abaixo
 * - Nome: altere MERCHANT_NAME (max 25 chars)
 * - Cidade: altere MERCHANT_CITY (max 15 chars — truncado automaticamente)
 */

/** Chave PIX do recebedor */
export const PIX_KEY = "d2b5d67b-c62a-41d9-af5f-c4162b9c1a8d"

const MERCHANT_NAME = "Luiz e Helena"
const MERCHANT_CITY = "SAO BENTO DO SUL"
const CURRENCY_CODE = "986"
const COUNTRY_CODE = "BR"
const MCC = "0000"

/**
 * Calcula CRC16-CCITT-FALSE (polinômio 0x1021, inicial 0xFFFF).
 * @param {string} data
 * @returns {string} CRC hex maiúsculo, 4 dígitos
 */
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

/** Constrói Additional Data Field (tag 62) com TXID */
function buildAdditionalData() {
  return buildField('62', buildField('05', '***'))
}

/**
 * Gera o payload PIX completo para um valor.
 * ESTRUTURA EMV:
 * 00: Payload Format Indicator
 * 26: Merchant Account Information
 * 52: Merchant Category Code
 * 53: Transaction Currency
 * 54: Transaction Amount
 * 58: Country Code
 * 59: Merchant Name
 * 60: Merchant City
 * 62: Additional Data Field
 * 63: CRC16
 */
export function generatePixPayload(value) {
  if (typeof value !== 'number' || value <= 0) {
    throw new Error(`Valor PIX inválido: ${value}`)
  }

  const amount = value.toFixed(2)
  const city = MERCHANT_CITY.slice(0, 15) // TRUNCADO para 15 chars (limite EMV!)

  let payload = ''
  payload += buildField('00', '01')
  payload += buildMerchantAccountInfo(PIX_KEY)
  payload += buildField('52', MCC)
  payload += buildField('53', CURRENCY_CODE)
  payload += buildField('54', amount)
  payload += buildField('58', COUNTRY_CODE)
  payload += buildField('59', MERCHANT_NAME)
  payload += buildField('60', city)
  payload += buildAdditionalData()

  const payloadWithCRCTag = payload + '6304'
  const crc = calculateCRC16(payloadWithCRCTag)
  return payloadWithCRCTag + crc
}

/** Gera URL do QR Code via API pública */
export function generateQRCodeUrl(payload, size = 300) {
  if (!payload) throw new Error('Payload inválido')
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(payload)}`
}

/** Valida um payload PIX (checagens básicas) */
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
