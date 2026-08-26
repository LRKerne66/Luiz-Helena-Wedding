"use client"

import { useState, useEffect, useCallback } from 'react'
import { fetchGifts } from '@/lib/api'
import { GIFTS_CONFIG } from '@/app/config/gifts'

const INTERVAL = 15000

function merge(apiData) {
  if (!Array.isArray(apiData) || apiData.length === 0) {
    return GIFTS_CONFIG.map(g => ({ ...g, taken: 0 }))
  }
  return GIFTS_CONFIG.map(cfg => {
    const api = apiData.find(g => g.value === cfg.value)
    return { ...cfg, taken: api?.taken ?? 0, max: api?.max ?? cfg.max }
  })
}

export function useGifts() {
  const [gifts, setGifts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    try {
      const data = await fetchGifts()
      setGifts(merge(data))
      setError(null)
    } catch (err) {
      setGifts(merge([]))
      setError('Não foi possível conectar à planilha.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const i = setInterval(load, INTERVAL)
    return () => clearInterval(i)
  }, [load])

  return { gifts, loading, error, refresh: load }
}
