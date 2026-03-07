import { useEffect, useRef, useState } from 'react'
import { motion as Motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { Blocks, Cpu, LayoutTemplate, SearchCode, Sparkles, WandSparkles } from 'lucide-react'

import { useAdaptiveSceneQuality } from '@/hooks/useAdaptiveSceneQuality'
import { cn } from '@/utils/cn'

const orbitNodes = [
  {
    label: 'Лендинги',
    shortLabel: 'Ленд',
    detail: 'Один экран, одна цель и сильная офферная подача без визуального мусора.',
    angle: -28,
    mobileAngle: -30,
    ring: 1,
    accent: 'mint',
    icon: LayoutTemplate,
  },
  {
    label: 'Многостраничный',
    shortLabel: 'Многостр',
    detail: 'Страницы услуг, кейсов и структуры доверия для бизнеса, который растет.',
    angle: 54,
    mobileAngle: 52,
    ring: 2,
    accent: 'sand',
    icon: Blocks,
  },
  {
    label: 'React',
    shortLabel: 'React',
    detail: 'Современный frontend для продуктов, интерфейсов и масштабируемых решений.',
    angle: 135,
    mobileAngle: 128,
    ring: 3,
    accent: 'ice',
    icon: Cpu,
  },
  {
    label: 'Редизайн',
    shortLabel: 'Редизайн',
    detail: 'Пересборка устаревшего сайта в дорогую, ясную и уверенную digital-подачу.',
    angle: 210,
    mobileAngle: 212,
    ring: 2,
    accent: 'coral',
    icon: WandSparkles,
  },
  {
    label: 'SEO-страницы',
    shortLabel: 'SEO',
    detail: 'Сервисные страницы и коммерческая семантика вшиваются в архитектуру сразу.',
    angle: 278,
    mobileAngle: 284,
    ring: 1,
    accent: 'mint',
    icon: SearchCode,
  },
  {
    label: 'Анимации',
    shortLabel: 'Motion',
    detail: 'Motion и depth усиливают впечатление, но не мешают ясности и конверсии.',
    angle: 340,
    mobileAngle: 338,
    ring: 3,
    accent: 'ice',
    icon: Sparkles,
  },
]

const ringSizes = {
  desktop: {
    1: 'clamp(12.5rem, 26vw, 16rem)',
    2: 'clamp(17rem, 35vw, 22rem)',
    3: 'clamp(22rem, 44vw, 28rem)',
  },
  mobile: {
    1: '9.75rem',
    2: '13.4rem',
    3: '17rem',
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

const releaseTilt = (tiltX, tiltY) => {
  tiltX.set(-4)
  tiltY.set(5)
}

export const OrbitCommandCore = () => {
  const prefersReducedMotion = useReducedMotion()
  const quality = useAdaptiveSceneQuality()
  const stageRef = useRef(null)
  const dragState = useRef({ active: false, startX: 0, startRotation: 0 })

  const [activeIndex, setActiveIndex] = useState(0)
  const [dragging, setDragging] = useState(false)

  const reducedMotion = prefersReducedMotion || quality.reducedMotion
  const mobileLike = quality.mobileLike
  const pointerEnabled = quality.pointerEnabled

  const rotation = useMotionValue(16)
  const tiltX = useMotionValue(-4)
  const tiltY = useMotionValue(5)
  const orbitScale = useMotionValue(1)

  const rotateSpring = useSpring(rotation, { stiffness: 70, damping: 16, mass: 0.9 })
  const inverseRotate = useTransform(rotateSpring, (value) => -value)
  const tiltXSpring = useSpring(tiltX, { stiffness: 120, damping: 22, mass: 0.88 })
  const tiltYSpring = useSpring(tiltY, { stiffness: 120, damping: 22, mass: 0.88 })
  const scaleSpring = useSpring(orbitScale, { stiffness: 170, damping: 24, mass: 0.8 })

  const activeNode = orbitNodes[activeIndex]
  const ActiveIcon = activeNode.icon

  useEffect(() => {
    if (reducedMotion) {
      return undefined
    }

    let frameId = 0
    let lastTime = 0
    const speed = mobileLike ? 0.0021 : 0.0043

    const tick = (time) => {
      if (lastTime === 0) {
        lastTime = time
      }

      const delta = time - lastTime
      lastTime = time

      if (!dragState.current.active) {
        rotation.set(rotation.get() + delta * speed)
      }

      frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(frameId)
  }, [mobileLike, reducedMotion, rotation])

  useEffect(() => {
    if (reducedMotion) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      if (!dragState.current.active) {
        setActiveIndex((current) => (current + 1) % orbitNodes.length)
      }
    }, mobileLike ? 3600 : 2600)

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

    tiltY.set((xRatio - 0.5) * 14)
    tiltX.set((0.5 - yRatio) * 12)
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
    orbitScale.set(1.02)
    setDragging(true)

    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const handlePointerUp = (event) => {
    if (!pointerEnabled) {
      return
    }

    dragState.current.active = false
    orbitScale.set(1)
    setDragging(false)
    releaseTilt(tiltX, tiltY)

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
          {mobileLike ? 'Orbit mode / tap node' : 'Orbit mode / drag core'}
        </div>
      </div>

      <div className="hero-chip-grid relative z-10 mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {systemPills.map((item, index) => (
          <div
            key={item.label}
            className={cn(
              'hero-chip',
              index === 0 && 'col-span-2 sm:col-auto',
              item.tone === 'accent' && 'hero-chip-accent',
            )}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div className="relative mt-6 rounded-[30px] border border-white/10 bg-black/16 p-3 sm:mt-7 sm:p-4">
        <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[linear-gradient(140deg,rgba(255,255,255,0.05),transparent_38%,rgba(136,191,255,0.05)_72%,transparent)]" />
        <Motion.div
          ref={stageRef}
          className="orbital-command-stage relative min-h-[23.5rem] overflow-hidden rounded-[26px] border border-white/8 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),rgba(0,0,0,0.08)_66%,rgba(0,0,0,0.22))] px-3 pb-4 pt-3 sm:min-h-[30rem] sm:px-4 sm:pb-6 sm:pt-4"
          onMouseLeave={() => {
            if (!dragging) {
              releaseTilt(tiltX, tiltY)
            }
          }}
          onPointerMove={handlePointerMove}
          style={pointerEnabled ? { rotateX: tiltXSpring, rotateY: tiltYSpring, scale: scaleSpring } : undefined}
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
                className={cn(
                  'orbital-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full',
                  ring === 3 && mobileLike ? 'opacity-60' : '',
                )}
                style={{
                  width: mobileLike ? ringSizes.mobile[ring] : ringSizes.desktop[ring],
                  height: mobileLike ? ringSizes.mobile[ring] : ringSizes.desktop[ring],
                }}
              />
            ))}
          </div>

          <Motion.div className="absolute inset-0" style={{ rotate: rotateSpring }}>
            {orbitNodes.map((node, index) => {
              const Icon = node.icon
              const angle = mobileLike ? node.mobileAngle : node.angle
              const radius = mobileLike ? ringSizes.mobile[node.ring] : ringSizes.desktop[node.ring]
              const isActive = activeIndex === index

              return (
                <div
                  key={node.label}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(calc(${radius} / 2))` }}
                >
                  <div style={{ transform: `rotate(${-angle}deg)` }}>
                    <Motion.button
                      aria-label={node.label}
                      aria-pressed={isActive}
                      className={cn(
                        'orbital-node relative flex items-center justify-center gap-1 rounded-[22px] border text-pearl backdrop-blur-xl transition duration-300',
                        'h-[3.95rem] w-[3.95rem] flex-col px-1.5 py-2 text-center text-[10px] font-semibold leading-[1.08]',
                        'sm:h-auto sm:w-auto sm:min-w-[10.4rem] sm:flex-row sm:justify-start sm:gap-2.5 sm:rounded-full sm:px-4 sm:py-2.5 sm:text-left sm:text-sm',
                        isActive
                          ? 'border-white/20 bg-white/12 shadow-glow'
                          : 'border-white/10 bg-black/34 hover:border-white/18 hover:bg-white/8',
                      )}
                      onClick={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      onMouseEnter={() => {
                        if (!mobileLike) {
                          setActiveIndex(index)
                        }
                      }}
                      style={{ rotate: inverseRotate }}
                      whileHover={!mobileLike && !reducedMotion ? { y: -4, scale: 1.025 } : undefined}
                    >
                      <span
                        className={cn(
                          'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 bg-black/30 text-pearl',
                          isActive && 'border-white/20 bg-white/10 text-white',
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="max-w-[3.25rem] text-[9px] uppercase tracking-[0.08em] sm:hidden">
                        {node.shortLabel}
                      </span>
                      <span className="hidden whitespace-nowrap sm:block">{node.label}</span>
                    </Motion.button>
                  </div>
                </div>
              )
            })}
          </Motion.div>

          <Motion.div
            animate={
              reducedMotion
                ? undefined
                : mobileLike
                  ? { scale: [0.985, 1.015, 0.985] }
                  : { rotate: 360, scale: [0.99, 1.015, 0.99] }
            }
            className="orbital-core absolute left-1/2 top-1/2 z-20 flex h-[8.75rem] w-[8.75rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-[12rem] sm:w-[12rem]"
            onPointerCancel={handlePointerUp}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            transition={{
              duration: mobileLike ? 7.5 : 22,
              ease: 'linear',
              repeat: Infinity,
            }}
            whileTap={pointerEnabled && !reducedMotion ? { scale: 0.985 } : undefined}
          >
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
                {mobileLike ? 'Тап по орбите' : 'Потяните ядро'} и посмотрите, как сайт собирается вокруг цели бизнеса.
              </p>
            </div>
          </Motion.div>

          <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 grid gap-2 sm:hidden">
            <div className="rounded-[22px] border border-white/10 bg-black/36 px-4 py-3 backdrop-blur-xl">
              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-mint">Активная орбита</div>
              <div className="mt-2 flex items-start gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8 text-pearl">
                  <ActiveIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-base font-black text-pearl">{activeNode.label}</div>
                  <p className="mt-1 text-xs leading-5 text-mist">{activeNode.detail}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-[20px] border border-white/10 bg-white/7 px-3 py-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-mist">Логика ядра</div>
                <p className="mt-2 text-xs leading-5 text-pearl/82">
                  Орбиты показывают, из каких модулей собирается дорогой продающий сайт.
                </p>
              </div>
              <div className="rounded-[20px] border border-mint/15 bg-mint/10 px-3 py-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-mint">Mobile mode</div>
                <p className="mt-2 text-xs leading-5 text-pearl/84">
                  Анимация легче, движение мягче, плашки компактнее и без лишнего шума.
                </p>
              </div>
            </div>
          </div>
        </Motion.div>

        <div className="mt-4 hidden gap-4 sm:grid sm:grid-cols-[1.08fr,0.92fr]">
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
                  {node.label}
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
