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
        'neon': {
            // Color principal de tu neón (rojo brillante)
            DEFAULT: '#FF0000', 
            // Variante oscura para el efecto hover (Rojo Borgoña/Oscuro)
            'dark': '#8B0000', // Un tono más oscuro
        },
        'neon-cyan': '#ff0000ff', // Mantienes este por si lo usas en otros sitios
      }
    },
  },
  plugins: [],
}