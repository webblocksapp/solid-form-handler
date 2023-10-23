import { defineConfig, Plugin } from 'vite';
import copy from 'rollup-plugin-copy';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default defineConfig({
  plugins: [solidPlugin(), tsconfigPaths({ root: __dirname })],
  server: { port: 4000 },
  base: process.env.VITE_BASE_URL,
  build: {
    minify: false,
    target: 'esnext',
    rollupOptions: {
      plugins: [
        copy({
          copyOnce: true,
          hook: 'closeBundle',
          verbose: true,
          targets: [
            {
              src: 'src/assets/images/**/*',
              dest: 'dist/images',
            },
          ],
        }) as Plugin,
      ],
    },
  },
});
