import type { Preview } from '@storybook/angular';
import '!style-loader!css-loader!sass-loader!../../design-system/styles.scss';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

const preview: Preview = {
  globalTypes: {
    themeMode: {
      name: 'Theme',
      description: 'Global theme for components',
      options: ['light', 'dark'],
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
    options: {
      storySort: {
        order: ['Atoms', 'Molecules', 'Organisms', 'Templates'],
      },
    },
  },
};

export default preview;
