'use strict'
// vue-loader配置文件，用来加载vue文件
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
// css sourcemap通过判断当前环境来创建是否开启
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  // 导出默认loader配置
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  // 开启csssourcemap
  cssSourceMap: sourceMapEnabled,
  // truedevtool配置每次生成新hash 是否生成缓存的source map
  cacheBusting: config.dev.cacheBusting,
  // 编译器将某些属性转换成require调用
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
