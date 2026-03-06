import { Check } from 'lucide-react'

import { GlassPanel } from '@/ui/GlassPanel'
import { Button } from '@/ui/Button'
import { createOrderMailto } from '@/utils/mailto'

export const PricingCard = ({ item, featured = false }) => (
  <GlassPanel className={`h-full px-6 py-7 sm:px-8 ${featured ? 'border-white/22 bg-white/[0.08]' : 'bg-white/[0.04]'}`}>
    <div className={`absolute inset-0 bg-gradient-to-br ${item.accent}`} />
    <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
    <div className="relative z-10 flex h-full flex-col">
      <div className="min-h-[10.75rem]">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-mist">{item.name}</p>
          <span className="rounded-full border border-white/10 bg-black/15 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-pearl/72">
            mission tier
          </span>
        </div>
        <div className="mt-5 text-4xl font-black text-pearl">{item.price}</div>
        <p className="mt-3 font-serif text-xl leading-8 text-mist">{item.lead}</p>
      </div>
      <p className="mt-6 min-h-[5.75rem] rounded-[18px] border border-white/10 bg-black/10 px-4 py-3 text-sm leading-6 text-pearl/86">
        {item.bestFor}
      </p>
      <ul className="mt-6 flex-1 space-y-3">
        {item.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-mist">
            <span className="mt-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-mint/14 text-mint">
              <Check className="h-3.5 w-3.5" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <Button
          className="w-full justify-center"
          href={createOrderMailto(item.serviceKey)}
          variant={featured ? 'accent' : 'secondary'}
        >
          Заказать пакет
        </Button>
      </div>
    </div>
  </GlassPanel>
)
