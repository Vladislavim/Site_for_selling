import { motion as Motion } from 'framer-motion'
import { ArrowRight, Clock3, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'

import { fadeUp, viewportOnce } from '@/animations/motion'
import { Badge } from '@/ui/Badge'

export const ServiceCard = ({ service }) => (
  <Motion.article
    className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-white/16 hover:bg-white/8 sm:p-7"
    initial="hidden"
    variants={fadeUp}
    viewport={viewportOnce}
    whileInView="visible"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-80`} />
    <div className="absolute right-[-3rem] top-[-3rem] h-28 w-28 rounded-full border border-white/10 opacity-40 transition duration-500 group-hover:scale-125" />
    <div className="absolute right-10 top-10 h-px w-20 bg-gradient-to-r from-transparent via-white/18 to-transparent" />
    <div className="relative z-10">
      <Badge>{service.name}</Badge>
      <h3 className="headline-trail mt-5 text-2xl font-black text-pearl">{service.name}</h3>
      <p className="mt-4 font-serif text-xl leading-8 text-pearl/82">{service.teaser}</p>
      <p className="mt-3 text-sm leading-7 text-mist">{service.shortPitch}</p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm text-pearl/86">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-2">
          <Wallet className="h-4 w-4 text-sand" />
          {service.priceFrom}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-2">
          <Clock3 className="h-4 w-4 text-mint" />
          {service.timeline}
        </span>
      </div>
      <ul className="mt-6 space-y-3">
        {service.valuePoints.slice(0, 2).map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-6 text-mist">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-mint" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-pearl transition duration-300 group-hover:text-white"
        to={`/services/${service.slug}`}
      >
        Подробнее об услуге
        <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  </Motion.article>
)
