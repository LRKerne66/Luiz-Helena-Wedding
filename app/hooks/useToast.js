"use client"

import { useState, useCallback } from 'react'

const DEFAULT_DURATION = 4000

export function useToast(duration = DEFAULT_DURATION) {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message) => {
    setToast(message)
    setTimeout(() => setToast(null), duration)
  }, [duration])

  return { toast, showToast }
}
