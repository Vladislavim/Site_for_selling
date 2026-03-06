/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.25rem',
          lg: '2rem',
          xl: '2.5rem',
        },
        screens: {
          '2xl': '1320px',
        },
      },
      colors: {
        ink: '#050711',
        void: '#03050b',
        smoke: '#0d1220',
        slate: '#131b2c',
        abyss: '#09111d',
        mist: '#9ca8ba',
        pearl: '#f6f1e8',
        sand: '#ddb57a',
        mint: '#8cf2d3',
        coral: '#ff8e72',
        ice: '#88bfff',
        line: 'rgba(255,255,255,0.1)',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Unbounded', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      boxShadow: {
        soft: '0 25px 80px rgba(0, 0, 0, 0.28)',
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 28px 90px rgba(0,0,0,0.45)',
        aurora: '0 0 0 1px rgba(140,242,211,0.16), 0 26px 80px rgba(136,191,255,0.18)',
        planet: '0 0 120px rgba(136,191,255,0.22)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(circle at 18% 18%, rgba(140,242,211,0.22), transparent 22%), radial-gradient(circle at 82% 12%, rgba(255,142,114,0.18), transparent 24%), radial-gradient(circle at 50% 50%, rgba(136,191,255,0.16), transparent 34%)',
        'panel-gradient':
          'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.025) 46%, rgba(255,255,255,0.02))',
        'cosmic-grid':
          'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        'aurora-flow':
          'linear-gradient(115deg, rgba(140,242,211,0.16), rgba(136,191,255,0.12), rgba(255,142,114,0.14), rgba(246,241,232,0.06))',
        'zone-glow':
          'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.16), transparent 55%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -16px, 0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(0, -24px, 0) scale(1.04)' },
        },
        beam: {
          '0%': { transform: 'translate3d(-10%, 0, 0)', opacity: '0' },
          '10%, 80%': { opacity: '1' },
          '100%': { transform: 'translate3d(14%, 0, 0)', opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.45', filter: 'blur(0px)' },
          '50%': { opacity: '1', filter: 'blur(2px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        orbitReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(4%, -4%, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        floatSlow: 'floatSlow 14s ease-in-out infinite',
        pulseGlow: 'pulseGlow 5s ease-in-out infinite',
        beam: 'beam 12s linear infinite',
        orbit: 'orbit 20s linear infinite',
        orbitReverse: 'orbitReverse 26s linear infinite',
        drift: 'drift 18s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
      },
    },
  },
  plugins: [],
}
