const path = require("path");
module.exports = {
  lintOnSave: false,
  publicPath: "",
  outputDir: `dist/${process.env.NODE_ENV}`,
  assetsDir: "assets",
  configureWebpack: {
    resolve: {
      alias: {
        "@com": path.resolve(__dirname, "src/components"),
        "@img": path.resolve(__dirname, "src/assets/images")
      }
    }
  },
  css: {
    extract: true,
    loaderOptions: {
      scss: {
        prependData: `
          @import "./src/assets/helpers/_var.scss";
          @import "./src/assets/helpers/_mixin.scss";
        `
      }
    }
  }
};
