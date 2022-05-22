import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [solidPlugin({ babel: { presets: ['solid'] } }), tsconfigPaths({ root: __dirname })],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    lib: {
      entry: 'src/index.ts',
      name: 'SolidJSFormHandler',
      fileName: (format) => `solid-js-form-handler.${format}.js`,
    },
    rollupOptions: {
      external: ['solid-js', 'yup'],
    },
  },
  optimizeDeps: {
    exclude: ['examples'],
  },
});
