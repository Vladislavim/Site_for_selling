import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { Film, GalleryHorizontal, Layers3, MonitorPlay, PlayCircle } from 'lucide-react'

import { fadeUp, staggerContainer, viewportOnce } from '@/animations/motion'
import { SceneSection } from '@/components/SceneSection'
import { SectionHeading } from '@/components/SectionHeading'
import { recentProjects } from '@/data/recentProjects'
import { Badge } from '@/ui/Badge'
import { Button } from '@/ui/Button'
import { Container } from '@/ui/Container'
import { GlassPanel } from '@/ui/GlassPanel'
import { cn } from '@/utils/cn'

const mediaTabClass =
  'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition duration-300'

const thumbClass =
  'group relative overflow-hidden rounded-[20px] border transition duration-300 disabled:cursor-default'

const CompactProjectCard = ({ project }) => (
  <Motion.article variants={fadeUp}>
    <GlassPanel className="h-full p-4 sm:p-5">
      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/25">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.palette}`} />
        <img
          alt={project.title}
          className="h-[300px] w-full object-cover object-top opacity-95 transition duration-700 group-hover:scale-[1.03]"
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
      <div className="mt-4 grid grid-cols-2 gap-3">
        {project.gallery.slice(0, 2).map((image, index) => (
          <div key={`${project.slug}-${image}`} className="overflow-hidden rounded-[20px] border border-white/10 bg-[#050913]">
            <img
              alt={`${project.title} preview ${index + 1}`}
              className="h-36 w-full object-contain object-center bg-[#040711] p-2"
              loading="lazy"
              src={image}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-mint/20 bg-mint/8 px-3 py-1.5 text-xs font-medium text-mint">Видео autoplay</span>
        {project.stack.slice(0, 2).map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-medium text-pearl/82">
            {tag}
          </span>
        ))}
      </div>
    </GlassPanel>
  </Motion.article>
)

const ProjectMediaStage = ({ project }) => {
  const [stageMode, setStageMode] = useState(project.video ? 'video' : 'image')
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const activeImage = project.gallery[activeImageIndex] || project.cover

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {project.video ? (
          <button
            className={cn(
              mediaTabClass,
              stageMode === 'video'
                ? 'border-mint/30 bg-mint/10 text-mint shadow-[0_0_28px_rgba(140,242,211,0.12)]'
                : 'border-white/10 bg-black/30 text-mist hover:border-white/18 hover:text-pearl',
            )}
            onClick={() => setStageMode('video')}
            type="button"
          >
            <PlayCircle className="h-3.5 w-3.5" />
            Видео autoplay
          </button>
        ) : null}
        <button
          className={cn(
            mediaTabClass,
            stageMode === 'image'
              ? 'border-ice/30 bg-ice/10 text-ice shadow-[0_0_28px_rgba(136,191,255,0.12)]'
              : 'border-white/10 bg-black/30 text-mist hover:border-white/18 hover:text-pearl',
          )}
          onClick={() => setStageMode('image')}
          type="button"
        >
          <MonitorPlay className="h-3.5 w-3.5" />
          Крупный экран
        </button>
      </div>

      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#040711] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.palette}`} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%)]" />
        {stageMode === 'video' && project.video ? (
          <div className="relative z-[1]">
            <video
              autoPlay
              className="h-[360px] w-full object-cover object-top xl:h-[460px]"
              loop
              muted
              playsInline
              poster={project.cover}
              preload="metadata"
            >
              <source src={project.video} type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/12 bg-black/45 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-pearl/90">
                Автовоспроизведение без звука
              </span>
              <span className="rounded-full border border-white/12 bg-black/30 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-mist">
                Видео загружается как hero-preview
              </span>
            </div>
          </div>
        ) : (
          <div className="relative z-[1] flex min-h-[360px] items-center justify-center p-3 sm:p-4 xl:min-h-[460px] xl:p-6">
            <img
              alt={`${project.title} selected screenshot ${activeImageIndex + 1}`}
              className="max-h-[440px] w-full rounded-[22px] border border-white/10 bg-[#040711] object-contain object-center shadow-[0_12px_50px_rgba(0,0,0,0.28)]"
              loading="lazy"
              src={activeImage}
            />
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {project.video ? (
          <button
            className={cn(
              thumbClass,
              stageMode === 'video'
                ? 'border-mint/30 bg-mint/8 shadow-[0_0_24px_rgba(140,242,211,0.12)]'
                : 'border-white/10 bg-black/18 hover:border-white/18',
            )}
            onClick={() => setStageMode('video')}
            type="button"
          >
            <div className="relative flex h-24 items-center justify-center bg-[radial-gradient(circle_at_center,rgba(140,242,211,0.18),rgba(4,7,17,0.95))]">
              <PlayCircle className="h-9 w-9 text-mint" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-pearl/90">Видео</div>
                <div className="mt-1 text-xs text-mist">Autoplay preview</div>
              </div>
            </div>
          </button>
        ) : null}
        {project.gallery.map((image, index) => (
          <button
            key={`${project.slug}-${image}`}
            className={cn(
              thumbClass,
              stageMode === 'image' && activeImageIndex === index
                ? 'border-ice/30 bg-ice/8 shadow-[0_0_24px_rgba(136,191,255,0.14)]'
                : 'border-white/10 bg-black/18 hover:border-white/18',
            )}
            onClick={() => {
              setStageMode('image')
              setActiveImageIndex(index)
            }}
            type="button"
          >
            <div className="relative overflow-hidden bg-[#040711]">
              <img
                alt={`${project.title} thumbnail ${index + 1}`}
                className="h-24 w-full object-cover object-top opacity-92 transition duration-300 group-hover:scale-[1.03]"
                loading="lazy"
                src={image}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-left">
                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-pearl/90">Экран {index + 1}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

const FullProjectCard = ({ project }) => (
  <Motion.article variants={fadeUp}>
    <GlassPanel className="p-5 sm:p-6 xl:p-7">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] xl:items-start">
        <ProjectMediaStage project={project} />
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

export const RecentProjectsShowcaseSection = ({ id, mode = 'full', tone = 'mint' }) => {
  const isCompact = mode === 'compact'

  return (
    <SceneSection className="py-16 sm:py-20" id={id} tone={tone}>
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            description={
              isCompact
                ? 'Ниже реальные материалы последних проектов: сначала сильный корпоративный кейс, затем art-directed premium landing. Так проще сразу оценить диапазон качества и уровень подачи.'
                : 'Это уже не концепты, а реальные материалы последних проектов: видео с автопроигрыванием, крупные экраны по клику и разные типы подачи от корпоративного сайта до art-directed landing page.'
            }
            eyebrow={isCompact ? 'Latest projects' : 'Последние проекты'}
            title={
              isCompact
                ? 'Последние проекты, которые уже можно разбирать по реальным экранам'
                : 'Витрина последних проектов с autoplay-видео и крупным просмотром экранов'
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
