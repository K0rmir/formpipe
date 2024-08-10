module.exports = {
  extends: ['mantine'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'linebreak-style': ['error', 'windows'],
  },
};
