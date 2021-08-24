const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    colors: () => ({
      ...defaultTheme.colors
    }),
    backgroundColor: () => ({
      ...defaultTheme.colors
    }),
    screen: {
      xs: '320px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1448px',
      '3xl': '1600px'
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
