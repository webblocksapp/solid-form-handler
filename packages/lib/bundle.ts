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
    plugins: [dts({ include: 'src/adapters/yupSchema/index.ts' })],
    lib: {
      entry: 'src/adapters/yupSchema/index.ts',
      fileName: (format: string) => {
        return `adapters/yupSchema/${format}/index.js`;
      },
    },
    emptyOutDir: true,
  },
  {
    plugins: [dts({ include: 'src/adapters/zodSchema/index.ts' })],
    lib: {
      entry: 'src/adapters/zodSchema/index.ts',
      fileName: (format: string) => {
        return `adapters/zodSchema/${format}/index.js`;
      },
    },
    emptyOutDir: false,
  },
  {
    plugins: [dts({ include: 'src' })],
    lib: {
      entry: 'src/index.ts',
      fileName: (format: string) => {
        return `${format}/index.js`;
      },
    },
    emptyOutDir: false,
  },
];

const bundle = async () => {
  entries.forEach(
    async (entry) =>
      await build({
        plugins: [...entry.plugins, solidPlugin(), tsconfigPaths()],
        build: {
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
