"use client"

import { useState } from 'react'
import { useScrollReveal } from '@/app/hooks/useScrollReveal'
import { useToast } from '@/app/hooks/useToast'
import { useGifts } from '@/app/hooks/useGifts'
import { copyToClipboard } from '@/lib/utils'
import { PIX_KEY } from '@/lib/pix'

import Navbar from '@/app/components/Navbar'
import HeroSection from '@/app/components/HeroSection'
import StorySection from '@/app/components/StorySection'
import CeremonySection from '@/app/components/CeremonySection'
import GiftsSection from '@/app/components/GiftsSection'
import GiftModal from '@/app/components/GiftModal'
import Footer from '@/app/components/Footer'
import Toast from '@/app/components/Toast'

export default function Home() {
  useScrollReveal()
  const { toast, showToast } = useToast()
  const { refresh } = useGifts()
  const [selectedGift, setSelectedGift] = useState(null)

  const copyPix = () => {
    copyToClipboard(PIX_KEY)
    showToast('Chave PIX copiada!')
  }

  return (
    <div>
      <Navbar />
      <HeroSection />
      <StorySection />
      <CeremonySection />

      {/* PIX Key Banner */}
      <section style={{ padding: '40px 24px', background: 'var(--color-cream)' }}>
        <div className="reveal" style={{
          background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)',
          padding: 28, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, maxWidth: 680, margin: '0 auto', boxShadow: 'var(--shadow-sm)',
        }}>
          <div>
            <p style={{ color: 'var(--color-text)', fontWeight: 600, fontSize: 14, marginBottom: 4, fontFamily: 'var(--font-serif)' }}>Chave PIX</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 12, fontFamily: 'monospace', letterSpacing: '0.05em' }}>{PIX_KEY}</p>
          </div>
          <button onClick={copyPix} style={{
            background: 'var(--color-text)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)',
            padding: '10px 22px', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.05em',
            textTransform: 'uppercase', transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.target.style.background = 'var(--color-gold)'}
          onMouseLeave={e => e.target.style.background = 'var(--color-text)'}>
            Copiar Chave
          </button>
        </div>
      </section>

      <GiftsSection onSelectGift={setSelectedGift} />
      <Footer />

      <GiftModal
        gift={selectedGift}
        onClose={() => setSelectedGift(null)}
        onConfirm={refresh}
        showToast={showToast}
      />
      <Toast message={toast} />
    </div>
  )
}
