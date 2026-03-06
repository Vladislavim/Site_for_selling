import { FAQAccordion } from '@/components/FAQAccordion'
import { LeadCaptureCta } from '@/components/LeadCaptureCta'
import { LeadForm } from '@/components/LeadForm'
import { OrbitNav } from '@/components/OrbitNav'
import { PageHero } from '@/components/PageHero'
import { SceneSection } from '@/components/SceneSection'
import { Seo } from '@/components/Seo'
import { SectionHeading } from '@/components/SectionHeading'
import { contactFaqs } from '@/data/siteContent'
import { getSemanticEntry } from '@/data/semanticCore'
import { services } from '@/data/services'
import { buildBreadcrumbSchema, buildFaqSchema } from '@/seo/config'
import { AfterContactSection } from '@/sections/shared/AfterContactSection'
import { Button } from '@/ui/Button'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'
import { createOrderMailto, ORDER_EMAIL } from '@/utils/mailto'

const semanticEntry = getSemanticEntry('contact')

export const ContactPage = () => (
  <>
    <Seo
      description={semanticEntry.metaDescription}
      jsonLd={[
        buildFaqSchema(contactFaqs),
        buildBreadcrumbSchema([
          { name: 'Главная', path: '/' },
          { name: 'Контакты', path: '/contact' },
        ]),
      ]}
      path={semanticEntry.path}
      title={semanticEntry.title}
    />
    <PageHero
      chips={['Quick order', 'Email', 'Lead form']}
      description="Если задача уже понятна, можно сразу отправить письмо по готовому шаблону. Если нужен более спокойный сценарий, оставьте подробную заявку через форму и получите ответ с конкретикой."
      eyebrow="Контакты"
      navItems={semanticEntry.contentOutline.map((item) => ({ id: item.id, label: item.label }))}
      title={semanticEntry.h1}
    />
    <SceneSection className="py-12" id="quick-order-zone" tone="mint">
      <Container>
        <SectionHeading
          description="Быстрые карточки для типовых сценариев. Один клик открывает почтовый клиент с уже подготовленной темой и структурой письма под конкретную услугу."
          eyebrow="Quick order"
          title="Выберите услугу и отправьте запрос за минуту"
        />
        <div className="mt-6">
          <OrbitNav items={semanticEntry.internalLinks} />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <GlassPanel key={service.slug} className="p-6">
              <h3 className="text-2xl font-bold text-pearl">{service.name}</h3>
              <p className="mt-4 text-sm leading-7 text-mist">{service.shortPitch}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-medium text-pearl/82">
                  {service.priceFrom}
                </span>
                <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-medium text-pearl/82">
                  {service.timeline}
                </span>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <Button className="w-full justify-center" href={createOrderMailto(service.mailtoKey)} variant="accent">
                  Заказать {service.name.toLowerCase()}
                </Button>
                <Button className="w-full justify-center" to={`/services/${service.slug}`} variant="secondary">
                  Открыть страницу услуги
                </Button>
              </div>
            </GlassPanel>
          ))}
        </div>
      </Container>
    </SceneSection>
    <SceneSection className="py-12" id="mail-zone" tone="ice">
      <Container>
        <GlassPanel className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mist">Direct email</p>
              <h2 className="mt-4 text-3xl font-extrabold text-pearl">Можно просто написать на почту</h2>
              <p className="mt-4 text-base leading-8 text-mist">
                Если удобнее начать с короткого письма без формы, используйте прямую почту. Это самый быстрый путь,
                когда у вас уже есть вводные по услуге, срокам и бюджету.
              </p>
              <a className="mt-5 inline-block text-lg font-semibold text-sand transition duration-300 hover:text-pearl" href={`mailto:${ORDER_EMAIL}`}>
                {ORDER_EMAIL}
              </a>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={createOrderMailto()} variant="accent">
                Открыть шаблон письма
              </Button>
              <Button to="/pricing" variant="ghost">
                Сначала посмотреть цены
              </Button>
            </div>
          </div>
        </GlassPanel>
      </Container>
    </SceneSection>
    <AfterContactSection
      description="После сообщения вы быстро получаете обратную связь: уточняем задачу простыми вопросами, определяем формат и двигаемся в production без длинной паузы."
      title="Что будет после вашего запроса"
    />
    <SceneSection className="py-12" id="contact-faq" tone="coral">
      <Container>
        <SectionHeading
          description="Если остались сомнения по формату связи, срокам ответа или тому, как стартует проект, ответы ниже закрывают основные барьеры."
          eyebrow="FAQ"
          title="Вопросы по контакту и старту работы"
        />
        <FAQAccordion className="mt-10" items={contactFaqs} />
      </Container>
    </SceneSection>
    <SceneSection className="py-12" tone="mint">
      <Container>
        <LeadCaptureCta
          formLink="/contact#lead-form"
          text="Ниже полная форма, если хотите оставить все вводные сразу: нишу, бюджет, сроки, ссылки и пожелания по анимациям, SEO-страницам и уникальному дизайну."
          title="Нужна не почта, а подробная заявка?"
        />
      </Container>
    </SceneSection>
    <SceneSection className="pb-20 pt-8" id="lead-form" tone="ice">
      <Container>
        <LeadForm
          description="Оставьте данные, и я вернусь с понятным ответом по формату, срокам и стартовой оценке. Архитектура формы уже готова к подключению реального отправщика."
          id="lead-form-form"
          title="Оставить подробную заявку"
        />
      </Container>
    </SceneSection>
  </>
)
