import { useEffect, useRef, useState } from 'react'
import { motion as Motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { Blocks, Cpu, LayoutTemplate, SearchCode, Sparkles, WandSparkles } from 'lucide-react'

import { cn } from '@/utils/cn'

const orbitNodes = [
  {
    label: 'Лендинги',
    detail: 'Один экран, одна цель, сильная офферная подача и ясный маршрут к заявке.',
    angle: -14,
    radius: 'clamp(112px, 18vw, 160px)',
    accent: 'mint',
    icon: LayoutTemplate,
  },
  {
    label: 'Многостраничные',
    detail: 'Структура услуг, кейсов, SEO-страниц и доверительных блоков для бизнеса.',
    angle: 58,
    radius: 'clamp(138px, 21vw, 196px)',
    accent: 'sand',
    icon: Blocks,
  },
  {
    label: 'React',
    detail: 'Современный frontend для интерфейсов, которые растут вместе с проектом.',
    angle: 142,
    radius: 'clamp(122px, 19vw, 176px)',
    accent: 'ice',
    icon: Cpu,
  },
  {
    label: 'Редизайн',
    detail: 'Пересборка устаревшего сайта в дорогую, понятную и продающую систему.',
    angle: 214,
    radius: 'clamp(152px, 22vw, 212px)',
    accent: 'coral',
    icon: WandSparkles,
  },
  {
    label: 'SEO-страницы',
    detail: 'Коммерческая семантика и кластеры услуг встраиваются в архитектуру сразу.',
    angle: 286,
    radius: 'clamp(132px, 20vw, 186px)',
    accent: 'mint',
    icon: SearchCode,
  },
  {
    label: 'Анимации',
    detail: 'Motion и depth усиливают впечатление, но не ломают ясность и конверсию.',
    angle: 342,
    radius: 'clamp(152px, 22vw, 216px)',
    accent: 'ice',
    icon: Sparkles,
  },
]

const orbitRings = [
  'clamp(170px, 35vw, 272px)',
  'clamp(240px, 46vw, 360px)',
  'clamp(306px, 56vw, 438px)',
]

const focusMetrics = [
  { value: '24ч', label: 'на быстрый ответ и старт диалога' },
  { value: 'SEO', label: 'семантика и сервисные страницы заложены сразу' },
  { value: 'UX', label: 'понятно, почему сайт стоит денег и куда вести клиента' },
]

const accentClasses = {
  coral: 'from-coral/80 via-sand/50 to-transparent shadow-[0_0_18px_rgba(255,142,114,0.42)]',
  ice: 'from-ice/80 via-mint/50 to-transparent shadow-[0_0_18px_rgba(136,191,255,0.42)]',
  mint: 'from-mint/80 via-ice/40 to-transparent shadow-[0_0_18px_rgba(140,242,211,0.42)]',
  sand: 'from-sand/80 via-pearl/36 to-transparent shadow-[0_0_18px_rgba(221,181,122,0.42)]',
}

const releaseTilt = (tiltX, tiltY, dragging) => {
  if (dragging) {
    return
  }

  tiltX.set(-7)
  tiltY.set(9)
}

export const OrbitCommandCore = () => {
  const prefersReducedMotion = useReducedMotion()
  const stageRef = useRef(null)
  const dragState = useRef({ active: false, startX: 0, startRotation: 0 })

  const [activeIndex, setActiveIndex] = useState(0)
  const [dragging, setDragging] = useState(false)

  const rotation = useMotionValue(18)
  const tiltX = useMotionValue(-7)
  const tiltY = useMotionValue(9)
  const orbitScale = useMotionValue(1)

  const rotate = useSpring(rotation, { stiffness: 70, damping: 18, mass: 0.95 })
  const rotateInverse = useTransform(rotate, (value) => -value)
  const tiltXSpring = useSpring(tiltX, { stiffness: 120, damping: 18, mass: 0.9 })
  const tiltYSpring = useSpring(tiltY, { stiffness: 120, damping: 18, mass: 0.9 })
  const scaleSpring = useSpring(orbitScale, { stiffness: 180, damping: 22, mass: 0.8 })

  const activeNode = orbitNodes[activeIndex]
  const ActiveIcon = activeNode.icon

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    let frameId = 0
    let lastTime = 0

    const tick = (time) => {
      if (lastTime === 0) {
        lastTime = time
      }

      const delta = time - lastTime
      lastTime = time

      if (!dragState.current.active) {
        rotation.set(rotation.get() + delta * 0.0046)
      }

      frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(frameId)
  }, [prefersReducedMotion, rotation])

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      if (!dragState.current.active) {
        setActiveIndex((current) => (current + 1) % orbitNodes.length)
      }
    }, 2600)

    return () => window.clearInterval(intervalId)
  }, [prefersReducedMotion])

  const updateTilt = (clientX, clientY) => {
    const bounds = stageRef.current?.getBoundingClientRect()

    if (!bounds) {
      return
    }

    const xRatio = (clientX - bounds.left) / bounds.width
    const yRatio = (clientY - bounds.top) / bounds.height

    tiltY.set((xRatio - 0.5) * 22)
    tiltX.set((0.5 - yRatio) * 18)
  }

  const handlePointerMove = (event) => {
    updateTilt(event.clientX, event.clientY)

    if (!dragState.current.active) {
      return
    }

    const delta = event.clientX - dragState.current.startX

    rotation.set(dragState.current.startRotation + delta * 0.42)
  }

  const handlePointerDown = (event) => {
    dragState.current.active = true
    dragState.current.startX = event.clientX
    dragState.current.startRotation = rotation.get()
    orbitScale.set(1.03)
    setDragging(true)

    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const handlePointerUp = (event) => {
    dragState.current.active = false
    orbitScale.set(1)
    setDragging(false)
    releaseTilt(tiltX, tiltY, false)

    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }

  return (
    <>
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-[29rem]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mist">Planetary control room</p>
          <h2 className="mt-3 text-2xl font-black leading-tight text-pearl sm:text-[2rem]">
            Живое ядро сайта, где каждая орбита отвечает за заявки, доверие и рост цены
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-mist">
            Это не плоская схема, а карта того, как собирается сайт под задачу: лендинги, React, анимации,
            SEO-страницы и редизайн работают как отдельные модули одной системы.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-black/10 px-4 py-2 text-sm font-semibold text-pearl">
            React / GSAP / SEO
          </span>
          <span className="rounded-full border border-mint/20 bg-mint/10 px-4 py-2 text-sm font-semibold text-mint">
            Потяните ядро
          </span>
        </div>
      </div>

      <div className="relative mt-7 rounded-[28px] border border-white/10 bg-black/16 p-3 sm:p-4">
        <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(130deg,rgba(136,191,255,0.08),transparent_34%,rgba(140,242,211,0.06)_66%,transparent)]" />
        <div className="relative z-10 flex flex-wrap gap-2">
          <span className="keyword-chip border-mint/20 bg-mint/10 text-mint">interactive orbit</span>
          <span className="keyword-chip">landing pages</span>
          <span className="keyword-chip">React frontend</span>
          <span className="keyword-chip">motion + SEO</span>
        </div>

        <Motion.div
          ref={stageRef}
          className="orbital-command-stage relative mt-4 aspect-[1/1.02] min-h-[330px] touch-pan-y sm:min-h-[420px]"
          onMouseLeave={() => releaseTilt(tiltX, tiltY, dragging)}
          onPointerMove={handlePointerMove}
          style={{ rotateX: tiltXSpring, rotateY: tiltYSpring, scale: scaleSpring }}
        >
          <div className="orbital-command-grid absolute inset-0" />
          <Motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : { opacity: [0.3, 0.58, 0.3], scale: [0.94, 1.04, 0.94] }
            }
            className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(136,191,255,0.28),rgba(140,242,211,0.14),transparent_68%)] blur-3xl"
            transition={{ duration: 7.2, ease: 'easeInOut', repeat: Infinity }}
          />
          <Motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : { opacity: [0.2, 0.44, 0.2], scale: [0.96, 1.08, 0.96] }
            }
            className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,142,114,0.16),transparent_60%)] blur-[84px]"
            transition={{ duration: 9.6, ease: 'easeInOut', repeat: Infinity }}
          />

          {orbitRings.map((size, index) => (
            <Motion.div
              key={size}
              animate={prefersReducedMotion ? undefined : { rotate: index % 2 === 0 ? 360 : -360 }}
              className={cn(
                'orbital-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full',
                index === orbitRings.length - 1 ? 'border-white/8' : 'border-white/12',
              )}
              style={{ width: size, height: size }}
              transition={{ duration: 34 + index * 8, ease: 'linear', repeat: Infinity }}
            />
          ))}

          <Motion.div className="absolute inset-0" style={{ rotate }}>
            <div
              className="absolute left-1/2 top-1/2 h-px origin-left bg-gradient-to-r from-mint/0 via-mint/85 to-transparent"
              style={{
                width: activeNode.radius,
                transform: `translateY(-50%) rotate(${activeNode.angle}deg)`,
              }}
            />

            {orbitNodes.map((node, index) => {
              const Icon = node.icon
              const isActive = activeIndex === index

              return (
                <div
                  key={node.label}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: `translate(-50%, -50%) rotate(${node.angle}deg) translateX(${node.radius})` }}
                >
                  <Motion.button
                    aria-label={node.label}
                    aria-pressed={isActive}
                    className={cn(
                      'orbital-node group flex items-center gap-2.5 rounded-full border px-3 py-2 text-left text-xs font-semibold text-pearl backdrop-blur-xl transition duration-300 sm:px-4 sm:text-sm',
                      isActive
                        ? 'border-white/22 bg-white/12 shadow-glow'
                        : 'border-white/10 bg-black/30 hover:border-white/16 hover:bg-white/8',
                    )}
                    onClick={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    style={{ rotate: rotateInverse }}
                    whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.02 }}
                  >
                    <span
                      className={cn(
                        'inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/14 bg-black/25 text-pearl',
                        isActive && 'border-white/22 bg-white/10 text-white',
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="hidden whitespace-nowrap sm:block">{node.label}</span>
                    <span
                      className={cn(
                        'h-2.5 w-2.5 rounded-full bg-gradient-to-r',
                        accentClasses[node.accent],
                      )}
                    />
                  </Motion.button>
                </div>
              )
            })}
          </Motion.div>

          <div className="pointer-events-none absolute inset-x-6 bottom-5 z-10 sm:hidden">
            <div className="rounded-[22px] border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-mint">Сейчас в фокусе</div>
              <div className="mt-2 text-lg font-black text-pearl">{activeNode.label}</div>
              <p className="mt-2 text-sm leading-6 text-mist">{activeNode.detail}</p>
            </div>
          </div>

          <Motion.div
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            className="orbital-core absolute left-1/2 top-1/2 z-20 flex h-[10rem] w-[10rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-[12rem] sm:w-[12rem]"
            onPointerCancel={handlePointerUp}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
            transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-full border border-white/16 bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.42),rgba(136,191,255,0.28)_34%,rgba(10,18,30,0.24)_66%,rgba(0,0,0,0)_100%)] shadow-planet" />
            <div className="pointer-events-none absolute inset-[12%] rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(140,242,211,0.24),transparent_66%)]" />
            <div className="relative z-10 max-w-[10.5rem] px-4 text-center sm:max-w-[11rem]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-pearl/74 sm:text-xs">Core engine</div>
              <div className="mt-3 text-lg font-black leading-tight text-pearl sm:text-[1.65rem]">
                Подача + доверие + конверсия
              </div>
              <p className="mt-3 text-[11px] leading-5 text-mist sm:text-xs sm:leading-6">
                Потяните ядро и посмотрите, как конфигурация сайта собирается вокруг задачи бизнеса.
              </p>
            </div>
          </Motion.div>
        </Motion.div>

        <div className="mt-4 hidden gap-4 sm:grid sm:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-mint">Активный модуль</div>
            <div className="mt-3 flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/25 text-pearl">
                <ActiveIcon className="h-4 w-4" />
              </span>
              <div>
                <div className="text-xl font-black text-pearl">{activeNode.label}</div>
                <p className="mt-2 text-sm leading-7 text-mist">{activeNode.detail}</p>
              </div>
            </div>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-black/24 p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-mist">Логика ядра</div>
            <p className="mt-3 text-sm leading-7 text-pearl/86">
              Орбиты не про декор. Это карта того, как продающий сайт собирается из смыслов, технологий,
              анимации, SEO и понятного маршрута к заявке.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {orbitNodes.map((node, index) => (
                <button
                  key={node.label}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-xs font-semibold transition duration-300',
                    activeIndex === index
                      ? 'border-mint/30 bg-mint/12 text-mint'
                      : 'border-white/10 bg-white/6 text-pearl/82 hover:border-white/18 hover:text-white',
                  )}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  {node.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
        {focusMetrics.map((item) => (
          <div key={item.value} className="rounded-[22px] border border-white/10 bg-white/6 p-4">
            <div className="text-2xl font-extrabold text-pearl">{item.value}</div>
            <p className="mt-2 text-xs leading-6 text-mist">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-pearl/88">
        <span className="h-2 w-2 rounded-full bg-ice shadow-[0_0_12px_rgba(136,191,255,0.7)]" />
        Упаковка бизнеса в premium digital-форму
      </div>
    </>
  )
}
