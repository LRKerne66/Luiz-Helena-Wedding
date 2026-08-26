"use client"

import { useEffect } from 'react'

export function useScrollReveal(options = {}) {
  const { threshold = 0.1, revealedClass = 'revealed' } = options

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(revealedClass)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [threshold, revealedClass])
}
