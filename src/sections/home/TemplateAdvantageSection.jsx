import { Fragment } from 'react'
import { Check, Minus } from 'lucide-react'

import { AnimatedText } from '@/components/AnimatedText'
import { SceneSection } from '@/components/SceneSection'
import { templateComparisonRows } from '@/data/siteContent'
import { Badge } from '@/ui/Badge'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'

export const TemplateAdvantageSection = () => (
  <SceneSection className="py-16 sm:py-20" tone="coral">
    <Container>
      <div className="max-w-4xl">
        <Badge>Почему это лучше, чем template site</Badge>
        <AnimatedText
          as="h2"
          className="headline-trail mt-6 text-4xl font-black leading-[0.98] text-pearl sm:text-5xl lg:text-[4rem]"
          highlightWords={['Не', 'шаблон', 'Уникальный', 'характером']}
          text="Не шаблон. Уникальный сайт с характером"
        />
        <p className="mt-6 max-w-3xl font-serif text-[1.2rem] leading-8 text-pearl/82 sm:text-[1.34rem] sm:leading-9">
          Шаблонный сайт почти всегда проигрывает в одном и том же: не держит внимание, не объясняет ценность и не
          помогает бизнесу выглядеть на свои деньги.
        </p>
      </div>

      <GlassPanel className="mt-10 overflow-hidden p-0">
        <div className="grid gap-px bg-white/10 lg:grid-cols-[0.7fr,1fr,1fr]">
          <div className="bg-black/20 p-5 text-xs font-semibold uppercase tracking-[0.24em] text-mist">Критерий</div>
          <div className="bg-black/20 p-5 text-xs font-semibold uppercase tracking-[0.24em] text-mist">Шаблонный сайт</div>
          <div className="bg-black/20 p-5 text-xs font-semibold uppercase tracking-[0.24em] text-mist">Custom website</div>

          {templateComparisonRows.map((row) => (
            <Fragment key={row.axis}>
              <div className="bg-black/10 p-5">
                <div className="text-lg font-black text-pearl">{row.axis}</div>
              </div>
              <div className="bg-black/5 p-5">
                <div className="flex items-start gap-3 text-sm leading-7 text-mist">
                  <Minus className="mt-1 h-4 w-4 text-coral" />
                  <span>{row.template}</span>
                </div>
              </div>
              <div className="bg-black/5 p-5">
                <div className="flex items-start gap-3 text-sm leading-7 text-pearl/84">
                  <Check className="mt-1 h-4 w-4 text-mint" />
                  <span>{row.custom}</span>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </GlassPanel>
    </Container>
  </SceneSection>
)
