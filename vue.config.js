// 是否为生产环境
const isProduction = process.env.NODE_ENV != "development";

// 代码压缩
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

// gzip压缩
const CompressionWebpackPlugin = require("compression-webpack-plugin");

// path引入
const path = require("path");
const resolve = dir => path.join(__dirname, dir);

// 本地环境是否使用cdn
const devNeedCdn = false;

//cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    vue: "Vue",
    Vuex: "Vuex",
    "vue-router": "VueRouter",
    nprogress: "NProgress",
    axios: "axios"
  },
  css: ["https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css"],
  js: [
    "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
    "https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js",
    "https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js",
    "https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js",
    "https://cdn.bootcss.com/axios/0.19.2/axios.min.js"
  ]
};
module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      if (isProduction || devNeedCdn) args[0].cdn = cdn;
      return args;
    });
    config.resolve.alias.set("@", resolve("src"));
    // 图片压缩
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        bypassOnDebug: true
      })
      .end();
  },
  configureWebpack: config => {
    // 用cdn方式引入，则构建时要忽略相关资源
    if (isProduction || devNeedCdn) config.externals = cdn.externals;
    // 生产环境相关配置
    if (isProduction) {
      const productionGzipExtensions = ["html", "js", "css"];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      );
      // 代码压缩
      config.plugins.push(
        new UglifyJsPlugin({
          //生产环境自动删除console
          compress: {
            drop_debugger: true,
            drop_console: true,
            pure_funcs: ["console.log"]
          },
          sourceMap: false,
          parallel: true
        })
      );
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: "all",
              test: /node_modules/,
              name: "vendor",
              minChunks: 1,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 100
            },
            common: {
              chunks: "all",
              test: /[\\/]src[\\/]js[\\/]/,
              name: "common",
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 60
            },
            style: {
              name: "styles",
              test: /\.(sa|sc|c)ss$/,
              chunks: "all",
              enforce: true
            },
            runtimeChunk: {
              name: "manifest"
            }
          }
        }
      };
    }
  }
};
