import { isOriginAllowed } from '../server/config.js'

const setCorsHeaders = (request, response) => {
  const origin = request.headers.origin || ''

  if (origin && isOriginAllowed(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
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

  if (!origin || isOriginAllowed(origin)) {
    setCorsHeaders(request, response)
    return false
  }

  response.status(403).json({
    message: 'Этот origin не разрешен для API.',
    ok: false,
  })

  return true
}

export const applyJsonResponse = (request, response, result) => {
  setCorsHeaders(request, response)
  response.status(result.status).json(result.payload)
}
