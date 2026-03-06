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

const buildLeadEntries = (lead, meta) => [
  ['Имя', lead.name],
  ['Способ связи', lead.contactMethod],
  ['Контакт', lead.contactValue],
  ['Компания / ниша', lead.company],
  ['Услуга', lead.serviceType],
  ['Бюджет', lead.budget],
  ['Срок', lead.deadline],
  ['Нужны анимации', lead.needAnimations],
  ['Нужны SEO-страницы', lead.needSeoPages],
  ['Нужен уникальный дизайн', lead.needUniqueDesign],
  ['Референсы', lead.references || 'Не указаны'],
  ['Описание проекта', lead.projectDescription],
  ['Страница отправки', lead.pagePath || meta.pagePath || 'Не указана'],
  ['Request ID', meta.requestId],
  ['Origin', meta.origin || 'Нет'],
  ['IP', meta.ip || 'Не определен'],
  ['User-Agent', meta.userAgent || 'Не определен'],
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
        <h1 style="margin:10px 0 0;font-size:28px;line-height:1.1;">Новая заявка на ${escapeHtml(lead.serviceType)}</h1>
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
      message: 'Локальный режим: заявка сохранена в server/data/leads.log. Для реальных уведомлений подключите SMTP или другой backend delivery.',
    }
  }

  const subject = `Новая заявка: ${toHeaderSafe(lead.serviceType)} / ${toHeaderSafe(lead.name)}`
  const replyTo = lead.contactMethod === 'Email' ? lead.contactValue : undefined

  await transporter.sendMail({
    encoding: 'base64',
    from: serverConfig.smtp.from,
    html: buildHtmlBody(lead, meta),
    replyTo,
    subject,
    text: buildTextBody(lead, meta),
    textEncoding: 'base64',
    to: serverConfig.leadToEmail,
  })

  return {
    channel: 'smtp',
    message: 'Заявка отправлена. Я отвечу с понятным next step в ближайшее время.',
  }
}
