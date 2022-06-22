// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  lintOnSave: true,
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    extract: true,
    loaderOptions: {
      less: {
        globalVars: {
          "main-blue": "#1890ff",
          red: "#fd5a5a",
          green: "#52c41a",
        },
      },
    },
  },
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
