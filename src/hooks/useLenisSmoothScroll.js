import { useEffect } from 'react'
import Lenis from 'lenis'

import { ScrollTrigger } from '@/animations/gsap'

export const useLenisSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      lerp: 0.08,
    })

    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)

    let frameId = 0

    const raf = (time) => {
      lenis.raf(time)
      frameId = window.requestAnimationFrame(raf)
    }

    frameId = window.requestAnimationFrame(raf)

    const handleHashScroll = () => {
      const hash = window.location.hash.replace('#', '')

      if (!hash) {
        return
      }

      const target = document.getElementById(hash)

      if (target) {
        lenis.scrollTo(target, { offset: -96, duration: 1.1 })
      }
    }

    window.setTimeout(handleHashScroll, 120)
    window.addEventListener('hashchange', handleHashScroll)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('hashchange', handleHashScroll)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])
}
