// eslint.config.mjs
import eslintPluginCypress from 'eslint-plugin-cypress';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        Cypress: true,
        cy: true,
        describe: true,
        it: true,
        beforeEach: true,
        afterEach: true
      }
    },
    plugins: {
      cypress: eslintPluginCypress
    },
    rules: {
      'no-unused-vars': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2]
    }
  }
];
