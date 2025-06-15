// webapp/tailwind.config.cjs
const dsPreset = require('./src/design-system/tailwind.preset.js');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // Ensures all relevant files are scanned
    './src/design-system/components/**/*.vue', // Explicitly include DS components
  ],
  presets: [dsPreset],
  theme: {
    extend: {
      // Project-specific overrides can go here if necessary
    },
  },
  plugins: [],
};
