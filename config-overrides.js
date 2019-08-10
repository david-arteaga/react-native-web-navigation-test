const {
  babelInclude,
  override,
  addWebpackPlugin,
  addBabelPlugins,
  addBabelPresets,
} = require('customize-cra');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// our packages that will now be included in the CRA build step
const appIncludes = [
  resolveApp('./index.js'),
  resolveApp('./src'),
  resolveApp('./node_modules/@react-navigation'),
  resolveApp('./node_modules/react-native-screens'),
  resolveApp('./node_modules/react-native-drawer'),
  resolveApp('./node_modules/react-native-gesture-handler'),
  resolveApp('./node_modules/react-navigation-drawer'),
  resolveApp('./node_modules/react-navigation-tabs'),
  resolveApp('./node_modules/react-native-tab-view'),
];

module.exports = (config, env) => {
  const ret = override(
    addBabelPresets(
      'module:metro-react-native-babel-preset'
    ),
    addWebpackPlugin(
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV !== 'production',
      }),
    ),
    addBabelPlugins(
      'react-native-web',
    ),
    babelInclude([...appIncludes]),
  )(config, env);

  // write webpack config for inspection
  fs.writeFileSync('./webpack-config-for-inspection', JSON.stringify(config, null, 2))

  // This line disables minification
  ret.optimization.minimize = false;

  return ret;
};
