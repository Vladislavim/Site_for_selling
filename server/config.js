import 'dotenv/config'

const toInteger = (value, fallback) => {
  const parsed = Number.parseInt(value ?? '', 10)

  return Number.isFinite(parsed) ? parsed : fallback
}

const splitList = (value) =>
  String(value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

const smtpConfigured = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM'].every(
  (key) => Boolean(process.env[key]),
)

const derivedOrigins = [
  process.env.VITE_SITE_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
  process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '',
]
  .map((item) => String(item || '').trim())
  .filter(Boolean)

const defaultOrigins = ['http://127.0.0.1:5173', 'http://localhost:5173', ...derivedOrigins]
const configuredOrigins = splitList(process.env.ALLOWED_ORIGINS)

export const serverConfig = {
  allowedOrigins: configuredOrigins.length ? configuredOrigins : defaultOrigins,
  deliveryMode: (process.env.LEAD_DELIVERY_MODE || (smtpConfigured ? 'smtp' : 'file')).toLowerCase(),
  jsonLimit: process.env.LEAD_JSON_LIMIT || '16kb',
  leadToEmail: process.env.LEAD_TO_EMAIL || 'exestination@yandex.ru',
  nodeEnv: process.env.NODE_ENV || 'development',
  port: toInteger(process.env.PORT, 8787),
  rateLimitMax: toInteger(process.env.LEAD_RATE_LIMIT_MAX, 6),
  rateLimitWindowMs: toInteger(process.env.LEAD_RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  requestTrustProxy: process.env.TRUST_PROXY || 'loopback',
  smtp: {
    from: process.env.SMTP_FROM || '',
    host: process.env.SMTP_HOST || '',
    pass: process.env.SMTP_PASS || '',
    port: toInteger(process.env.SMTP_PORT, 465),
    secure: String(process.env.SMTP_SECURE || 'true').toLowerCase() !== 'false',
    user: process.env.SMTP_USER || '',
  },
}

export const isProduction = serverConfig.nodeEnv === 'production'
export const isSmtpEnabled = serverConfig.deliveryMode === 'smtp' && smtpConfigured

export const isOriginAllowed = (origin) => {
  if (!origin) {
    return true
  }

  return serverConfig.allowedOrigins.includes(origin)
}
