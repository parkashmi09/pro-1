/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#7CB5EC',
          600: '#199FB1',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        background: {
          blur: '#A5A5A5',
        }
      },
      spacing: {
        '904': '904px',
        '1440': '1440px',
      },
      borderRadius: {
        '20': '20px',
      },
      backdropBlur: {
        '56.5': '56.5px',
      }
    },
  },
  plugins: [],
};
