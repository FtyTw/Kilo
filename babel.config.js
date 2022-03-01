module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    'transform-inline-environment-variables',
    [
      'module-resolver',
      {
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@components': './src/components',
          '@containers': './src/containers',
          '@config': './src/config',
          '@constants': './src/constants',
          '@routes': './src/routes',
          '@state': './src/state',
          '@utils': './src/utils',
          '@typings': './src/types',
        },
      },
    ],
  ],
};
