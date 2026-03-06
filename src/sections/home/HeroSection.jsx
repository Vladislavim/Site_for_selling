import { motion as Motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, TimerReset, Zap } from 'lucide-react'

import { AnimatedText } from '@/components/AnimatedText'
import { SceneSection } from '@/components/SceneSection'
import { useGsapParallax } from '@/hooks/useGsapParallax'
import { Badge } from '@/ui/Badge'
import { Button } from '@/ui/Button'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'
import { createOrderMailto } from '@/utils/mailto'
import { scrollToId } from '@/utils/scroll'

const orbitNodes = [
  { label: 'Лендинги', x: '8%', y: '16%' },
  { label: 'React', x: '70%', y: '10%' },
  { label: 'Анимации', x: '74%', y: '54%' },
  { label: 'Редизайн', x: '16%', y: '66%' },
  { label: 'SEO-страницы', x: '40%', y: '80%' },
]

const heroHeadlineLines = [
  { text: 'Напишу сайт,', highlights: ['сайт'] },
  { text: 'который хочется', highlights: ['хочется'] },
  { text: 'заказать быстро.', highlights: ['заказать', 'быстро'] },
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
    <SceneSection className="relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28" id="hero-zone" tone="ice">
      <div className="absolute inset-0 bg-hero-radial opacity-90" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div
        ref={orbLeftRef}
        className="absolute -left-24 top-14 hidden h-72 w-72 rounded-full bg-gradient-to-br from-mint/28 via-transparent to-transparent blur-3xl sm:block"
      />
      <div
        ref={orbRightRef}
        className="absolute -right-20 top-36 hidden h-80 w-80 rounded-full bg-gradient-to-br from-coral/20 via-sand/15 to-transparent blur-3xl sm:block"
      />
      <Container className="grid gap-8 lg:grid-cols-[1.08fr,0.92fr] lg:items-center xl:gap-10">
        <div className="max-w-4xl">
          <Badge>Разработка сайтов под ключ</Badge>
          <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.24em] text-mist sm:text-sm sm:tracking-[0.28em]">
            веб-разработка под ключ / создание сайта для бизнеса / premium digital delivery
          </p>
          <div className="mt-6 space-y-1 sm:space-y-2">
            {heroHeadlineLines.map((line, index) => (
              <AnimatedText
                key={line.text}
                as={index === 0 ? 'h1' : 'div'}
                className="headline-trail max-w-4xl text-[clamp(2.9rem,14vw,5.2rem)] font-black leading-[0.92] text-pearl"
                highlightWords={line.highlights}
                text={line.text}
              />
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-balance text-[clamp(1.45rem,7.4vw,2.3rem)] font-black leading-[1.08] text-pearl">
            <span className="text-cosmic">Под ключ</span>
            <span className="text-pearl/88">, без лишней бюрократии</span>
            <span className="text-pearl/72"> и </span>
            <span className="text-cosmic">без лишней головной боли.</span>
          </p>
          <p className="mt-6 max-w-3xl font-serif text-[1.08rem] leading-8 text-pearl/82 sm:text-[1.38rem] sm:leading-9 lg:text-[1.52rem]">
            Лендинги, многостраничные сайты, анимации, уникальный дизайн, React-разработка и продающие решения для
            бизнеса
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-mist sm:text-base sm:leading-8 lg:text-lg">
            Делаю современные сайты с сильным визуалом, продуманной структурой, SEO-страницами и удобной логикой
            заявки. Можно выбрать готовую услугу, отправить быстрый запрос на почту или оставить заявку через форму.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <Button className="justify-center" href={createOrderMailto()} variant="accent" wrapperClassName="w-full sm:w-auto">
              Заказать услугу
            </Button>
            <Button className="justify-center" to="/services" variant="secondary" wrapperClassName="w-full sm:w-auto">
              Посмотреть услуги
            </Button>
            <Button className="w-full justify-center sm:w-auto" onClick={() => scrollToId('home-lead-form')} variant="ghost">
              Оставить заявку
            </Button>
          </div>
          <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3">
            {signalCards.map((card) => (
              <GlassPanel key={card.title} className="p-4 sm:p-5">
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
          <GlassPanel className="min-h-[440px] overflow-hidden p-5 sm:min-h-[520px] sm:p-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(136,191,255,0.1),transparent_45%)]" />
            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 opacity-60 sm:h-80 sm:w-80" />
            <div className="absolute left-1/2 top-1/2 hidden h-[23rem] w-[23rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8 opacity-30 sm:block" />
            <div className="absolute left-1/2 top-1/2 hidden h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6 opacity-20 lg:block" />
            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-[28rem]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mist">Planetary control room</p>
                <h2 className="mt-3 text-2xl font-black leading-tight text-pearl sm:text-[2rem]">
                  Сайт как командный центр для заявок, доверия и роста цены
                </h2>
              </div>
              <div className="rounded-full border border-white/10 bg-black/10 px-4 py-2 text-sm font-semibold text-pearl">
                React / GSAP / SEO
              </div>
            </div>

            <div className="relative mt-8 flex min-h-[270px] items-center justify-center sm:min-h-[340px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_40%)]" />
              <Motion.div
                animate={{ rotate: 360 }}
                className="absolute h-56 w-56 rounded-full border border-dashed border-white/12 sm:h-[18rem] sm:w-[18rem]"
                transition={{ duration: 26, ease: 'linear', repeat: Infinity }}
              />
              <Motion.div
                animate={{ rotate: -360 }}
                className="absolute h-[19rem] w-[19rem] rounded-full border border-dashed border-white/10 sm:h-[24rem] sm:w-[24rem]"
                transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
              />
              <div className="absolute h-32 w-32 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),rgba(136,191,255,0.26),rgba(12,20,33,0.16)_60%,rgba(0,0,0,0))] shadow-planet sm:h-40 sm:w-40" />
              <div className="relative z-10 max-w-[11.75rem] px-3 text-center sm:max-w-[13rem]">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-pearl/74 sm:text-sm">Core</div>
                <div className="mt-3 text-xl font-black text-pearl sm:text-2xl">Конверсия + стиль + ясность</div>
                <p className="mt-3 text-xs leading-6 text-mist sm:text-sm sm:leading-7">
                  Каждая орбита вокруг этого ядра отвечает за одну задачу: подача, структура, SEO, motion и lead
                  capture.
                </p>
              </div>
              {orbitNodes.map((node) => (
                <Motion.div
                  key={node.label}
                  className="absolute hidden rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold text-pearl shadow-glow backdrop-blur-xl sm:block lg:px-4 lg:py-2 lg:text-sm"
                  style={{ left: node.x, top: node.y }}
                  whileHover={{ scale: 1.06, y: -4 }}
                >
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-mint shadow-[0_0_12px_rgba(140,242,211,0.75)]" />
                  {node.label}
                </Motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 sm:hidden">
              {orbitNodes.map((node) => (
                <span key={node.label} className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-semibold text-pearl/88">
                  {node.label}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
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
