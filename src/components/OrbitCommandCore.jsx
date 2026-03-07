import { useEffect, useRef, useState } from 'react'
import { motion as Motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { Blocks, Cpu, LayoutTemplate, SearchCode, Sparkles, WandSparkles } from 'lucide-react'

import { useAdaptiveSceneQuality } from '@/hooks/useAdaptiveSceneQuality'
import { cn } from '@/utils/cn'

const orbitNodes = [
  {
    label: 'Лендинги',
    shortLabel: 'Лендинг',
    detail: 'Один экран, одна цель и сильная офферная подача без визуального мусора.',
    desktopAngle: -28,
    mobilePosition: { x: 49, y: 23 },
    ring: 1,
    icon: LayoutTemplate,
  },
  {
    label: 'Многостраничный',
    shortLabel: 'Многостр',
    detail: 'Страницы услуг, кейсов и структуры доверия для бизнеса, который растет.',
    desktopAngle: 48,
    mobilePosition: { x: 18, y: 42 },
    ring: 2,
    icon: Blocks,
  },
  {
    label: 'React',
    shortLabel: 'React',
    detail: 'Современный frontend для продуктов, интерфейсов и масштабируемых решений.',
    desktopAngle: 126,
    mobilePosition: { x: 50, y: 8 },
    ring: 3,
    icon: Cpu,
  },
  {
    label: 'Редизайн',
    shortLabel: 'Редизайн',
    detail: 'Пересборка устаревшего сайта в дорогую, ясную и уверенную digital-подачу.',
    desktopAngle: 208,
    mobilePosition: { x: 82, y: 42 },
    ring: 2,
    icon: WandSparkles,
  },
  {
    label: 'SEO-страницы',
    shortLabel: 'SEO',
    detail: 'Сервисные страницы и коммерческая семантика встраиваются в архитектуру сразу.',
    desktopAngle: 282,
    mobilePosition: { x: 50, y: 63 },
    ring: 1,
    icon: SearchCode,
  },
  {
    label: 'Анимации',
    shortLabel: 'Motion',
    detail: 'Motion и depth усиливают впечатление, но не мешают ясности и конверсии.',
    desktopAngle: 338,
    mobilePosition: { x: 28, y: 78 },
    ring: 3,
    icon: Sparkles,
  },
]

const ringSizes = {
  desktop: {
    1: 'clamp(12rem, 25vw, 16rem)',
    2: 'clamp(17rem, 35vw, 22rem)',
    3: 'clamp(22rem, 44vw, 28rem)',
  },
  mobile: {
    1: '9.4rem',
    2: '13rem',
    3: '16.5rem',
  },
}

const focusMetrics = [
  { value: '24ч', label: 'на быстрый ответ и старт диалога' },
  { value: 'SEO', label: 'семантика и сервисные страницы заложены сразу' },
  { value: 'UX', label: 'сайт объясняет цену и ведет клиента к действию' },
]

const systemPills = [
  { label: 'Interactive orbit', tone: 'accent' },
  { label: 'Landing pages', tone: 'default' },
  { label: 'React frontend', tone: 'default' },
  { label: 'Motion + SEO', tone: 'default' },
]

const resetTilt = (tiltX, tiltY) => {
  tiltX.set(-3)
  tiltY.set(4)
}

export const OrbitCommandCore = () => {
  const prefersReducedMotion = useReducedMotion()
  const quality = useAdaptiveSceneQuality()
  const stageRef = useRef(null)
  const dragState = useRef({ active: false, startX: 0, startRotation: 0 })

  const [activeIndex, setActiveIndex] = useState(0)

  const mobileLike = quality.mobileLike
  const reducedMotion = prefersReducedMotion || quality.reducedMotion
  const desktopOrbit = !mobileLike && !reducedMotion
  const pointerEnabled = desktopOrbit && quality.pointerEnabled

  const rotation = useMotionValue(14)
  const tiltX = useMotionValue(-3)
  const tiltY = useMotionValue(4)

  const rotateSpring = useSpring(rotation, { stiffness: 70, damping: 17, mass: 0.92 })
  const inverseRotate = useTransform(rotateSpring, (value) => -value)
  const tiltXSpring = useSpring(tiltX, { stiffness: 130, damping: 22, mass: 0.88 })
  const tiltYSpring = useSpring(tiltY, { stiffness: 130, damping: 22, mass: 0.88 })

  const activeNode = orbitNodes[activeIndex]
  const ActiveIcon = activeNode.icon

  useEffect(() => {
    if (!desktopOrbit) {
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
        rotation.set(rotation.get() + delta * 0.0041)
      }

      frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(frameId)
  }, [desktopOrbit, rotation])

  useEffect(() => {
    if (reducedMotion) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      if (!dragState.current.active) {
        setActiveIndex((current) => (current + 1) % orbitNodes.length)
      }
    }, mobileLike ? 3200 : 2400)

    return () => window.clearInterval(intervalId)
  }, [mobileLike, reducedMotion])

  const updateTilt = (clientX, clientY) => {
    if (!pointerEnabled) {
      return
    }

    const bounds = stageRef.current?.getBoundingClientRect()

    if (!bounds) {
      return
    }

    const xRatio = (clientX - bounds.left) / bounds.width
    const yRatio = (clientY - bounds.top) / bounds.height

    tiltY.set((xRatio - 0.5) * 12)
    tiltX.set((0.5 - yRatio) * 9)
  }

  const handlePointerMove = (event) => {
    updateTilt(event.clientX, event.clientY)

    if (!dragState.current.active) {
      return
    }

    const delta = event.clientX - dragState.current.startX

    rotation.set(dragState.current.startRotation + delta * 0.35)
  }

  const handlePointerDown = (event) => {
    if (!pointerEnabled) {
      return
    }

    dragState.current.active = true
    dragState.current.startX = event.clientX
    dragState.current.startRotation = rotation.get()

    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const handlePointerUp = (event) => {
    if (!pointerEnabled) {
      return
    }

    dragState.current.active = false
    resetTilt(tiltX, tiltY)

    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }

  return (
    <>
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-[29rem]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mist">Planetary control room</p>
          <h2 className="mt-3 text-[1.72rem] font-black leading-[1.02] text-pearl sm:text-[2rem]">
            Ядро сайта по центру, а вокруг орбиты услуг, которые собирают доверие и заявки
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-mist sm:text-[0.98rem]">
            В центре стоит смысловой core, а вокруг него вращаются лендинги, React, анимации, SEO и
            редизайн. Так видно, что сайт собирается как система, а не как случайный набор блоков.
          </p>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-black/16 px-4 py-3 text-sm font-semibold text-pearl backdrop-blur-xl">
          {mobileLike ? 'Mobile orbit / tap node' : 'Desktop orbit / drag scene'}
        </div>
      </div>

      <div className="hero-chip-grid relative z-10 mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {systemPills.map((item, index) => (
          <div
            key={item.label}
            className={cn('hero-chip', index === 0 && 'col-span-2 sm:col-auto', item.tone === 'accent' && 'hero-chip-accent')}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div className="relative mt-6 rounded-[30px] border border-white/10 bg-black/16 p-3 sm:mt-7 sm:p-4">
        <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[linear-gradient(140deg,rgba(255,255,255,0.05),transparent_38%,rgba(136,191,255,0.05)_72%,transparent)]" />

        <Motion.div
          ref={stageRef}
          className="orbital-command-stage relative min-h-[22rem] overflow-hidden rounded-[26px] border border-white/8 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),rgba(0,0,0,0.08)_66%,rgba(0,0,0,0.22))] px-3 pb-4 pt-3 sm:min-h-[29rem] sm:px-4 sm:pb-6 sm:pt-4"
          onMouseLeave={() => {
            if (!dragState.current.active) {
              resetTilt(tiltX, tiltY)
            }
          }}
          onPointerCancel={handlePointerUp}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={pointerEnabled ? { rotateX: tiltXSpring, rotateY: tiltYSpring } : undefined}
        >
          <div className="orbital-command-grid absolute inset-0" />

          {!mobileLike ? (
            <Motion.div
              animate={reducedMotion ? undefined : { opacity: [0.24, 0.48, 0.24], scale: [0.96, 1.04, 0.96] }}
              className="absolute left-1/2 top-1/2 h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(136,191,255,0.22),rgba(140,242,211,0.12),transparent_68%)] blur-[80px]"
              transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
            />
          ) : null}

          <div className="pointer-events-none absolute inset-0">
            {[1, 2, 3].map((ring) => (
              <div
                key={ring}
                className="orbital-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: mobileLike ? ringSizes.mobile[ring] : ringSizes.desktop[ring],
                  height: mobileLike ? ringSizes.mobile[ring] : ringSizes.desktop[ring],
                }}
              />
            ))}
          </div>

          {desktopOrbit ? (
            <Motion.div className="absolute inset-0" style={{ rotate: rotateSpring }}>
              {orbitNodes.map((node, index) => {
                const Icon = node.icon
                const isActive = activeIndex === index

                return (
                  <div
                    key={node.label}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${node.desktopAngle}deg) translateX(calc(${ringSizes.desktop[node.ring]} / 2))`,
                    }}
                  >
                    <Motion.button
                      aria-label={node.label}
                      aria-pressed={isActive}
                      className={cn(
                        'orbital-node relative flex min-w-[10rem] items-center gap-2.5 rounded-full border px-4 py-2.5 text-left text-sm font-semibold text-pearl backdrop-blur-xl transition duration-300',
                        isActive ? 'border-white/20 bg-white/12 shadow-glow' : 'border-white/10 bg-black/34 hover:border-white/18 hover:bg-white/8',
                      )}
                      onClick={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      onMouseEnter={() => setActiveIndex(index)}
                      style={{ rotate: inverseRotate }}
                      whileHover={{ y: -4, scale: 1.025 }}
                    >
                      <span className={cn('inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 bg-black/30 text-pearl', isActive && 'border-white/20 bg-white/10 text-white')}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="whitespace-nowrap">{node.label}</span>
                    </Motion.button>
                  </div>
                )
              })}
            </Motion.div>
          ) : (
            <div className="absolute inset-0 sm:hidden">
              {orbitNodes.map((node, index) => {
                const Icon = node.icon
                const isActive = activeIndex === index

                return (
                  <button
                    key={node.label}
                    className={cn(
                      'absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold text-pearl backdrop-blur-xl transition duration-300',
                      isActive ? 'border-white/20 bg-white/12 shadow-glow' : 'border-white/10 bg-black/34',
                    )}
                    onClick={() => setActiveIndex(index)}
                    style={{ left: `${node.mobilePosition.x}%`, top: `${node.mobilePosition.y}%` }}
                    type="button"
                  >
                    <span className={cn('inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/12 bg-black/30 text-pearl', isActive && 'border-white/20 bg-white/10')}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="whitespace-nowrap">{node.shortLabel}</span>
                  </button>
                )
              })}
            </div>
          )}

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-[9.5rem] w-[9.5rem] -translate-x-1/2 -translate-y-1/2 sm:h-[12rem] sm:w-[12rem]">
            {!mobileLike ? (
              <Motion.div
                animate={reducedMotion ? undefined : { rotate: 360 }}
                className="absolute inset-[-0.7rem] rounded-full border border-dashed border-white/10"
                transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
              />
            ) : null}

            <div className="orbital-core absolute inset-0 flex items-center justify-center rounded-full">
              <div className="pointer-events-none absolute inset-0 rounded-full border border-white/16 bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.36),rgba(136,191,255,0.28)_34%,rgba(10,18,30,0.28)_66%,rgba(0,0,0,0)_100%)] shadow-planet" />
              <div className="pointer-events-none absolute inset-[10%] rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(140,242,211,0.16),transparent_66%)]" />
              <div className="relative z-10 max-w-[9rem] px-4 text-center sm:max-w-[11rem]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-pearl/72 sm:text-xs">Core engine</div>
                <div className="mt-2.5 text-[1.18rem] font-black leading-[1.02] text-pearl sm:mt-3 sm:text-[1.7rem]">
                  Подача
                  <br />
                  доверие
                  <br />
                  конверсия
                </div>
                <p className="mt-2 text-[10px] leading-4 text-mist sm:mt-3 sm:text-xs sm:leading-6">
                  {mobileLike ? 'Центр системы' : 'Потяните сцену и меняйте фокус'} вокруг задачи бизнеса.
                </p>
              </div>
            </div>
          </div>
        </Motion.div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[1.08fr,0.92fr]">
          <div className="rounded-[24px] border border-white/10 bg-white/6 p-4 sm:p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-mint">Активный модуль</div>
            <div className="mt-3 flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/25 text-pearl">
                <ActiveIcon className="h-4 w-4" />
              </span>
              <div>
                <div className="text-lg font-black text-pearl sm:text-xl">{activeNode.label}</div>
                <p className="mt-2 text-sm leading-7 text-mist">{activeNode.detail}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-black/24 p-4 sm:p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-mist">Логика ядра</div>
            <p className="mt-3 text-sm leading-7 text-pearl/86">
              Орбиты не про декор. Это карта того, как сайт собирается из смысла, визуальной подачи,
              технологий, SEO-архитектуры и понятного маршрута к заявке.
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
                  {mobileLike ? node.shortLabel : node.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-4">
        {focusMetrics.map((item) => (
          <div key={item.value} className="hero-metric-card rounded-[20px] border border-white/10 bg-white/6 px-3 py-3 sm:rounded-[22px] sm:p-4">
            <div className="text-lg font-extrabold text-pearl sm:text-2xl">{item.value}</div>
            <p className="mt-1.5 text-[11px] leading-5 text-mist sm:mt-2 sm:text-xs sm:leading-6">{item.label}</p>
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
