module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@app': './src/app',
          '@store': './src/app/store',
          '@components': './src/components',
          '@modules': './src/modules',
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@utils': './src/utils',
          '@assets': './src/assets',
        },
      },
    ],

    'react-native-reanimated/plugin', // MUST BE LAST
  ],
};
