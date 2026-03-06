import { SceneSection } from '@/components/SceneSection'
import { SectionHeading } from '@/components/SectionHeading'
import { processSteps } from '@/data/siteContent'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'

export const ProcessSection = () => (
  <SceneSection className="py-16 sm:py-20" tone="ice">
    <Container>
      <SectionHeading
        description="Процесс построен так, чтобы вы в любой момент понимали, где находится проект, что будет дальше и за что именно платите."
        eyebrow="Процесс"
        title="Как проект движется от запроса до готового релиза"
      />
      <div className="relative mt-10">
        <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-white/12 to-transparent lg:block" />
        <div className="grid gap-5 lg:grid-cols-4">
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
      </div>
    </Container>
  </SceneSection>
)
