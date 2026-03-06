import { buildHealthResponse } from '../server/leadApi.js'
import { applyJsonResponse, handleOptions, rejectOrigin } from './_shared.js'

export default async function handler(request, response) {
  if (request.method === 'OPTIONS') {
    handleOptions(request, response)
    return
  }

  if (rejectOrigin(request, response)) {
    return
  }

  if (request.method !== 'GET') {
    applyJsonResponse(request, response, {
      payload: {
        message: 'Method Not Allowed',
        ok: false,
      },
      status: 405,
    })
    return
  }

  applyJsonResponse(request, response, buildHealthResponse())
}
