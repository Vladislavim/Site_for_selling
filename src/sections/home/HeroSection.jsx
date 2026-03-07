import { Sparkles, TimerReset, Zap } from 'lucide-react'

import { AnimatedText } from '@/components/AnimatedText'
import { OrbitCommandCore } from '@/components/OrbitCommandCore'
import { SceneSection } from '@/components/SceneSection'
import { getSemanticEntry } from '@/data/semanticCore'
import { useGsapParallax } from '@/hooks/useGsapParallax'
import { Badge } from '@/ui/Badge'
import { Button } from '@/ui/Button'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'
import { createOrderMailto } from '@/utils/mailto'
import { scrollToId } from '@/utils/scroll'

const heroHeadlineLines = [
  { text: 'Напишу сайт,', highlights: ['сайт'] },
  { text: 'который хочется', highlights: ['хочется'] },
  { text: 'заказать быстро.', highlights: ['заказать', 'быстро'] },
]

const signalCards = [
  {
    icon: Zap,
    title: 'Быстрый старт',
    text: 'Можно быстро выйти в работу без агентской инерции, долгих согласований и лишних посредников.',
  },
  {
    icon: TimerReset,
    title: 'Под ключ',
    text: 'От структуры и дизайна до lead capture, SEO-страниц, анимаций и финальной полировки перед запуском.',
  },
  {
    icon: Sparkles,
    title: 'Премиум-уровень',
    text: 'Сайт выглядит дороже типового рынка, усиливает доверие и помогает бизнесу держать более сильную цену.',
  },
]

const homeEntry = getSemanticEntry('home')

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

      <Container className="grid gap-8 lg:grid-cols-[1.04fr,0.96fr] lg:items-center xl:gap-10">
        <div className="max-w-4xl">
          <h1 className="sr-only">{homeEntry.h1}</h1>
          <Badge>Разработка сайтов под ключ</Badge>
          <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.24em] text-mist sm:text-sm sm:tracking-[0.28em]">
            веб-разработка под ключ / создание сайта для бизнеса / premium digital delivery
          </p>

          <div className="mt-6 space-y-1 sm:space-y-2">
            {heroHeadlineLines.map((line) => (
              <AnimatedText
                key={line.text}
                as="div"
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
            Лендинги, многостраничные сайты, анимации, уникальный дизайн, React-разработка и продающие
            решения для бизнеса.
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-mist sm:text-base sm:leading-8 lg:text-lg">
            Делаю современные сайты с сильным визуалом, продуманной структурой, SEO-страницами и удобной
            логикой заявки. Можно выбрать готовую услугу, отправить быстрый запрос на почту или оставить
            заявку через форму.
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
              <GlassPanel key={card.title} className="hero-signal-card p-4 sm:p-5">
                <div className="flex items-start gap-4 md:block">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/8 text-mint">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-mist sm:text-[11px]">
                      Signal
                    </div>
                    <div className="mt-2 text-lg font-black text-pearl">{card.title}</div>
                    <p className="mt-2 text-sm leading-6 text-mist">{card.text}</p>
                  </div>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>

        <div className="relative">
          <GlassPanel className="min-h-[540px] overflow-hidden p-5 sm:min-h-[650px] sm:p-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(136,191,255,0.1),transparent_45%)]" />
            <OrbitCommandCore />
          </GlassPanel>
        </div>
      </Container>
    </SceneSection>
  )
}
