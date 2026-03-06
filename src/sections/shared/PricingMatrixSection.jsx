import { PricingCard } from '@/components/PricingCard'
import { SceneSection } from '@/components/SceneSection'
import { SectionHeading } from '@/components/SectionHeading'
import { pricingPackages } from '@/data/pricing'
import { Container } from '@/ui/Container'

export const PricingMatrixSection = ({
  id,
  eyebrow = 'Пакеты',
  title = 'Тарифные уровни и mission-format проекта',
  description = 'Пакеты дают ориентир по масштабу и глубине работ. Они не занижают ценность, а помогают быстро понять, с какого уровня начинается сильный сайт и когда нужен кастомный маршрут.',
}) => (
  <SceneSection className="py-14 sm:py-16" id={id} tone="coral">
    <Container>
      <SectionHeading description={description} eyebrow={eyebrow} title={title} />
      <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-mist">
        <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">Start signal</span>
        <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">Business orbit</span>
        <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">Premium reveal</span>
        <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">Custom mission</span>
      </div>
      <div className="mt-10 grid items-stretch gap-5 xl:auto-rows-fr xl:grid-cols-4">
        {pricingPackages.map((item, index) => (
          <PricingCard key={item.name} featured={index === 2} item={item} />
        ))}
      </div>
    </Container>
  </SceneSection>
)
