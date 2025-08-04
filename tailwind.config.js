/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#4ecdc4',
        background: '#1a1a2e',
        card: '#16213e',
        input: '#0f3460',
        danger: '#e74c3c',
        disabled: '#666',
      },
    },
  },
  plugins: [],
};
