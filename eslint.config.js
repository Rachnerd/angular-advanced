const nx = require('@nx/eslint-plugin');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: 'app',
              onlyDependOnLibsWithTags: ['lib:feature', 'lib:ui', 'lib:types'],
            },
            {
              sourceTag: 'server',
              onlyDependOnLibsWithTags: ['lib:types'],
            },
            {
              sourceTag: 'lib:feature',
              onlyDependOnLibsWithTags: ['lib:shared', 'lib:types'],
            },
            {
              sourceTag: 'lib:shared',
              onlyDependOnLibsWithTags: [],
            },
            {
              sourceTag: 'lib:types',
              onlyDependOnLibsWithTags: [],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
];
