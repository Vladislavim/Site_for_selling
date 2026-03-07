export const TELEGRAM_HANDLE = '@vladis1avim'
export const TELEGRAM_URL = 'https://t.me/vladis1avim'

const templateLines = [
  'Здравствуйте! Хочу обсудить разработку сайта.',
  'Тип проекта:',
  'Сфера / ниша:',
  'Нужны ли анимации:',
  'Нужны ли SEO-страницы:',
  'Срок:',
  'Бюджет:',
  'Референсы / ссылки:',
  'Контакты:',
]

export const createTelegramTemplate = (contextLine = '') =>
  [templateLines[0], contextLine, ...templateLines.slice(1)].filter(Boolean).join('\n')

export const copyTelegramTemplate = async (contextLine = '') => {
  const template = createTelegramTemplate(contextLine)

  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
    throw new Error('clipboard-unavailable')
  }

  await navigator.clipboard.writeText(template)

  return template
}

export const openTelegramChat = () => {
  if (typeof window === 'undefined') {
    return null
  }

  return window.open(TELEGRAM_URL, '_blank', 'noopener,noreferrer')
}
