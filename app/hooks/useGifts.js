"use client"

import { useState, useEffect, useCallback } from 'react'
import { fetchGifts } from '@/lib/api'
import { GIFTS_CONFIG } from '@/app/data/gifts'

const POLLING_INTERVAL = 15000

function mergeWithConfig(apiData) {
  if (!Array.isArray(apiData) || apiData.length === 0) {
    return GIFTS_CONFIG.map(g => ({ ...g, taken: 0 }))
  }
  return GIFTS_CONFIG.map(config => {
    const apiGift = apiData.find(g => g.value === config.value)
    return { ...config, taken: apiGift?.taken ?? 0, max: apiGift?.max ?? config.max }
  })
}

export function useGifts() {
  const [gifts, setGifts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadGifts = useCallback(async () => {
    try {
      const data = await fetchGifts()
      setGifts(mergeWithConfig(data))
      setError(null)
    } catch (err) {
      console.warn('Falha ao carregar presentes:', err.message)
      setGifts(mergeWithConfig([]))
      setError('Não foi possível conectar à planilha.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadGifts()
    const interval = setInterval(loadGifts, POLLING_INTERVAL)
    return () => clearInterval(interval)
  }, [loadGifts])

  return { gifts, loading, error, refresh: loadGifts }
}
