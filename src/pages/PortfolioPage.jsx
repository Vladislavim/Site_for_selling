import { LeadCaptureCta } from '@/components/LeadCaptureCta'
import { OrbitNav } from '@/components/OrbitNav'
import { PageHero } from '@/components/PageHero'
import { SceneSection } from '@/components/SceneSection'
import { Seo } from '@/components/Seo'
import { SectionHeading } from '@/components/SectionHeading'
import { getSemanticEntry } from '@/data/semanticCore'
import { buildBreadcrumbSchema } from '@/seo/config'
import { RecentProjectsShowcaseSection } from '@/sections/shared/RecentProjectsShowcaseSection'
import { PortfolioGridSection } from '@/sections/shared/PortfolioGridSection'
import { Button } from '@/ui/Button'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'

const semanticEntry = getSemanticEntry('portfolio')

const valueCards = [
  {
    title: 'Показывают диапазон подачи',
    text: 'От строгого business-сайта до смелого promo-концепта. Это помогает быстрее выбрать нужный тон будущего проекта и не скатиться в усредненный шаблон.',
  },
  {
    title: 'Доказывают уровень мышления',
    text: 'Каждый пример здесь показывает не только эстетику, но и то, как связаны структура, CTA, доверие, анимация и ощущение ценности продукта.',
  },
  {
    title: 'Помогают обсудить ваш кейс',
    text: 'Можно быстро определить, ближе ли вам строгая корпоративная подача, tech-визуал, motion-promо или более экспериментальный digital-образ.',
  },
]

export const PortfolioPage = () => (
  <>
    <Seo
      description={semanticEntry.metaDescription}
      jsonLd={[
        buildBreadcrumbSchema([
          { name: 'Главная', path: '/' },
          { name: 'Портфолио', path: '/portfolio' },
        ]),
      ]}
      path={semanticEntry.path}
      title={semanticEntry.title}
    />
    <PageHero
      chips={['Premium landing', 'Dark tech', 'Animated promo', 'Corporate world']}
      description="Портфолио здесь работает в двух режимах: сначала как витрина последних реальных проектов, затем как карта visual-направлений и подходов, на которые можно опереться в будущем сайте."
      eyebrow="Портфолио / примеры"
      navItems={semanticEntry.contentOutline.map((item) => ({ id: item.id, label: item.label }))}
      title={semanticEntry.h1}
    />
    <RecentProjectsShowcaseSection id="recent-projects" mode="full" tone="mint" />
    <PortfolioGridSection
      description="Каждый концепт показывает, как можно связать подачу, структуру, motion и lead capture в единый коммерческий сценарий."
      id="worlds-grid"
      title="Галерея digital-миров и продающих подходов"
    />
    <SceneSection className="py-12" id="portfolio-value" tone="ice">
      <Container>
        <SectionHeading
          description="Эти примеры помогают не просто “посмотреть дизайн”, а быстро договориться о том, какой уровень сайта нужен именно вашему бизнесу."
          eyebrow="Что это дает"
          title="Как примеры ускоряют запуск и повышают точность будущего проекта"
        />
        <div className="mt-6">
          <OrbitNav items={semanticEntry.internalLinks} />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {valueCards.map((card) => (
            <GlassPanel key={card.title} className="p-6">
              <h3 className="text-xl font-bold text-pearl">{card.title}</h3>
              <p className="mt-4 text-sm leading-7 text-mist">{card.text}</p>
            </GlassPanel>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/services" variant="secondary">
            Подобрать услугу
          </Button>
          <Button to="/contact" variant="ghost">
            Обсудить проект
          </Button>
        </div>
      </Container>
    </SceneSection>
    <SceneSection className="pb-20 pt-8" id="portfolio-cta" tone="coral">
      <Container>
        <LeadCaptureCta
          text="Можно сразу написать, какой из сценариев вам ближе: строгий business, tech, premium promo или нестандартный экспериментальный интерфейс. Дальше переведем это в конкретный проект."
          title="Нравится уровень подачи? Перенесем его в ваш сайт"
        />
      </Container>
    </SceneSection>
  </>
)
