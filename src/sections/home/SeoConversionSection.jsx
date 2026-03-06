import { AnimatedText } from '@/components/AnimatedText'
import { SceneSection } from '@/components/SceneSection'
import { seoConversionLayers } from '@/data/siteContent'
import { Badge } from '@/ui/Badge'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'

export const SeoConversionSection = () => (
  <SceneSection className="py-16 sm:py-20" tone="mint">
    <Container>
      <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="max-w-3xl">
          <Badge>SEO and conversion structure</Badge>
          <AnimatedText
            as="h2"
            className="headline-trail mt-6 text-4xl font-black leading-[0.98] text-pearl sm:text-5xl lg:text-[4rem]"
            highlightWords={['SEO-структура', 'дизайн', 'motion', 'системе']}
            text="SEO-структура, дизайн и motion в одной системе"
          />
          <p className="mt-6 max-w-2xl font-serif text-[1.2rem] leading-8 text-pearl/82 sm:text-[1.34rem] sm:leading-9">
            Коммерческий сайт выигрывает, когда семантика, подача и логика заявки работают вместе. Тогда он получает
            шанс и на трафик, и на конверсию, и на рост цены в восприятии.
          </p>
        </div>

        <GlassPanel className="p-6 sm:p-8">
          <div className="grid gap-5 md:grid-cols-3">
            {seoConversionLayers.map((item) => (
              <div key={item.title} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                <span className="keyword-chip">{item.label}</span>
                <h3 className="mt-5 text-xl font-black leading-tight text-pearl">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-mist">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[26px] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mist">Почему это важно</p>
            <p className="mt-4 text-2xl font-black leading-tight text-pearl">
              Не просто красивый сайт.
              <span className="text-cosmic"> Современный сайт для бизнеса, </span>
              который легче продвигать, проще объяснять и удобнее превращать в заявки.
            </p>
          </div>
        </GlassPanel>
      </div>
    </Container>
  </SceneSection>
)
