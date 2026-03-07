import fs from 'node:fs/promises'
import path from 'node:path'
import nodemailer from 'nodemailer'

import { isProduction, isSmtpEnabled, serverConfig } from './config.js'

const dataDir = path.resolve(process.cwd(), 'server', 'data')
const fallbackLogPath = path.join(dataDir, 'leads.log')

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const toHeaderSafe = (value) => String(value || '').replace(/[\r\n]+/g, ' ').trim()

const FALLBACK_MISSING = '\u041d\u0435 \u0443\u043a\u0430\u0437\u0430\u043d\u043e'
const FALLBACK_UNKNOWN = '\u041d\u0435 \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d'

const buildLeadEntries = (lead, meta) => [
  ['\u0418\u043c\u044f', lead.name],
  ['\u0421\u043f\u043e\u0441\u043e\u0431 \u0441\u0432\u044f\u0437\u0438', lead.contactMethod],
  ['\u041a\u043e\u043d\u0442\u0430\u043a\u0442', lead.contactValue],
  ['\u041a\u043e\u043c\u043f\u0430\u043d\u0438\u044f / \u043d\u0438\u0448\u0430', lead.company],
  ['\u0423\u0441\u043b\u0443\u0433\u0430', lead.serviceType],
  ['\u0411\u044e\u0434\u0436\u0435\u0442', lead.budget],
  ['\u0421\u0440\u043e\u043a', lead.deadline],
  ['\u041d\u0443\u0436\u043d\u044b \u0430\u043d\u0438\u043c\u0430\u0446\u0438\u0438', lead.needAnimations],
  ['\u041d\u0443\u0436\u043d\u044b SEO-\u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b', lead.needSeoPages],
  ['\u041d\u0443\u0436\u0435\u043d \u0443\u043d\u0438\u043a\u0430\u043b\u044c\u043d\u044b\u0439 \u0434\u0438\u0437\u0430\u0439\u043d', lead.needUniqueDesign],
  ['\u0420\u0435\u0444\u0435\u0440\u0435\u043d\u0441\u044b', lead.references || FALLBACK_MISSING],
  ['\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u0430', lead.projectDescription],
  ['\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0438', lead.pagePath || meta.pagePath || FALLBACK_MISSING],
  ['Request ID', meta.requestId],
  ['Origin', meta.origin || '\u041d\u0435\u0442'],
  ['IP', meta.ip || FALLBACK_UNKNOWN],
  ['User-Agent', meta.userAgent || FALLBACK_UNKNOWN],
]

const buildTextBody = (lead, meta) =>
  buildLeadEntries(lead, meta)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')

const buildHtmlBody = (lead, meta) => {
  const rows = buildLeadEntries(lead, meta)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 14px;border:1px solid #e5e7eb;font-weight:700;background:#f8fafc;">${escapeHtml(label)}</td><td style="padding:10px 14px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td></tr>`,
    )
    .join('')

  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <body style="margin:0;padding:24px;background:#0b1220;color:#111827;font-family:Arial,sans-serif;">
    <div style="max-width:760px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #dbe3f0;">
      <div style="padding:20px 24px;background:linear-gradient(120deg,#f8fafc,#dbeafe,#ecfeff);">
        <div style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#475569;">Exestination Lead</div>
        <h1 style="margin:10px 0 0;font-size:28px;line-height:1.1;">\u041d\u043e\u0432\u0430\u044f \u0437\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 ${escapeHtml(lead.serviceType)}</h1>
      </div>
      <div style="padding:24px;">
        <table style="width:100%;border-collapse:collapse;">${rows}</table>
      </div>
    </div>
  </body>
</html>`
}

const transporter = isSmtpEnabled
  ? nodemailer.createTransport({
      auth: {
        pass: serverConfig.smtp.pass,
        user: serverConfig.smtp.user,
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      host: serverConfig.smtp.host,
      pool: true,
      port: serverConfig.smtp.port,
      secure: serverConfig.smtp.secure,
      socketTimeout: 15_000,
    })
  : null

export const verifyTransport = async () => {
  if (!transporter) {
    return
  }

  await transporter.verify()
}

const persistLeadLocally = async (lead, meta) => {
  await fs.mkdir(dataDir, { recursive: true })
  await fs.appendFile(
    fallbackLogPath,
    `${JSON.stringify({
      ...lead,
      meta,
      storedAt: new Date().toISOString(),
    })}\n`,
    'utf8',
  )
}

export const deliverLead = async (lead, meta) => {
  if (!transporter) {
    if (isProduction || process.env.VERCEL === '1') {
      throw new Error('SMTP is required in production environments. Configure server-side mail delivery.')
    }

    await persistLeadLocally(lead, meta)

    return {
      channel: 'file',
      message:
        '\u041b\u043e\u043a\u0430\u043b\u044c\u043d\u044b\u0439 \u0440\u0435\u0436\u0438\u043c: \u0437\u0430\u044f\u0432\u043a\u0430 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0430 \u0432 server/data/leads.log. \u0414\u043b\u044f \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u0445 \u0443\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u0439 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u0435 SMTP \u0438\u043b\u0438 \u0434\u0440\u0443\u0433\u043e\u0439 backend delivery.',
    }
  }

  const subject = `\u041d\u043e\u0432\u0430\u044f \u0437\u0430\u044f\u0432\u043a\u0430: ${toHeaderSafe(lead.serviceType)} / ${toHeaderSafe(lead.name)}`
  const replyTo = lead.contactMethod.trim().toLowerCase() === 'email' ? lead.contactValue : undefined

  await transporter.sendMail({
    from: serverConfig.smtp.from,
    headers: {
      'Content-Language': 'ru',
      'X-Entity-Ref-ID': meta.requestId,
    },
    html: buildHtmlBody(lead, meta),
    replyTo,
    subject,
    text: buildTextBody(lead, meta),
    to: serverConfig.leadToEmail,
  })

  return {
    channel: 'smtp',
    message:
      '\u0417\u0430\u044f\u0432\u043a\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0430. \u042f \u043e\u0442\u0432\u0435\u0447\u0443 \u0441 \u043f\u043e\u043d\u044f\u0442\u043d\u044b\u043c next step \u0432 \u0431\u043b\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043c\u044f.',
  }
}
