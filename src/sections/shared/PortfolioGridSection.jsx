import { PortfolioCard } from '@/components/PortfolioCard'
import { SceneSection } from '@/components/SceneSection'
import { SectionHeading } from '@/components/SectionHeading'
import { portfolioItems } from '@/data/portfolio'
import { Container } from '@/ui/Container'

export const PortfolioGridSection = ({
  id,
  eyebrow = 'Портфолио',
  title = 'Примеры миров и visual-направлений',
  description = 'Ниже не просто красивые экраны, а разные сценарии подачи: от строгого business-формата до эмоционального promo-опыта и нестандартного digital-образа.',
  items = portfolioItems,
}) => (
  <SceneSection className="py-14 sm:py-16" id={id} tone="ice">
    <Container>
      <SectionHeading description={description} eyebrow={eyebrow} title={title} />
      <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-mist">
        <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">Premium SaaS</span>
        <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">Dark tech</span>
        <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">Promo motion</span>
        <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">Corporate</span>
        <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">Creative concept</span>
      </div>
      <div className="mt-10 grid gap-5 xl:grid-cols-3">
        {items.map((item) => (
          <PortfolioCard key={item.slug} item={item} />
        ))}
      </div>
    </Container>
  </SceneSection>
)
