/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        meleio: {
          yellow: '#facc15',
          orange: '#f97316',
          purple: '#9333ea'
        }
      }
    }
  },
  plugins: []
};
