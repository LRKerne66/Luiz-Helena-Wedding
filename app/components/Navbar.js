"use client"

import { useState, useEffect } from 'react'
import { scrollToElement } from '@/lib/utils'
import { COUPLE_NAMES } from '@/app/config/couple'

const ITEMS = [
  { id: 'home', label: 'Início' },
  { id: 'story', label: 'Nossa História' },
  { id: 'ceremony', label: 'Cerimônia' },
  { id: 'gifts', label: 'Presentes' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = ITEMS.map(i => document.getElementById(i.id))
      const pos = window.scrollY + 120
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= pos) {
          setActive(ITEMS[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="glass" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      borderBottom: scrolled ? '1px solid rgba(201,169,110,0.12)' : '1px solid transparent',
      transition: 'all 0.4s ease',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.06)' : 'none',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => scrollToElement('home')} style={{
          fontFamily: 'var(--font-serif)', fontSize: 20, color: scrolled ? 'var(--charcoal)' : 'var(--charcoal)',
          letterSpacing: '0.15em', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer',
        }}>
          {COUPLE_NAMES.groom.toUpperCase()} <span style={{ color: 'var(--champagne)', fontStyle: 'italic', fontWeight: 400 }}>&</span> {COUPLE_NAMES.bride.toUpperCase()}
        </button>

        <div style={{ display: 'flex', gap: 36, fontSize: 12, fontWeight: 500, letterSpacing: '0.08em' }}>
          {ITEMS.map(item => {
            const isActive = active === item.id
            return (
              <button key={item.id} onClick={() => scrollToElement(item.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                fontWeight: 500, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: isActive ? 'var(--champagne)' : 'var(--taupe)',
                position: 'relative', padding: '4px 0', transition: 'color 0.25s ease',
              }}>
                {item.label}
                <span style={{
                  position: 'absolute', bottom: -3, left: '50%', transform: 'translateX(-50%)',
                  width: isActive ? '100%' : 0, height: 1.5, background: 'var(--champagne)',
                  borderRadius: 2, transition: 'width 0.3s ease',
                }} />
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
