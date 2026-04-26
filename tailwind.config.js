/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'cinema-black': '#121212',
        'cinema-red': '#E50914',
        'cinema-zinc': '#27272a',
      },
    },
  },
  plugins: [],
}