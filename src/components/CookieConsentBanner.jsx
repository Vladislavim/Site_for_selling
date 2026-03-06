import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'

import { Button } from '@/ui/Button'
import { GlassPanel } from '@/ui/GlassPanel'

const CONSENT_KEY = 'exestination-cookie-consent'

const readConsent = () => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(CONSENT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const persistConsent = (consent) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
  window.dispatchEvent(new CustomEvent('exestination:cookie-consent', { detail: consent }))
}

export const CookieConsentBanner = () => {
  const [hasConsent, setHasConsent] = useState(() => Boolean(readConsent()))
  const [isExpanded, setIsExpanded] = useState(false)

  if (hasConsent) {
    return null
  }

  const handleConsent = (analytics) => {
    persistConsent({
      acceptedAt: new Date().toISOString(),
      analytics,
      essential: true,
      marketing: false,
      version: 1,
    })
    setHasConsent(true)
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 px-4 sm:bottom-6 sm:px-6">
      <GlassPanel className="pointer-events-auto mx-auto w-full max-w-6xl p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-pearl/78">
              <ShieldCheck className="h-4 w-4 text-mint" />
              Cookie consent
            </div>
            <h2 className="mt-4 text-2xl font-black leading-tight text-pearl sm:text-[2rem]">
              Использую технические cookie и local storage для работы сайта и формы
            </h2>
            <p className="mt-3 text-sm leading-7 text-mist sm:text-base">
              Сейчас включены только необходимые механики: сохранение согласия, корректная работа формы и базовая
              логика интерфейса. Аналитику можно включить отдельно, только с вашего разрешения.
            </p>
            {isExpanded ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-bold text-pearl">Необходимые</div>
                  <p className="mt-2 text-sm leading-6 text-mist">
                    Сохраняют выбор по cookie consent и помогают форме корректно работать между обновлениями страницы.
                  </p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-bold text-pearl">Аналитика</div>
                  <p className="mt-2 text-sm leading-6 text-mist">
                    Пока не используется по умолчанию. Если позже подключить метрику или пиксели, этот выбор можно
                    использовать как базу для их активации.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-end">
            <Button magnetic={false} onClick={() => setIsExpanded((value) => !value)} variant="ghost">
              {isExpanded ? 'Скрыть детали' : 'Что именно используется'}
            </Button>
            <Button magnetic={false} onClick={() => handleConsent(false)} variant="secondary">
              Только необходимые
            </Button>
            <Button magnetic={false} onClick={() => handleConsent(true)} variant="accent">
              Принять
            </Button>
          </div>
        </div>
      </GlassPanel>
    </div>
  )
}
