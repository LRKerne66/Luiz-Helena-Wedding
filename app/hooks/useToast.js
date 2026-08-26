"use client"

import { useState, useCallback } from 'react'

export function useToast(duration = 4000) {
  const [toast, setToast] = useState(null)
  const showToast = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), duration)
  }, [duration])
  return { toast, showToast }
}
