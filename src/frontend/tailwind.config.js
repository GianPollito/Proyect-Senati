/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        // --- NUEVAS SOMBRAS NEÓN ---
        'neon-border': '0 0 10px rgba(255, 0, 0, 1), 0 0 1px rgba(255, 0, 0, 1)',
        'neon-inner': 'inset 0 0 80px 30px rgba(255, 0, 0, 1)',
      },
      colors: {
        'neon-cyan': '#ff0000ff', // Definimos el color para usarlo en el borde de CSS
      }
    },
  },
  plugins: [],
}