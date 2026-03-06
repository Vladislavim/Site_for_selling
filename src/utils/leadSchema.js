import { z } from 'zod'

const trimmedString = (min, max, message) =>
  z
    .string()
    .trim()
    .min(min, message)
    .max(max, `Максимальная длина поля: ${max} символов.`)

export const leadFormSchema = z
  .object({
    name: trimmedString(2, 80, 'Укажите имя.'),
    contactMethod: trimmedString(1, 32, 'Выберите способ связи.'),
    contactValue: trimmedString(3, 120, 'Укажите контакты.'),
    company: trimmedString(2, 120, 'Укажите компанию или нишу.'),
    serviceType: trimmedString(1, 80, 'Выберите услугу.'),
    budget: trimmedString(1, 64, 'Укажите бюджет.'),
    deadline: trimmedString(1, 64, 'Укажите срок.'),
    projectDescription: trimmedString(20, 3000, 'Опишите проект хотя бы в двух предложениях.'),
    needAnimations: trimmedString(1, 24, 'Выберите вариант.'),
    needSeoPages: trimmedString(1, 24, 'Выберите вариант.'),
    needUniqueDesign: trimmedString(1, 24, 'Выберите вариант.'),
    references: z.string().trim().max(1000, 'Слишком длинный список ссылок.').optional().default(''),
    website: z.string().trim().max(240).optional().default(''),
    startedAt: z.coerce.number().int().positive().optional(),
    pagePath: z.string().trim().max(200).optional().default(''),
  })
  .superRefine((values, context) => {
    if (values.contactMethod === 'Email' && !z.string().email().safeParse(values.contactValue).success) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['contactValue'],
        message: 'Для Email укажите корректный адрес.',
      })
    }

    if (
      (values.contactMethod === 'Телефон' || values.contactMethod === 'WhatsApp' || values.contactMethod === 'Telegram') &&
      values.contactValue.replace(/[^\d+]/g, '').length < 6
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['contactValue'],
        message: 'Для выбранного способа связи укажите корректный контакт.',
      })
    }
  })

export const getLeadDefaultValues = (defaultService = '') => ({
  budget: '',
  company: '',
  contactMethod: '',
  contactValue: '',
  deadline: '',
  name: '',
  needAnimations: '',
  needSeoPages: '',
  needUniqueDesign: '',
  pagePath: '',
  projectDescription: '',
  references: '',
  serviceType: defaultService,
  startedAt: undefined,
  website: '',
})
