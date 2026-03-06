import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { FAQAccordion } from '@/components/FAQAccordion'
import { LeadCaptureCta } from '@/components/LeadCaptureCta'
import { LeadForm } from '@/components/LeadForm'
import { OrbitNav } from '@/components/OrbitNav'
import { PageHero } from '@/components/PageHero'
import { SceneSection } from '@/components/SceneSection'
import { SectionHeading } from '@/components/SectionHeading'
import { Seo } from '@/components/Seo'
import { ServiceCard } from '@/components/ServiceCard'
import { processSteps } from '@/data/siteContent'
import { getSemanticEntryByPath } from '@/data/semanticCore'
import { serviceMap } from '@/data/services'
import { buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/seo/config'
import { Button } from '@/ui/Button'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'
import { createOrderMailto } from '@/utils/mailto'

export const ServicePageTemplate = ({ service }) => {
  const relatedServices = service.related.map((slug) => serviceMap[slug]).filter(Boolean)
  const seoEntry = getSemanticEntryByPath(`/services/${service.slug}`)
  const orbitItems = seoEntry?.contentOutline?.map((item) => ({ id: item.id, label: item.label })) ?? []

  return (
    <>
      <Seo
        description={seoEntry?.metaDescription ?? service.metaDescription}
        jsonLd={[
          buildServiceSchema({
            title: seoEntry?.title ?? service.pageTitle,
            description: seoEntry?.metaDescription ?? service.metaDescription,
            path: `/services/${service.slug}`,
          }),
          buildFaqSchema(service.faq),
          buildBreadcrumbSchema([
            { name: 'Главная', path: '/' },
            { name: 'Услуги', path: '/services' },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        ]}
        path={`/services/${service.slug}`}
        title={seoEntry?.title ?? service.pageTitle}
      />
      <PageHero
        chips={[seoEntry?.primaryKeyword ?? service.name, service.priceFrom, service.timeline]}
        description={service.intro}
        eyebrow={seoEntry?.page ?? service.name}
        navItems={orbitItems}
        serviceKey={service.mailtoKey}
        title={seoEntry?.h1 ?? service.h1}
      />
      <SceneSection className="py-8 sm:py-10" tone="ice">
        <Container>
          <GlassPanel className="px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mist">Keyword cluster</p>
                <div className="mt-4">
                  <span className="tech-pill">{seoEntry?.primaryKeyword ?? service.name}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(seoEntry?.secondaryKeywords ?? []).map((keyword) => (
                    <span key={keyword} className="keyword-chip">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <OrbitNav items={seoEntry?.internalLinks ?? []} />
            </div>
          </GlassPanel>
        </Container>
      </SceneSection>
      <SceneSection className="py-8 sm:py-10" id="orbit-brief" tone="mint">
        <Container className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
          <GlassPanel className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mist">Для кого услуга</p>
            <ul className="mt-6 space-y-4">
              {service.whoFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-mist">
                  <span className="mt-2 h-2 w-2 rounded-full bg-mint" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
          <GlassPanel className="p-6 sm:p-8" id="payload">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mist">Что входит в работу</p>
            <ul className="mt-6 space-y-4">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-mist">
                  <span className="mt-2 h-2 w-2 rounded-full bg-sand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </Container>
      </SceneSection>
      <SceneSection className="py-12" id="value-engine" tone="coral">
        <Container>
          <SectionHeading
            description="Не просто красивый интерфейс, а конкретные причины, почему эта услуга повышает доверие, воспринимаемую цену и вероятность заявки."
            eyebrow="Почему это стоит денег"
            title={`Что получает клиент, когда заказывает ${service.name.toLowerCase()}`}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {service.valuePoints.map((item, index) => (
              <GlassPanel key={item} className={index === 0 ? 'p-6 md:col-span-2' : 'p-6'}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm font-semibold uppercase tracking-[0.22em] text-mist">0{index + 1}</div>
                  <span className="keyword-chip">{index === 0 ? 'premium result' : index === 1 ? 'trust signal' : 'conversion payoff'}</span>
                </div>
                <p className="mt-5 text-lg font-semibold leading-8 text-pearl">{item}</p>
              </GlassPanel>
            ))}
          </div>
        </Container>
      </SceneSection>
      <SceneSection className="py-12" id="constellations" tone="ice">
        <Container>
          <SectionHeading
            description="Здесь видно не абстрактное обещание, а реальные сценарии применения услуги: кому подходит, как выглядит и за что в итоге стоит платить."
            eyebrow="Сценарии применения"
            title="Какие проекты особенно хорошо раскрываются в этом формате"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {service.examples.map((example, index) => (
              <GlassPanel key={example.title} className={index === 0 ? 'p-6 lg:col-span-2' : 'p-6'}>
                <span className="keyword-chip">{index === 0 ? service.name : 'example format'}</span>
                <h3 className="mt-5 text-xl font-black text-pearl">{example.title}</h3>
                <p className="mt-4 text-sm leading-7 text-mist">{example.text}</p>
              </GlassPanel>
            ))}
          </div>
        </Container>
      </SceneSection>
      <SceneSection className="py-12" id="route-map" tone="mint">
        <Container>
          <SectionHeading
            description="Как быстро можно стартовать, что происходит на каждом этапе и почему работа идет без агентской бюрократии."
            eyebrow="Route map"
            title="Как проходит разработка от первого сообщения до релиза"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {processSteps.map((item) => (
              <GlassPanel key={item.step} className="p-6">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-sand">{item.step}</div>
                <h3 className="mt-4 text-xl font-black text-pearl">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-mist">{item.text}</p>
              </GlassPanel>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={createOrderMailto(service.mailtoKey)} variant="accent">
              Заказать {service.name.toLowerCase()}
            </Button>
            <Button to="/contact#lead-form" variant="secondary">
              Оставить подробную заявку
            </Button>
          </div>
        </Container>
      </SceneSection>
      <SceneSection className="py-12" id="faq-zone" tone="coral">
        <Container>
          <SectionHeading
            description="Частые вопросы, которые обычно влияют на решение заказать именно этот тип сайта."
            eyebrow="FAQ"
            title={`Вопросы про ${service.name.toLowerCase()}`}
          />
          <FAQAccordion className="mt-10" items={service.faq} />
        </Container>
      </SceneSection>
      <SceneSection className="py-12" tone="mint">
        <Container>
          <LeadCaptureCta
            formLink="/contact#lead-form"
            serviceKey={service.mailtoKey}
            text="Можно сразу отправить service-specific письмо с уже заполненным шаблоном или перейти к форме и оставить все вводные одним сообщением."
            title="Если задача уже понятна, лучше переходить к старту, а не к бесконечному чтению"
          />
        </Container>
      </SceneSection>
      <SceneSection className="py-12" tone="ice">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              description="Внутренняя перелинковка помогает выбрать правильный формат сайта и усиливает соседние коммерческие страницы."
              eyebrow="Related services"
              title="Смежные услуги для этой задачи"
            />
            <Button href={createOrderMailto(service.mailtoKey)} variant="secondary">
              Обсудить эту услугу
            </Button>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {relatedServices.map((relatedService) => (
              <ServiceCard key={relatedService.slug} service={relatedService} />
            ))}
          </div>
          <div className="mt-8">
            <Link
              className="inline-flex items-center gap-2 text-sm font-semibold text-pearl transition duration-300 hover:text-white"
              to="/services"
            >
              Посмотреть все услуги
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </SceneSection>
      <SceneSection className="pb-20 pt-8" id="lead-form" tone="coral">
        <Container>
          <LeadForm
            defaultService={service.name}
            id="lead-form"
            title={`Оставить заявку на ${service.name.toLowerCase()}`}
            description="Если удобнее не писать письмо вручную, оставьте задачу здесь. Я отвечу с понятной логикой старта, сроками и стартовой оценкой проекта."
          />
        </Container>
      </SceneSection>
    </>
  )
}
