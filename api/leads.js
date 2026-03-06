import { buildLeadResponse } from '../server/leadApi.js'
import { applyJsonResponse, handleOptions, rejectOrigin } from './_shared.js'

export default async function handler(request, response) {
  if (request.method === 'OPTIONS') {
    handleOptions(request, response)
    return
  }

  if (rejectOrigin(request, response)) {
    return
  }

  if (request.method !== 'POST') {
    applyJsonResponse(request, response, {
      payload: {
        message: 'Method Not Allowed',
        ok: false,
      },
      status: 405,
    })
    return
  }

  let body = request.body

  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = null
    }
  }

  const result = await buildLeadResponse({
    body,
    headers: request.headers,
    ip: request.headers['x-forwarded-for']?.split(',')[0]?.trim() || request.socket?.remoteAddress || '',
    isJson: (request.headers['content-type'] || '').includes('application/json'),
  })

  applyJsonResponse(request, response, result)
}
