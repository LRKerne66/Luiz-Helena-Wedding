"use client"

import { useState, useEffect } from 'react'

const WEDDING_DATE = '2026-12-12T16:00:00'

function calculateCountdown() {
  const wedding = new Date(WEDDING_DATE)
  const now = new Date()
  const diff = wedding.getTime() - now.getTime()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isExpired: false,
  }
}

export function useCountdown() {
  const [countdown, setCountdown] = useState(calculateCountdown)

  useEffect(() => {
    const interval = setInterval(() => setCountdown(calculateCountdown()), 1000)
    return () => clearInterval(interval)
  }, [])

  return countdown
}
