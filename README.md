# Exestination Studio

Premium, conversion-focused multi-page website for a freelance web developer / creative studio. The project combines a cinematic React frontend, Three.js universe visuals, reusable SEO data, secure lead capture, and Vercel-ready deployment.

## Stack

- React 19
- Vite 7
- Tailwind CSS
- Framer Motion
- GSAP + ScrollTrigger
- Lenis smooth scrolling
- Three.js + React Three Fiber
- React Helmet Async
- React Hook Form + Zod
- Express API for local development
- Vercel Serverless Functions for production

## Requirements

- Node.js `22.x`
- npm `10+`

## Local run

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example`.

3. Start frontend and backend together:

```bash
npm run dev:full
```

Useful scripts:

- `npm run dev` - Vite frontend only
- `npm run dev:server` - backend API only in watch mode
- `npm run server` - backend API without watch mode
- `npm run sync:seo` - regenerate `public/robots.txt` and `public/sitemap.xml`
- `npm run build` - regenerate SEO assets and build production frontend
- `npm run preview` - preview the built frontend
- `npm run lint` - run ESLint

## Lead form backend

The form submits to `POST /api/leads`.

Implementation:

- local development: Express server from `server/index.js`
- production: Vercel serverless handlers in `api/health.js` and `api/leads.js`

Security baseline:

- server-side Zod validation
- `helmet` hardening
- CORS allowlist via `ALLOWED_ORIGINS`
- rate limiting
- body size limit
- honeypot field
- suspiciously-fast-submit rejection
- secrets stored only on the server
- SMTP delivery through environment variables

Delivery modes:

- `LEAD_DELIVERY_MODE=smtp` - send leads to email via SMTP
- `LEAD_DELIVERY_MODE=file` - local fallback into `server/data/leads.log`

Production note:

- `file` fallback is intentionally blocked in production-style runtimes; configure SMTP before going live.

## SEO and semantic core

- `src/data/semanticCore.js` stores the semantic core table used by the pages.
- `npm run build` runs `scripts/generate-seo-assets.mjs` before Vite build.
- `robots.txt` and `sitemap.xml` are generated from the semantic core automatically.
- The generator uses `VITE_SITE_URL` first, then Vercel system domains, so production assets stay aligned with the deployed domain.

## Environment variables

Frontend:

- `VITE_SITE_URL`
- `VITE_LEAD_SUBMITTER=api`
- `VITE_LEAD_API_ENDPOINT=/api/leads`

Backend:

- `ALLOWED_ORIGINS`
- `LEAD_DELIVERY_MODE=smtp`
- `LEAD_TO_EMAIL=exestination@yandex.ru`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

Optional integrations:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_FORMSPREE_ENDPOINT`
- `VITE_TELEGRAM_BOT_ENDPOINT`

## Deployment on Vercel

The repository is prepared for Vercel auto-deploy:

- `vercel.json` configures the Vite output, SPA rewrites, function limits, and security headers
- `api/*` contains the production serverless API
- the frontend uses `/api/leads` by default in production
- `.nvmrc` and `package.json` pin Node `22.x`

Recommended deployment flow:

1. Push the repository to GitHub.
2. Vercel pulls the latest commit automatically.
3. Add the environment variables listed above in Vercel Project Settings.
4. The build runs `npm run build`, which refreshes SEO assets and builds the frontend.
5. Verify after deploy:
   - `/`
   - `/services`
   - `/portfolio`
   - `/pricing`
   - `/contact`
   - `/api/health`

## Hardening note

This setup materially improves security, but no public contact form is ever permanently "unhackable". If you expect significant paid traffic or aggressive bot pressure, add Cloudflare Turnstile or another CAPTCHA layer before large campaigns.
