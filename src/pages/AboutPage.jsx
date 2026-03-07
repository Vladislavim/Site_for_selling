import { FAQAccordion } from '@/components/FAQAccordion'
import { LeadCaptureCta } from '@/components/LeadCaptureCta'
import { OrbitNav } from '@/components/OrbitNav'
import { PageHero } from '@/components/PageHero'
import { SceneSection } from '@/components/SceneSection'
import { Seo } from '@/components/Seo'
import { SectionHeading } from '@/components/SectionHeading'
import { afterContactSteps, processFaqs, processSteps } from '@/data/siteContent'
import { getSemanticEntry } from '@/data/semanticCore'
import { buildBreadcrumbSchema, buildFaqSchema } from '@/seo/config'
import { AfterContactSection } from '@/sections/shared/AfterContactSection'
import { StackSection } from '@/sections/shared/StackSection'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'

const semanticEntry = getSemanticEntry('about')

const principles = [
  {
    title: 'Никакой декоративной суеты',
    text: 'Motion, визуал и контент нужны не ради ощущения “здесь было много работы”, а ради роста доверия, конверсии и воспринимаемой цены бизнеса.',
  },
  {
    title: 'Прямое взаимодействие',
    text: 'Вы не теряете смысл проекта, передавая его через цепочку менеджеров. Ключевые решения принимаются в одном рабочем контуре.',
  },
  {
    title: 'Структура важнее случайной красоты',
    text: 'Сайт должен объяснять, продавать и направлять, а не просто собирать лайки у коллег по цеху.',
  },
  {
    title: 'Технологии должны помогать',
    text: 'React, Tailwind, GSAP и Framer Motion используются как инструменты, а не как самоцель и повод перегрузить интерфейс.',
  },
]

export const AboutPage = () => (
  <>
    <Seo
      canonicalPath={semanticEntry.canonicalPath}
      description={semanticEntry.metaDescription}
      jsonLd={[
        buildFaqSchema(processFaqs),
        buildBreadcrumbSchema([
          { name: 'Главная', path: '/' },
          { name: 'Процесс', path: '/about' },
        ]),
      ]}
      ogDescription={semanticEntry.openGraphDescription}
      ogTitle={semanticEntry.openGraphTitle}
      path={semanticEntry.path}
      title={semanticEntry.title}
    />
    <PageHero
      chips={['Быстрый старт', 'Под ключ', 'Прозрачный процесс']}
      description="Здесь не общие слова про “индивидуальный подход”, а конкретная логика: как строится работа над сайтом, почему процесс не разваливается в хаос и что вы получаете на каждом этапе."
      eyebrow="Процесс / подход"
      navItems={semanticEntry.contentOutline.map((item) => ({ id: item.id, label: item.label }))}
      title={semanticEntry.h1}
    />
    <SceneSection className="py-12" id="principles-zone" tone="mint">
      <Container>
        <SectionHeading
          description="Эти принципы держат проект собранным: от структуры и визуального решения до темпа коммуникации и качества production-реализации."
          eyebrow="Принципы"
          title="Что влияет на качество результата еще до дизайна"
        />
        <div className="mt-6">
          <OrbitNav items={semanticEntry.internalLinks} />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {principles.map((item) => (
            <GlassPanel key={item.title} className="p-6">
              <h3 className="text-xl font-bold text-pearl">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-mist">{item.text}</p>
            </GlassPanel>
          ))}
        </div>
      </Container>
    </SceneSection>
    <SceneSection className="py-12" id="process-zone" tone="ice">
      <Container>
        <SectionHeading
          description="Каждый этап нужен не ради самого процесса, а чтобы сайт быстрее дошел до рабочего состояния и уверенно начал продавать, презентовать или собирать лиды."
          eyebrow="Этапы"
          title="Как выглядит production-маршрут проекта"
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {processSteps.map((item) => (
            <GlassPanel key={item.step} className="p-6">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-white/8 text-sm font-black text-pearl shadow-glow">
                {item.step}
              </div>
              <h3 className="mt-4 text-xl font-bold text-pearl">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-mist">{item.text}</p>
            </GlassPanel>
          ))}
        </div>
      </Container>
    </SceneSection>
    <StackSection
      description="Сильный production держится на сочетании скорости, ясной компонентной логики, аккуратного motion-дизайна и SEO-структуры, которую не нужно прикручивать постфактум."
      title="Какой стек стоит за надежной реализацией"
    />
    <AfterContactSection
      description="После первого сообщения не возникает ощущения подвешенности. Вы понимаете, когда будет ответ, какие данные нужны и как быстро задача превращается в рабочий маршрут."
      id="after-contact-zone"
      title="Что происходит после вашего сообщения"
    />
    <SceneSection className="py-12" tone="coral">
      <Container>
        <SectionHeading
          description="Важно не только начать проект, но и довести его до состояния, когда сайт можно уверенно показывать клиентам, инвесторам, рекламному трафику и партнерам."
          eyebrow="Результат"
          title="Что вы получаете на выходе"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {afterContactSteps.map((item) => (
            <GlassPanel key={`${item.title}-result`} className="p-6">
              <h3 className="text-xl font-bold text-pearl">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-mist">{item.text}</p>
            </GlassPanel>
          ))}
        </div>
      </Container>
    </SceneSection>
    <SceneSection className="py-12" id="process-faq" tone="ice">
      <Container>
        <SectionHeading
          description="Ниже ответы на вопросы, которые чаще всего тормозят старт проекта: как быстро можно выйти в работу, нужно ли длинное ТЗ и как вообще устроен процесс без агентской бюрократии."
          eyebrow="FAQ"
          title="Вопросы про процесс, старт и рабочий ритм проекта"
        />
        <FAQAccordion className="mt-10" items={processFaqs} />
      </Container>
    </SceneSection>
    <SceneSection className="pb-20 pt-8" id="about-cta" tone="mint">
      <Container>
        <LeadCaptureCta
          text="Если сам подход вам близок, дальше нет смысла откладывать. Обычно все начинается с короткого брифа и быстро переходит в рабочий production-сценарий."
          title="Можно перейти от чтения процесса к самому проекту"
        />
      </Container>
    </SceneSection>
  </>
)
