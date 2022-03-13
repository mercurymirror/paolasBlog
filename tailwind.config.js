module.exports = {
  content: [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {
    textColor: ['group-hover', 'hover'], 
},
  theme: {
    extend: {
      gridTemplateColumns: {
        // Complex site-specific column configuration
        'footer': 'repeat(3, 1rem)',
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      "animation": "#A72608",
      "decor": "#E0AFA0",
      "illustrations": "#32936F",
      "developpement-visuel": "#C2FCF7",
      "realisations": "#FEEA00",
      "croquis": "#9F6BA0",
      "white": "#FFFFFF",
    },
  },
  plugins: [],
}
