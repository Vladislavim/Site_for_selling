import { Helmet } from 'react-helmet-async'

import { absoluteUrl, siteConfig } from '@/seo/config'

export const Seo = ({
  title,
  description,
  path = '/',
  image = siteConfig.defaultImage,
  type = 'website',
  jsonLd = [],
}) => {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.defaultTitle} | ${siteConfig.name}`
  const canonical = absoluteUrl(path)
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image)

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description ?? siteConfig.defaultDescription} />
      <link rel="canonical" href={canonical} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description ?? siteConfig.defaultDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description ?? siteConfig.defaultDescription} />
      <meta name="twitter:image" content={imageUrl} />
      {jsonLd.map((schema, index) => (
        <script key={`${path}-jsonld-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
