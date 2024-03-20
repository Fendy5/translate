module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['@react-native', 'plugin:prettier/recommended'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 1,
    'react-hooks/exhaustive-deps': 1
  }
}
