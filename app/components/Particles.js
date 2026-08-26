"use client"

import { useMemo } from 'react'

const PARTICLE_ICONS = ['✦', '✧', '◆', '◇', '✿', '❀', '•']

function useParticles(count = 20) {
  return useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    icon: PARTICLE_ICONS[Math.floor(Math.random() * PARTICLE_ICONS.length)],
    left: `${Math.random() * 100}%`,
    size: Math.random() * 12 + 6,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.3 + 0.1,
  })), [count])
}

export default function Particles({ count = 20, color = '#c9a96e' }) {
  const particles = useParticles(count)

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {particles.map(p => (
        <span key={p.id} style={{
          position: 'absolute', left: p.left, bottom: '-20px',
          fontSize: p.size, color, opacity: p.opacity,
          animation: `particleFloat ${p.duration}s linear ${p.delay}s infinite`,
          userSelect: 'none',
        }}>
          {p.icon}
        </span>
      ))}
    </div>
  )
}
