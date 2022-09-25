import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import dynamicImport from 'vite-plugin-dynamic-import';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
  plugins: [
    solidPlugin(),
    dynamicImport(),
    tsconfigPaths({ root: __dirname }),
    topLevelAwait(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/shiki/themes/github-light.json',
          dest: 'shiki/themes',
        },
        {
          src: 'node_modules/shiki/languages/tsx.tmLanguage.json',
          dest: 'shiki/languages',
        },
        {
          src: 'node_modules/shiki/languages/typescript.tmLanguage.json',
          dest: 'shiki/languages',
        },
        {
          src: 'node_modules/shiki/dist/onig.wasm',
          dest: 'shiki/dist',
        },
      ],
    }),
  ],
  server: { port: 4000 },
  build: {
    minify: true,
  },
});
