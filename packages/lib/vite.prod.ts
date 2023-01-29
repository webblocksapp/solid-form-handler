import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [solidPlugin({ babel: { presets: ['solid'] } }), tsconfigPaths({ root: __dirname }), dts()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'SolidJSFormHandler',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['solid-js', 'yup', 'solid-js/store'],
    },
  },
  optimizeDeps: {
    exclude: ['examples'],
  },
});
