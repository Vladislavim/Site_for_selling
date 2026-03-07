const createHeadingGroup = (title, h3 = []) => ({ title, h3 })

const createEntry = ({
  id,
  path,
  page,
  purpose,
  primaryKeyword,
  secondaryKeywords,
  searchIntent,
  title,
  metaDescription,
  openGraphTitle = title,
  openGraphDescription = metaDescription,
  canonicalPath = path,
  h1,
  h2Structure,
  ctaFocus,
  internalLinks,
  contentOutline,
}) => ({
  id,
  path,
  page,
  purpose,
  primaryKeyword,
  secondaryKeywords,
  searchIntent,
  title,
  metaDescription,
  openGraphTitle,
  openGraphDescription,
  canonicalPath,
  h1,
  h2Structure,
  ctaFocus,
  internalLinks,
  contentOutline,
})

export const semanticCore = [
  createEntry({
    id: 'home',
    path: '/',
    page: 'Главная',
    purpose:
      'Главная коммерческая страница для запросов про разработку сайтов, создание сайта под ключ и заказ современного сайта для бизнеса.',
    primaryKeyword: 'разработка сайтов',
    secondaryKeywords: ['создание сайтов', 'заказать сайт', 'заказать сайт под ключ', 'веб-разработка под ключ'],
    searchIntent:
      'Коммерческий: найти исполнителя, быстро понять формат услуг, уровень качества и перейти к заявке без лишних шагов.',
    title: 'Разработка сайтов под ключ для бизнеса, лендингов и React-проектов',
    metaDescription:
      'Разработка сайтов под ключ: лендинги, многостраничные сайты, React-разработка, сайты с анимацией, редизайн и premium digital-проекты с сильной структурой и логикой заявки.',
    h1: 'Разработка сайтов под ключ с современным дизайном, сильной структурой и логикой заявки',
    h2Structure: [
      createHeadingGroup('Какие сайты можно заказать', [
        'Лендинги под рекламу и быстрый запуск оффера',
        'Многостраничные сайты для бизнеса и услуг',
        'Сайты на React, анимацией и уникальным дизайном',
      ]),
      createHeadingGroup('Почему такой сайт помогает продавать', [
        'Что получает клиент кроме красивого визуала',
        'Почему современная структура повышает доверие',
      ]),
      createHeadingGroup('Технологии, SEO и motion в одной системе', [
        'React, Tailwind CSS, Framer Motion, GSAP, ScrollTrigger',
        'Three.js и React Three Fiber для выразительной подачи',
      ]),
      createHeadingGroup('Как проходит разработка сайта под ключ', [
        'Бриф, структура, дизайн, production и запуск',
        'Что происходит после первого сообщения',
      ]),
      createHeadingGroup('Портфолио, цены и быстрый старт', [
        'Примеры проектов и форматы пакетов',
        'FAQ и заявка на разработку сайта',
      ]),
    ],
    ctaFocus: 'Заказать услугу, открыть страницу услуг или оставить подробную заявку через форму.',
    internalLinks: [
      { label: 'Все услуги по разработке сайтов', path: '/services' },
      { label: 'Создание лендинга под ключ', path: '/services/landing' },
      { label: 'Разработка многостраничного сайта', path: '/services/multi-page' },
      { label: 'Сайт на React для бизнеса', path: '/services/react-site' },
      { label: 'Портфолио и последние проекты', path: '/portfolio' },
      { label: 'Цены на разработку сайта', path: '/pricing' },
      { label: 'Контакты и форма заявки', path: '/contact' },
    ],
    contentOutline: [
      { id: 'hero-zone', label: 'Hero' },
      { id: 'services-zone', label: 'Услуги' },
      { id: 'recent-projects-home', label: 'Проекты' },
      { id: 'pricing-zone', label: 'Цены' },
      { id: 'faq-zone', label: 'FAQ' },
      { id: 'home-lead-form', label: 'Заявка' },
    ],
  }),
  createEntry({
    id: 'services',
    path: '/services',
    page: 'Услуги',
    purpose:
      'Каталог коммерческих услуг с разбивкой по поисковым кластерам: лендинги, многостраничные сайты, React, анимация, уникальные проекты и редизайн.',
    primaryKeyword: 'создание сайта под ключ',
    secondaryKeywords: ['разработка сайтов', 'заказать сайт для компании', 'современный сайт для бизнеса', 'веб-разработка под ключ'],
    searchIntent:
      'Коммерческий: сравнить форматы разработки сайта и выбрать услугу, которая лучше подходит под задачу, бюджет и глубину проекта.',
    title: 'Услуги по разработке сайтов под ключ: лендинг, React, анимация, редизайн',
    metaDescription:
      'Услуги по разработке сайтов под ключ: создание лендингов, многостраничных сайтов, сайтов на React, сайтов с анимацией, уникальных digital-проектов и редизайн сайта.',
    h1: 'Услуги по разработке сайтов: от продающего лендинга до нестандартного digital-проекта',
    h2Structure: [
      createHeadingGroup('Какие форматы сайтов можно заказать', [
        'Лендинг под рекламу, запуск и продажу услуги',
        'Многостраничный сайт для компании и SEO',
        'Сайт на React, с анимацией или уникальным дизайном',
      ]),
      createHeadingGroup('Как выбрать правильный формат разработки', [
        'Когда хватает лендинга',
        'Когда нужен многостраничный сайт или редизайн',
      ]),
      createHeadingGroup('Какие технологии стоят за premium-результатом', [
        'React, Tailwind CSS, GSAP, Framer Motion, Three.js',
        'SEO-структура и lead capture для коммерческого сайта',
      ]),
      createHeadingGroup('FAQ по услугам и старту проекта', [
        'Сколько стоит сайт',
        'Как быстро можно начать работу',
      ]),
    ],
    ctaFocus: 'Перейти на конкретную услугу, посмотреть цены или оставить заявку на подбор формата.',
    internalLinks: [
      { label: 'Создание лендинга', path: '/services/landing' },
      { label: 'Разработка многостраничного сайта', path: '/services/multi-page' },
      { label: 'Разработка сайта на React', path: '/services/react-site' },
      { label: 'Разработка сайта с анимацией', path: '/services/animated-site' },
      { label: 'Уникальный / нестандартный сайт', path: '/services/unique-project' },
      { label: 'Редизайн сайта', path: '/services/redesign' },
      { label: 'Посмотреть цены', path: '/pricing' },
    ],
    contentOutline: [
      { id: 'services-grid', label: 'Матрица услуг' },
      { id: 'selection-map', label: 'Как выбрать' },
      { id: 'services-faq', label: 'FAQ' },
      { id: 'services-lead-form', label: 'Заявка' },
    ],
  }),
  createEntry({
    id: 'landing',
    path: '/services/landing',
    page: 'Создание лендинга',
    purpose:
      'Посадочная страница под коммерческие запросы про создание лендинга, разработку продающего лендинга и запуск оффера под рекламу или услуги.',
    primaryKeyword: 'создание лендинга',
    secondaryKeywords: ['разработка лендинга', 'разработка продающего лендинга', 'создание промо-сайта'],
    searchIntent:
      'Коммерческий: заказать лендинг, который быстро упакует оффер, будет выглядеть дорого и собирать заявки с рекламы или органики.',
    title: 'Создание лендинга под ключ для рекламы, услуг и запуска оффера',
    metaDescription:
      'Создание лендинга под ключ: структура под конверсию, premium дизайн, сильный первый экран, анимации, форма заявки и понятный сценарий заказа.',
    h1: 'Создание лендинга, который выглядит дорого, быстро объясняет оффер и доводит до заявки',
    h2Structure: [
      createHeadingGroup('Для кого подходит создание лендинга', [
        'Лендинг для услуг, экспертов и рекламного трафика',
        'Лендинг для запуска продукта или промо-кампании',
      ]),
      createHeadingGroup('Что входит в разработку лендинга под ключ', [
        'Структура, дизайн, верстка, формы и базовое SEO',
        'CTA, FAQ и логика заявки без лишнего шума',
      ]),
      createHeadingGroup('Чем такой лендинг лучше шаблонного', [
        'Сильный первый экран и убедительный маршрут пользователя',
        'Премиальная подача вместо конструктора из коробки',
      ]),
      createHeadingGroup('Какие технологии усиливают результат', [
        'React и Tailwind CSS для скорости и контроля',
        'Framer Motion и GSAP там, где motion действительно продает',
      ]),
      createHeadingGroup('FAQ по разработке лендинга', [
        'Сколько стоит лендинг',
        'Можно ли сначала обсудить структуру и дизайн',
      ]),
    ],
    ctaFocus: 'Заказать лендинг через mailto-шаблон или оставить заявку с описанием оффера и сроков.',
    internalLinks: [
      { label: 'Разработка сайта на React', path: '/services/react-site' },
      { label: 'Разработка сайта с анимацией', path: '/services/animated-site' },
      { label: 'Разработка многостраничного сайта', path: '/services/multi-page' },
      { label: 'Цены на разработку сайта', path: '/pricing' },
      { label: 'Контакты и быстрый заказ', path: '/contact' },
    ],
    contentOutline: [
      { id: 'orbit-brief', label: 'Для кого' },
      { id: 'payload', label: 'Что входит' },
      { id: 'template-gap', label: 'Не шаблон' },
      { id: 'tech-stack', label: 'Технологии' },
      { id: 'value-engine', label: 'Что получает клиент' },
      { id: 'constellations', label: 'Сценарии' },
      { id: 'route-map', label: 'Процесс' },
      { id: 'faq-zone', label: 'FAQ' },
      { id: 'lead-form', label: 'Заявка' },
    ],
  }),
  createEntry({
    id: 'multiPage',
    path: '/services/multi-page',
    page: 'Многостраничный сайт',
    purpose:
      'Коммерческая страница под запросы про разработку многостраничного сайта, корпоративного сайта и современного сайта для бизнеса с SEO-структурой.',
    primaryKeyword: 'разработка многостраничного сайта',
    secondaryKeywords: ['многостраничный сайт', 'разработка корпоративного сайта', 'создание сайта для бизнеса'],
    searchIntent:
      'Коммерческий: заказать сайт для компании, где нужно раскрыть несколько услуг, собрать поисковый спрос и выстроить доверие через структуру.',
    title: 'Разработка многостраничного сайта для компании, услуг и SEO-посадки',
    metaDescription:
      'Разработка многостраничного сайта: страницы услуг, кейсы, FAQ, SEO-структура, ясная навигация и premium интерфейс для бизнеса и компаний.',
    h1: 'Многостраничный сайт для компании, который помогает объяснять услуги, собирать трафик и доводить до заявки',
    h2Structure: [
      createHeadingGroup('Кому нужен многостраничный сайт', [
        'Сайт для компании с несколькими услугами',
        'Корпоративный сайт с SEO-страницами и кейсами',
      ]),
      createHeadingGroup('Что входит в разработку многостраничного сайта', [
        'Архитектура разделов и навигация',
        'Главная, услуги, кейсы, FAQ, контакты и сервисные страницы',
      ]),
      createHeadingGroup('Почему это лучше одной длинной страницы', [
        'Отдельные точки входа под поисковый спрос',
        'Более сильное доверие и глубина подачи',
      ]),
      createHeadingGroup('Какие технологии помогают сайту расти', [
        'React-архитектура и reusable UI',
        'SEO-основа для масштабирования по услугам',
      ]),
      createHeadingGroup('FAQ по разработке корпоративного сайта', [
        'Сколько страниц нужно на старте',
        'Можно ли расширять сайт поэтапно',
      ]),
    ],
    ctaFocus: 'Перейти к заказу многостраничного сайта или отправить подробную заявку на структуру и разделы.',
    internalLinks: [
      { label: 'Создание лендинга', path: '/services/landing' },
      { label: 'Сайт на React для сложной логики', path: '/services/react-site' },
      { label: 'Редизайн сайта', path: '/services/redesign' },
      { label: 'Портфолио с примерами сайтов', path: '/portfolio' },
      { label: 'Контакты', path: '/contact' },
    ],
    contentOutline: [
      { id: 'orbit-brief', label: 'Для кого' },
      { id: 'payload', label: 'Что входит' },
      { id: 'template-gap', label: 'Почему не шаблон' },
      { id: 'tech-stack', label: 'Технологии и SEO' },
      { id: 'value-engine', label: 'Ценность' },
      { id: 'constellations', label: 'Примеры' },
      { id: 'route-map', label: 'Процесс' },
      { id: 'faq-zone', label: 'FAQ' },
      { id: 'lead-form', label: 'Заявка' },
    ],
  }),
  createEntry({
    id: 'reactSite',
    path: '/services/react-site',
    page: 'Сайт на React',
    purpose:
      'Коммерческая посадочная страница под запросы про сайт на React, разработку сайта на React и кастомный frontend для бизнеса и digital-продуктов.',
    primaryKeyword: 'сайт на React',
    secondaryKeywords: ['разработка сайта на React', 'React-разработка сайта', 'кастомный frontend'],
    searchIntent:
      'Коммерческий: заказать сайт на React, когда нужен гибкий интерфейс, нестандартные компоненты, интеграции и масштабируемая архитектура.',
    title: 'Сайт на React под ключ: кастомный frontend, интеграции и premium UI',
    metaDescription:
      'Сайт на React под ключ: гибкая архитектура, адаптивный frontend, интеграции, анимации, сервисные страницы и premium интерфейс для бизнеса и продуктов.',
    h1: 'Сайт на React для проектов, где нужен гибкий frontend, а не ограниченный шаблон',
    h2Structure: [
      createHeadingGroup('Кому нужна разработка сайта на React', [
        'Сайты для digital-продуктов и сложных услуг',
        'React-сайт для кастомных интерфейсов и интеграций',
      ]),
      createHeadingGroup('Что входит в React-разработку сайта', [
        'Архитектура компонентов и быстрый frontend',
        'Интеграционная готовность под API, CMS и формы',
      ]),
      createHeadingGroup('Почему React выигрывает у конструктора', [
        'Гибкость интерфейса и развитие проекта дальше',
        'Производительность и контроль над UX',
      ]),
      createHeadingGroup('Какие технологии усиливают React-сайт', [
        'Tailwind CSS, Framer Motion, GSAP и lead capture',
        'SEO-структура для коммерческих страниц и услуг',
      ]),
      createHeadingGroup('FAQ по React-разработке сайта', [
        'Когда React действительно нужен',
        'Можно ли сделать на React обычный бизнес-сайт',
      ]),
    ],
    ctaFocus: 'Заказать React-сайт или оставить задачу с описанием интеграций, логики и будущих сценариев.',
    internalLinks: [
      { label: 'Разработка сайта с анимацией', path: '/services/animated-site' },
      { label: 'Уникальный сайт и нестандартный проект', path: '/services/unique-project' },
      { label: 'Разработка многостраничного сайта', path: '/services/multi-page' },
      { label: 'Цены на React и custom frontend', path: '/pricing' },
      { label: 'Контакты', path: '/contact' },
    ],
    contentOutline: [
      { id: 'orbit-brief', label: 'Для кого' },
      { id: 'payload', label: 'Состав проекта' },
      { id: 'template-gap', label: 'Почему не конструктор' },
      { id: 'tech-stack', label: 'React и стек' },
      { id: 'value-engine', label: 'Что получает клиент' },
      { id: 'constellations', label: 'Типы задач' },
      { id: 'route-map', label: 'Процесс' },
      { id: 'faq-zone', label: 'FAQ' },
      { id: 'lead-form', label: 'Заявка' },
    ],
  }),
  createEntry({
    id: 'animatedSite',
    path: '/services/animated-site',
    page: 'Сайт с анимацией',
    purpose:
      'Коммерческая страница под запросы про сайт с анимацией, разработку сайта с анимацией и premium motion-подачу для launch, promo и брендов.',
    primaryKeyword: 'сайт с анимацией',
    secondaryKeywords: ['разработка сайта с анимацией', 'создание промо-сайта', 'premium motion design'],
    searchIntent:
      'Коммерческий: заказать сайт с анимацией, который делает подачу дороже, удерживает внимание и не ломает конверсию.',
    title: 'Сайт с анимацией и premium motion для launch, promo и сильной digital-подачи',
    metaDescription:
      'Сайт с анимацией: GSAP, ScrollTrigger, Framer Motion, smooth scrolling, polished hover states и выразительная коммерческая подача без шумного motion.',
    h1: 'Сайт с анимацией, который усиливает впечатление, а не мешает человеку заказать',
    h2Structure: [
      createHeadingGroup('Кому подходит разработка сайта с анимацией', [
        'Премиальные услуги, технологичные запуски и promo-страницы',
        'Бренды, которым нужен дорогой digital-образ',
      ]),
      createHeadingGroup('Что входит в сайт с анимацией', [
        'Scroll choreography, reveal, hover states и section transitions',
        'Плавная mobile-адаптация и контроль производительности',
      ]),
      createHeadingGroup('Почему motion стоит денег', [
        'Повышает воспринимаемую ценность и удерживает внимание',
        'Делает подачу запоминаемой без дешевого визуального шума',
      ]),
      createHeadingGroup('Какие технологии работают на этот эффект', [
        'Framer Motion для интерфейсного поведения',
        'GSAP и ScrollTrigger для scroll-storytelling',
      ]),
      createHeadingGroup('FAQ по сайту с анимацией', [
        'Ухудшает ли анимация скорость',
        'Можно ли сделать motion только в ключевых местах',
      ]),
    ],
    ctaFocus: 'Перейти к заказу сайта с анимацией и обсудить желаемый уровень motion и визуального эффекта.',
    internalLinks: [
      { label: 'Сайт на React', path: '/services/react-site' },
      { label: 'Уникальный сайт с характером', path: '/services/unique-project' },
      { label: 'Создание лендинга', path: '/services/landing' },
      { label: 'Портфолио с анимированными проектами', path: '/portfolio' },
      { label: 'Контакты', path: '/contact' },
    ],
    contentOutline: [
      { id: 'orbit-brief', label: 'Для кого' },
      { id: 'payload', label: 'Что входит' },
      { id: 'template-gap', label: 'Почему motion окупается' },
      { id: 'tech-stack', label: 'GSAP / Framer / R3F' },
      { id: 'value-engine', label: 'Что получает клиент' },
      { id: 'constellations', label: 'Сценарии' },
      { id: 'route-map', label: 'Процесс' },
      { id: 'faq-zone', label: 'FAQ' },
      { id: 'lead-form', label: 'Заявка' },
    ],
  }),
  createEntry({
    id: 'uniqueProject',
    path: '/services/unique-project',
    page: 'Уникальный / нестандартный сайт',
    purpose:
      'Коммерческая страница под запросы про уникальный сайт, нестандартный сайт и уникальный дизайн сайта для брендов, launch и premium digital-проектов.',
    primaryKeyword: 'уникальный дизайн сайта',
    secondaryKeywords: ['уникальный сайт', 'нестандартный сайт', 'премиальный digital-проект'],
    searchIntent:
      'Коммерческий: заказать сайт с собственным характером, уникальной подачей и нестандартной digital-архитектурой вместо типового решения.',
    title: 'Уникальный сайт под ключ: нестандартный дизайн, motion и digital-характер',
    metaDescription:
      'Уникальный сайт под ключ: нестандартная архитектура, выразительный интерфейс, art-directed motion, React-реализация и сильный бренд-образ без ощущения шаблона.',
    h1: 'Уникальный сайт для бренда, которому нужен собственный digital-характер, а не чужой шаблон',
    h2Structure: [
      createHeadingGroup('Кому нужен нестандартный сайт', [
        'Бренды с сильным визуальным позиционированием',
        'Проекты, где важно впечатление, а не только функция',
      ]),
      createHeadingGroup('Что входит в уникальный digital-проект', [
        'Creative direction, нестандартная сетка и особая драматургия интерфейса',
        'React, motion и продуманная production-реализация',
      ]),
      createHeadingGroup('Чем это отличается от типового сайта', [
        'Сайт сам становится аргументом о вашем уровне',
        'Бренд получает узнаваемый digital-образ',
      ]),
      createHeadingGroup('Какие технологии делают идею реальной', [
        'React и кастомный UI',
        'GSAP, Framer Motion и Three.js для характерной подачи',
      ]),
      createHeadingGroup('FAQ по уникальному сайту', [
        'Подходит ли это только крупным брендам',
        'Почему такой проект стоит дороже стандартного',
      ]),
    ],
    ctaFocus: 'Заказать уникальный сайт или отправить бриф по бренду, подаче и желаемому digital-уровню.',
    internalLinks: [
      { label: 'Сайт с анимацией', path: '/services/animated-site' },
      { label: 'Сайт на React', path: '/services/react-site' },
      { label: 'Редизайн сайта', path: '/services/redesign' },
      { label: 'Портфолио и визуальные направления', path: '/portfolio' },
      { label: 'Контакты', path: '/contact' },
    ],
    contentOutline: [
      { id: 'orbit-brief', label: 'Кому подойдет' },
      { id: 'payload', label: 'Состав проекта' },
      { id: 'template-gap', label: 'Почему не шаблон' },
      { id: 'tech-stack', label: 'Технологии' },
      { id: 'value-engine', label: 'Ценность' },
      { id: 'constellations', label: 'Сценарии' },
      { id: 'route-map', label: 'Как работаем' },
      { id: 'faq-zone', label: 'FAQ' },
      { id: 'lead-form', label: 'Заявка' },
    ],
  }),
  createEntry({
    id: 'redesign',
    path: '/services/redesign',
    page: 'Редизайн сайта',
    purpose:
      'Коммерческая страница под запросы про редизайн сайта, обновление корпоративного сайта и переупаковку устаревшего визуала и структуры.',
    primaryKeyword: 'редизайн сайта',
    secondaryKeywords: ['обновление корпоративного сайта', 'современный сайт для бизнеса', 'заказать сайт для компании'],
    searchIntent:
      'Коммерческий: заказать редизайн сайта, чтобы повысить доверие, убрать визуальную усталость и сделать сайт сильнее с точки зрения продаж и подачи.',
    title: 'Редизайн сайта под ключ: современный визуал, новая структура и рост доверия',
    metaDescription:
      'Редизайн сайта под ключ: обновление визуала, структуры страниц, CTA, мобильной версии, коммерческих блоков и восприятия бизнеса без шаблонного результата.',
    h1: 'Редизайн сайта, после которого бизнес выглядит современно, собрано и заметно дороже',
    h2Structure: [
      createHeadingGroup('Когда сайту нужен редизайн', [
        'Устаревший визуал и слабое первое впечатление',
        'Хаос в структуре и неудобный путь к заявке',
      ]),
      createHeadingGroup('Что входит в редизайн сайта', [
        'Аудит текущей версии и новая логика страниц',
        'Обновление мобильной версии, CTA и ключевых секций',
      ]),
      createHeadingGroup('Почему хороший редизайн лучше косметики', [
        'Меняется не только внешний вид, но и коммерческая подача',
        'Сайт начинает лучше поддерживать цену бизнеса',
      ]),
      createHeadingGroup('Какие технологии и подходы используются', [
        'React и чистый frontend для надежной пересборки',
        'SEO-слой, FAQ и сервисные страницы, если это нужно бизнесу',
      ]),
      createHeadingGroup('FAQ по редизайну сайта', [
        'Когда выгоднее редизайн, а когда новый сайт',
        'Можно ли сохранить рабочий контент и часть структуры',
      ]),
    ],
    ctaFocus: 'Оставить ссылку на текущий сайт и быстро обсудить, что именно мешает продавать и как это исправить.',
    internalLinks: [
      { label: 'Разработка многостраничного сайта', path: '/services/multi-page' },
      { label: 'Создание лендинга', path: '/services/landing' },
      { label: 'Уникальный сайт', path: '/services/unique-project' },
      { label: 'Цены и форматы работ', path: '/pricing' },
      { label: 'Контакты', path: '/contact' },
    ],
    contentOutline: [
      { id: 'orbit-brief', label: 'Когда нужен редизайн' },
      { id: 'payload', label: 'Что входит' },
      { id: 'template-gap', label: 'Почему не косметика' },
      { id: 'tech-stack', label: 'Подход и технологии' },
      { id: 'value-engine', label: 'Что меняется' },
      { id: 'constellations', label: 'Сценарии' },
      { id: 'route-map', label: 'Этапы' },
      { id: 'faq-zone', label: 'FAQ' },
      { id: 'lead-form', label: 'Заявка' },
    ],
  }),
  createEntry({
    id: 'portfolio',
    path: '/portfolio',
    page: 'Портфолио',
    purpose:
      'Страница с примерами проектов и визуальных направлений для тех, кто ищет современный сайт для бизнеса, промо-страницу или кастомный digital-проект.',
    primaryKeyword: 'современный сайт для бизнеса',
    secondaryKeywords: ['портфолио веб-разработки', 'примеры разработки сайтов', 'создание промо-сайта'],
    searchIntent:
      'Коммерческий: посмотреть уровень реализации, выбрать визуальное направление и убедиться, что сайт можно заказать в нужном качестве.',
    title: 'Портфолио веб-разработки: примеры сайтов для бизнеса, promo и premium digital-проектов',
    metaDescription:
      'Портфолио веб-разработки: реальные проекты, premium landing, business site, анимированные promo-страницы и визуальные концепты для бизнеса и брендов.',
    h1: 'Портфолио и примеры сайтов, по которым легко понять уровень визуала, структуры и подачи',
    h2Structure: [
      createHeadingGroup('Последние реальные проекты', [
        'Витрина кейсов с видео и скринами',
        'Премиальные сайты для бизнеса и корпоративных задач',
      ]),
      createHeadingGroup('Галерея визуальных направлений', [
        'Dark tech, corporate, promo, experimental',
        'Что можно перенести в ваш будущий сайт',
      ]),
      createHeadingGroup('Что показывают эти примеры', [
        'Уровень мышления, а не только красивую картинку',
        'Связь дизайна, motion и lead capture',
      ]),
      createHeadingGroup('FAQ по кейсам и стилям', [
        'Можно ли сделать похожий уровень под вашу нишу',
        'Как реальные примеры ускоряют старт проекта',
      ]),
    ],
    ctaFocus: 'Перейти от понравившегося визуального направления к обсуждению конкретного сайта.',
    internalLinks: [
      { label: 'Все услуги по разработке сайтов', path: '/services' },
      { label: 'Уникальный сайт', path: '/services/unique-project' },
      { label: 'Сайт с анимацией', path: '/services/animated-site' },
      { label: 'Цены', path: '/pricing' },
      { label: 'Контакты', path: '/contact' },
    ],
    contentOutline: [
      { id: 'recent-projects', label: 'Последние проекты' },
      { id: 'worlds-grid', label: 'Галерея' },
      { id: 'portfolio-value', label: 'Что дают примеры' },
      { id: 'portfolio-faq', label: 'FAQ' },
      { id: 'portfolio-cta', label: 'Обсудить проект' },
    ],
  }),
  createEntry({
    id: 'pricing',
    path: '/pricing',
    page: 'Цены',
    purpose:
      'Коммерческая страница с ценовыми пакетами и аргументацией стоимости разработки сайта, лендинга, React-проекта и premium motion-решений.',
    primaryKeyword: 'веб-разработка под ключ',
    secondaryKeywords: ['цены на разработку сайта', 'сколько стоит сайт под ключ', 'стоимость лендинга'],
    searchIntent:
      'Коммерческий: понять ценовой диапазон, сравнить пакеты и отправить запрос на оценку сайта под конкретную задачу.',
    title: 'Цены на разработку сайтов под ключ: лендинг, бизнес-сайт, React и premium motion',
    metaDescription:
      'Цены на разработку сайтов: пакеты Start, Business, Premium и Custom. Ориентир по стоимости лендинга, многостраничного сайта, React-проекта и нестандартной digital-разработки.',
    h1: 'Цены на разработку сайтов под ключ без дешевого позиционирования и скрытого тумана',
    h2Structure: [
      createHeadingGroup('Пакеты и форматы стоимости', [
        'Start, Business, Premium, Custom',
        'Когда нужен фиксированный ориентир, а когда индивидуальная смета',
      ]),
      createHeadingGroup('Что влияет на стоимость разработки сайта', [
        'Количество страниц, глубина структуры и SEO-объем',
        'Анимации, custom frontend и срочность релиза',
      ]),
      createHeadingGroup('FAQ по цене и этапам оплаты', [
        'Можно ли стартовать с MVP',
        'Есть ли срочная разработка под ключ',
      ]),
    ],
    ctaFocus: 'Открыть контактную форму и получить быструю оценку под конкретный сайт, сроки и масштаб.',
    internalLinks: [
      { label: 'Создание лендинга', path: '/services/landing' },
      { label: 'Многостраничный сайт', path: '/services/multi-page' },
      { label: 'Сайт на React', path: '/services/react-site' },
      { label: 'Контакты и заявка', path: '/contact' },
    ],
    contentOutline: [
      { id: 'pricing-matrix', label: 'Пакеты' },
      { id: 'price-factors', label: 'Что влияет на цену' },
      { id: 'pricing-faq', label: 'FAQ' },
      { id: 'pricing-lead-form', label: 'Оценка проекта' },
    ],
  }),
  createEntry({
    id: 'about',
    path: '/about',
    page: 'Процесс',
    purpose:
      'Страница, которая объясняет процесс разработки сайта под ключ, снимает тревогу о хаосе и показывает, как именно проект доходит до релиза.',
    primaryKeyword: 'веб-разработка под ключ',
    secondaryKeywords: ['как проходит разработка сайта', 'создание сайта под ключ', 'процесс разработки сайта'],
    searchIntent:
      'Коммерческий: понять, как устроена работа, насколько прозрачен процесс и стоит ли доверить проект именно здесь.',
    title: 'Процесс разработки сайта под ключ: от брифа до запуска без лишней бюрократии',
    metaDescription:
      'Процесс разработки сайта под ключ: быстрый бриф, структура, дизайн, React-разработка, анимации, тестирование и запуск с понятными этапами и сроками.',
    h1: 'Процесс разработки сайта, в котором понятно, что происходит, за что вы платите и когда получите результат',
    h2Structure: [
      createHeadingGroup('Принципы работы над сайтом', [
        'Прямое взаимодействие и фокус на задаче',
        'Почему структура важнее случайной красоты',
      ]),
      createHeadingGroup('Этапы от брифа до production', [
        'Структура, дизайн, frontend, тестирование и запуск',
        'Что происходит после первого контакта',
      ]),
      createHeadingGroup('FAQ по процессу и старту', [
        'Нужно ли длинное ТЗ',
        'Как быстро можно начать работу',
      ]),
    ],
    ctaFocus: 'Перейти от изучения процесса к короткому брифу и старту проекта.',
    internalLinks: [
      { label: 'Услуги', path: '/services' },
      { label: 'Цены', path: '/pricing' },
      { label: 'Портфолио', path: '/portfolio' },
      { label: 'Контакты', path: '/contact' },
    ],
    contentOutline: [
      { id: 'principles-zone', label: 'Принципы' },
      { id: 'process-zone', label: 'Этапы' },
      { id: 'after-contact-zone', label: 'После обращения' },
      { id: 'process-faq', label: 'FAQ' },
      { id: 'about-cta', label: 'Старт проекта' },
    ],
  }),
  createEntry({
    id: 'contact',
    path: '/contact',
    page: 'Контакты',
    purpose:
      'Финальная коммерческая страница для запросов “заказать сайт”, где есть быстрые mailto-шаблоны, прямой email и подробная форма заявки.',
    primaryKeyword: 'заказать сайт',
    secondaryKeywords: ['заказать сайт под ключ', 'заказать сайт для компании', 'создание сайта для бизнеса'],
    searchIntent:
      'Коммерческий: быстро выйти на связь, выбрать удобный формат запроса и отправить заявку на разработку сайта без лишнего трения.',
    title: 'Заказать сайт: контакты, быстрый запрос по почте и форма заявки',
    metaDescription:
      'Заказать сайт: быстрые mailto-шаблоны под услуги, почта exestination@yandex.ru, Telegram, форма заявки и понятный старт разработки без лишних шагов.',
    h1: 'Заказать сайт без лишних шагов: через быстрый запрос, почту, Telegram или подробную заявку',
    h2Structure: [
      createHeadingGroup('Быстрый заказ по типу услуги', [
        'Лендинг, многостраничный сайт, React, анимация, редизайн',
        'Prefilled mailto-шаблоны под каждую услугу',
      ]),
      createHeadingGroup('Почта, Telegram и подробная форма', [
        'Какой формат связи выбрать',
        'Что лучше прислать сразу, чтобы быстрее получить ответ',
      ]),
      createHeadingGroup('FAQ по контакту и старту проекта', [
        'Можно ли написать без точного ТЗ',
        'Как быстро приходит ответ по заявке',
      ]),
    ],
    ctaFocus: 'Отправить быстрый запрос по услуге или заполнить подробную форму с бюджетом, сроками и описанием проекта.',
    internalLinks: [
      { label: 'Услуги', path: '/services' },
      { label: 'Создание лендинга', path: '/services/landing' },
      { label: 'Сайт на React', path: '/services/react-site' },
      { label: 'Цены', path: '/pricing' },
    ],
    contentOutline: [
      { id: 'quick-order-zone', label: 'Быстрый заказ' },
      { id: 'mail-zone', label: 'Почта и Telegram' },
      { id: 'contact-faq', label: 'FAQ' },
      { id: 'lead-form', label: 'Форма' },
    ],
  }),
]

export const semanticCoreMap = Object.fromEntries(semanticCore.map((entry) => [entry.id, entry]))
export const semanticCorePathMap = Object.fromEntries(semanticCore.map((entry) => [entry.path, entry]))

export const getSemanticEntry = (id) => semanticCoreMap[id]
export const getSemanticEntryByPath = (path) => semanticCorePathMap[path]
