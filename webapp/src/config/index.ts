export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://stadi.ddev.site',
} as const;

// Type pour la configuration
export type Config = typeof config;
