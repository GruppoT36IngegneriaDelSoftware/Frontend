module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: { max: '1024px' },
        phone: { max: '767px' },
      },
      fontFamily: {
        'friz-quadrata-tt': ['Friz Quadrata TT', 'serif'],
        'helvetica-condensed': ['Helvetica Condensed', 'sans-serif'],
      },
      colors: {
        main: {
          primary: '#B10B25',
          black: '#1A1B1F',
          white: '#FFFFFF',
        },
        additional: {
          'medium-primary': '#AD6972',
          'soft-primary': '#FBE2E5',
          grey: '#C1C1C6',
          success: '#6CAF17',
          warning: '#EAC647',
          information: '#448BB2',
          'strong-grey': '#4E4848',
        },
        primary: {
          100: '#E6F6FE',
          200: '#C0EAFC',
          300: '#9ADDFB',
          400: '#4FC3F7',
          500: '#03A9F4',
          600: '#0398DC',
          700: '#026592',
          800: '#014C6E',
          900: '#013349',
        },
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
      },
      dropShadow: {
        default: '10px 10px 30px rgba(26, 27, 31, 0.4)',
      },
      boxShadow: {
        'for-inner': 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      margin: {
        'lat-dt': '150px',
        lat: '15px',
      },
      maxWidth: {
        'lat-dt': '150px',
      },
    },
  },
  plugins: [],
};
