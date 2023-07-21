/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
      'darker': '#0a0a0a',
      'dark': '#121212',
    },},
  },
  plugins: [],
}