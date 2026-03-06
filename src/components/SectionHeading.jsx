import { motion as Motion } from 'framer-motion'

import { AnimatedText } from '@/components/AnimatedText'
import { fadeUp, viewportOnce } from '@/animations/motion'
import { cn } from '@/utils/cn'
import { Badge } from '@/ui/Badge'

export const SectionHeading = ({ eyebrow, title, description, align = 'left', className }) => (
  <Motion.div
    className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}
    initial="hidden"
    variants={fadeUp}
    viewport={viewportOnce}
    whileInView="visible"
  >
    {eyebrow ? (
      <Badge className={align === 'center' ? 'mx-auto' : ''} data-assemble="eyebrow">
        {eyebrow}
      </Badge>
    ) : null}
    <AnimatedText
      as="h2"
      className="headline-trail mt-5 text-3xl font-black leading-[1.04] text-pearl sm:text-4xl lg:text-[3.25rem]"
      data-assemble="headline"
      highlightWords={[
        'сайт',
        'React',
        'Tailwind',
        'Framer',
        'GSAP',
        'ScrollTrigger',
        'Three.js',
        'SEO',
        'анимацией',
        'лендинг',
        'редизайн',
        'заявке',
        'проекта',
        'услуги',
        'услуг',
        'цены',
        'портфолио',
      ]}
      text={title}
    />
    {description ? (
      <p className="mt-5 max-w-2xl font-serif text-xl leading-8 text-mist sm:text-[1.45rem] sm:leading-9" data-assemble="copy">
        {description}
      </p>
    ) : null}
  </Motion.div>
)
