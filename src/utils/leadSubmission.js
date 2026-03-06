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
      throw new Error('Сервер вернул неожиданный ответ.')
    }

    return {}
  }

  return response.json()
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
    message: 'Заявка сохранена локально в demo-режиме. Для production включите backend API.',
  }
}

export const submitLeadViaFormspree = async (payload) => {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT

  if (!endpoint) {
    throw new Error('Не задан VITE_FORMSPREE_ENDPOINT.')
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
    throw new Error(data.message || 'Formspree вернул ошибку при отправке.')
  }

  return {
    ok: true,
    channel: 'formspree',
    message: data.message || 'Заявка отправлена через Formspree.',
  }
}

export const submitLeadViaApi = async (payload) => {
  const endpoint = import.meta.env.VITE_LEAD_API_ENDPOINT || (import.meta.env.DEV ? 'http://127.0.0.1:8787/api/leads' : '/api/leads')

  const response = await fetch(endpoint, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'fetch',
    },
    body: JSON.stringify(toSerializablePayload(payload)),
  })

  const data = await parseApiResponse(response)

  if (!response.ok) {
    throw new Error(data.message || 'Backend endpoint вернул ошибку.')
  }

  return {
    ok: true,
    channel: 'api',
    message: data.message || 'Заявка отправлена через backend.',
  }
}

export const submitLeadViaTelegram = async (payload) => {
  const endpoint = import.meta.env.VITE_TELEGRAM_BOT_ENDPOINT

  if (!endpoint) {
    throw new Error('Не задан VITE_TELEGRAM_BOT_ENDPOINT.')
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
    throw new Error(data.message || 'Telegram endpoint вернул ошибку.')
  }

  return {
    ok: true,
    channel: 'telegram',
    message: data.message || 'Заявка отправлена в Telegram.',
  }
}

export const submitLeadViaEmailJs = async (payload) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      'Для EmailJS нужны VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID и VITE_EMAILJS_PUBLIC_KEY.',
    )
  }

  await emailjs.send(serviceId, templateId, toSerializablePayload(payload), {
    publicKey,
  })

  return {
    ok: true,
    channel: 'emailjs',
    message: 'Заявка отправлена через EmailJS.',
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
