module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      teal100: '#DFEFEF',
      teal200: '#A2D2D2',
      teal300: '#488D8D',
      teal400: '#316464',
      teal500: '#132121',
      teal600: '#0A0E0E',
      pink100: '#C0A8C9',
      pinkgrey: '#c0a8c92b',
      red: '#FF0000',
      white: '#FFFFFF',
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/src/assets/layered-waves-haikei.svg')",
      },
    },
  },
  plugins: [],
};
