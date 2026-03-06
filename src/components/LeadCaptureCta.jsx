import { GlassPanel } from '@/ui/GlassPanel'
import { Button } from '@/ui/Button'
import { createOrderMailto } from '@/utils/mailto'

export const LeadCaptureCta = ({
  title = 'Нужен сайт, который производит впечатление сразу и при этом помогает продавать?',
  text = 'Напишите в один клик или оставьте заявку через форму. Сразу сориентирую по формату, срокам и стартовой оценке без лишней бюрократии.',
  serviceKey = 'general',
  formLink = '/contact#lead-form',
}) => (
  <GlassPanel className="overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
    <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-ice/10 via-transparent to-transparent lg:block" />
    <div className="absolute left-[8%] top-[-4rem] h-40 w-40 rounded-full bg-mint/10 blur-3xl" />
    <div className="absolute right-[10%] bottom-[-5rem] h-48 w-48 rounded-full bg-coral/10 blur-3xl" />
    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-mist">Transmission channel</p>
        <h3 className="headline-trail mt-3 text-2xl font-black leading-tight text-pearl sm:text-3xl">{title}</h3>
        <p className="mt-4 max-w-xl font-serif text-xl leading-8 text-mist">{text}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href={createOrderMailto(serviceKey)} variant="accent">
          Заказать услугу
        </Button>
        <Button to={formLink} variant="secondary">
          Оставить заявку
        </Button>
      </div>
    </div>
  </GlassPanel>
)
