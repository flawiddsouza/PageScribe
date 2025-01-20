import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      formats: ['es'],
      entry: 'src/main.ts',
      name: 'TableRenderer',
      fileName: 'table-renderer',
    },
  },
});
