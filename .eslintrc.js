module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 11,
  },
  rules: {
    indent: ['error', '4'],
    'no-tabs': 0,
    'no-console': 0,
    'no-underscore-dangle': ['error', { allow: ['_d', '_dh', '_h', '_id', '_m', '_n', '_t', '_text'] }],
    'no-nested-ternary': 0,
    'import/prefer-default-export': 0,
  },
};
