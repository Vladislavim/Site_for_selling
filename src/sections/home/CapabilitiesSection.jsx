import { AnimatedText } from '@/components/AnimatedText'
import { SceneSection } from '@/components/SceneSection'
import { capabilityClusters } from '@/data/siteContent'
import { Badge } from '@/ui/Badge'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'

export const CapabilitiesSection = () => (
  <SceneSection className="py-16 sm:py-20" tone="ice">
    <Container>
      <div className="grid gap-8 lg:grid-cols-[0.88fr,1.12fr] lg:items-start">
        <div className="max-w-3xl">
          <Badge>Компетенции и сильные стороны</Badge>
          <AnimatedText
            as="h2"
            className="headline-trail mt-6 text-4xl font-black leading-[0.98] text-pearl sm:text-5xl lg:text-[4.1rem]"
            highlightWords={['SEO-структура', 'дизайн', 'motion', 'одной', 'системе']}
            text="SEO-структура, дизайн и motion в одной системе"
          />
          <p className="mt-6 max-w-2xl font-serif text-[1.24rem] leading-8 text-pearl/82 sm:text-[1.4rem] sm:leading-9">
            Здесь ценность не в том, что я знаю названия технологий. Ценность в том, как
            <span className="text-cosmic"> React, SEO, animation и custom design </span>
            превращаются в сайт, который легче продавать, проще масштабировать и приятнее показывать клиентам.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {capabilityClusters.map((item, index) => (
            <GlassPanel key={item.title} className={index === 0 || index === 5 ? 'p-6 sm:p-7 md:col-span-2' : 'p-6 sm:p-7'}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-sand">{item.label}</span>
                <div className="inline-flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="keyword-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="mt-5 text-2xl font-black leading-tight text-pearl">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-mist">{item.text}</p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </Container>
  </SceneSection>
)
