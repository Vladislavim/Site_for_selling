export const siteConfig = {
  name: 'Exestination Studio',
  titleTemplate: '%s | Exestination Studio',
  defaultTitle: 'Разработка сайтов под ключ',
  defaultDescription:
    'Создание лендингов, многостраничных сайтов, React-фронтендов, сайтов с анимацией и премиальных digital-проектов с акцентом на конверсию, доверие и сильную визуальную подачу.',
  baseUrl: import.meta.env.VITE_SITE_URL ?? (typeof window !== 'undefined' ? window.location.origin : 'https://exestination.dev'),
  defaultImage: '/og-cover.svg',
  email: 'exestination@yandex.ru',
}

export const absoluteUrl = (path = '/') => new URL(path, siteConfig.baseUrl).toString()

export const buildFaqSchema = (faqs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
})

export const buildBreadcrumbSchema = (items = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
})

export const buildServiceSchema = ({ title, description, path }) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: title,
  description,
  email: siteConfig.email,
  areaServed: 'RU, CIS, Worldwide',
  serviceType: 'Разработка сайтов под ключ',
  url: absoluteUrl(path),
  provider: {
    '@type': 'Person',
    name: 'Exestination Studio',
  },
})
