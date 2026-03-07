import { z } from 'zod'

const trimmedString = (min, max, message) =>
  z
    .string()
    .trim()
    .min(min, message)
    .max(max, `\u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u0430\u044f \u0434\u043b\u0438\u043d\u0430 \u043f\u043e\u043b\u044f: ${max} \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432.`)

export const leadFormSchema = z
  .object({
    name: trimmedString(2, 80, '\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u0438\u043c\u044f.'),
    contactMethod: trimmedString(1, 32, '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u043f\u043e\u0441\u043e\u0431 \u0441\u0432\u044f\u0437\u0438.'),
    contactValue: trimmedString(3, 120, '\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u044b.'),
    company: trimmedString(2, 120, '\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044e \u0438\u043b\u0438 \u043d\u0438\u0448\u0443.'),
    serviceType: trimmedString(1, 80, '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0441\u043b\u0443\u0433\u0443.'),
    budget: trimmedString(1, 64, '\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u0431\u044e\u0434\u0436\u0435\u0442.'),
    deadline: trimmedString(1, 64, '\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u0441\u0440\u043e\u043a.'),
    projectDescription: trimmedString(
      20,
      3000,
      '\u041e\u043f\u0438\u0448\u0438\u0442\u0435 \u043f\u0440\u043e\u0435\u043a\u0442 \u0445\u043e\u0442\u044f \u0431\u044b \u0432 \u0434\u0432\u0443\u0445 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u0445.',
    ),
    needAnimations: trimmedString(1, 24, '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u0440\u0438\u0430\u043d\u0442.'),
    needSeoPages: trimmedString(1, 24, '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u0440\u0438\u0430\u043d\u0442.'),
    needUniqueDesign: trimmedString(1, 24, '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u0440\u0438\u0430\u043d\u0442.'),
    references: z
      .string()
      .trim()
      .max(1000, '\u0421\u043b\u0438\u0448\u043a\u043e\u043c \u0434\u043b\u0438\u043d\u043d\u044b\u0439 \u0441\u043f\u0438\u0441\u043e\u043a \u0441\u0441\u044b\u043b\u043e\u043a.')
      .optional()
      .default(''),
    website: z.string().trim().max(240).optional().default(''),
    startedAt: z.coerce.number().int().positive().optional(),
    pagePath: z.string().trim().max(200).optional().default(''),
  })
  .superRefine((values, context) => {
    const normalizedContactMethod = values.contactMethod.trim().toLowerCase()
    const isEmailMethod = normalizedContactMethod === 'email' || normalizedContactMethod === '\u043f\u043e\u0447\u0442\u0430'
    const isPhoneLikeMethod = ['phone', '\u0442\u0435\u043b\u0435\u0444\u043e\u043d', 'whatsapp', 'telegram'].includes(
      normalizedContactMethod,
    )

    if (isEmailMethod && !z.string().email().safeParse(values.contactValue).success) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['contactValue'],
        message: '\u0414\u043b\u044f Email \u0443\u043a\u0430\u0436\u0438\u0442\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 \u0430\u0434\u0440\u0435\u0441.',
      })
    }

    if (isPhoneLikeMethod && values.contactValue.replace(/[^\d+]/g, '').length < 6) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['contactValue'],
        message:
          '\u0414\u043b\u044f \u0432\u044b\u0431\u0440\u0430\u043d\u043d\u043e\u0433\u043e \u0441\u043f\u043e\u0441\u043e\u0431\u0430 \u0441\u0432\u044f\u0437\u0438 \u0443\u043a\u0430\u0436\u0438\u0442\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 \u043a\u043e\u043d\u0442\u0430\u043a\u0442.',
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
