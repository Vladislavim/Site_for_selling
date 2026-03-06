import { useParams } from 'react-router-dom'

import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { serviceMap } from '@/data/services'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const ServiceDetailPage = () => {
  const { slug } = useParams()
  const service = slug ? serviceMap[slug] : undefined

  if (!service) {
    return <NotFoundPage />
  }

  return <ServicePageTemplate service={service} />
}
