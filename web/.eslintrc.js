/* eslint-disable quote-props */
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard', 'standard-react', 'plugin:import/errors', 'plugin:import/warnings'
  ],
  rules: {
    indent: [ 'error', 2 ],
    'quote-props': [
      'error', 'as-needed', { keywords: true, unnecessary: false }
    ],
    'object-curly-spacing': [ 'error', 'always' ],
    'space-before-function-paren': [ 'error', 'always' ],
    'array-bracket-spacing': [
      'error', 'always', { singleValue: false }
    ],
    quotes: [ 'error', 'single' ],
    semi: [ 'error', 'never' ],
    'prefer-destructuring': [ 'error', { object: true, array: false } ],
    'array-bracket-newline': [ 'error', { minItems: 3 } ]
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  settings: {
    react: {
      pragma: 'React',
      version: '17.0.1'
    }
  }
}
