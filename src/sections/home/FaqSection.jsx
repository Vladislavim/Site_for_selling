import { FAQAccordion } from '@/components/FAQAccordion'
import { SceneSection } from '@/components/SceneSection'
import { SectionHeading } from '@/components/SectionHeading'
import { homeFaqs } from '@/data/siteContent'
import { Button } from '@/ui/Button'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'

export const FaqSection = () => (
  <SceneSection className="py-16 sm:py-20" id="faq-zone" tone="coral">
    <Container>
      <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <GlassPanel className="p-6 sm:p-8">
          <SectionHeading
            description="Закрываю типовые вопросы про сроки, SEO, формат работы, сложность задач и быстрые способы связи, чтобы решение заказать сайт не откладывалось из-за мелких сомнений."
            eyebrow="FAQ"
            title="Вопросы, которые обычно мешают оставить заявку сразу"
          />
          <div className="mt-8 space-y-4 text-sm leading-7 text-mist">
            <p>
              Чаще всего барьер возникает не из-за цены, а из-за неясности: как стартуем, сколько времени это займет и
              можно ли написать без длинного ТЗ.
            </p>
            <p>Именно поэтому здесь собраны ответы, которые снимают лишнее напряжение до первого контакта.</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/contact" variant="secondary">
              Открыть контакты
            </Button>
            <Button to="/pricing" variant="ghost">
              Посмотреть пакеты
            </Button>
          </div>
        </GlassPanel>
        <FAQAccordion className="h-fit" items={homeFaqs} />
      </div>
    </Container>
  </SceneSection>
)
