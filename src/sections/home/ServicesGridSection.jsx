import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { SceneSection } from '@/components/SceneSection'
import { SectionHeading } from '@/components/SectionHeading'
import { ServiceCard } from '@/components/ServiceCard'
import { services } from '@/data/services'
import { Container } from '@/ui/Container'

export const ServicesGridSection = () => (
  <SceneSection className="py-16 sm:py-20" id="services-zone" tone="mint">
    <Container>
      <SectionHeading
        description="Услуги поданы как орбитальная система: каждая отвечает за свою бизнес-задачу, но все вместе формируют сильную digital-вселенную бренда."
        eyebrow="Orbit modules"
        title="Услуги по разработке сайтов, собранные не по шаблонным пакетам, а по реальным сценариям бизнеса"
      />
      <div className="mt-10 grid gap-5 xl:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
      <div className="mt-8">
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-pearl transition duration-300 hover:text-white"
          to="/services"
        >
          Смотреть все сценарии и сравнить услуги
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Container>
  </SceneSection>
)
