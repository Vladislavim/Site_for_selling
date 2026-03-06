import { Link } from 'react-router-dom'

import { cn } from '@/utils/cn'

export const LogoMark = ({ className }) => (
  <Link
    className={cn('group inline-flex items-center gap-3 text-pearl transition duration-300 hover:text-white', className)}
    to="/"
  >
    <span className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-[18px] border border-white/12 bg-white/[0.06] text-[15px] font-black text-pearl shadow-glow backdrop-blur-xl">
      <span className="absolute inset-[1px] rounded-[16px] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_35%),linear-gradient(145deg,rgba(136,191,255,0.22),rgba(140,242,211,0.18),rgba(221,181,122,0.18))]" />
      <span className="relative z-10 font-display tracking-[0.08em]">EX</span>
    </span>
    <span className="flex flex-col">
      <span className="font-display text-[13px] uppercase tracking-[0.28em] text-pearl/92 transition duration-300 group-hover:text-white">
        Exestination
      </span>
      <span className="text-xs text-mist">Universe-grade web developer / creative studio</span>
    </span>
  </Link>
)
