// webapp/tailwind.config.ts
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // Ensures all relevant files are scanned
    './src/components/UI/**/*.vue', // Explicitly include DS components
  ],
  theme: {
    extend: {
      // Project-specific overrides can go here if necessary
    },
  },
  plugins: [],
};
