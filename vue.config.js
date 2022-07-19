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
          "secondary-blue": "rgba(25, 101, 209, 0.59)",
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
    svgSprite: {
      dir: "src/assets/static/icons",
      test: /\.(svg)(\?.*)?$/,
      loaderOptions: {
        extract: false,
        spriteFilename: "img/icons.svg",
      },
      pluginOptions: {
        plainSprite: true,
      },
    },
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
  chainWebpack: (config) => {
    config.module.rule("svg-sprite").use("svgo-loader").loader("svgo-loader");
  },
};
