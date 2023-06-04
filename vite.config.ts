import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: ['src/story-board.ts', 'src/story-card.ts'],
      formats: ['es'],
    },
    manifest: true,
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  plugins: [],
});
