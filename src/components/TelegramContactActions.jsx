import { useEffect, useState } from 'react'

import { cn } from '@/utils/cn'
import { copyTelegramTemplate, createTelegramTemplate, openTelegramChat, TELEGRAM_HANDLE, TELEGRAM_URL } from '@/utils/telegram'
import { Button } from '@/ui/Button'

const feedbackMessages = {
  copied: 'Шаблон скопирован. Вставьте его в сообщение в Telegram.',
  fallback: 'Telegram открыт. Если шаблон не скопировался автоматически, вставьте его вручную.',
  idle: 'Можно открыть чат сразу или сначала скопировать готовый шаблон сообщения.',
}

export const TelegramContactActions = ({ className, templateContext = '' }) => {
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (status === 'idle') {
      return undefined
    }

    const timeoutId = window.setTimeout(() => setStatus('idle'), 2800)

    return () => window.clearTimeout(timeoutId)
  }, [status])

  const handleTemplateClick = async () => {
    const template = createTelegramTemplate(templateContext)
    const chatWindow = openTelegramChat()

    try {
      await copyTelegramTemplate(templateContext)
      setStatus('copied')
    } catch {
      setStatus('fallback')

      if (typeof window !== 'undefined') {
        window.prompt('Скопируйте шаблон сообщения для Telegram:', template)
      }
    }

    if (!chatWindow && typeof window !== 'undefined') {
      window.location.href = TELEGRAM_URL
    }
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          className="w-full justify-center"
          href={TELEGRAM_URL}
          rel="noreferrer"
          target="_blank"
          variant="accent"
          wrapperClassName="w-full sm:flex-1"
        >
          Написать в Telegram
        </Button>
        <Button
          className="w-full justify-center"
          onClick={handleTemplateClick}
          variant="secondary"
          wrapperClassName="w-full sm:flex-1"
        >
          Открыть с шаблоном
        </Button>
      </div>
      <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mist">Telegram</p>
        <p className="mt-2 text-sm font-medium text-pearl">{TELEGRAM_HANDLE}</p>
        <p className="mt-2 text-sm leading-6 text-mist">{feedbackMessages[status]}</p>
      </div>
    </div>
  )
}
