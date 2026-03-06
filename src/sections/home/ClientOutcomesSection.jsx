import { ArrowUpRight } from 'lucide-react'

import { AnimatedText } from '@/components/AnimatedText'
import { SceneSection } from '@/components/SceneSection'
import { clientOutcomeCards } from '@/data/siteContent'
import { Badge } from '@/ui/Badge'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'

export const ClientOutcomesSection = () => (
  <SceneSection className="py-16 sm:py-20" tone="mint">
    <Container className="grid gap-8 lg:grid-cols-[0.82fr,1.18fr]">
      <GlassPanel className="p-6 sm:p-8">
        <Badge>Что получает клиент</Badge>
        <AnimatedText
          as="h2"
          className="headline-trail mt-6 text-4xl font-black leading-[0.99] text-pearl sm:text-5xl lg:text-[4rem]"
          highlightWords={['выглядит', 'быстро', 'легче', 'доверять']}
          text="Сайт, который выглядит premium, работает быстро и помогает доверять"
        />
        <p className="mt-6 font-serif text-[1.22rem] leading-8 text-pearl/82 sm:text-[1.36rem] sm:leading-9">
          Хороший сайт не ограничивается “у нас красиво”. Он должен усиливать образ бизнеса, удерживать внимание,
          убирать сомнения и доводить интерес до контакта.
        </p>
        <div className="mt-8 rounded-[28px] border border-white/10 bg-black/20 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mist">Outcome signal</p>
          <p className="mt-4 text-3xl font-black leading-tight text-pearl">
            Не просто фронтенд.
            <span className="text-cosmic"> Turnkey development </span>
            для трафика, доверия и продаж.
          </p>
        </div>
      </GlassPanel>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {clientOutcomeCards.map((item) => (
          <GlassPanel key={item.title} className="p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-mint">{item.value}</span>
              <ArrowUpRight className="h-4 w-4 text-pearl/64" />
            </div>
            <h3 className="mt-5 text-xl font-black leading-tight text-pearl">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-mist">{item.text}</p>
          </GlassPanel>
        ))}
      </div>
    </Container>
  </SceneSection>
)
