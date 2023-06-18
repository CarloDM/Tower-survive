import { defineConfig } from 'vite';
// import { createWebWorkerPlugin } from '@rollup/plugin-web-worker';
import vue from '@vitejs/plugin-vue';
// import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      // VitePWA({ registerType: 'autoUpdate' })
    ],
  
})
