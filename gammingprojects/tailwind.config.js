/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './hooks/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        abyss: 'var(--color-abyss)',
        onyx: 'var(--color-onyx)',
        graphite: 'var(--color-graphite)',
        carbon: 'var(--color-carbon)',
        blood: 'var(--color-blood)',
        crimson: 'var(--color-crimson)',
        ember: 'var(--color-ember)',
        smoke: 'var(--color-smoke)',
        ash: 'var(--color-ash)',
        frost: 'var(--color-frost)',
      },
      boxShadow: {
        neon: 'var(--shadow-neon)',
        card: 'var(--shadow-card)',
      },
      backgroundImage: {
        'radial-red': 'var(--background-radial)',
      },
    },
  },
  plugins: [],
};
