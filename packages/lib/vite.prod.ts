import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

import packageJson from './package.json';

const { peerDependencies, devDependencies } = packageJson;
const external = [...Object.keys(peerDependencies), ...Object.keys(devDependencies)];

export default defineConfig({
  plugins: [dts(), solidPlugin(), tsconfigPaths({ root: __dirname })],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'SolidJSFormHandler',
      formats: ['es', 'cjs'],
      fileName: (format) => {
        return `index.${format}.js`;
      },
    },
    rollupOptions: {
      external,
    },
  },
  optimizeDeps: {
    exclude: ['examples'],
  },
});
