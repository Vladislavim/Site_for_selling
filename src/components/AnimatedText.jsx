import { motion as Motion } from 'framer-motion'

import { useAdaptiveSceneQuality } from '@/hooks/useAdaptiveSceneQuality'
import { cn } from '@/utils/cn'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.06,
    },
  },
}

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 34,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const tagMap = {
  div: Motion.div,
  h1: Motion.h1,
  h2: Motion.h2,
  h3: Motion.h3,
  p: Motion.p,
  span: Motion.span,
}

const staticTagMap = {
  div: 'div',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  p: 'p',
  span: 'span',
}

export const AnimatedText = ({
  text,
  className,
  as: Tag = 'span',
  highlightWords = [],
  once = true,
  ...props
}) => {
  const quality = useAdaptiveSceneQuality()
  const Component = tagMap[Tag] ?? Motion.div
  const StaticTag = staticTagMap[Tag] ?? 'div'
  const highlightSet = new Set(highlightWords.map((item) => item.toLowerCase()))
  const words = String(text).split(/\s+/).filter(Boolean)
  const staticMode = quality.mobileLike || quality.reducedMotion

  if (staticMode) {
    return (
      <StaticTag className={cn('block', className)} {...props}>
        {words.map((word, index) => {
          const cleanWord = word.toLowerCase().replace(/[.,!?вЂ”:;-]/g, '')
          const isHighlighted = highlightSet.has(cleanWord)

          return (
            <span
              key={`${word}-${index}`}
              className={cn('mr-[0.28em] inline-block', isHighlighted && 'word-signal')}
            >
              {word}
            </span>
          )
        })}
      </StaticTag>
    )
  }

  return (
    <Component
      className={cn('block', className)}
      initial="hidden"
      variants={containerVariants}
      viewport={{ once, margin: '-40px' }}
      whileInView="visible"
      {...props}
    >
      {words.map((word, index) => {
        const cleanWord = word.toLowerCase().replace(/[.,!?—:;-]/g, '')
        const isHighlighted = highlightSet.has(cleanWord)

        return (
          <Motion.span
            key={`${word}-${index}`}
            className={cn(
              'mr-[0.28em] inline-block will-change-transform',
              isHighlighted && 'word-signal animate-shimmer bg-[length:200%_100%]',
            )}
            variants={wordVariants}
          >
            {word}
          </Motion.span>
        )
      })}
    </Component>
  )
}
