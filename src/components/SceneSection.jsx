import { cn } from '@/utils/cn'
import { useSectionAssembly } from '@/hooks/useSectionAssembly'

const toneMap = {
  mint: {
    glow: 'from-mint/16 via-ice/10 to-transparent',
    beam: 'from-mint/0 via-mint/30 to-transparent',
  },
  coral: {
    glow: 'from-coral/14 via-sand/10 to-transparent',
    beam: 'from-coral/0 via-coral/28 to-transparent',
  },
  ice: {
    glow: 'from-ice/16 via-white/8 to-transparent',
    beam: 'from-ice/0 via-ice/24 to-transparent',
  },
}

export const SceneSection = ({ className, id, tone = 'mint', children, ...props }) => {
  const ref = useSectionAssembly()
  const palette = toneMap[tone] ?? toneMap.mint

  return (
    <section ref={ref} className={cn('scene-section zone-shell relative isolate overflow-hidden', className)} id={id} {...props}>
      <div className={cn('scene-fragment pointer-events-none absolute -left-16 top-14 h-44 w-44 rounded-full bg-gradient-to-br blur-3xl', palette.glow)} data-depth="far" />
      <div
        className={cn(
          'scene-fragment pointer-events-none absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-gradient-to-br blur-3xl opacity-70',
          palette.glow,
        )}
        data-depth="mid"
      />
      <div
        className="scene-fragment pointer-events-none absolute left-[12%] top-[18%] h-32 w-32 rounded-full border border-white/8 opacity-35"
        data-depth="far"
      />
      <div
        className="scene-fragment pointer-events-none absolute right-[10%] top-[22%] h-28 w-28 rounded-full border border-white/10 opacity-30"
        data-depth="near"
      />
      <div className={cn('scene-divider-line pointer-events-none absolute inset-x-[7%] top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent')} />
      <div
        className={cn(
          'scene-divider-line pointer-events-none absolute left-[8%] top-[18%] h-48 w-px bg-gradient-to-b opacity-50',
          palette.beam,
        )}
        data-depth="near"
      />
      <div
        className={cn(
          'scene-divider-line pointer-events-none absolute right-[10%] top-[28%] h-40 w-px bg-gradient-to-b opacity-30',
          palette.beam,
        )}
        data-depth="mid"
      />
      {children}
    </section>
  )
}
