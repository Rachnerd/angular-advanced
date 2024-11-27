import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

const preview: Preview = {
  globalTypes: {
    themeMode: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: false,
    },
  },
  parameters: {
    'data-theme-toggle': {
      querySelector: 'html',
      'data-target': 'theme',
      default: 'light',
      values: {
        dark: 'dark',
        light: 'light',
      },
      lightFill: '#a05b00',
      darkFill: '#0926b5',
    },
    globalTypes: {
      themeMode: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: false,
      },
    },
  },
};

export default preview;
