import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import { isOriginAllowed, serverConfig } from './config.js'
import { buildHealthResponse, buildLeadResponse } from './leadApi.js'
import { verifyTransport } from './leadDelivery.js'

const app = express()

app.disable('x-powered-by')
app.set('trust proxy', serverConfig.requestTrustProxy)

const corsOptions = {
  credentials: false,
  methods: ['GET', 'POST', 'OPTIONS'],
  optionsSuccessStatus: 204,
  origin(origin, callback) {
    if (isOriginAllowed(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('Origin is not allowed by policy.'))
  },
}

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
)
app.use(cors(corsOptions))
app.use(
  express.json({
    limit: serverConfig.jsonLimit,
    type: 'application/json',
  }),
)

const apiLimiter = rateLimit({
  legacyHeaders: false,
  limit: 120,
  standardHeaders: 'draft-8',
  windowMs: 15 * 60 * 1000,
})

app.use('/api', apiLimiter)

app.get('/api/health', (_request, response) => {
  const result = buildHealthResponse()
  response.status(result.status).json(result.payload)
})

app.post('/api/leads', async (request, response) => {
  const result = await buildLeadResponse({
    body: request.body,
    headers: request.headers,
    ip: request.ip,
    isJson: request.is('application/json'),
  })

  response.status(result.status).json(result.payload)
})

app.use((error, _request, response, _next) => {
  if (error instanceof Error && error.message === 'Origin is not allowed by policy.') {
    response.status(403).json({
      message: 'Этот origin не разрешен для API.',
      ok: false,
    })
    return
  }

  console.error('[lead-api] unexpected error', error)
  response.status(500).json({
    message: 'Внутренняя ошибка API.',
    ok: false,
  })
})

const start = async () => {
  app.listen(serverConfig.port, () => {
    console.log(`[lead-api] listening on http://127.0.0.1:${serverConfig.port}`)

    verifyTransport().catch((error) => {
      console.error('[lead-api] SMTP verification failed:', error)
    })
  })
}

start()
