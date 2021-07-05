'use strict'
// 开发配置
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // loader合并
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // 开启cheap-module-eval-source-map选项
  devtool: config.dev.devtool,

  // 热更新开发选项
  devServer: {
    // 热替换信息提示
    clientLogLevel: 'warning',
    // 开启history任何404响应返回index.html
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    // 开启热替换
    hot: true,
    // 优先从哪里获取提供目录
    contentBase: false, // since we use CopyWebpackPlugin.
    // 启动gzip压缩
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    // 是否自动打开浏览器
    open: config.dev.autoOpenBrowser,
    // 报错时是否全屏显示，关闭只在编译器内
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
      // 打包文件在浏览器中访问路径
    publicPath: config.dev.assetsPublicPath,
    // 代理
    proxy: config.dev.proxyTable,
    // webpack错误不在控制台显示
    quiet: true, // necessary for FriendlyErrorsPlugin
    // 开启文件监视修改,webpack每过一段时间监听文件变化,默认关闭
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    // 修改全局变量为process.env = development
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    // 启动热替换插件，不刷新当前的页面更新变更内容
    new webpack.HotModuleReplacementPlugin(),
    // 显示hrm模块当前路径
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(), //出现报错跳出bundle输出
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // 复制静态资源到单独文件 static文件下
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  // 基础端口 默认是8080
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    // 返回一个没有调用的端口
    // 底层通过net模块和一个个端口建立连接
    // 如果存在可用端口返回当前端口
    if (err) {
      reject(err)
    } else {
      // 创建全局配置port
      process.env.PORT = port
      // 添加端口
      devWebpackConfig.devServer.port = port

      // 创建控制台播报
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`当前项目可在浏览器访问: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
