/** @type {import('tailwindcss').Config} */
module.exports = {
  // Use the 'content' key instead of 'purge' for Tailwind CSS v3
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This tells Tailwind to scan all relevant files in your src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
