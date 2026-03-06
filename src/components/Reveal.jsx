import { motion as Motion } from 'framer-motion'

import { fadeUp, viewportOnce } from '@/animations/motion'

export const Reveal = ({
  as: Tag = Motion.div,
  children,
  className,
  variant = fadeUp,
  viewport = viewportOnce,
}) => {
  const Component = Tag

  return (
    <Component className={className} initial="hidden" variants={variant} viewport={viewport} whileInView="visible">
      {children}
    </Component>
  )
}
