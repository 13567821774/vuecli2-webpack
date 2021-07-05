"use strict";
// 先进行node和npm版本校验
require("./check-versions")();

process.env.NODE_ENV = "production";
// 控制台loading动画
const ora = require("ora");
const rm = require("rimraf");
const path = require("path");
// 高亮输出插件
const chalk = require("chalk");
const webpack = require("webpack");
const config = require("../config");
const webpackConfig = require("./webpack.prod.conf");
// 控制台输出的
const spinner = ora("building for production...");
// 开启动画
spinner.start();
// 获取输出文件路径
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  // 报错就停止打包
  if (err) throw err;
  // webpack 编译
  webpack(webpackConfig, (err, stats) => {
    spinner.stop();
    if (err) throw err;
    // 完成输出相关信息
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + "\n\n"
    );
    // 如果报错打印报错
    if (stats.hasErrors()) {
      console.log(chalk.red("  Build failed with errors.\n"));
      process.exit(1);
    }
    // 打包成功
    console.log(chalk.cyan("  Build complete.\n"));
    console.log(
      chalk.yellow(
        "  Tip: built files are meant to be served over an HTTP server.\n" +
          "  Opening index.html over file:// won't work.\n"
      )
    );
  });
});
