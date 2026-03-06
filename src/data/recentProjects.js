const asset = (path) => new URL(`../../recent projects/${path}`, import.meta.url).href

export const recentProjects = [
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
    cover: asset('1.jpg'),
    video: asset('intro.mp4'),
    gallery: [asset('1.jpg'), asset('2.jpg'), asset('3.jpg'), asset('4.jpg')],
    palette: 'from-ice/20 via-white/8 to-cyan-400/10',
  },
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
    cover: asset('allnrg.ru/1.jpg'),
    video: asset('allnrg.ru/intro.mp4'),
    gallery: [
      asset('allnrg.ru/1.jpg'),
      asset('allnrg.ru/2.jpg'),
      asset('allnrg.ru/3.jpg'),
      asset('allnrg.ru/4.jpg'),
      asset('allnrg.ru/5.jpg'),
      asset('allnrg.ru/6.jpg'),
    ],
    palette: 'from-coral/14 via-sand/10 to-white/5',
  },
]
