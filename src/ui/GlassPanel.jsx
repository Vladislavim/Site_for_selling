import { cn } from '@/utils/cn'

const handlePointerMove = (event) => {
  const bounds = event.currentTarget.getBoundingClientRect()
  const x = ((event.clientX - bounds.left) / bounds.width) * 100
  const y = ((event.clientY - bounds.top) / bounds.height) * 100

  event.currentTarget.style.setProperty('--mx', `${x}%`)
  event.currentTarget.style.setProperty('--my', `${y}%`)
}

export const GlassPanel = ({ className, as: Tag = 'div', children, style, ...props }) => {
  const Component = Tag

  return (
    <Component
      className={cn(
        'scene-panel group relative overflow-hidden rounded-[30px] border border-white/10 bg-panel-gradient shadow-glow backdrop-blur-2xl transition duration-500',
        className,
      )}
      onMouseMove={handlePointerMove}
      style={{
        '--mx': '50%',
        '--my': '50%',
        ...style,
      }}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.16), transparent 34%)' }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%)] opacity-90" />
      <div className="pointer-events-none absolute inset-x-[16%] top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-70" />
      <div className="relative z-10">{children}</div>
    </Component>
  )
}
