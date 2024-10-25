/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0D436C',
        secondary: '#1D4FFF',
      },
      fontFamily: {
        sans: ['Pretendard', 'Inter', 'system-ui', 'sans-serif'],
      },
      lineHeight: {
        relaxed: '1.5',
      },
    },
  },
  plugins: [],
};
