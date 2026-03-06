import { motion as Motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, TimerReset, Zap } from 'lucide-react'

import { AnimatedText } from '@/components/AnimatedText'
import { SceneSection } from '@/components/SceneSection'
import { Badge } from '@/ui/Badge'
import { Button } from '@/ui/Button'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'
import { createOrderMailto } from '@/utils/mailto'
import { scrollToId } from '@/utils/scroll'
import { useGsapParallax } from '@/hooks/useGsapParallax'

const orbitNodes = [
  { label: 'Лендинги', x: '8%', y: '16%' },
  { label: 'React', x: '70%', y: '10%' },
  { label: 'Анимации', x: '74%', y: '54%' },
  { label: 'Редизайн', x: '16%', y: '66%' },
  { label: 'SEO-страницы', x: '40%', y: '80%' },
]

const signalCards = [
  {
    icon: Zap,
    title: 'Быстрый старт',
    text: 'Можно выйти в работу быстро и без агентской инерции.',
  },
  {
    icon: TimerReset,
    title: 'Под ключ',
    text: 'От структуры и дизайна до lead capture и финальной полировки.',
  },
  {
    icon: Sparkles,
    title: 'Premium execution',
    text: 'Сайт выглядит на уровень выше типового рынка и поддерживает цену бизнеса.',
  },
]

export const HeroSection = () => {
  const orbLeftRef = useGsapParallax({ from: -120, to: 90 })
  const orbRightRef = useGsapParallax({ from: -40, to: 110 })

  return (
    <SceneSection className="relative overflow-hidden pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28" id="hero-zone" tone="ice">
      <div className="absolute inset-0 bg-hero-radial opacity-90" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div
        ref={orbLeftRef}
        className="absolute -left-24 top-14 h-72 w-72 rounded-full bg-gradient-to-br from-mint/28 via-transparent to-transparent blur-3xl"
      />
      <div
        ref={orbRightRef}
        className="absolute -right-20 top-36 h-80 w-80 rounded-full bg-gradient-to-br from-coral/20 via-sand/15 to-transparent blur-3xl"
      />
      <Container className="grid gap-10 lg:grid-cols-[1.08fr,0.92fr] lg:items-center">
        <div className="max-w-4xl">
          <Badge>Разработка сайтов под ключ</Badge>
          <p className="mt-5 text-sm font-medium uppercase tracking-[0.28em] text-mist">
            веб-разработка под ключ / создание сайта для бизнеса / premium digital delivery
          </p>
          <AnimatedText
            as="h1"
            className="headline-trail mt-6 max-w-4xl text-4xl font-black leading-[1.01] text-pearl sm:text-5xl lg:text-[5.2rem]"
            highlightWords={['сайт', 'заказать', 'под', 'ключ']}
            text="Напишу сайт, который хочется заказать"
          />
          <AnimatedText
            as="div"
            className="text-cosmic mt-2 text-3xl font-black leading-[1.05] sm:text-4xl lg:text-[4.2rem]"
            highlightWords={['быстро', 'ключ', 'боли']}
            text="быстро, под ключ и без лишней головной боли"
          />
          <p className="mt-6 max-w-3xl font-serif text-[1.38rem] leading-9 text-pearl/82 sm:text-[1.52rem]">
            Лендинги, многостраничные сайты, анимации, уникальный дизайн, React-разработка и продающие решения для
            бизнеса
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-mist sm:text-lg">
            Делаю современные сайты с сильным визуалом, продуманной структурой, SEO-страницами и удобной логикой
            заявки. Можно выбрать готовую услугу, отправить быстрый запрос на почту или оставить заявку через форму.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={createOrderMailto()} variant="accent">
              Заказать услугу
            </Button>
            <Button to="/services" variant="secondary">
              Посмотреть услуги
            </Button>
            <Button onClick={() => scrollToId('home-lead-form')} variant="ghost">
              Оставить заявку
            </Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {signalCards.map((card) => (
              <GlassPanel key={card.title} className="p-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-mint">
                  <card.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-lg font-black text-pearl">{card.title}</div>
                <p className="mt-2 text-sm leading-6 text-mist">{card.text}</p>
              </GlassPanel>
            ))}
          </div>
        </div>
        <div className="relative">
          <GlassPanel className="min-h-[520px] overflow-hidden p-6 sm:p-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(136,191,255,0.1),transparent_45%)]" />
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 opacity-60" />
            <div className="absolute left-1/2 top-1/2 h-[23rem] w-[23rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8 opacity-30" />
            <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6 opacity-20" />
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mist">Planetary control room</p>
                <h2 className="mt-3 text-2xl font-black text-pearl">Сайт как командный центр для заявок, доверия и роста цены</h2>
              </div>
              <div className="rounded-full border border-white/10 bg-black/10 px-4 py-2 text-sm font-semibold text-pearl">
                React / GSAP / SEO
              </div>
            </div>

            <div className="relative mt-8 flex min-h-[340px] items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_40%)]" />
              <Motion.div
                animate={{ rotate: 360 }}
                className="absolute h-[18rem] w-[18rem] rounded-full border border-dashed border-white/12"
                transition={{ duration: 26, ease: 'linear', repeat: Infinity }}
              />
              <Motion.div
                animate={{ rotate: -360 }}
                className="absolute h-[24rem] w-[24rem] rounded-full border border-dashed border-white/10"
                transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
              />
              <div className="absolute h-40 w-40 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),rgba(136,191,255,0.26),rgba(12,20,33,0.16)_60%,rgba(0,0,0,0))] shadow-planet" />
              <div className="relative z-10 max-w-[13rem] text-center">
                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-pearl/74">Core</div>
                <div className="mt-3 text-2xl font-black text-pearl">Конверсия + стиль + ясность</div>
                <p className="mt-3 text-sm leading-7 text-mist">
                  Каждая орбита вокруг этого ядра отвечает за одну задачу: подача, структура, SEO, motion и lead capture.
                </p>
              </div>
              {orbitNodes.map((node) => (
                <Motion.div
                  key={node.label}
                  className="absolute rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-semibold text-pearl shadow-glow backdrop-blur-xl"
                  style={{ left: node.x, top: node.y }}
                  whileHover={{ scale: 1.06, y: -4 }}
                >
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-mint shadow-[0_0_12px_rgba(140,242,211,0.75)]" />
                  {node.label}
                </Motion.div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[22px] border border-white/10 bg-white/6 p-4">
                <div className="text-2xl font-extrabold text-pearl">24ч</div>
                <p className="mt-2 text-xs leading-6 text-mist">на быстрый ответ и старт диалога</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/6 p-4">
                <div className="text-2xl font-extrabold text-pearl">SEO</div>
                <p className="mt-2 text-xs leading-6 text-mist">семантика и сервисные страницы заложены сразу</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/6 p-4">
                <div className="text-2xl font-extrabold text-pearl">UX</div>
                <p className="mt-2 text-xs leading-6 text-mist">понятно, почему сайт стоит денег и куда вести клиента</p>
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-pearl/88">
              <span className="h-2 w-2 rounded-full bg-ice shadow-[0_0_12px_rgba(136,191,255,0.7)]" />
              Упаковка бизнеса в premium digital-форму
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </GlassPanel>
        </div>
      </Container>
    </SceneSection>
  )
}
