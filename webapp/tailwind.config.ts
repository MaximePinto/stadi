// webapp/tailwind.config.ts
import dsPreset from './src/design-system/tailwind.preset';

export default {
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
