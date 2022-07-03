import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [solidPlugin({ babel: { presets: ['solid'] } }), tsconfigPaths({ root: __dirname }), dts()],
  esbuild: {
    minify: true,
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'SolidJSFormHandler',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['solid-js', 'yup'],
    },
  },
  optimizeDeps: {
    exclude: ['examples'],
  },
});
