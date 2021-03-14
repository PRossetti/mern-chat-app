module.exports = {
  extends: ['airbnb', 'prettier'],
  rules: {
    // 'prettier/prettier': 'error',
    'react/jsx-filename-extension': 'off',
    'react/jsx-fragments': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/button-has-type': 'off',
    'react/no-array-index-key': 'off',
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'warn',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/alt-text': 'warn',
    'arrow-parens': 'warn',
    // indent: ['warn', 'tab'],
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: false,
      },
    ],
    'no-unused-vars': [
      'warn',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
  env: {
    browser: true,
    node: true,
  },
  plugins: ['prettier'],
};
