const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  resolver: {
    extraNodeModules: {
      '@x-sudoku/store': path.resolve(__dirname, '../../packages/store'),
    },
  },
  watchFolders: [path.resolve(__dirname, '../../packages/store')],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
