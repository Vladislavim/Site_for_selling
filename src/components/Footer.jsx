import { Link } from 'react-router-dom'

import { LogoMark } from '@/components/LogoMark'
import { TelegramContactActions } from '@/components/TelegramContactActions'
import { navigationItems } from '@/data/siteContent'
import { Button } from '@/ui/Button'
import { createOrderMailto, ORDER_EMAIL } from '@/utils/mailto'

export const Footer = () => (
  <footer className="relative border-t border-white/8 bg-black/25 py-12">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
    <div className="container flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
      <div className="max-w-xl">
        <LogoMark />
        <p className="mt-5 text-sm leading-7 text-mist">
          Разработка сайтов под ключ: лендинги, многостраничные сайты, React-фронтенды, анимации, редизайн и уникальные
          digital-проекты с premium-подачей и понятной логикой контакта.
        </p>
      </div>

      <div className="grid w-full gap-8 sm:grid-cols-2 lg:w-auto lg:min-w-[620px]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mist">Навигация</p>
          <div className="mt-4 flex flex-col gap-3">
            {navigationItems.map((item) => (
              <Link key={item.path} className="text-sm text-pearl/88 transition duration-300 hover:text-white" to={item.path}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mist">Контакты</p>
            <a
              className="mt-4 block text-sm text-pearl transition duration-300 hover:text-white"
              href={`mailto:${ORDER_EMAIL}`}
            >
              {ORDER_EMAIL}
            </a>
          </div>

          <Button className="w-full justify-center" href={createOrderMailto()} variant="secondary" wrapperClassName="w-full">
            Открыть email-шаблон
          </Button>

          <TelegramContactActions templateContext="Формат: нужна консультация по разработке сайта." />
        </div>
      </div>
    </div>
  </footer>
)
