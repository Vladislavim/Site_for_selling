import { motion as Motion } from 'framer-motion'
import { Film, GalleryHorizontal, Layers3 } from 'lucide-react'

import { fadeUp, staggerContainer, viewportOnce } from '@/animations/motion'
import { SceneSection } from '@/components/SceneSection'
import { SectionHeading } from '@/components/SectionHeading'
import { recentProjects } from '@/data/recentProjects'
import { Badge } from '@/ui/Badge'
import { Button } from '@/ui/Button'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'
import { cn } from '@/utils/cn'

const CompactProjectCard = ({ project }) => (
  <Motion.article variants={fadeUp}>
    <GlassPanel className="h-full p-4 sm:p-5">
      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/25">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.palette}`} />
        <img
          alt={project.title}
          className="h-[280px] w-full object-cover object-top opacity-90 transition duration-700 group-hover:scale-[1.03]"
          loading="lazy"
          src={project.cover}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space via-space/30 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge>{project.category}</Badge>
          <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-mist">
            {project.label}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <h3 className="text-2xl font-black text-pearl sm:text-[2rem]">{project.title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-pearl/84">{project.summary}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {project.gallery.slice(1, 4).map((image, index) => (
          <div
            key={`${project.slug}-${image}`}
            className={cn(
              'overflow-hidden rounded-[18px] border border-white/10 bg-black/20',
              index === 0 ? 'col-span-2' : 'col-span-1',
            )}
          >
            <img
              alt={`${project.title} screenshot ${index + 2}`}
              className="h-28 w-full object-cover object-top transition duration-500 hover:scale-[1.04]"
              loading="lazy"
              src={image}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-medium text-pearl/82">
            {tag}
          </span>
        ))}
      </div>
    </GlassPanel>
  </Motion.article>
)

const FullProjectCard = ({ project }) => (
  <Motion.article variants={fadeUp}>
    <GlassPanel className="p-5 sm:p-6 xl:p-7">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] xl:items-start">
        <div>
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/20">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.palette}`} />
            <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
              <Badge>{project.category}</Badge>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-mist">
                <Film className="h-3.5 w-3.5" />
                Видео проекта
              </span>
            </div>
            <video
              className="relative z-[1] h-[320px] w-full object-cover object-top xl:h-[420px]"
              controls
              playsInline
              poster={project.cover}
              preload="metadata"
            >
              <source src={project.video} type="video/mp4" />
            </video>
          </div>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {project.gallery.map((image, index) => (
              <div
                key={`${project.slug}-${image}`}
                className={cn(
                  'min-w-[220px] overflow-hidden rounded-[22px] border border-white/10 bg-black/15',
                  index === 0 ? 'min-w-[280px]' : '',
                )}
              >
                <img
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="h-40 w-full object-cover object-top transition duration-500 hover:scale-[1.03]"
                  loading="lazy"
                  src={image}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex h-full flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/8 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-mint">
              <Layers3 className="h-3.5 w-3.5" />
              Последний проект
            </span>
            <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-mist">
              {project.label}
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-black leading-tight text-pearl sm:text-[2.3rem]">{project.title}</h3>
            <p className="mt-4 text-sm leading-7 text-mist">{project.summary}</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-black/16 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ice/80">Что показывает этот кейс</p>
            <p className="mt-3 text-sm leading-7 text-pearl/88">{project.outcome}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {project.deliverables.map((item) => (
              <div key={item} className="rounded-[20px] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-6 text-pearl/84">
                {item}
              </div>
            ))}
          </div>
          <div className="rounded-[24px] border border-white/10 bg-black/16 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-mist">
              <GalleryHorizontal className="h-4 w-4" />
              Стек и формат
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-medium text-pearl/84">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button to="/contact" variant="secondary">
              Хочу похожий уровень
            </Button>
            <Button to="/services" variant="ghost">
              Подобрать формат сайта
            </Button>
          </div>
        </div>
      </div>
    </GlassPanel>
  </Motion.article>
)

export const RecentProjectsShowcaseSection = ({
  id,
  mode = 'full',
  tone = 'mint',
}) => {
  const isCompact = mode === 'compact'

  return (
    <SceneSection className={cn(isCompact ? 'py-16 sm:py-20' : 'py-16 sm:py-20')} id={id} tone={tone}>
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            description={
              isCompact
                ? 'Ниже не абстрактные мокапы, а реальные материалы последних работ: можно сразу увидеть диапазон подачи, depth интерфейса и качество исполнения.'
                : 'Это уже не концепты, а реальные материалы последних проектов: видео, скрины интерфейса и разные типы подачи от art-directed landing page до строгого корпоративного сайта.'
            }
            eyebrow={isCompact ? 'Latest projects' : 'Последние проекты'}
            title={
              isCompact
                ? 'Последние проекты, которые уже можно разбирать по реальным экранам'
                : 'Витрина последних проектов с реальными видео и скринами интерфейса'
            }
          />
          {isCompact ? (
            <Button to="/portfolio" variant="secondary">
              Открыть полную витрину
            </Button>
          ) : null}
        </div>
        <Motion.div
          className={cn('mt-10', isCompact ? 'grid gap-5 xl:grid-cols-2' : 'space-y-6')}
          initial="hidden"
          variants={staggerContainer}
          viewport={viewportOnce}
          whileInView="visible"
        >
          {recentProjects.map((project) =>
            isCompact ? <CompactProjectCard key={project.slug} project={project} /> : <FullProjectCard key={project.slug} project={project} />,
          )}
        </Motion.div>
      </Container>
    </SceneSection>
  )
}
