import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    solidPlugin(),
    tsconfigPaths({ root: __dirname }),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/shiki/themes',
          dest: 'shiki',
        },
        {
          src: 'node_modules/shiki/languages',
          dest: 'shiki',
        },
        {
          src: 'node_modules/shiki/dist',
          dest: 'shiki',
        },
      ],
    }),
  ],
  server: { port: 4000 },
});
