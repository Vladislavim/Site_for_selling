import { Clock3, SearchCheck, UserRound, Zap } from 'lucide-react'

import { SceneSection } from '@/components/SceneSection'
import { technologyStrip, trustMetrics } from '@/data/siteContent'
import { Container } from '@/ui/Container'

const signalIcons = [Clock3, Zap, UserRound, SearchCheck]

export const TrustStripSection = () => (
  <SceneSection className="relative border-y border-white/8 bg-black/20 py-10" tone="ice">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
    <Container>
      <div className="grid gap-5 lg:grid-cols-[1.15fr,0.85fr] lg:items-stretch">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {trustMetrics.map((item, index) => (
            <div
              key={item.value}
              className="relative flex min-h-[13.75rem] flex-col overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-mist">{`Signal 0${index + 1}`}</div>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/8 text-mint shadow-[0_0_24px_rgba(140,242,211,0.12)]">
                  {(() => {
                    const Icon = signalIcons[index]

                    return <Icon className="h-5 w-5" />
                  })()}
                </div>
              </div>
              <div className="mt-4 text-[2.15rem] font-black leading-[0.95] text-pearl">{item.value}</div>
              <p className="mt-3 text-base leading-7 text-mist">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl lg:h-full">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-mist">Technology strengths</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {technologyStrip.map((item) => (
              <span
                key={item.label}
                className="tech-pill"
              >
                <span className="font-semibold text-pearl">{item.label}</span>
                <span className="ml-2 text-pearl/54">/ {item.value}</span>
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-mist">
            Технологии здесь подаются не как декор, а как причина, почему сайт выглядит premium, работает быстро и
            проще масштабируется после релиза.
          </p>
        </div>
      </div>
    </Container>
  </SceneSection>
)
