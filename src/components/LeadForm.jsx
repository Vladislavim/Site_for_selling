import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, LoaderCircle, ShieldCheck, Sparkles, Workflow } from 'lucide-react'

import { orderableServiceOptions } from '@/data/services'
import { getLeadDefaultValues, leadFormSchema } from '@/utils/leadSchema'
import { submitLeadRequest } from '@/utils/leadSubmission'
import { cn } from '@/utils/cn'
import { Badge } from '@/ui/Badge'
import { Button } from '@/ui/Button'
import { GlassPanel } from '@/ui/GlassPanel'

const budgetOptions = [
  'до 60 000 ₽',
  '60 000 - 120 000 ₽',
  '120 000 - 220 000 ₽',
  '220 000 ₽ и выше',
  'Нужно обсудить',
]

const deadlineOptions = ['Срочно', '1-2 недели', '2-4 недели', '1-2 месяца', 'Гибкий срок']

const yesNoOptions = ['Да', 'Нет', 'По ситуации']

const fieldBase =
  'mt-2 w-full rounded-[20px] border border-white/10 bg-black/25 px-4 py-3.5 text-sm text-pearl outline-none transition duration-300 placeholder:text-mist/80 focus:border-mint/50 focus:bg-white/[0.08] focus:shadow-[0_0_0_1px_rgba(140,242,211,0.18),0_16px_70px_rgba(136,191,255,0.14)]'

const FieldShell = ({ label, error, hint, className, children, htmlFor }) => (
  <div className={cn('block', className)}>
    <label className="flex items-center justify-between gap-3 text-sm font-medium text-pearl/88" htmlFor={htmlFor}>
      <span>{label}</span>
      {hint ? <span className="text-[11px] uppercase tracking-[0.22em] text-mist">{hint}</span> : null}
    </label>
    {children}
    {error ? <span className="mt-2 block text-xs text-coral">{error}</span> : null}
  </div>
)

const InputField = ({ id, label, error, hint, className, ...props }) => (
  <FieldShell className={className} error={error} hint={hint} htmlFor={id} label={label}>
    <input aria-invalid={Boolean(error)} className={fieldBase} id={id} {...props} />
  </FieldShell>
)

const SelectField = ({ id, label, error, hint, options, className, ...props }) => (
  <FieldShell className={className} error={error} hint={hint} htmlFor={id} label={label}>
    <select aria-invalid={Boolean(error)} className={fieldBase} id={id} {...props}>
      <option value="">Выберите вариант</option>
      {options.map((option) => (
        <option key={option.value ?? option} value={option.value ?? option}>
          {option.label ?? option}
        </option>
      ))}
    </select>
  </FieldShell>
)

const TextareaField = ({ id, label, error, hint, className, ...props }) => (
  <FieldShell className={className} error={error} hint={hint} htmlFor={id} label={label}>
    <textarea aria-invalid={Boolean(error)} className={cn(fieldBase, 'min-h-[160px] resize-y')} id={id} {...props} />
  </FieldShell>
)

const getFreshStartedAt = () => Date.now()
const getCurrentPagePath = () => window.location.pathname + window.location.hash

