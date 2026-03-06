import { PortfolioCard } from '@/components/PortfolioCard'
import { SceneSection } from '@/components/SceneSection'
import { SectionHeading } from '@/components/SectionHeading'
import { portfolioItems } from '@/data/portfolio'
import { Button } from '@/ui/Button'
import { Container } from '@/ui/Container'

export const PortfolioPreviewSection = () => (
  <SceneSection className="py-16 sm:py-20" id="portfolio-zone" tone="ice">
    <Container>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          description="Портфолио здесь ощущается как карта миров: разные tonalities, разные уровни motion и разные способы показать уровень бренда через интерфейс."
          eyebrow="Showcase worlds"
          title="Визуальные миры и digital-сценарии, на которые можно опереться в своем проекте"
        />
        <Button to="/portfolio" variant="secondary">
          Смотреть все примеры
        </Button>
      </div>
      <div className="mt-10 grid gap-5 xl:grid-cols-3">
        {portfolioItems.slice(0, 3).map((item) => (
          <PortfolioCard key={item.slug} item={item} />
        ))}
      </div>
    </Container>
  </SceneSection>
)
