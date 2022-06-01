// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  productionSourceMap: false,
  configureWebpack(config) {
    const IS_VENDOR = /[\\/]node_modules[\\/]/;
    config.optimization.splitChunks = {
      cacheGroups: {
        app: {
          name: `chunk-app-vendors`,
          priority: -11,
          chunks: (chunk) => chunk.name === "app",
          test: IS_VENDOR,
          enforce: true,
        },
        common: {
          name: "chunk-common",
          priority: -20,
          chunks: "initial",
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    };
    return {
      output: {
        hotUpdateChunkFilename: "hot/hot-update.js",
        hotUpdateMainFilename: "hot/hot-update.json",
      },
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src/"),
        },
        extensions: [".ts", ".vue"],
      },
    };
  },
  pluginOptions: {
    i18n: {
      locale: "n",
      fallbackLocale: "en",
      localeDir: "langs",
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
  },
};
