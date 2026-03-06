import { useLayoutEffect, useRef } from 'react'

import { gsap } from '@/animations/gsap'

export const useGsapParallax = (options = {}) => {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const node = ref.current

    if (!node) {
      return undefined
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        node,
        { y: options.from ?? -20 },
        {
          y: options.to ?? 30,
          ease: 'none',
          scrollTrigger: {
            trigger: options.trigger ?? node,
            start: options.start ?? 'top bottom',
            end: options.end ?? 'bottom top',
            scrub: options.scrub ?? true,
          },
        },
      )
    }, node)

    return () => context.revert()
  }, [options.end, options.from, options.scrub, options.start, options.to, options.trigger])

  return ref
}
