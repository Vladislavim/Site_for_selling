import { cn } from '@/utils/cn'

export const Badge = ({ className, children }) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-pearl/76 backdrop-blur-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)]',
      className,
    )}
  >
    <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_14px_rgba(140,242,211,0.75)]" />
    {children}
  </span>
)
