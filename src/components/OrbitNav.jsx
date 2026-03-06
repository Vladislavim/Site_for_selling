import { Link } from 'react-router-dom'

import { cn } from '@/utils/cn'

export const OrbitNav = ({ items = [], className }) => {
  if (!items.length) {
    return null
  }

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {items.map((item) => {
        const isAnchor = item.path?.includes('#') || item.id
        const href = item.path ?? `#${item.id}`

        if (isAnchor && href.startsWith('#')) {
          return (
            <a
              key={item.label}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-pearl/84 transition duration-300 hover:border-white/18 hover:bg-white/10"
              href={href}
            >
              <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_14px_rgba(140,242,211,0.7)]" />
              {item.label}
            </a>
          )
        }

        return (
          <Link
            key={item.label}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-pearl/84 transition duration-300 hover:border-white/18 hover:bg-white/10"
            to={href}
          >
            <span className="h-2 w-2 rounded-full bg-ice shadow-[0_0_14px_rgba(136,191,255,0.7)]" />
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}
