import { motion as Motion } from 'framer-motion'

import { fadeUp, viewportOnce } from '@/animations/motion'
import { Badge } from '@/ui/Badge'

export const PortfolioCard = ({ item }) => (
  <Motion.article
    className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-smoke p-6 shadow-glow transition duration-500 hover:-translate-y-1"
    initial="hidden"
    variants={fadeUp}
    viewport={viewportOnce}
    whileInView="visible"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${item.palette}`} />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_34%)] opacity-70" />
    <div className="absolute left-1/2 top-[52%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8 opacity-30 transition duration-500 group-hover:scale-110" />
    <div className="relative z-10 flex min-h-[320px] flex-col">
      <div className="flex items-start justify-between gap-4">
        <Badge>{item.category}</Badge>
        <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-mist">
          {item.label}
        </span>
      </div>
      <div className="mt-8">
        <h3 className="headline-trail text-2xl font-black text-pearl">{item.title}</h3>
        <p className="mt-4 text-sm leading-7 text-mist">{item.description}</p>
      </div>
      <div className="mt-auto">
        <p className="rounded-[20px] border border-white/10 bg-black/10 p-4 text-sm leading-6 text-pearl/88">
          {item.result}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {item.stack.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-medium text-pearl/84"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </Motion.article>
)
