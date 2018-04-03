module.exports = {
  env: {
    node: true
  },
  extends: 'eslint:recommended',
  rules: {
    'no-dupe-keys': 0,
    'no-console': 0,
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': 0,
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }
};
