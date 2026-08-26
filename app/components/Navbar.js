"use client"

import { useState, useEffect } from 'react'
import { scrollToElement } from '@/lib/utils'

const NAV_ITEMS = [
  { id: 'home', label: 'Início' },
  { id: 'story', label: 'Nossa História' },
  { id: 'ceremony', label: 'Cerimônia' },
  { id: 'gifts', label: 'Presentes' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id))
      const pos = window.scrollY + 100
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= pos) {
          setActiveSection(NAV_ITEMS[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="glass" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      borderBottom: '1px solid rgba(201,169,110,0.15)',
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.08)' : 'none',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => scrollToElement('home')} style={{
          fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--color-text)',
          letterSpacing: '0.2em', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer',
        }}>
          LUIZ <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>&</span> HELENA
        </button>

        <div style={{ display: 'flex', gap: 32, fontSize: 13, fontWeight: 500, letterSpacing: '0.05em' }}>
          {NAV_ITEMS.map(item => {
            const isActive = activeSection === item.id
            return (
              <button key={item.id} onClick={() => scrollToElement(item.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                fontWeight: 500, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase',
                color: isActive ? 'var(--color-gold)' : 'var(--color-text-muted)',
                position: 'relative', padding: '4px 0', transition: 'color 0.2s ease',
              }}>
                {item.label}
                {isActive && <span style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: 2, background: 'var(--color-gold)', borderRadius: 'var(--radius-full)' }} />}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
