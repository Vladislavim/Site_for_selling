import crypto from 'node:crypto'

import { leadFormSchema } from '../src/utils/leadSchema.js'
import { isSmtpEnabled, serverConfig } from './config.js'
import { deliverLead } from './leadDelivery.js'

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
        message: '\u0421\u0435\u0440\u0432\u0435\u0440 \u043f\u0440\u0438\u043d\u0438\u043c\u0430\u0435\u0442 \u0442\u043e\u043b\u044c\u043a\u043e JSON payload.',
        ok: false,
        requestId,
      },
      status: 415,
    }
  }

  if (!checkRateLimit(ip)) {
    return {
      payload: {
        message:
          '\u0421\u043b\u0438\u0448\u043a\u043e\u043c \u043c\u043d\u043e\u0433\u043e \u0437\u0430\u044f\u0432\u043e\u043a \u0441 \u044d\u0442\u043e\u0433\u043e \u0430\u0434\u0440\u0435\u0441\u0430. \u041f\u043e\u0434\u043e\u0436\u0434\u0438\u0442\u0435 \u043d\u0435\u043c\u043d\u043e\u0433\u043e \u0438 \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430.',
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
        message:
          '\u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u043f\u043e\u043b\u044f \u0444\u043e\u0440\u043c\u044b \u0438 \u043f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0443.',
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
        message: '\u0417\u0430\u044f\u0432\u043a\u0430 \u043f\u0440\u0438\u043d\u044f\u0442\u0430.',
        ok: true,
        requestId,
      },
      status: 202,
    }
  }

  if (lead.startedAt && Date.now() - lead.startedAt < 2500) {
    return {
      payload: {
        message:
          '\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0432\u044b\u0433\u043b\u044f\u0434\u0438\u0442 \u043f\u043e\u0434\u043e\u0437\u0440\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0431\u044b\u0441\u0442\u0440\u043e. \u041e\u0431\u043d\u043e\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443 \u0438 \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430.',
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
        message:
          '\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u0440\u0438\u043d\u044f\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443 \u043d\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435. \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 SMTP \u0438 \u043f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u043e\u043f\u044b\u0442\u043a\u0443.',
        ok: false,
        requestId,
      },
      status: 500,
    }
  }
}
