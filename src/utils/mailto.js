export const ORDER_EMAIL = 'exestination@yandex.ru'

const createTemplate = (subject, lines) => ({
  subject,
  body: lines.join('\n'),
})

export const orderTemplates = {
  general: createTemplate('Заявка на разработку сайта', [
    'Здравствуйте! Хочу заказать сайт.',
    'Тип проекта:',
    'Сфера:',
    'Какая задача у сайта:',
    'Нужен ли уникальный дизайн:',
    'Нужны ли анимации:',
    'Срок:',
    'Бюджет:',
    'Контакты:',
  ]),
  landing: createTemplate('Заявка на лендинг', [
    'Здравствуйте! Хочу заказать лендинг.',
    'Тип сайта:',
    'Сфера:',
    'Нужны ли анимации:',
    'Есть ли референсы:',
    'Срок:',
    'Бюджет:',
    'Контакты:',
  ]),
  multiPage: createTemplate('Заявка на многостраничный сайт', [
    'Здравствуйте! Хочу заказать многостраничный сайт.',
    'Тип проекта:',
    'Количество страниц:',
    'Сфера:',
    'Нужен ли уникальный дизайн:',
    'Нужны ли анимации:',
    'Срок:',
    'Бюджет:',
    'Контакты:',
  ]),
  redesign: createTemplate('Заявка на редизайн сайта', [
    'Здравствуйте! Хочу обсудить редизайн сайта.',
    'Ссылка на текущий сайт:',
    'Что не устраивает:',
    'Что нужно улучшить:',
    'Нужны ли анимации:',
    'Срок:',
    'Бюджет:',
    'Контакты:',
  ]),
  react: createTemplate('Заявка на сайт на React', [
    'Здравствуйте! Хочу заказать сайт на React.',
    'Тип проекта:',
    'Нужна ли интеграция с CMS или API:',
    'Нужны ли анимации:',
    'Есть ли дизайн или нужен с нуля:',
    'Срок:',
    'Бюджет:',
    'Контакты:',
  ]),
  animation: createTemplate('Заявка на сайт с анимацией', [
    'Здравствуйте! Хочу заказать сайт с анимацией.',
    'Тип проекта:',
    'Какие эмоции должен давать сайт:',
    'Нужны ли сложные переходы / спецэффекты:',
    'Есть ли референсы:',
    'Срок:',
    'Бюджет:',
    'Контакты:',
  ]),
  unique: createTemplate('Заявка на уникальный сайт', [
    'Здравствуйте! Хочу заказать нестандартный сайт.',
    'Тип проекта:',
    'Какая задача у сайта:',
    'Нужен ли полностью уникальный визуальный стиль:',
    'Есть ли референсы:',
    'Срок:',
    'Бюджет:',
    'Контакты:',
  ]),
}

export const buildMailtoLink = ({ to = ORDER_EMAIL, subject, body }) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

export const createOrderMailto = (templateKey = 'general', extraLines = []) => {
  const template = orderTemplates[templateKey] ?? orderTemplates.general
  const body = extraLines.length ? `${template.body}\n${extraLines.join('\n')}` : template.body

  return buildMailtoLink({
    subject: template.subject,
    body,
  })
}
