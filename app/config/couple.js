/**
 * CONFIGURAÇÕES DO CASAL
 * -----------------------------------------------------------
 * Edite este arquivo para personalizar os dados do casamento.
 * Todas as seções do site leem destas constantes.
 * 
 * PARA TROCAR FOTOS:
 * 1. Suba suas fotos em /public/fotos/ ou use URLs de CDN
 * 2. Atualize os campos abaixo com os novos caminhos/URLs
 * ============================================================
 */

/** Nomes do casal (como aparecem no site) */
export const COUPLE_NAMES = {
  groom: 'Luiz',
  bride: 'Helena',
  full: 'Luiz & Helena',
}

/** Data e hora do casamento (ISO 8601) */
export const WEDDING_DATE = '2026-12-12T16:00:00'

/** Data formatada para exibição */
export const WEDDING_DATE_TEXT = '12 de Dezembro de 2026'

/** Local do casamento */
export const VENUE = {
  city: 'São Bento do Sul',
  state: 'SC',
  full: 'São Bento do Sul, SC',
}

/** 
 * FOTOS DO CASAL
 * Substitua estas URLs pelas suas fotos reais.
 * Dica: use um serviço gratuito como imgur.com ou cloudinary.com
 * para hospedar as fotos e colar as URLs aqui.
 */
export const PHOTOS = {
  /** Foto principal do hero (tela cheia) — recomendado: retrato/vertical ou grande */
  hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',

  /** Foto da seção "Nossa História" — lado esquerdo */
  story1: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',

  /** Foto da seção "Nossa História" — lado direito (opcional) */
  story2: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80',

  /** Foto da galeria miniatura 1 */
  gallery1: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',

  /** Foto da galeria miniatura 2 */
  gallery2: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600&q=80',

  /** Foto da galeria miniatura 3 */
  gallery3: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80',
}

/** Texto da história do casal */
export const STORY_TEXT = {
  paragraph1: `Nos conhecemos em uma tarde que parecia comum, mas que se tornou o dia mais importante das nossas vidas. Entre risos, conversas e olhares, descobrimos que estávamos diante de algo verdadeiramente especial.`,

  paragraph2: `Depois de anos juntos, enfrentando desafios e celebrando conquistas, chegou o momento de oficializar o nosso amor diante de quem mais amamos. Queremos compartilhar esse momento único com você.`,

  quote: `"O amor não se vê com os olhos, mas com o coração."`,
}

/** Informações da cerimônia */
export const CEREMONY = {
  church: {
    name: 'Paróquia Nossa Senhora Aparecida',
    address: 'Rua Alfredo Diener, 87',
    city: 'São Bento do Sul — SC',
    time: '12 de Dezembro de 2026 às 16h',
  },
  reception: {
    name: 'Salão de Festas Oxford',
    address: 'São Bento do Sul — SC',
    time: 'Após a cerimônia',
    dressCode: 'Social Completo',
  },
}
