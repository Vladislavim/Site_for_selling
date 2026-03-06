import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'

import { COOKIE_CONSENT_EVENT, hasAnalyticsConsent, readCookieConsent } from '@/utils/cookieConsent'

export const ConsentAwareAnalytics = () => {
  const [enabled, setEnabled] = useState(() => hasAnalyticsConsent(readCookieConsent()))

  useEffect(() => {
    const syncConsent = () => {
      setEnabled(hasAnalyticsConsent(readCookieConsent()))
    }

    const handleConsent = (event) => {
      setEnabled(hasAnalyticsConsent(event.detail ?? readCookieConsent()))
    }

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsent)
    window.addEventListener('storage', syncConsent)

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsent)
      window.removeEventListener('storage', syncConsent)
    }
  }, [])

  if (!enabled) {
    return null
  }

  return <Analytics />
}
