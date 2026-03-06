import { useEffect, useState } from 'react'

const getSceneQuality = () => {
  if (typeof window === 'undefined') {
    return {
      antialias: true,
      detail: 0.82,
      dpr: [1, 1.3],
      enablePost: true,
      particleFactor: 0.75,
      pointerEnabled: true,
      reducedMotion: false,
      tier: 'medium',
    }
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const width = window.innerWidth
  const dpr = window.devicePixelRatio || 1
  const threads = navigator.hardwareConcurrency || 8
  const memory = navigator.deviceMemory || 8

  const low =
    reducedMotion ||
    memory <= 4 ||
    threads <= 4 ||
    width < 720 ||
    (coarsePointer && dpr > 2.2)

  const medium = !low && (memory <= 8 || threads <= 8 || width < 1440 || dpr > 1.8)
  const tier = low ? 'low' : medium ? 'medium' : 'high'

  return {
    antialias: tier !== 'low',
    detail: tier === 'high' ? 1 : tier === 'medium' ? 0.82 : 0.62,
    dpr: tier === 'high' ? [1, 1.6] : tier === 'medium' ? [1, 1.35] : [1, 1.1],
    enablePost: tier !== 'low',
    particleFactor: tier === 'high' ? 1 : tier === 'medium' ? 0.72 : 0.42,
    pointerEnabled: !reducedMotion && !coarsePointer && width >= 900,
    reducedMotion,
    tier,
  }
}

export const useAdaptiveSceneQuality = () => {
  const [quality, setQuality] = useState(() => getSceneQuality())

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const refresh = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        setQuality(getSceneQuality())
      })
    }

    refresh()
    window.addEventListener('resize', refresh)

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', refresh)
    } else {
      media.addListener(refresh)
    }

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', refresh)

      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', refresh)
      } else {
        media.removeListener(refresh)
      }
    }
  }, [])

  return quality
}
