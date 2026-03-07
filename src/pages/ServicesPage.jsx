import { FAQAccordion } from '@/components/FAQAccordion'
import { LeadCaptureCta } from '@/components/LeadCaptureCta'
import { LeadForm } from '@/components/LeadForm'
import { OrbitNav } from '@/components/OrbitNav'
import { PageHero } from '@/components/PageHero'
import { SceneSection } from '@/components/SceneSection'
import { Seo } from '@/components/Seo'
import { SectionHeading } from '@/components/SectionHeading'
import { ServiceCard } from '@/components/ServiceCard'
import { servicesFaqs } from '@/data/siteContent'
import { getSemanticEntry } from '@/data/semanticCore'
import { services } from '@/data/services'
import { buildBreadcrumbSchema, buildFaqSchema } from '@/seo/config'
import { StackSection } from '@/sections/shared/StackSection'
import { Button } from '@/ui/Button'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'

const semanticEntry = getSemanticEntry('services')

const selectionCards = [
  {
    title: 'Лендинг',
    text: 'Нужен, когда важно быстро протестировать оффер, направить рекламу на одну страницу и получить понятный маршрут к заявке без лишнего шума.',
  },
  {
    title: 'Многостраничный сайт',
    text: 'Подходит бизнесу с несколькими услугами, сильной экспертной подачей и задачей собирать трафик через отдельные SEO-страницы.',
  },
  {
    title: 'Сайт на React',
    text: 'Нужен, когда проекту требуется гибкий интерфейс, более сложная логика блоков, интеграции или нестандартные UI-сценарии.',
  },
  {
    title: 'Сайт с анимацией',
    text: 'Выбор для promo-подачи, launch-сценариев и брендов, где motion усиливает восприятие качества и помогает удерживать внимание.',
  },
  {
    title: 'Уникальный сайт',
    text: 'Нужен, когда шаблонный агентский визуал уже не соответствует цене продукта, бренду или амбиции digital-образа.',
  },
  {
    title: 'Редизайн сайта',
    text: 'Подходит, если текущий сайт морально устарел, мешает продавать или просто визуально тянет восприятие бизнеса вниз.',
  },
]

export const ServicesPage = () => (
  <>
    <Seo
      canonicalPath={semanticEntry.canonicalPath}
      description={semanticEntry.metaDescription}
      jsonLd={[
        buildFaqSchema(servicesFaqs),
        buildBreadcrumbSchema([
          { name: 'Главная', path: '/' },
          { name: 'Услуги', path: '/services' },
        ]),
      ]}
      ogDescription={semanticEntry.openGraphDescription}
      ogTitle={semanticEntry.openGraphTitle}
      path={semanticEntry.path}
      title={semanticEntry.title}
    />
    <PageHero
      chips={semanticEntry.secondaryKeywords}
      description="Здесь собраны основные форматы: от быстрого продающего лендинга до нестандартного digital-проекта на React с анимацией, сильной структурой и lead capture под задачу бизнеса."
      eyebrow="Услуги"
      navItems={semanticEntry.contentOutline.map((item) => ({ id: item.id, label: item.label }))}
      title={semanticEntry.h1}
    />
    <SceneSection className="py-12" id="services-grid" tone="mint">
      <Container>
        <SectionHeading
          description="Каждая услуга заточена под свою бизнес-цель: быстрый запуск, SEO-структуру, сложный frontend, премиальную подачу или переупаковку текущего сайта."
          eyebrow="Матрица услуг"
          title="Что можно заказать сейчас"
        />
        <div className="mt-6">
          <OrbitNav items={semanticEntry.internalLinks} />
        </div>
        <div className="mt-10 grid gap-5 xl:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>
    </SceneSection>
    <SceneSection className="py-12" id="selection-map" tone="ice">
      <Container>
        <SectionHeading
          description="Ниже короткая карта выбора, чтобы быстро понять, какой формат разработки сайта ближе именно к вашей задаче, скорости запуска и уровню визуальной подачи."
          eyebrow="Selection map"
          title="Какой тип сайта нужен именно вам"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {selectionCards.map((card, index) => (
            <GlassPanel key={card.title} className="p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-sm font-black text-pearl shadow-glow">
                {index + 1}
              </div>
              <h3 className="mt-5 text-xl font-bold text-pearl">{card.title}</h3>
              <p className="mt-4 text-sm leading-7 text-mist">{card.text}</p>
            </GlassPanel>
          ))}
        </div>
      </Container>
    </SceneSection>
    <StackSection
      description="Сильная разработка сайта сегодня состоит не только из дизайна, но и из понятной архитектуры, аккуратного motion-поведения, быстрой загрузки и внятного SEO-фундамента."
      title="Что стоит за premium-результатом технически"
    />
    <SceneSection className="py-12" tone="coral">
      <Container>
        <LeadCaptureCta
          text="Если уже понимаете, какой формат нужен, можно сразу открыть service-specific письмо или перейти к подробной форме. Обе точки входа ведут в быстрый рабочий диалог."
          title="Заказать услугу можно без лишних шагов"
        />
      </Container>
    </SceneSection>
    <SceneSection className="py-12" id="services-faq" tone="mint">
      <Container>
        <SectionHeading
          description="Этот FAQ закрывает типовые коммерческие вопросы: как выбрать формат, с чего стартовать, когда нужен React, как работает SEO-структура и стоит ли заказывать сайт под ключ без длинного ТЗ."
          eyebrow="FAQ"
          title="Частые вопросы по услугам"
        />
        <FAQAccordion className="mt-10" items={servicesFaqs} />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/pricing" variant="secondary">
            Посмотреть цены
          </Button>
          <Button to="/contact" variant="ghost">
            Перейти в контакты
          </Button>
        </div>
      </Container>
    </SceneSection>
    <SceneSection className="pb-20 pt-8" id="services-lead-form" tone="ice">
      <Container>
        <LeadForm
          description="Если пока не решили, нужен лендинг, многостраничный сайт, React-разработка или редизайн, просто опишите задачу. Я помогу подобрать формат без лишней переписки."
          title="Оставить заявку на подбор решения"
        />
      </Container>
    </SceneSection>
  </>
)
