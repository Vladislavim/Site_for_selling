import { Button } from '@/ui/Button'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'
import { Seo } from '@/components/Seo'

export const NotFoundPage = () => (
  <>
    <Seo description="Страница не найдена." path="/404" title="Страница не найдена" />
    <section className="py-28 sm:py-32">
      <Container>
        <GlassPanel className="mx-auto max-w-3xl p-8 text-center sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-mist">404</p>
          <h1 className="mt-4 text-4xl font-black text-pearl sm:text-5xl">Страница не найдена</h1>
          <p className="mt-5 text-base leading-8 text-mist">
            Возможно, ссылка изменилась. Вернитесь на главную или сразу перейдите к услугам и оставьте заявку.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/" variant="accent">
              На главную
            </Button>
            <Button to="/services" variant="secondary">
              Посмотреть услуги
            </Button>
          </div>
        </GlassPanel>
      </Container>
    </section>
  </>
)
