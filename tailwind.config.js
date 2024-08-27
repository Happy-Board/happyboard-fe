/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: ['./src/**/*.{html,js,vue}'],
  darkMode: false,
  theme: {
    extend: {},
    darkMode: 'class',

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      primaryColor: '#5d4ca5',
      secondaryColor: '#1d4ed8',
      backgroundColor: '#eff1f3',
      backgroundButtonColor: '#c9c6dd',
      borderColor: '#c9c6dd',
      gray: {
        200: '#e5e7eb',
        400: '#9ca3af',
        600: '#4b5563',
        700: '#374151',
        900: '#111827'
      },
      red: {
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b'
      },
      green: {
        600: '#16a34a',
        700: '#15803d'
      },
      yellow: {
        600: '#ca8a04',
        700: '#a16207'
      },
      blue: {
        800: '#1e40af',
        900: '#1e3a8a'
      },
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
