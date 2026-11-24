/**
 * Metro configuration. Android uses the defaults; the web build (Gmail test
 * environment for the Google review) swaps the one native-only library that has
 * no web version: `react-native-webview` becomes a sandboxed iframe.
 */
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const WEB_REPLACEMENTS = {
  'react-native-webview': path.resolve(__dirname, 'src/web/webview.tsx'),
};

const upstream = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && WEB_REPLACEMENTS[moduleName]) {
    return { type: 'sourceFile', filePath: WEB_REPLACEMENTS[moduleName] };
  }
  return (upstream ?? context.resolveRequest)(context, moduleName, platform);
};

module.exports = config;
