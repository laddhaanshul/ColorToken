/**
 * Metro configuration for the React Native example.
 *
 * Resolves @color-tokens/core from the monorepo packages/ directory.
 * Without this, Metro cannot follow `file:` symlinked dependencies.
 */
// examples/react-native/metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [monorepoRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Block any other React instances found in the monorepo
config.resolver.blacklistRE = /packages\/.*\/node_modules\/(react|react-native)\/.*/;

config.resolver.extraNodeModules = {
  '@color-tokens/core': path.resolve(monorepoRoot, 'packages/color-tokens'),
  'react': path.resolve(projectRoot, 'node_modules/react'),
  'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
};

module.exports = config;
