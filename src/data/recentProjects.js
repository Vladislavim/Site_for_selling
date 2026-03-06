import aurelia01 from '../../recent projects/1.jpg'
import aurelia02 from '../../recent projects/2.jpg'
import aurelia03 from '../../recent projects/3.jpg'
import aurelia04 from '../../recent projects/4.jpg'
import aureliaIntro from '../../recent projects/intro.mp4'

import allnrg01 from '../../recent projects/allnrg.ru/1.jpg'
import allnrg02 from '../../recent projects/allnrg.ru/2.jpg'
import allnrg03 from '../../recent projects/allnrg.ru/3.jpg'
import allnrg04 from '../../recent projects/allnrg.ru/4.jpg'
import allnrg05 from '../../recent projects/allnrg.ru/5.jpg'
import allnrg06 from '../../recent projects/allnrg.ru/6.jpg'
import allnrgIntro from '../../recent projects/allnrg.ru/intro.mp4'

export const recentProjects = [
  {
    slug: 'allnrg-corporate',
    title: 'Альянс Энерджи / allnrg.ru',
    category: 'Корпоративный сайт',
    label: 'Инженерный бизнес-сайт',
    summary:
      'Сайт для промышленной и инженерной компании, где важно не впечатлить ради впечатления, а быстро собрать доверие, показать экспертизу и упростить путь к контакту.',
    outcome:
      'Показывает, как строгий корпоративный интерфейс может выглядеть собранно и убедительно: услуги, проекты, репутационная подача и понятные CTA без хаоса.',
    deliverables: [
      'Структура под услуги и проекты',
      'Репутационная подача для B2B',
      'Понятная навигация по разделам',
      'Контактные сценарии без трения',
    ],
    stack: ['Multi-page', 'Service structure', 'Corporate UX', 'Lead capture'],
    cover: allnrg01,
    video: allnrgIntro,
    gallery: [allnrg01, allnrg02, allnrg03, allnrg04, allnrg05, allnrg06],
    palette: 'from-coral/14 via-sand/10 to-white/5',
  },
  {
    slug: 'aurelia-atlas',
    title: 'Aurelia / Cosmic Interface Atelier',
    category: 'Premium landing',
    label: 'Арт-дирекшн + motion',
    summary:
      'Имиджевый landing page с космической подачей, дорогой глубиной интерфейса и спокойной типографикой, которая удерживает premium-ощущение без визуального шума.',
    outcome:
      'Показывает, как можно продать сложный визуальный уровень через controlled motion, стеклянные панели, крупную типографику и ощущение digital-объекта, а не обычного лендинга.',
    deliverables: [
      'Hero-сцена с planet-scale depth',
      'Сложная visual hierarchy без перегруза',
      'Premium UI для презентации продукта',
      'Атмосферный интерфейс с характером',
    ],
    stack: ['React', 'Framer Motion', 'GSAP', 'Three.js direction'],
    cover: aurelia01,
    video: aureliaIntro,
    gallery: [aurelia01, aurelia02, aurelia03, aurelia04],
    palette: 'from-ice/20 via-white/8 to-cyan-400/10',
  },
]
