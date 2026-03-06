import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

import { fadeUp, viewportOnce } from '@/animations/motion'
import { cn } from '@/utils/cn'

export const FAQAccordion = ({ items, className }) => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, index) => {
        const isOpen = index === openIndex

        return (
          <Motion.div
            key={item.question}
            className="scene-panel overflow-hidden rounded-[26px] border border-white/10 bg-white/5 backdrop-blur-xl"
            initial="hidden"
            variants={fadeUp}
            viewport={viewportOnce}
            whileInView="visible"
          >
            <button
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-pearl sm:px-7"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              type="button"
            >
              <span>{item.question}</span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/6">
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-300',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-7 text-mist sm:px-7">{item.answer}</p>
              </div>
            </div>
          </Motion.div>
        )
      })}
    </div>
  )
}
