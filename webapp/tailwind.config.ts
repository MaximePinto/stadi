// webapp/tailwind.config.ts
import dsPreset from './src/design-system/generators/tailwind.preset';

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // Ensures all relevant files are scanned
    './src/components/UI/**/*.vue', // Explicitly include DS components
  ],
  presets: [dsPreset],
  theme: {
    extend: {
      // Project-specific overrides can go here if necessary
    },
  },
  plugins: [],
};
