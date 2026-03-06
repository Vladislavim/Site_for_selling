import { LeadCaptureCta } from '@/components/LeadCaptureCta'
import { SceneSection } from '@/components/SceneSection'
import { Container } from '@/ui/Container'

export const FinalCtaSection = () => (
  <SceneSection className="py-16 sm:py-20" tone="mint">
    <Container>
      <LeadCaptureCta
        serviceKey="general"
        text="Если уже видно, что текущий сайт не дотягивает до уровня бизнеса или новый проект требует сильной digital-подачи, лучше сразу занять слот и перейти к конкретике: формат, сроки, бюджет и старт работ."
        title="Сайт можно заказать сразу: через готовый mailto-сценарий или подробную форму"
      />
    </Container>
  </SceneSection>
)
