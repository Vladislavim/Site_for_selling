import { isRequestOriginAllowed } from '../server/config.js'

const setCorsHeaders = (request, response) => {
  const origin = request.headers.origin || ''
  const allowOrigin = !origin || origin === 'null' ? '*' : origin

  if (!origin || origin === 'null' || isRequestOriginAllowed(origin, request)) {
    response.setHeader('Access-Control-Allow-Origin', allowOrigin)
    response.setHeader('Vary', 'Origin')
  }

  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
}

export const handleOptions = (request, response) => {
  setCorsHeaders(request, response)
  response.status(204).end()
}

export const rejectOrigin = (request, response) => {
  const origin = request.headers.origin || ''

  if (!origin || origin === 'null' || isRequestOriginAllowed(origin, request)) {
    setCorsHeaders(request, response)
    return false
  }

  response.status(403).json({
    message: '\u042d\u0442\u043e\u0442 origin \u043d\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043d \u0434\u043b\u044f API.',
    ok: false,
  })

  return true
}

export const applyJsonResponse = (request, response, result) => {
  setCorsHeaders(request, response)
  response.status(result.status).json(result.payload)
}
