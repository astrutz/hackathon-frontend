/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: ["./src/**/*.{html,ts}","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        'gold': '#DAA520',
        'silver': '#A9A9A9',
        'bronze': '#CD7F32',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}

