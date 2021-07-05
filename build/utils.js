"use strict";
const path = require("path");
const config = require("../config");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const packageConfig = require("../package.json");

exports.assetsPath = function(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === "production"
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
};
// 导出css处理相关loader
exports.cssLoaders = function(options) {
  // 如果没有option 创建一个空对象
  options = options || {};
  // 创建一个cssloader，默认传入对象sourceMap 为ture
  const cssLoader = {
    loader: "css-loader",
    options: {
      sourceMap: options.sourceMap
    }
  };
  // 创建postcssLoader，默认不应用该loader
  const postcssLoader = {
    loader: "postcss-loader",
    options: {
      sourceMap: options.sourceMap
    }
  };

  // 加载loader入口函数
  function generateLoaders(loader, loaderOptions) {
    // 是否使用postcss
    const loaders = options.usePostCSS
      ? [cssLoader, postcssLoader]
      : [cssLoader];
    // 如果传入loader配置
    if (loader) {
      // 将匹配的loader进行推送，如果传入的是scss ，则推入css-loader
      loaders.push({
        loader: loader + "-loader",
        // 合并传入的options
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
      /*
      最终push完 以sass为例
      [
      {
        loader: "css-loader",
        options: {
          sourceMap: options.sourceMap
        }
      },
      {
        loader: "sass-loader",
        options: {
        sourceMap: options.sourceMap
        }
      }
      ]
      */
    }
    // 如果传入的配置中extract 为true
    // 则应用提取css
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        // 未提取css时，使用的加载器
        fallback: "vue-style-loader"
      });
    } else {
      // 没有提取配置 将vue-style-loader配置合并
      return ["vue-style-loader"].concat(loaders);
    }
  }
  // 返回一个包含所有loader选项的对象
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders("less"),
    // 使用缩进语法，可不使用花括号
    sass: generateLoaders("sass", { indentedSyntax: true }),
    scss: generateLoaders("sass"),
    stylus: generateLoaders("stylus"),
    styl: generateLoaders("stylus")
  };
};

// 导出文件规则数组
exports.styleLoaders = function(options) {
  // 创建一个空数组来存储规则数组
  const output = [];
  // 得到所有loader配置
  const loaders = exports.cssLoaders(options);
  // 遍历所有loader，给每个loader添加解析文件规则，添加到output
  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp("\\." + extension + "$"),
      use: loader
    });
  }

  return output;
};

exports.createNotifierCallback = () => {
  const notifier = require("node-notifier");

  return (severity, errors) => {
    if (severity !== "error") return;

    const error = errors[0];
    const filename = error.file && error.file.split("!").pop();

    notifier.notify({
      title: packageConfig.name,
      message: severity + ": " + error.name,
      subtitle: filename || "",
      icon: path.join(__dirname, "logo.png")
    });
  };
};
