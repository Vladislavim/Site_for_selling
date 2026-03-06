import { Code2, Orbit, SearchCheck, Sparkles } from 'lucide-react'

import { AnimatedText } from '@/components/AnimatedText'
import { SceneSection } from '@/components/SceneSection'
import { stackCards } from '@/data/siteContent'
import { Badge } from '@/ui/Badge'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'

const leadSignals = [
  {
    icon: Code2,
    title: 'React, Tailwind CSS и чистый frontend',
    text: 'База для проекта, который можно развивать, поддерживать и не бояться показывать в production.',
  },
  {
    icon: Orbit,
    title: 'GSAP, ScrollTrigger и premium motion',
    text: 'Анимация направляет взгляд, делает секции живыми и усиливает качество восприятия без шума.',
  },
  {
    icon: SearchCheck,
    title: 'SEO и коммерческая семантика',
    text: 'Заголовки, service pages и FAQ собираются так, чтобы сайт был полезен и для трафика, и для конверсии.',
  },
  {
    icon: Sparkles,
    title: 'Three.js и выразительные digital-сцены',
    text: '3D и depth используются не ради трюка, а ради уникальной подачи и stronger brand image.',
  },
]

export const StackSection = ({
  id,
  eyebrow = 'Технологии и сильные стороны',
  title = 'React, motion, 3D и SEO как одна premium-система',
  description = 'Это не случайный набор модных инструментов. Каждый слой отвечает за конкретную бизнес-задачу: внешний уровень, удобство, скорость, запоминаемость и рост проекта после релиза.',
}) => (
  <SceneSection className="py-16 sm:py-20" id={id} tone="mint">
    <Container>
      <div className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr] lg:items-start">
        <div className="max-w-3xl">
          <Badge>{eyebrow}</Badge>
          <AnimatedText
            as="h2"
            className="headline-trail mt-6 text-4xl font-black leading-[0.98] text-pearl sm:text-5xl lg:text-[4.35rem]"
            highlightWords={['React', 'motion', '3D', 'SEO', 'premium-система']}
            text={title}
          />
          <p className="mt-6 max-w-2xl font-serif text-[1.28rem] leading-8 text-pearl/82 sm:text-[1.45rem] sm:leading-9">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {['React', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'ScrollTrigger', 'Three.js', 'React Three Fiber', 'SEO'].map((item) => (
              <span key={item} className="tech-pill">
                {item}
              </span>
            ))}
          </div>
        </div>

        <GlassPanel className="min-h-[24rem] p-6 sm:p-8">
          <div className="absolute inset-x-12 top-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute right-10 top-10 h-28 w-28 rounded-full border border-white/10 opacity-50" />
          <div className="absolute left-10 bottom-10 h-36 w-36 rounded-full border border-white/10 opacity-30" />
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mist">Capability constellation</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {leadSignals.map((item) => (
              <div key={item.title} className="rounded-[26px] border border-white/10 bg-black/20 p-4 backdrop-blur-xl">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-mint">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-black text-pearl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-mist">{item.text}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {stackCards.map((item, index) => (
          <GlassPanel key={item.title} className={index === 0 || index === 3 ? 'p-6 sm:p-7 xl:col-span-2' : 'p-6 sm:p-7'}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand">{item.label}</p>
              <div className="inline-flex flex-wrap gap-2">
                {item.chips.map((chip) => (
                  <span key={chip} className="keyword-chip">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="mt-5 text-2xl font-black leading-tight text-pearl">{item.title}</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-mist">{item.text}</p>
            <div className="mt-6 h-px bg-gradient-to-r from-white/18 via-white/6 to-transparent" />
          </GlassPanel>
        ))}
      </div>
    </Container>
  </SceneSection>
)
