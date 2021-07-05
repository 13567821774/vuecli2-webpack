"use strict";
// 配置文件
const path = require("path");

module.exports = {
  dev: {
    // 提取到static
    assetsSubDirectory: "static",
    // 配置本地服务访问路径
    assetsPublicPath: "/",
    proxyTable: {},

    // dev配置
    host: "localhost", // 可以通过 process.env.HOST重写
    port: 8080, // 可以通过 process.env.PORT, 如果端口占用,生成一个另外的端口
    // 自动打开浏览器
    autoOpenBrowser: false,
    // 报错打印至浏览器
    errorOverlay: true,
    // 报错打印
    notifyOnErrors: true,
    // 默认关闭文件监听
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    // 开启eslint
    useEslint: true,
    // 报错打印
    showEslintErrorsInOverlay: false,

    /**
     * 源码映射
     */

    devtool: "cheap-module-eval-source-map",
    // devtoolhash显示
    cacheBusting: true,

    cssSourceMap: true
  },
  // 打包配置
  build: {
    // 模板
    index: path.resolve(__dirname, "../dist/index.html"),
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",

    /**
     * 源码映射
     */
    productionSourceMap: true,
    devtool: "#source-map",
    // 生产环境gzip
    productionGzip: false,
    // gzip的扩展
    productionGzipExtensions: ["js", "css"],
    // 分析播报
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