export const LeadForm = ({
  id = 'lead-form',
  title = 'Оставить заявку на сайт',
  description = 'Заполните короткую форму. В ответ вы получите понятный сценарий работы, ориентир по срокам и стартовую оценку без лишней бюрократии.',
  defaultService = '',
}) => {
  const [submitState, setSubmitState] = useState({
    status: 'idle',
    message: '',
  })

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(leadFormSchema),
    defaultValues: getLeadDefaultValues(defaultService),
  })

  useEffect(() => {
    setValue('serviceType', defaultService)
  }, [defaultService, setValue])

  useEffect(() => {
    setValue('startedAt', getFreshStartedAt())
    setValue('pagePath', getCurrentPagePath())
  }, [setValue])

  const selectedService = useWatch({
    control,
    name: 'serviceType',
  })

  const onSubmit = async (values) => {
    setSubmitState({ status: 'idle', message: '' })

    try {
      const result = await submitLeadRequest(values)
      setSubmitState({ status: 'success', message: result.message })
      reset(getLeadDefaultValues(defaultService))
      setValue('pagePath', getCurrentPagePath())
      setValue('startedAt', getFreshStartedAt())
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Не удалось отправить заявку.',
      })
    }
  }

  return (
    <GlassPanel className="overflow-hidden p-0" id={id}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(140,242,211,0.15),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,142,114,0.12),transparent_28%)]" />
      <div className="grid gap-0 lg:grid-cols-[0.86fr,1.14fr]">
        <div className="relative border-b border-white/8 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:border-white/8 lg:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/24 to-transparent" />
          <Badge>Transmission form</Badge>
          <h2 className="headline-trail mt-5 text-3xl font-black leading-tight text-pearl sm:text-4xl">{title}</h2>
          <p className="mt-5 text-base leading-8 text-mist">{description}</p>
          <div className="mt-8 grid gap-4">
            <div className="rounded-[24px] border border-white/10 bg-black/25 p-5">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-1 h-5 w-5 text-mint" />
                <div>
                  <h3 className="text-base font-bold text-pearl">Премиальный, но без трения</h3>
                  <p className="mt-2 text-sm leading-7 text-mist">
                    Можно оставить только ключевые вводные. Если деталей мало, я сам быстро помогу перевести идею в
                    рабочий формат.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-black/25 p-5">
              <div className="flex items-start gap-3">
                <Workflow className="mt-1 h-5 w-5 text-ice" />
                <div>
                  <h3 className="text-base font-bold text-pearl">Готово к реальной интеграции</h3>
                  <p className="mt-2 text-sm leading-7 text-mist">
                    Форма уходит в защищенный backend endpoint с серверной валидацией, rate limiting и SMTP-отправкой
                    без хранения секретов на клиенте.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-black/25 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-sand" />
                <div>
                  <h3 className="text-base font-bold text-pearl">Быстрый next step</h3>
                  <p className="mt-2 text-sm leading-7 text-mist">
                    После заявки вы получаете понятный ответ по формату, срокам и стартовой оценке. Никаких длинных
                    пауз между сообщениями.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mist">Current service focus</p>
            <p className="mt-3 text-lg font-bold text-pearl">{selectedService || 'Выберите услугу в форме справа'}</p>
            <p className="mt-2 text-sm leading-7 text-mist">
              Можно указать конкретный формат сайта или оставить общий запрос, если пока нужен подбор решения.
            </p>
          </div>
        </div>
        <div className="relative p-6 sm:p-8 lg:p-10">
          {submitState.status === 'success' ? (
            <div className="mb-6 rounded-[24px] border border-mint/20 bg-mint/10 p-6 text-pearl">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 text-mint" />
                <div>
                  <h3 className="text-lg font-semibold">Заявка принята</h3>
                  <p className="mt-2 text-sm leading-7 text-pearl/82">{submitState.message}</p>
                </div>
              </div>
            </div>
          ) : null}
          {submitState.status === 'error' ? (
            <div className="mb-6 rounded-[24px] border border-coral/20 bg-coral/10 p-5 text-sm leading-7 text-pearl">
              {submitState.message}
            </div>
          ) : null}
          <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
            <input autoComplete="off" className="hidden" tabIndex={-1} type="text" {...register('website')} />
            <input type="hidden" {...register('startedAt', { valueAsNumber: true })} />
            <input type="hidden" {...register('pagePath')} />
            <InputField
              id="lead-name"
              error={errors.name?.message}
              label="Имя"
              placeholder="Как к вам обращаться"
              {...register('name')}
            />
            <SelectField
              id="lead-contact-method"
              error={errors.contactMethod?.message}
              label="Способ связи"
              options={['Email', 'Телефон', 'Telegram', 'WhatsApp']}
              {...register('contactMethod')}
            />
            <InputField
              id="lead-contact-value"
              error={errors.contactValue?.message}
              label="Телефон или email"
              placeholder="Например, @username или you@example.com"
              {...register('contactValue')}
            />
            <InputField
              id="lead-company"
              error={errors.company?.message}
              label="Компания / ниша"
              placeholder="Чем занимаетесь"
              {...register('company')}
            />
            <SelectField
              id="lead-service"
              error={errors.serviceType?.message}
              label="Тип услуги"
              options={orderableServiceOptions}
              {...register('serviceType')}
            />
            <SelectField id="lead-budget" error={errors.budget?.message} label="Бюджет" options={budgetOptions} {...register('budget')} />
            <SelectField id="lead-deadline" error={errors.deadline?.message} label="Срок" options={deadlineOptions} {...register('deadline')} />
            <SelectField
              id="lead-animations"
              error={errors.needAnimations?.message}
              label="Нужны ли анимации"
              options={yesNoOptions}
              {...register('needAnimations')}
            />
            <SelectField
              id="lead-seo"
              error={errors.needSeoPages?.message}
              label="Нужны ли SEO-страницы"
              options={yesNoOptions}
              {...register('needSeoPages')}
            />
            <SelectField
              id="lead-unique"
              error={errors.needUniqueDesign?.message}
              label="Нужен ли уникальный дизайн"
              options={yesNoOptions}
              {...register('needUniqueDesign')}
            />
            <TextareaField
              id="lead-description"
              className="md:col-span-2"
              error={errors.projectDescription?.message}
              label="Описание проекта"
              placeholder="Что это за сайт, какую задачу он должен решить, какие страницы или блоки нужны, что важно по стилю и логике заявки."
              {...register('projectDescription')}
            />
            <TextareaField
              id="lead-references"
              className="md:col-span-2"
              error={errors.references?.message}
              hint="Необязательно"
              label="Референсы / ссылки на примеры"
              placeholder="Можно оставить ссылки на сайты, которые вам нравятся, или на текущий сайт, если нужен редизайн."
              {...register('references')}
            />
            <div className="md:col-span-2 flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm leading-7 text-mist">
                Заявка отправляется через backend API. Секреты SMTP и правила отправки хранятся на сервере, а не в
                браузере пользователя.
              </p>
              <Button
                className="justify-center sm:min-w-[230px]"
                disabled={isSubmitting}
                icon={!isSubmitting}
                type="submit"
                variant="accent"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  'Отправить заявку'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </GlassPanel>
  )
}
