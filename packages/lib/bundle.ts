import fs from 'fs';
import { build } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const { peerDependencies, devDependencies } = packageJson;
const external = [...Object.keys(peerDependencies), ...Object.keys(devDependencies)];

const entries = [
  {
    lib: {
      entry: 'src/index.ts',
      fileName: (format: string) => {
        return `index.${format}.js`;
      },
    },
  },
  {
    lib: {
      entry: 'src/adapters/yupSchema/index.ts',
      fileName: (format: string) => {
        return `adapters/yupSchema/index.${format}.js`;
      },
    },
  },
  {
    lib: {
      entry: 'src/adapters/zodSchema/index.ts',
      fileName: (format: string) => {
        return `adapters/zodSchema/index.${format}.js`;
      },
    },
  },
];

const bundle = async () => {
  entries.forEach(
    async (entry) =>
      await build({
        plugins: [dts(), solidPlugin(), tsconfigPaths()],
        build: {
          minify: false,
          lib: {
            ...entry.lib,
            formats: ['es', 'cjs'],
          },
          rollupOptions: {
            external,
          },
        },
      })
  );
};

bundle();
