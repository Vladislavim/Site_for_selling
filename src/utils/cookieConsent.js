export const COOKIE_CONSENT_KEY = 'exestination-cookie-consent'
export const COOKIE_CONSENT_EVENT = 'exestination:cookie-consent'

export const readCookieConsent = () => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const persistCookieConsent = (consent) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: consent }))
}

export const hasAnalyticsConsent = (consent) => Boolean(consent?.analytics)
