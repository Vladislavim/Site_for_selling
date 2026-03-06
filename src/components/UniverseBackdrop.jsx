import { lazy, Suspense, useEffect, useMemo, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { useAdaptiveSceneQuality } from '@/hooks/useAdaptiveSceneQuality'

const LazyUniverseScene = lazy(() => import('@/components/UniverseScene').then((module) => ({ default: module.UniverseScene })))

const buildLayer = (width, height, amount, speedRange, radiusRange) =>
  Array.from({ length: amount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: radiusRange[0] + Math.random() * (radiusRange[1] - radiusRange[0]),
    alpha: 0.08 + Math.random() * 0.68,
    speed: speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]),
    drift: (Math.random() - 0.5) * 0.35,
  }))

const buildStreams = (width, height, amount) =>
  Array.from({ length: amount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    length: 28 + Math.random() * 72,
    speed: 0.18 + Math.random() * 0.44,
    alpha: 0.05 + Math.random() * 0.12,
  }))

const buildNebulae = (width, height) => [
  { x: width * 0.18, y: height * 0.16, radius: Math.max(width * 0.22, 220), color: '140,242,211' },
  { x: width * 0.82, y: height * 0.2, radius: Math.max(width * 0.18, 180), color: '255,142,114' },
  { x: width * 0.55, y: height * 0.54, radius: Math.max(width * 0.3, 260), color: '136,191,255' },
  { x: width * 0.28, y: height * 0.82, radius: Math.max(width * 0.18, 180), color: '246,241,232' },
]

const drawStarLayer = (context, width, height, stars, time, progress, speedFactor, pointer) => {
  for (const star of stars) {
    const y = (star.y + time * star.speed * speedFactor + progress * height * speedFactor * 0.28) % (height + 8) - 4
    const x = star.x + Math.sin(time * 0.0009 + star.y * 0.01) * 8 * star.drift + pointer.x * 12 * speedFactor

    context.beginPath()
    context.fillStyle = `rgba(255,255,255,${star.alpha})`
    context.arc(x, y + pointer.y * 10 * speedFactor, star.radius, 0, Math.PI * 2)
    context.fill()
  }
}

const drawDustLayer = (context, width, height, particles, time, progress, tint, pointer, sectionProgress) => {
  for (const particle of particles) {
    const y = (particle.y + time * particle.speed * 0.16 + progress * height * 0.16) % (height + 12) - 6
    const x = particle.x + Math.sin(time * 0.0007 + particle.y * 0.008) * 22 * particle.drift
    const radius = particle.radius * (8.5 + sectionProgress * 1.2)

    const gradient = context.createRadialGradient(x + pointer.x * 18, y + pointer.y * 12, 0, x, y, radius)
    gradient.addColorStop(0, `rgba(${tint},${particle.alpha * 0.22})`)
    gradient.addColorStop(0.6, `rgba(${tint},${particle.alpha * 0.06})`)
    gradient.addColorStop(1, 'rgba(0,0,0,0)')
    context.beginPath()
    context.fillStyle = gradient
    context.arc(x + pointer.x * 22, y + pointer.y * 16, radius, 0, Math.PI * 2)
    context.fill()
  }
}

const drawStreams = (context, width, height, streams, time, velocity, sectionIndex) => {
  context.lineWidth = 1

  for (const stream of streams) {
    const y = (stream.y + time * stream.speed * 0.2 + velocity * 0.16) % (height + 80) - 40
    const x = (stream.x + time * stream.speed * 0.07) % (width + 120) - 60
    const gradient = context.createLinearGradient(x, y, x + stream.length, y + stream.length * 0.18)
    gradient.addColorStop(0, 'rgba(255,255,255,0)')
    gradient.addColorStop(0.5, `rgba(136,191,255,${stream.alpha + sectionIndex * 0.004})`)
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    context.strokeStyle = gradient
    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(x + stream.length, y + stream.length * 0.18)
    context.stroke()
  }
}

