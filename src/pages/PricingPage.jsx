import { FAQAccordion } from '@/components/FAQAccordion'
import { LeadCaptureCta } from '@/components/LeadCaptureCta'
import { LeadForm } from '@/components/LeadForm'
import { OrbitNav } from '@/components/OrbitNav'
import { PageHero } from '@/components/PageHero'
import { SceneSection } from '@/components/SceneSection'
import { Seo } from '@/components/Seo'
import { SectionHeading } from '@/components/SectionHeading'
import { getSemanticEntry } from '@/data/semanticCore'
import { pricingFaqs } from '@/data/pricing'
import { buildBreadcrumbSchema, buildFaqSchema } from '@/seo/config'
import { PricingMatrixSection } from '@/sections/shared/PricingMatrixSection'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'

const semanticEntry = getSemanticEntry('pricing')

const priceFactors = [
  {
    title: 'Количество страниц и глубина структуры',
    text: 'Одно дело быстрый лендинг. Другое сайт с сервисными страницами, кейсами, SEO-блоками и FAQ по направлениям.',
  },
  {
    title: 'Уровень уникальности и visual direction',
    text: 'Чем дальше проект от шаблонного решения, тем больше работы на уровне композиции, сетки, стилистики и интерактивного поведения.',
  },
  {
    title: 'Анимации и кастомный frontend',
    text: 'GSAP, сложные переходы, компонентная логика и React-архитектура поднимают уровень, но и увеличивают объем production-работы.',
  },
  {
    title: 'Срочность и темп релиза',
    text: 'Если проект нужно выпустить быстрее стандартного ритма, закладывается ускоренный приоритет и более плотная production-сборка.',
  },
]

export const PricingPage = () => (
  <>
    <Seo
      description={semanticEntry.metaDescription}
      jsonLd={[
        buildFaqSchema(pricingFaqs),
        buildBreadcrumbSchema([
          { name: 'Главная', path: '/' },
          { name: 'Цены', path: '/pricing' },
        ]),
      ]}
      path={semanticEntry.path}
      title={semanticEntry.title}
    />
    <PageHero
      chips={['Start', 'Business', 'Premium', 'Custom']}
      description="Пакеты ниже дают ориентир по бюджету и масштабу работ. Если задача нестандартная, собираю кастомную смету без искусственных ограничений и дешевого позиционирования."
      eyebrow="Цены"
      navItems={semanticEntry.contentOutline.map((item) => ({ id: item.id, label: item.label }))}
      title={semanticEntry.h1}
    />
    <PricingMatrixSection
      description="Ценовой блок выстроен так, чтобы было понятно, с какого уровня начинается сильный сайт и куда растет проект при усложнении логики, дизайна и motion."
      id="pricing-matrix"
      title="Пакеты, от которых удобно отталкиваться"
    />
    <SceneSection className="py-12" id="price-factors" tone="coral">
      <Container>
        <SectionHeading
          description="Это не попытка усложнить оценку, а реальные переменные, которые влияют на стоимость разработки и премиальность финального результата."
          eyebrow="Что влияет на цену"
          title="От чего зависит бюджет проекта"
        />
        <div className="mt-6">
          <OrbitNav items={semanticEntry.internalLinks} />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {priceFactors.map((item) => (
            <GlassPanel key={item.title} className="p-6">
              <h3 className="text-xl font-bold text-pearl">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-mist">{item.text}</p>
            </GlassPanel>
          ))}
        </div>
      </Container>
    </SceneSection>
    <SceneSection className="py-12" tone="mint">
      <Container>
        <LeadCaptureCta
          text="Можно не гадать по цифрам. Отправьте короткий запрос, и я быстро соориентирую по формату, срокам и стартовому бюджету именно под ваш кейс."
          title="Нужна оценка именно под ваш проект?"
        />
      </Container>
    </SceneSection>
    <SceneSection className="py-12" id="pricing-faq" tone="ice">
      <Container>
        <SectionHeading
          description="Коротко и по делу про формирование стоимости, MVP-подход, срочные проекты и то, как не переплатить за ненужный объем."
          eyebrow="FAQ"
          title="Частые вопросы по стоимости и пакетам"
        />
        <FAQAccordion className="mt-10" items={pricingFaqs} />
      </Container>
    </SceneSection>
    <SceneSection className="pb-20 pt-8" id="pricing-lead-form" tone="coral">
      <Container>
        <LeadForm
          description="Подходит, если нужно быстро получить оценку и понять, какой пакет или сценарий разработки ближе вашей задаче."
          title="Получить оценку проекта"
        />
      </Container>
    </SceneSection>
  </>
)
