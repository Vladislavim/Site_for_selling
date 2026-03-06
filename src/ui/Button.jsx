import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { cn } from '@/utils/cn'

const variants = {
  primary:
    'border-white/14 bg-white/[0.08] text-pearl shadow-glow hover:border-white/22 hover:bg-white/[0.12]',
  secondary:
    'border-white/10 bg-black/20 text-pearl hover:border-white/18 hover:bg-white/[0.08]',
  ghost: 'border-transparent bg-transparent text-pearl hover:bg-white/6',
  accent:
    'border-white/14 bg-[linear-gradient(105deg,rgba(246,241,232,0.95),rgba(221,181,122,0.95),rgba(140,242,211,0.9),rgba(136,191,255,0.92))] text-ink shadow-[0_20px_90px_rgba(136,191,255,0.18)] hover:brightness-105',
}

export const Button = ({
  className,
  children,
  icon = true,
  variant = 'primary',
  magnetic = true,
  href,
  to,
  target,
  rel,
  type = 'button',
  ...props
}) => {
  const classes = cn(
    'group relative inline-flex min-h-[58px] items-center justify-center gap-3 overflow-hidden rounded-full border px-6 py-4 text-sm font-semibold tracking-[0.02em] transition duration-300 disabled:pointer-events-none disabled:opacity-60',
    variants[variant],
    className,
  )

  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMove = (event) => {
    if (!magnetic) {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12

    setOffset({ x, y })
  }

  const handleLeave = () => setOffset({ x: 0, y: 0 })

  const content = (
    <>
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28),transparent_38%)] opacity-80" />
      <span className="relative z-10">{children}</span>
      {icon ? (
        <span className="relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-current transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      ) : null}
    </>
  )

  const motionProps = {
    animate: magnetic ? offset : { x: 0, y: 0 },
    onMouseLeave: handleLeave,
    onMouseMove: handleMove,
    whileHover: { y: -3, scale: 1.01 },
    whileTap: { scale: 0.985 },
    transition: { type: 'spring', stiffness: 260, damping: 18, mass: 0.6 },
  }

  if (to) {
    return (
      <Motion.div className="inline-flex" {...motionProps}>
        <Link className={classes} to={to} {...props}>
          {content}
        </Link>
      </Motion.div>
    )
  }

  if (href) {
    return (
      <Motion.div className="inline-flex" {...motionProps}>
        <a className={classes} href={href} target={target} rel={rel} {...props}>
          {content}
        </a>
      </Motion.div>
    )
  }

  return (
    <Motion.button className={classes} type={type} {...motionProps} {...props}>
      {content}
    </Motion.button>
  )
}