const drawNebulae = (context, nebulae, time, progress, pointer, sectionProgress) => {
  for (const [index, nebula] of nebulae.entries()) {
    const x = nebula.x + Math.sin(time * 0.00018 + index) * 28 + pointer.x * 40 * (index % 2 === 0 ? 1 : -1)
    const y = nebula.y + Math.cos(time * 0.00015 + index * 0.8 + progress * 4) * 24 + pointer.y * 24
    const gradient = context.createRadialGradient(x, y, 0, x, y, nebula.radius + sectionProgress * 24)
    gradient.addColorStop(0, `rgba(${nebula.color},0.12)`)
    gradient.addColorStop(0.58, `rgba(${nebula.color},${0.045 + sectionProgress * 0.02})`)
    gradient.addColorStop(1, 'rgba(0,0,0,0)')
    context.beginPath()
    context.fillStyle = gradient
    context.arc(x, y, nebula.radius + sectionProgress * 18, 0, Math.PI * 2)
    context.fill()
  }
}

const drawOrbitArcs = (context, width, height, progress, pointer, sectionIndex) => {
  context.lineWidth = 1
  context.strokeStyle = 'rgba(255,255,255,0.06)'

  for (let index = 0; index < 4; index += 1) {
    const radius = Math.max(width * 0.28 + index * 110, 240)
    const centerX = width * 0.5 + Math.sin(progress * Math.PI * (index + 1)) * 90 + pointer.x * 36
    const centerY = height * (0.2 + index * 0.22) - progress * 240 * (index % 2 === 0 ? 1 : -1) + pointer.y * 28

    context.beginPath()
    context.arc(centerX, centerY, radius + sectionIndex * 8, Math.PI * 0.12, Math.PI * 0.88)
    context.stroke()
  }
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

export const UniverseBackdrop = () => {
  const canvasRef = useRef(null)
  const quality = useAdaptiveSceneQuality()
  const scrollRef = useRef({
    lastY: 0,
    pointer: { x: 0, y: 0 },
    progress: 0,
    section: { count: 1, id: 'hero-zone', index: 0, progress: 0 },
    velocity: 0,
  })
  const location = useLocation()
  const locationKey = useMemo(() => location.pathname, [location.pathname])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return undefined
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return undefined
    }

    let animationFrame = 0
    let sectionFrame = 0
    let width = 0
    let height = 0
    let farStars = []
    let midStars = []
    let dust = []
    let mist = []
    let streams = []
    let nebulae = []
    let sections = []

    const collectSections = () => {
      sections = Array.from(document.querySelectorAll('.scene-section')).map((element, index) => ({
        element,
        id: element.id || `scene-zone-${index + 1}`,
        index,
      }))
    }

    const updateSectionState = () => {
      if (!sections.length) {
        scrollRef.current.section = {
          count: 1,
          id: locationKey,
          index: 0,
          progress: scrollRef.current.progress,
        }
        return
      }

      const viewportCenter = height * 0.48
      let activeSection = sections[0]
      let bestDistance = Number.POSITIVE_INFINITY
      let activeProgress = 0

      for (const section of sections) {
        const rect = section.element.getBoundingClientRect()
        const distance = Math.abs(rect.top + rect.height * 0.5 - viewportCenter)

        if (distance < bestDistance) {
          bestDistance = distance
          activeSection = section
          activeProgress = clamp((viewportCenter - rect.top) / Math.max(rect.height, 1), 0, 1)
        }
      }

      scrollRef.current.section = {
        count: sections.length,
        id: activeSection.id,
        index: activeSection.index,
        progress: activeProgress,
      }
    }

    const refreshScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)

      scrollRef.current.velocity = scrollY - scrollRef.current.lastY
      scrollRef.current.lastY = scrollY
      scrollRef.current.progress = scrollY / maxScroll
      updateSectionState()
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight

      const ratio = Math.min(window.devicePixelRatio || 1, quality.tier === 'high' ? 2 : 1.5)
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const particleFactor = quality.particleFactor
      farStars = buildLayer(width, height, Math.max(36, Math.floor((width / 17) * particleFactor * 1.1)), [0.03, 0.12], [0.3, 1.05])
      midStars = buildLayer(width, height, Math.max(24, Math.floor((width / 26) * particleFactor)), [0.08, 0.2], [0.55, 1.8])
      dust = buildLayer(width, height, Math.max(14, Math.floor((width / 34) * particleFactor)), [0.04, 0.12], [0.8, 2])
      mist = buildLayer(width, height, Math.max(8, Math.floor((width / 72) * particleFactor)), [0.03, 0.08], [1.4, 2.8])
      streams = buildStreams(width, height, Math.max(5, Math.floor((width / 160) * (0.6 + particleFactor))))
      nebulae = buildNebulae(width, height)

      collectSections()
      refreshScroll()
    }

    const handlePointerMove = (event) => {
      if (!quality.pointerEnabled || width === 0 || height === 0) {
        return
      }

      scrollRef.current.pointer.x = clamp((event.clientX / width) * 2 - 1, -1, 1)
      scrollRef.current.pointer.y = clamp((event.clientY / height) * 2 - 1, -1, 1)
    }

    const handlePointerLeave = () => {
      scrollRef.current.pointer.x = 0
      scrollRef.current.pointer.y = 0
    }

    const render = (time) => {
      refreshScroll()

      const progress = scrollRef.current.progress
      const velocity = scrollRef.current.velocity
      const pointer = scrollRef.current.pointer
      const sectionIndex = scrollRef.current.section.index
      const sectionProgress = scrollRef.current.section.progress

      context.clearRect(0, 0, width, height)

      const atmosphere = context.createLinearGradient(0, 0, 0, height)
      atmosphere.addColorStop(0, 'rgba(5,8,15,0.24)')
      atmosphere.addColorStop(0.35, 'rgba(4,8,15,0.08)')
      atmosphere.addColorStop(1, 'rgba(3,5,11,0.28)')
      context.fillStyle = atmosphere
      context.fillRect(0, 0, width, height)

      drawNebulae(context, nebulae, time, progress, pointer, sectionProgress)
      drawOrbitArcs(context, width, height, progress, pointer, sectionIndex)
      drawStarLayer(context, width, height, farStars, time, progress, 0.42, pointer)
      drawStarLayer(context, width, height, midStars, time, progress, 0.86, pointer)
      drawDustLayer(context, width, height, dust, time, progress, '136,191,255', pointer, sectionProgress)
      drawDustLayer(context, width, height, mist, time, progress, '140,242,211', pointer, sectionProgress)
      drawStreams(context, width, height, streams, time, velocity, sectionIndex)

      animationFrame = window.requestAnimationFrame(render)
    }

    resize()
    render(0)
    sectionFrame = window.requestAnimationFrame(() => {
      collectSections()
      refreshScroll()
    })

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', refreshScroll, { passive: true })

    if (quality.pointerEnabled) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      window.addEventListener('pointerleave', handlePointerLeave)
    }

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.cancelAnimationFrame(sectionFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', refreshScroll)

      if (quality.pointerEnabled) {
        window.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('pointerleave', handlePointerLeave)
      }
    }
  }, [locationKey, quality.particleFactor, quality.pointerEnabled, quality.tier])

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-95" />
      <Suspense fallback={null}>
        <LazyUniverseScene quality={quality} routeKey={locationKey} scrollRef={scrollRef} />
      </Suspense>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.14),transparent_42%)]" />
      <div className="absolute -left-[18rem] top-[8rem] hidden h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(140,242,211,0.1),transparent_70%)] blur-3xl animate-drift sm:block" />
      <div className="absolute -right-[12rem] top-[10rem] hidden h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,142,114,0.1),transparent_72%)] blur-3xl [animation-delay:-6s] animate-drift sm:block" />
      <div className="absolute left-1/2 top-[24%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-white/6 opacity-18 sm:h-[44rem] sm:w-[44rem] sm:opacity-30" />
      <div className="absolute left-1/2 top-[24%] hidden h-[58rem] w-[58rem] -translate-x-1/2 rounded-full border border-white/5 opacity-16 lg:block" />
      <div className="absolute inset-x-[-15%] top-[28%] h-px bg-gradient-to-r from-transparent via-white/14 to-transparent opacity-60" />
      <div className="absolute left-[8%] top-[14%] hidden h-[26rem] w-[10rem] rotate-[28deg] bg-[linear-gradient(180deg,transparent,rgba(140,242,211,0.12),transparent)] blur-3xl animate-beam sm:block" />
      <div className="absolute right-[8%] top-[10%] hidden h-[22rem] w-[9rem] rotate-[-28deg] bg-[linear-gradient(180deg,transparent,rgba(136,191,255,0.14),transparent)] blur-3xl [animation-delay:-6s] animate-beam sm:block" />
      <div className="absolute left-[12%] top-[42%] hidden h-[22rem] w-[22rem] rounded-full border border-white/6 opacity-18 animate-orbit lg:block" />
      <div className="absolute right-[16%] top-[58%] hidden h-[18rem] w-[18rem] rounded-full border border-white/6 opacity-16 animate-orbitReverse lg:block" />
    </div>
  )
}
