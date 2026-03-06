import crypto from 'node:crypto'

import { leadFormSchema } from '../src/utils/leadSchema.js'
import { deliverLead } from './leadDelivery.js'
import { isSmtpEnabled, serverConfig } from './config.js'

const submissions = new Map()

const getHeader = (headers, key) => {
  if (!headers) {
    return ''
  }

  if (typeof headers.get === 'function') {
    return headers.get(key) || ''
  }

  const normalizedKey = key.toLowerCase()

  for (const [entryKey, value] of Object.entries(headers)) {
    if (entryKey.toLowerCase() === normalizedKey) {
      return Array.isArray(value) ? value[0] || '' : value || ''
    }
  }

  return ''
}

const checkRateLimit = (ip) => {
  const now = Date.now()
  const safeIp = ip || 'unknown'
  const bucket = submissions.get(safeIp) || []
  const freshBucket = bucket.filter((timestamp) => now - timestamp < serverConfig.rateLimitWindowMs)

  if (freshBucket.length >= serverConfig.rateLimitMax) {
    submissions.set(safeIp, freshBucket)

    return false
  }

  freshBucket.push(now)
  submissions.set(safeIp, freshBucket)

  if (submissions.size > 1000) {
    for (const [key, timestamps] of submissions.entries()) {
      const fresh = timestamps.filter((timestamp) => now - timestamp < serverConfig.rateLimitWindowMs)

      if (fresh.length) {
        submissions.set(key, fresh)
      } else {
        submissions.delete(key)
      }
    }
  }

  return true
}

export const buildHealthResponse = () => ({
  payload: {
    deliveryMode: serverConfig.deliveryMode,
    ok: true,
    service: 'lead-api',
    smtpReady: isSmtpEnabled,
  },
  status: 200,
})

export const buildLeadResponse = async ({ body, headers, ip, isJson }) => {
  const requestId = crypto.randomUUID()

  if (!isJson) {
    return {
      payload: {
        message: 'Сервер принимает только JSON payload.',
        ok: false,
        requestId,
      },
      status: 415,
    }
  }

  if (!checkRateLimit(ip)) {
    return {
      payload: {
        message: 'Слишком много заявок с этого адреса. Подождите немного и попробуйте снова.',
        ok: false,
        requestId,
      },
      status: 429,
    }
  }

  const parsed = leadFormSchema.safeParse(body)

  if (!parsed.success) {
    return {
      payload: {
        fields: parsed.error.flatten().fieldErrors,
        message: 'Проверьте поля формы и повторите отправку.',
        ok: false,
        requestId,
      },
      status: 400,
    }
  }

  const lead = parsed.data

  if (lead.website) {
    return {
      payload: {
        message: 'Заявка принята.',
        ok: true,
        requestId,
      },
      status: 202,
    }
  }

  if (lead.startedAt && Date.now() - lead.startedAt < 2500) {
    return {
      payload: {
        message: 'Отправка выглядит подозрительно быстро. Обновите страницу и попробуйте снова.',
        ok: false,
        requestId,
      },
      status: 429,
    }
  }

  try {
    const result = await deliverLead(lead, {
      ip: ip || '',
      origin: getHeader(headers, 'origin'),
      pagePath: lead.pagePath || '',
      requestId,
      userAgent: getHeader(headers, 'user-agent'),
    })

    return {
      payload: {
        message: result.message,
        ok: true,
        requestId,
      },
      status: 201,
    }
  } catch (error) {
    console.error(`[lead-api] ${requestId}`, error)

    return {
      payload: {
        message: 'Не удалось принять заявку на сервере. Проверьте SMTP и повторите попытку.',
        ok: false,
        requestId,
      },
      status: 500,
    }
  }
}
