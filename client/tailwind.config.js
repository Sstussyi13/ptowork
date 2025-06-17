export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    'bg-white', 'text-gray-800', 'text-muted', 'bg-light',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f2937',
        accent: '#374151',
        muted: '#6b7280',
        light: '#f3f4f6',
        background: '#ffffff',
      },
      keyframes: {
        press: {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.035)' },
          '60%': { transform: 'scale(1.015)' },
          '100%': { transform: 'scale(1.02)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        press: 'press 0.8s ease-in-out forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
