import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { LogoMark } from '@/components/LogoMark'
import { navigationItems } from '@/data/siteContent'
import { Button } from '@/ui/Button'
import { cn } from '@/utils/cn'
import { createOrderMailto } from '@/utils/mailto'

export const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-ink/65 backdrop-blur-2xl">
      <div className="container flex h-20 items-center justify-between gap-6">
        <LogoMark />
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] lg:flex">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm font-medium text-mist transition duration-300 hover:text-pearl',
                  isActive && 'bg-white/[0.1] text-pearl shadow-[0_0_24px_rgba(136,191,255,0.12)]',
                )
              }
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button href={createOrderMailto()} variant="accent">
            Заказать услугу
          </Button>
        </div>
        <button
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/6 text-pearl lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/8 bg-ink/96 lg:hidden">
          <div className="container flex flex-col gap-3 py-5">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-pearl/86"
                onClick={() => setOpen(false)}
                to={item.path}
              >
                {item.label}
              </NavLink>
            ))}
            <Button className="w-full justify-center" href={createOrderMailto()} variant="accent">
              Заказать услугу
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
