/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Don't split up the runtime or our chunks
      webpackConfig.optimization.runtimeChunk = false;
      webpackConfig.optimization.splitChunks = false;
      // Make sure main JS bundle is at same URL.
      webpackConfig.output.filename = 'static/js/[name].js';

      // Main css bundle should be the same spot too
      const cssPlugin = webpackConfig.plugins.find(
        (plugin) => plugin.options
                    && plugin.options.filename
                    && plugin.options.filename.endsWith('css'),
      );
      if (cssPlugin) {
        cssPlugin.options.filename = 'static/css/[name].css';
        cssPlugin.options.moduleFilename = () => 'static/css/main.css';
      } else {
        console.log('Could not locate CSS plugin. oh no.');
      }
      return webpackConfig;
    },
  },
};
