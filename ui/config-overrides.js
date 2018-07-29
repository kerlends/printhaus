const { injectBabelPlugin } = require('react-app-rewired');

const plugins = ['react-hot-loader/babel'];

module.exports = (config, env) => {
  plugins.forEach((plugin) => {
    config = injectBabelPlugin(plugin, config);
  });
  return config;
};
