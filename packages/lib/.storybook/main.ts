import type { StorybookConfig } from 'storybook-solidjs-vite';
import { mergeConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: ['../examples/**/*.mdx', '../examples/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: 'storybook-solidjs-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      plugins: [viteTsConfigPaths()],
    });
  },
};
export default config;
