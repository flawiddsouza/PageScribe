import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '',
  build: {
    lib: {
      formats: ['es'],
      entry: 'src/index.js',
      name: 'CodeRenderer',
      fileName: 'code-renderer',
    },
  },
});
