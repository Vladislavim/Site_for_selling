import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { LogoMark } from '@/components/LogoMark'
import { navigationItems } from '@/data/siteContent'
import { Button } from '@/ui/Button'
import { cn } from '@/utils/cn'
import { createOrderMailto } from '@/utils/mailto'

export const Header = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-ink/72 backdrop-blur-2xl supports-[backdrop-filter]:bg-ink/60">
      <div className="container flex h-16 items-center justify-between gap-3 sm:h-20 sm:gap-6">
        <LogoMark className="min-w-0 flex-1 xl:flex-none" />
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] xl:flex">
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
        <div className="hidden xl:block">
          <Button className="whitespace-nowrap" href={createOrderMailto()} variant="accent">
            Р—Р°РєР°Р·Р°С‚СЊ СѓСЃР»СѓРіСѓ
          </Button>
        </div>
        <button
          aria-expanded={open}
          aria-label={open ? 'Р—Р°РєСЂС‹С‚СЊ РјРµРЅСЋ' : 'РћС‚РєСЂС‹С‚СЊ РјРµРЅСЋ'}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/6 text-pearl xl:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/8 bg-ink/96 xl:hidden">
          <div className="container flex max-h-[calc(100dvh-4rem)] flex-col gap-3 overflow-y-auto py-5 pb-[calc(env(safe-area-inset-bottom,0px)+1.25rem)] sm:max-h-[calc(100dvh-5rem)]">
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
            <Button className="justify-center" href={createOrderMailto()} variant="accent" wrapperClassName="w-full">
              Р—Р°РєР°Р·Р°С‚СЊ СѓСЃР»СѓРіСѓ
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
