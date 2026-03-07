import emailjs from '@emailjs/browser'

const mockDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const toSerializablePayload = (payload) => ({
  ...payload,
  createdAt: new Date().toISOString(),
  pagePath: payload.pagePath || (typeof window !== 'undefined' ? window.location.pathname + window.location.hash : ''),
})

const parseApiResponse = async (response) => {
  const contentType = response.headers.get('content-type') || ''

  if (!contentType.includes('application/json')) {
    if (!response.ok) {
      throw new Error('\u0421\u0435\u0440\u0432\u0435\u0440 \u0432\u0435\u0440\u043d\u0443\u043b \u043d\u0435\u043e\u0436\u0438\u0434\u0430\u043d\u043d\u044b\u0439 \u043e\u0442\u0432\u0435\u0442.')
    }

    return {}
  }

  return response.json()
}

const createTimeoutSignal = (timeoutMs) => {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs)

  return {
    cleanup: () => window.clearTimeout(timeoutId),
    signal: controller.signal,
  }
}

const getApiLeadEndpoints = () => {
  const endpoints = new Set()
  const explicitEndpoint = String(import.meta.env.VITE_LEAD_API_ENDPOINT || '').trim()

  if (explicitEndpoint) {
    endpoints.add(explicitEndpoint)
  }

  if (typeof window !== 'undefined') {
    endpoints.add(new URL('/api/leads', window.location.origin).toString())
  }

  if (import.meta.env.DEV) {
    endpoints.add('http://127.0.0.1:8787/api/leads')
  } else {
    endpoints.add('/api/leads')
  }

  const siteUrl = String(import.meta.env.VITE_SITE_URL || '').trim()

  if (siteUrl) {
    endpoints.add(new URL('/api/leads', siteUrl).toString())
  }

  return [...endpoints]
}

export const submitLeadViaMock = async (payload) => {
  await mockDelay(700)

  if (typeof window !== 'undefined') {
    const queue = JSON.parse(window.localStorage.getItem('exestination-leads') ?? '[]')

    queue.unshift({
      id: `lead-${Date.now()}`,
      ...toSerializablePayload(payload),
    })

    window.localStorage.setItem('exestination-leads', JSON.stringify(queue.slice(0, 25)))
  }

  return {
    ok: true,
    channel: 'mock',
    message:
      '\u0417\u0430\u044f\u0432\u043a\u0430 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0430 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e \u0432 demo-\u0440\u0435\u0436\u0438\u043c\u0435. \u0414\u043b\u044f production \u0432\u043a\u043b\u044e\u0447\u0438\u0442\u0435 backend API.',
  }
}

export const submitLeadViaFormspree = async (payload) => {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT

  if (!endpoint) {
    throw new Error('\u041d\u0435 \u0437\u0430\u0434\u0430\u043d VITE_FORMSPREE_ENDPOINT.')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toSerializablePayload(payload)),
  })

  const data = await parseApiResponse(response)

  if (!response.ok) {
    throw new Error(data.message || 'Formspree \u0432\u0435\u0440\u043d\u0443\u043b \u043e\u0448\u0438\u0431\u043a\u0443 \u043f\u0440\u0438 \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0435.')
  }

  return {
    ok: true,
    channel: 'formspree',
    message: data.message || '\u0417\u0430\u044f\u0432\u043a\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0430 \u0447\u0435\u0440\u0435\u0437 Formspree.',
  }
}

export const submitLeadViaApi = async (payload) => {
  const serializedPayload = JSON.stringify(toSerializablePayload(payload))
  const endpoints = getApiLeadEndpoints()
  let lastError = null

  for (const endpoint of endpoints) {
    const { cleanup, signal } = createTimeoutSignal(15_000)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'omit',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'fetch',
        },
        body: serializedPayload,
        signal,
      })

      const data = await parseApiResponse(response)

      if (!response.ok) {
        throw new Error(
          data.message ||
            '\u0411\u044d\u043a\u0435\u043d\u0434 \u0432\u0435\u0440\u043d\u0443\u043b \u043e\u0448\u0438\u0431\u043a\u0443 \u043f\u0440\u0438 \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0435.',
        )
      }

      return {
        ok: true,
        channel: 'api',
        message:
          data.message ||
          '\u0417\u0430\u044f\u0432\u043a\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0430 \u0447\u0435\u0440\u0435\u0437 backend.',
      }
    } catch (error) {
      lastError = error

      if (!(error instanceof TypeError) && error?.name !== 'AbortError') {
        throw error
      }
    } finally {
      cleanup()
    }
  }

  if (lastError?.name === 'AbortError') {
    throw new Error(
      '\u0421\u0435\u0440\u0432\u0435\u0440 \u043e\u0442\u0432\u0435\u0447\u0430\u0435\u0442 \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u0434\u043e\u043b\u0433\u043e. \u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0443 \u0447\u0443\u0442\u044c \u043f\u043e\u0437\u0436\u0435.',
    )
  }

  throw new Error(
    lastError?.message ||
      '\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0441\u043e\u0435\u0434\u0438\u043d\u0438\u0442\u044c\u0441\u044f \u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u043e\u043c. \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0441\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u0435 \u0438 \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430.',
  )
}

export const submitLeadViaTelegram = async (payload) => {
  const endpoint = import.meta.env.VITE_TELEGRAM_BOT_ENDPOINT

  if (!endpoint) {
    throw new Error('\u041d\u0435 \u0437\u0430\u0434\u0430\u043d VITE_TELEGRAM_BOT_ENDPOINT.')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toSerializablePayload(payload)),
  })

  const data = await parseApiResponse(response)

  if (!response.ok) {
    throw new Error(data.message || 'Telegram endpoint \u0432\u0435\u0440\u043d\u0443\u043b \u043e\u0448\u0438\u0431\u043a\u0443.')
  }

  return {
    ok: true,
    channel: 'telegram',
    message: data.message || '\u0417\u0430\u044f\u0432\u043a\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0430 \u0432 Telegram.',
  }
}

export const submitLeadViaEmailJs = async (payload) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      '\u0414\u043b\u044f EmailJS \u043d\u0443\u0436\u043d\u044b VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID \u0438 VITE_EMAILJS_PUBLIC_KEY.',
    )
  }

  await emailjs.send(serviceId, templateId, toSerializablePayload(payload), {
    publicKey,
  })

  return {
    ok: true,
    channel: 'emailjs',
    message: '\u0417\u0430\u044f\u0432\u043a\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0430 \u0447\u0435\u0440\u0435\u0437 EmailJS.',
  }
}

const submitters = {
  api: submitLeadViaApi,
  emailjs: submitLeadViaEmailJs,
  formspree: submitLeadViaFormspree,
  mock: submitLeadViaMock,
  telegram: submitLeadViaTelegram,
}

export const submitLeadRequest = async (payload) => {
  const mode = import.meta.env.VITE_LEAD_SUBMITTER ?? 'api'
  const submitter = submitters[mode] ?? submitters.api

  return submitter(payload)
}
