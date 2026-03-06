import { lazy, Suspense } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'

import { CookieConsentBanner } from '@/components/CookieConsentBanner'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { UniverseBackdrop } from '@/components/UniverseBackdrop'
import { useLenisSmoothScroll } from '@/hooks/useLenisSmoothScroll'
import { useScrollToTop } from '@/hooks/useScrollToTop'

const HomePage = lazy(() => import('@/pages/HomePage').then((module) => ({ default: module.HomePage })))
const ServicesPage = lazy(() => import('@/pages/ServicesPage').then((module) => ({ default: module.ServicesPage })))
const ServiceDetailPage = lazy(() =>
  import('@/pages/ServiceDetailPage').then((module) => ({ default: module.ServiceDetailPage })),
)
const PortfolioPage = lazy(() => import('@/pages/PortfolioPage').then((module) => ({ default: module.PortfolioPage })))
const PricingPage = lazy(() => import('@/pages/PricingPage').then((module) => ({ default: module.PricingPage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then((module) => ({ default: module.AboutPage })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then((module) => ({ default: module.ContactPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })))

const RouteFallback = () => (
  <div className="container flex min-h-[60vh] items-center justify-center py-20">
    <div className="rounded-full border border-white/10 bg-white/6 px-6 py-3 text-sm font-medium text-pearl/80 backdrop-blur-xl">
      Загружаю страницу...
    </div>
  </div>
)

const AppRoutes = () => {
  const location = useLocation()

  useScrollToTop()

  return (
    <AnimatePresence mode="wait">
      <Motion.main
        key={location.pathname}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex-1"
        exit={{ opacity: 0, y: -16 }}
        initial={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route element={<HomePage />} path="/" />
            <Route element={<ServicesPage />} path="/services" />
            <Route element={<ServiceDetailPage />} path="/services/:slug" />
            <Route element={<PortfolioPage />} path="/portfolio" />
            <Route element={<PricingPage />} path="/pricing" />
            <Route element={<AboutPage />} path="/about" />
            <Route element={<ContactPage />} path="/contact" />
            <Route element={<NotFoundPage />} path="*" />
          </Routes>
        </Suspense>
      </Motion.main>
    </AnimatePresence>
  )
}

const App = () => {
  useLenisSmoothScroll()

  return (
    <div className="relative flex min-h-screen flex-col">
      <UniverseBackdrop />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[760px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[28rem] z-0 h-[540px] bg-[radial-gradient(circle_at_center,rgba(140,242,211,0.08),transparent_60%)]" />
      <Header />
      <AppRoutes />
      <Footer />
      <CookieConsentBanner />
    </div>
  )
}

export default App
