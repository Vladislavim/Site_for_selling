import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

import { isRequestOriginAllowed, serverConfig } from './config.js'
import { buildHealthResponse, buildLeadResponse } from './leadApi.js'
import { verifyTransport } from './leadDelivery.js'

const app = express()

app.disable('x-powered-by')
app.set('trust proxy', serverConfig.requestTrustProxy)

const corsOptionsDelegate = (request, callback) => {
  const origin = request.header('Origin')
  const allowed = !origin || origin === 'null' || isRequestOriginAllowed(origin, request)

  callback(allowed ? null : new Error('Origin is not allowed by policy.'), {
    credentials: false,
    methods: ['GET', 'POST', 'OPTIONS'],
    optionsSuccessStatus: 204,
    origin: allowed ? origin || true : false,
  })
}

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
)
app.use(cors(corsOptionsDelegate))
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
      message: '\u042d\u0442\u043e\u0442 origin \u043d\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043d \u0434\u043b\u044f API.',
      ok: false,
    })
    return
  }

  console.error('[lead-api] unexpected error', error)
  response.status(500).json({
    message: '\u0412\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u044f\u044f \u043e\u0448\u0438\u0431\u043a\u0430 API.',
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
