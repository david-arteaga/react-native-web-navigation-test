const {
  babelInclude,
  override,
  addWebpackPlugin,
  addBabelPlugins,
  addWebpackAlias,
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
    // config => {
    //   config.module.rules[1] = null;
    //   config.module.rules = config.module.rules.filter(Boolean);
    //   return config;
    // },
    addWebpackPlugin(
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV !== 'production',
      }),
    ),
    addBabelPlugins(
      'babel-plugin-react-native-web',
      '@babel/plugin-transform-modules-commonjs',
    ),
    babelInclude([...appIncludes]),
  )(config, env);

  return ret;
};
