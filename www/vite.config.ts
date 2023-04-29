import { createHtmlPlugin } from 'vite-plugin-html';
import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    plugins: [
      solidPlugin(),
      tsconfigPaths({ root: __dirname }),
      createHtmlPlugin({
        template: 'index.html',
        inject: {
          data: {
            domain: 'https://www.solid-form-handler.com',
          },
        },
      }),
    ],
    server: { port: 4000 },
    build: {
      sourcemap: true,
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
          }),
        ],
      },
    },
    resolve: {
      alias: {
        'solid-form-handler/yup':
          '../packages/lib/dist/adapters/yupSchema/index.es.js',
        'solid-form-handler/zod':
          '../packages/lib/dist/adapters/zodSchema/index.es.js',
      },
    },
  };
});
