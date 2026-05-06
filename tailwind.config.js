/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pg: {
          bg:        '#0A0E14',
          bgAlt:     '#10151D',
          surface:   '#161C26',
          surfaceHi: '#1D2531',
          line:      'rgba(255,255,255,0.08)',
          text:      '#F4F5F7',
          dim:       '#A0A6B2',
          mute:      '#6B7280',
          gold:      '#C9A24B',
          goldHi:    '#E5C57A',
          goldDeep:  '#9C7B33',
          warm:      '#F0EBE1',
          iron:      '#1C2130',
          brass:     '#A8893A',
        },
      },
      fontFamily: {
        sans: ['"Assistant"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'wa-pulse': 'wa-pulse 2s infinite',
        'fade-up':  'fade-up 0.6s ease forwards',
        'shimmer':  'shimmer 2s infinite',
      },
      keyframes: {
        'wa-pulse': {
          '0%, 100%': { boxShadow: '0 12px 40px rgba(37,211,102,0.5), 0 0 0 0 rgba(37,211,102,0.6)' },
          '70%':      { boxShadow: '0 12px 40px rgba(37,211,102,0.5), 0 0 0 18px rgba(37,211,102,0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
