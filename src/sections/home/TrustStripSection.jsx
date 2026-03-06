import { SceneSection } from '@/components/SceneSection'
import { technologyStrip, trustMetrics } from '@/data/siteContent'
import { Container } from '@/ui/Container'

export const TrustStripSection = () => (
  <SceneSection className="relative border-y border-white/8 bg-black/20 py-10" tone="ice">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
    <Container>
      <div className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr] lg:items-center">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {trustMetrics.map((item, index) => (
            <div
              key={item.value}
              className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl"
            >
              <div className="absolute right-4 top-4 h-10 w-10 rounded-full border border-white/10" />
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-mist">{`Signal 0${index + 1}`}</div>
              <div className="mt-3 text-3xl font-black text-pearl">{item.value}</div>
              <p className="mt-3 text-sm leading-6 text-mist">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-mist">Technology strengths</p>
          <div className="mt-4 flex flex-wrap gap-2">
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
