"use client"

import { useState } from 'react'
import { useScrollReveal } from '@/app/hooks/useScrollReveal'
import { useToast } from '@/app/hooks/useToast'
import { useGifts } from '@/app/hooks/useGifts'

import Navbar from '@/app/components/Navbar'
import HeroSection from '@/app/sections/HeroSection'
import StorySection from '@/app/sections/StorySection'
import CeremonySection from '@/app/sections/CeremonySection'
import GiftsSection from '@/app/sections/GiftsSection'
import Footer from '@/app/sections/Footer'
import GiftModal from '@/app/components/GiftModal'
import Toast from '@/app/components/Toast'

export default function Home() {
  useScrollReveal()
  const { toast, showToast } = useToast()
  const { refresh } = useGifts()
  const [selectedGift, setSelectedGift] = useState(null)

  return (
    <div>
      <Navbar />
      <HeroSection />
      <StorySection />
      <CeremonySection />
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
