import { Link } from 'react-router-dom'

import { cn } from '@/utils/cn'

export const LogoMark = ({ className }) => (
  <Link
    className={cn('group inline-flex min-w-0 items-center gap-2.5 text-pearl transition duration-300 hover:text-white sm:gap-3', className)}
    to="/"
  >
    <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-white/12 bg-white/[0.06] text-[14px] font-black text-pearl shadow-glow backdrop-blur-xl sm:h-12 sm:w-12 sm:rounded-[18px] sm:text-[15px]">
      <span className="absolute inset-[1px] rounded-[14px] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_35%),linear-gradient(145deg,rgba(136,191,255,0.22),rgba(140,242,211,0.18),rgba(221,181,122,0.18))] sm:rounded-[16px]" />
      <span className="relative z-10 font-display tracking-[0.08em]">EX</span>
    </span>
    <span className="flex min-w-0 flex-col">
      <span className="truncate font-display text-[11px] uppercase tracking-[0.18em] text-pearl/92 transition duration-300 group-hover:text-white sm:text-[13px] sm:tracking-[0.28em]">
        Exestination
      </span>
      <span className="hidden truncate text-xs text-mist sm:block">Universe-grade web developer / creative studio</span>
    </span>
  </Link>
)
