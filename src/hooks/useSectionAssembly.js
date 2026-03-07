import { useLayoutEffect, useRef } from 'react'

import { gsap, ScrollTrigger } from '@/animations/gsap'

export const useSectionAssembly = () => {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const root = ref.current

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    const mobileLike = coarsePointer || window.innerWidth < 960

    if (!root || reducedMotion || mobileLike) {
      return undefined
    }

    const context = gsap.context(() => {
      const panels = root.querySelectorAll('.scene-panel')
      const lines = root.querySelectorAll('.scene-divider-line')
      const near = root.querySelectorAll('[data-depth="near"]')
      const mid = root.querySelectorAll('[data-depth="mid"]')
      const far = root.querySelectorAll('[data-depth="far"]')
      const fragments = root.querySelectorAll('.scene-fragment')
      const headings = root.querySelectorAll('[data-assemble="headline"], [data-assemble="copy"], [data-assemble="eyebrow"]')

      const intro = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: root,
          start: 'top 84%',
          end: 'bottom 30%',
          scrub: 1.1,
        },
      })

      if (headings.length) {
        intro.fromTo(
          headings,
          {
            y: 40,
            opacity: 0.18,
            filter: 'blur(14px)',
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.06,
            duration: 1,
          },
          0,
        )
      }

      if (lines.length) {
        intro.fromTo(
          lines,
          {
            scaleX: 0,
            opacity: 0,
            transformOrigin: 'left center',
          },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.9,
            stagger: 0.04,
          },
          0.04,
        )
      }

      if (panels.length) {
        intro.fromTo(
          panels,
          {
            y: 110,
            z: -120,
            rotateX: 16,
            rotateY: (index) => (index % 2 === 0 ? -10 : 10),
            opacity: 0.08,
            scale: 0.9,
            transformPerspective: 1400,
          },
          {
            y: 0,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            duration: 1.15,
          },
          0.12,
        )
      }

      if (fragments.length) {
        intro.fromTo(
          fragments,
          {
            opacity: 0.08,
            scale: 0.84,
            rotate: (index) => (index % 2 === 0 ? -10 : 10),
          },
          {
            opacity: 0.78,
            scale: 1,
            rotate: 0,
            duration: 1.05,
            stagger: 0.06,
          },
          0.08,
        )
      }

      const createParallax = (targets, amountY, amountX = 0) => {
        if (!targets.length) {
          return
        }

        gsap.fromTo(
          targets,
          {
            yPercent: amountY * -0.45,
            xPercent: amountX * -0.35,
          },
          {
            yPercent: amountY,
            xPercent: amountX,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      }

      createParallax(far, -12, 4)
      createParallax(mid, -22, -6)
      createParallax(near, -34, 8)
    }, root)

    return () => {
      context.revert()
      ScrollTrigger.refresh()
    }
  }, [])

  return ref
}
