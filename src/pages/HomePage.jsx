import { Seo } from '@/components/Seo'
import { homeFaqs } from '@/data/siteContent'
import { getSemanticEntry } from '@/data/semanticCore'
import { buildFaqSchema, buildServiceSchema } from '@/seo/config'
import { CapabilitiesSection } from '@/sections/home/CapabilitiesSection'
import { ClientOutcomesSection } from '@/sections/home/ClientOutcomesSection'
import { ContactLeadSection } from '@/sections/home/ContactLeadSection'
import { FaqSection } from '@/sections/home/FaqSection'
import { FinalCtaSection } from '@/sections/home/FinalCtaSection'
import { HeroSection } from '@/sections/home/HeroSection'
import { MotionLabSection } from '@/sections/home/MotionLabSection'
import { PortfolioPreviewSection } from '@/sections/home/PortfolioPreviewSection'
import { PricingTeaserSection } from '@/sections/home/PricingTeaserSection'
import { ProcessSection } from '@/sections/home/ProcessSection'
import { SeoConversionSection } from '@/sections/home/SeoConversionSection'
import { ServicesGridSection } from '@/sections/home/ServicesGridSection'
import { SiteTypesSection } from '@/sections/home/SiteTypesSection'
import { TemplateAdvantageSection } from '@/sections/home/TemplateAdvantageSection'
import { TrustStripSection } from '@/sections/home/TrustStripSection'
import { WhyChooseSection } from '@/sections/home/WhyChooseSection'
import { AfterContactSection } from '@/sections/shared/AfterContactSection'
import { StackSection } from '@/sections/shared/StackSection'

const homeEntry = getSemanticEntry('home')

export const HomePage = () => (
  <>
    <Seo
      description={homeEntry.metaDescription}
      jsonLd={[
        buildServiceSchema({
          title: homeEntry.h1,
          description: homeEntry.metaDescription,
          path: homeEntry.path,
        }),
        buildFaqSchema(homeFaqs),
      ]}
      path={homeEntry.path}
      title={homeEntry.title}
    />
    <HeroSection />
    <TrustStripSection />
    <ServicesGridSection />
    <StackSection />
    <CapabilitiesSection />
    <ClientOutcomesSection />
    <WhyChooseSection />
    <TemplateAdvantageSection />
    <SiteTypesSection />
    <MotionLabSection />
    <SeoConversionSection />
    <PortfolioPreviewSection />
    <ProcessSection />
    <PricingTeaserSection />
    <FaqSection />
    <AfterContactSection
      description="Важно не только сделать сайт, но и заранее показать, как выглядит старт работ: что происходит после заявки, как быстро приходит ответ и когда проект переходит в production."
      title="Что происходит после того, как вы выходите на связь"
    />
    <FinalCtaSection />
    <ContactLeadSection />
  </>
)
