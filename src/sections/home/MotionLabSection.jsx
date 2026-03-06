import { AnimatedText } from '@/components/AnimatedText'
import { SceneSection } from '@/components/SceneSection'
import { motionCapabilityCards } from '@/data/siteContent'
import { Badge } from '@/ui/Badge'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'

export const MotionLabSection = () => (
  <SceneSection className="py-16 sm:py-20" tone="ice">
    <Container className="grid gap-8 lg:grid-cols-[1.02fr,0.98fr] lg:items-start">
      <GlassPanel className="min-h-[28rem] p-6 sm:p-8">
        <Badge>Animation and 3D capabilities</Badge>
        <AnimatedText
          as="h2"
          className="headline-trail mt-6 text-4xl font-black leading-[0.98] text-pearl sm:text-5xl lg:text-[4rem]"
          highlightWords={['Анимации', 'мешают', 'продают']}
          text="Анимации, которые не мешают — а продают"
        />
        <p className="mt-6 max-w-2xl font-serif text-[1.2rem] leading-8 text-pearl/82 sm:text-[1.34rem] sm:leading-9">
          Motion нужен не ради перегруза. Он помогает показать характер, направить взгляд к сильным блокам и сделать
          сайт visually addictive без ощущения дешевого эффекта.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {['Framer Motion', 'GSAP', 'ScrollTrigger', 'Three.js', 'React Three Fiber', 'scroll storytelling'].map((item) => (
            <span key={item} className="tech-pill">
              {item}
            </span>
          ))}
        </div>
        <div className="mt-8 rounded-[30px] border border-white/10 bg-black/20 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mist">Motion outcome</p>
          <p className="mt-4 text-3xl font-black leading-tight text-pearl">
            Сайт ощущается
            <span className="text-cosmic"> живым, дорогим и собранным </span>
            уже во время первого скролла.
          </p>
        </div>
      </GlassPanel>

      <div className="grid gap-5">
        {motionCapabilityCards.map((item, index) => (
          <GlassPanel key={item.tech} className={index === 2 ? 'p-6 sm:p-7 min-h-[13rem]' : 'p-6 sm:p-7'}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="keyword-chip">{item.tech}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-mist">{`Motion 0${index + 1}`}</span>
            </div>
            <h3 className="mt-5 text-2xl font-black leading-tight text-pearl">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-mist">{item.text}</p>
          </GlassPanel>
        ))}
      </div>
    </Container>
  </SceneSection>
)
