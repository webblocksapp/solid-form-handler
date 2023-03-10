import { Bootstrap5Theme } from './decorators';

export const parameters = {
  backgrounds: {
    default: 'light',
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: 'alphabetical',
    },
  },
};

export const decorators = [
  (Story, { kind }) => {
    if (kind.match('BS5')) {
      return Bootstrap5Theme({ children: Story() });
    }

    return Story();
  },
];
