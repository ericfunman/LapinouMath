/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B9D',
        secondary: '#C44569',
        accent: '#FFC75F',
        success: '#6BCF7F',
      },
    },
  },
  plugins: [],
}
