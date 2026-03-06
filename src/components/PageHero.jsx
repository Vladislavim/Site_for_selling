import { AnimatedText } from '@/components/AnimatedText'
import { OrbitNav } from '@/components/OrbitNav'
import { SceneSection } from '@/components/SceneSection'
import { Badge } from '@/ui/Badge'
import { Button } from '@/ui/Button'
import { Container } from '@/ui/Container'
import { createOrderMailto } from '@/utils/mailto'
import { useGsapParallax } from '@/hooks/useGsapParallax'

export const PageHero = ({ eyebrow, title, description, chips = [], serviceKey = 'general', navItems = [] }) => {
  const orbRef = useGsapParallax({ from: -80, to: 80 })

  return (
    <SceneSection className="relative overflow-hidden pb-14 pt-16 sm:pb-16 sm:pt-24" tone="ice">
      <div className="absolute inset-0 bg-hero-radial opacity-80" />
      <div className="absolute left-[8%] top-0 hidden h-[22rem] w-[22rem] rounded-full border border-white/8 opacity-35 sm:block" />
      <div className="absolute right-[12%] top-[10%] hidden h-[18rem] w-[18rem] rounded-full border border-white/8 opacity-25 sm:block" />
      <div
        ref={orbRef}
        className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-gradient-to-br from-mint/20 via-ice/12 to-transparent blur-3xl"
      />
      <Container>
        <div className="max-w-5xl">
          <Badge>{eyebrow}</Badge>
          <AnimatedText
            as="h1"
            className="headline-trail mt-6 text-[clamp(2.55rem,11vw,4.7rem)] font-black leading-[0.98] text-pearl"
            highlightWords={['сайт', 'React', 'анимацией', 'дизайн', 'ключ']}
            text={title}
          />
          <p className="mt-6 max-w-3xl font-serif text-[1.05rem] leading-8 text-mist sm:text-[1.48rem] sm:leading-9">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-pearl/86 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
              >
                {chip}
              </span>
            ))}
          </div>
          <OrbitNav className="mt-7" items={navItems} />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button className="justify-center" href={createOrderMailto(serviceKey)} variant="accent" wrapperClassName="w-full sm:w-auto">
              Заказать услугу
            </Button>
            <Button className="justify-center" to="/contact#lead-form" variant="secondary" wrapperClassName="w-full sm:w-auto">
              Оставить заявку
            </Button>
          </div>
        </div>
      </Container>
    </SceneSection>
  )
}
