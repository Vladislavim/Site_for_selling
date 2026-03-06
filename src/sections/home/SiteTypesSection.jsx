import { AnimatedText } from '@/components/AnimatedText'
import { SceneSection } from '@/components/SceneSection'
import { featuredSiteTypes } from '@/data/siteContent'
import { Badge } from '@/ui/Badge'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'

export const SiteTypesSection = () => (
  <SceneSection className="py-16 sm:py-20" tone="coral">
    <Container>
      <div className="grid gap-8 lg:grid-cols-[0.94fr,1.06fr]">
        <div className="max-w-3xl">
          <Badge>Форматы сайтов</Badge>
          <AnimatedText
            as="h2"
            className="headline-trail mt-6 text-4xl font-black leading-[0.98] text-pearl sm:text-5xl lg:text-[4rem]"
            highlightWords={['landing', 'multi-page', 'React', 'redesign']}
            text="Landing page, multi-page website, redesign или custom website под вашу задачу"
          />
          <p className="mt-6 max-w-2xl font-serif text-[1.2rem] leading-8 text-pearl/82 sm:text-[1.34rem] sm:leading-9">
            Формат подбирается не “что модно”, а “что лучше решает бизнес-задачу”: быстро запустить оффер, раскрыть
            услуги, переупаковать бренд или показать продукт как premium digital-сцену.
          </p>
        </div>

        <GlassPanel className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mist">Project formats</p>
          <div className="mt-6 grid gap-4">
            {featuredSiteTypes.slice(0, 3).map((item) => (
              <div key={item.title} className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-sand">Format</div>
                <h3 className="mt-3 text-xl font-black text-pearl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-mist">{item.text}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {featuredSiteTypes.slice(3).map((item) => (
          <GlassPanel key={item.title} className="p-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-mist">
              <span className="h-2 w-2 rounded-full bg-ice shadow-[0_0_14px_rgba(136,191,255,0.7)]" />
              Format orbit
            </div>
            <h3 className="mt-5 text-xl font-black leading-tight text-pearl">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-mist">{item.text}</p>
          </GlassPanel>
        ))}
      </div>
    </Container>
  </SceneSection>
)
