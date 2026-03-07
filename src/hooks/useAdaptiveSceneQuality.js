import { useEffect, useState } from 'react'

const getSceneQuality = () => {
  if (typeof window === 'undefined') {
    return {
      antialias: true,
      backdropDpr: 1.2,
      backdropFps: 30,
      detail: 0.82,
      dpr: [1, 1.3],
      enablePost: true,
      enableThreeScene: true,
      lowBandwidth: false,
      mobileLike: false,
      particleFactor: 0.75,
      pointerEnabled: true,
      reducedMotion: false,
      tier: 'medium',
      videoAutoplay: true,
      videoPreload: 'metadata',
    }
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const width = window.innerWidth
  const dpr = window.devicePixelRatio || 1
  const threads = navigator.hardwareConcurrency || 8
  const memory = navigator.deviceMemory || 8
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  const effectiveType = String(connection?.effectiveType || '').toLowerCase()
  const lowBandwidth = Boolean(connection?.saveData) || ['slow-2g', '2g', '3g'].includes(effectiveType)
  const mobileLike = coarsePointer || width < 960

  const low =
    reducedMotion ||
    lowBandwidth ||
    memory <= 4 ||
    threads <= 4 ||
    width < 720 ||
    (coarsePointer && dpr > 2.2)

  const medium = !low && (memory <= 8 || threads <= 8 || width < 1440 || dpr > 1.8)
  const tier = low ? 'low' : medium ? 'medium' : 'high'

  return {
    antialias: tier !== 'low',
    backdropDpr: tier === 'high' ? 1.5 : tier === 'medium' ? 1.15 : 1,
    backdropFps: tier === 'high' ? 40 : tier === 'medium' ? 28 : 18,
    detail: tier === 'high' ? 1 : tier === 'medium' ? 0.82 : 0.62,
    dpr: tier === 'high' ? [1, 1.6] : tier === 'medium' ? [1, 1.35] : [1, 1.1],
    enablePost: tier !== 'low',
    enableThreeScene: !reducedMotion && !lowBandwidth && !mobileLike && width >= 1024 && memory > 4 && threads > 4,
    lowBandwidth,
    mobileLike,
    particleFactor: tier === 'high' ? 0.92 : tier === 'medium' ? 0.52 : 0.24,
    pointerEnabled: !reducedMotion && !coarsePointer && width >= 900,
    reducedMotion,
    tier,
    videoAutoplay: !reducedMotion && !lowBandwidth && !mobileLike,
    videoPreload: lowBandwidth || mobileLike ? 'none' : 'metadata',
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
