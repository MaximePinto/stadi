import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  server: {
    host: '0.0.0.0',                    // ✅ Écoute sur toutes les interfaces
    port: 5173,
    allowedHosts: ['app.stadi.ddev.site'], // ✅ Garde la sécurité
  },
  plugins: [
    vue(),
    viteDevTools(),
    tailwindcss({
      version: '4.1'
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
