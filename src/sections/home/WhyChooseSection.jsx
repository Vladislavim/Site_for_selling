import { AnimatedText } from '@/components/AnimatedText'
import { SceneSection } from '@/components/SceneSection'
import { whyChooseCards } from '@/data/siteContent'
import { Badge } from '@/ui/Badge'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'

export const WhyChooseSection = () => (
  <SceneSection className="py-16 sm:py-20" tone="coral">
    <Container className="grid gap-8 lg:grid-cols-[0.86fr,1.14fr]">
      <div className="max-w-3xl">
        <Badge>Почему заказывают именно такой формат работы</Badge>
        <AnimatedText
          as="h2"
          className="headline-trail mt-6 text-4xl font-black leading-[0.98] text-pearl sm:text-5xl lg:text-[4rem]"
          highlightWords={['сайт', 'дороже', 'бюрократии']}
          text="Сайт выглядит дороже, запускается быстрее и не тонет в бюрократии"
        />
        <p className="mt-6 max-w-2xl font-serif text-[1.2rem] leading-8 text-pearl/82 sm:text-[1.34rem] sm:leading-9">
          Это подход для тех, кому нужен сильный результат, а не ощущение, что проект бесконечно ходит по кругу между
          аккаунтом, дизайнером, верстальщиком и согласованием согласования.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {whyChooseCards.map((item, index) => (
          <GlassPanel key={item.title} className={index === 0 ? 'p-6 sm:p-8 md:col-span-2' : 'p-6 sm:p-7'}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-sand">{`Reason 0${index + 1}`}</span>
              <span className="keyword-chip">{index === 0 ? 'premium result' : index === 1 ? 'direct work' : index === 2 ? 'conversion' : 'modern stack'}</span>
            </div>
            <h3 className="mt-5 text-2xl font-black leading-tight text-pearl">{item.title}</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-mist">{item.text}</p>
          </GlassPanel>
        ))}
      </div>
    </Container>
  </SceneSection>
)
