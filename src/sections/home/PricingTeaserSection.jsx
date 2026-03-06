import { PricingCard } from '@/components/PricingCard'
import { SceneSection } from '@/components/SceneSection'
import { SectionHeading } from '@/components/SectionHeading'
import { pricingPackages } from '@/data/pricing'
import { Button } from '@/ui/Button'
import { Container } from '@/ui/Container'

export const PricingTeaserSection = () => (
  <SceneSection className="py-16 sm:py-20" id="pricing-zone" tone="coral">
    <Container>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          description="Тарифы поданы как mission levels: прозрачный вход для старта, сильный business-level для компаний, premium-tier для wow-эффекта и custom-режим для нестандартных задач."
          eyebrow="Mission levels"
          title="Пакеты, от которых удобно отталкиваться, если нужен сайт под ключ с реальным уровнем исполнения"
        />
        <Button to="/pricing" variant="secondary">
          Смотреть цены
        </Button>
      </div>
      <div className="mt-10 grid gap-5 xl:grid-cols-4">
        {pricingPackages.map((item, index) => (
          <PricingCard key={item.name} featured={index === 2} item={item} />
        ))}
      </div>
    </Container>
  </SceneSection>
)
