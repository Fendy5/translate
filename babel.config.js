module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // 配置 babel-plugin-module-resolver
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['.src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': ['./src'],
          '~images': './src/assets/images',
          '~components': './src/components',
          '~utils': './src/utils'
        }
      }
    ]
  ]
}
