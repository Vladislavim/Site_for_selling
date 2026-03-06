import { LeadForm } from '@/components/LeadForm'
import { SceneSection } from '@/components/SceneSection'
import { Container } from '@/ui/Container'

export const ContactLeadSection = () => (
  <SceneSection className="pb-20 pt-8" id="home-lead-form" tone="ice">
    <Container>
      <LeadForm
        description="Финальный launch terminal для проекта: оставьте нишу, бюджет, сроки, ссылки и пожелания по motion, а я вернусь с понятным сценарием запуска."
        id="home-lead-form"
        title="Оставить заявку на разработку сайта"
      />
    </Container>
  </SceneSection>
)
