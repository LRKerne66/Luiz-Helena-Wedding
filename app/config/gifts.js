/**
 * CONFIGURAÇÃO DOS PRESENTES
 * -----------------------------------------------------------
 * Defina aqui os valores, ícones, títulos e limites de cada
 * opção de presente. Estes dados são sincronizados com o
 * Google Sheets para controle de vagas em tempo real.
 * ============================================================
 */

export const GIFTS_CONFIG = [
  { value: 100,  max: 20, icon: "🥂", title: "Um brinde especial", desc: "Um brinde ao nosso amor" },
  { value: 200,  max: 15, icon: "🍽️", title: "Jantar romântico", desc: "Uma noite inesquecível" },
  { value: 300,  max: 12, icon: "🌹", title: "Buquê de flores", desc: "Flores para encher nosso lar" },
  { value: 500,  max: 10, icon: "🎭", title: "Noite de teatro", desc: "Cultura e diversão juntos" },
  { value: 800,  max: 8,  icon: "🎡", title: "Dia de diversão", desc: "Aventuras e risadas" },
  { value: 1000, max: 6,  icon: "🏨", title: "Noite em hotel", desc: "Uma noite de descanso" },
  { value: 1500, max: 5,  icon: "✈️", title: "Passeio de avião", desc: "Conhecendo novos horizontes" },
  { value: 2000, max: 4,  icon: "📸", title: "Ensaio fotográfico", desc: "Memórias eternas" },
  { value: 3000, max: 3,  icon: "🚢", title: "Passeio de barco", desc: "Navegando juntos" },
  { value: 5000, max: 2,  icon: "💎", title: "Experiência única", desc: "Um momento inesquecível" },
]

export function findGiftConfig(value) {
  return GIFTS_CONFIG.find(g => g.value === value)
}

export function getGiftStatus(gift) {
  const remaining = gift.max - gift.taken
  if (remaining <= 0) return { status: 'soldout', remaining: 0 }
  if (remaining <= 2) return { status: 'low', remaining }
  return { status: 'ok', remaining }
}
