const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')// Separate css file
const baseConfig = require('./webpack.config.base')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const config = merge(baseConfig, {
  target: 'node', // 指明程序在node端运行
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2', // 打包出来的js的模块系统是什么，因为是node端，所以要对应的commonjs,即输出来的是common.js2类型的文件
    filename: 'server-entry.js', // 因为node端不需要hash做缓存
    path: path.join(__dirname, '../server-build') // 新建一个目录，存放server端的webpack
  },
  externals: Object.keys(require('../package.json').dependencies), /* webpack打包的时候会把所有依赖的Js文件打包到同一个js文件中
                                                                      浏览器没办法通过require的方式去加载一个单独的文件，所以我们把所依赖的
                                                                      js文件一次性打包到一个新的js文件中，一次性加载到浏览器端，那么他需要的什
                                                                      么东西都有了．．externals的作用就是声明
                                                                      不要去打包这部分文件 */
  module: {
    rules: [{
      test: /\.styl/,
      use: ExtractPlugin.extract({
        fallback: 'vue-style-loader', /* compile and convert the source code(afert css-loader dealt with the css)
                                      to the CSS code available for target browsers. */
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      })
    }] // node端没有dom操作
  },
  plugins: [
    new ExtractPlugin('cssStyle/styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE.ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin() /* 有了这个插件，输出的将不是Js文件，而是一个json文件，帮我们做很多服务端渲染的项目相关的内容
                              将减轻一些开发逻辑 */
  ]
})

module.exports = config
