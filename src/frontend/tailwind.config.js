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
        'neon-border': '0 0 10px rgba(0, 255, 194, 0.8), 0 0 1px rgba(0, 255, 194, 0.5)',
        'neon-inner': 'inset 0 0 80px 30px rgba(0, 255, 194, 0.3)',
      },
      colors: {
        'neon-cyan': '#00FFC2', // Definimos el color para usarlo en el borde de CSS
      }
    },
  },
  plugins: [],
}