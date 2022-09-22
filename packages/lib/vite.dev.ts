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
          src: '../node_modules/bootstrap/dist/css/bootstrap.min.css',
          dest: 'bootstrap',
        },
      ],
    }),
  ],
  root: './examples',
});
