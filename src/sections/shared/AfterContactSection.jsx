import { SceneSection } from '@/components/SceneSection'
import { SectionHeading } from '@/components/SectionHeading'
import { afterContactSteps } from '@/data/siteContent'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'

export const AfterContactSection = ({
  id,
  eyebrow = 'После обращения',
  title = 'Что происходит после первого сообщения',
  description = 'Никакого черного ящика. Сценарий старта прозрачен: вы быстро понимаете, когда получите ответ, что нужно прислать и как проект переходит в работу.',
}) => (
  <SceneSection className="py-14 sm:py-16" id={id} tone="ice">
    <Container>
      <SectionHeading description={description} eyebrow={eyebrow} title={title} />
      <div className="relative mt-10">
        <div className="absolute left-[2.1rem] top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-white/25 via-white/8 to-transparent md:block" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {afterContactSteps.map((item, index) => (
            <GlassPanel key={item.title} className="p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8 text-sm font-black text-pearl shadow-glow">
                  <span className="absolute inset-[6px] rounded-full border border-white/10" />
                  {`0${index + 1}`}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-pearl">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-mist">{item.text}</p>
                </div>
              </div>
              <div className="mt-6 h-px bg-gradient-to-r from-white/20 via-white/6 to-transparent" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-mist">
                Transmission step
              </p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </Container>
  </SceneSection>
)
