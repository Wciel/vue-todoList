const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge') //help us merge webpack properly
const ExtractPlugin = require('extract-text-webpack-plugin')　//Separate css file
const baseConfig = require('./webpack.config.base')


const isDev = process.env.NODE_ENV === 'development'
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: isDev? '"development"': '"production"'
    }
  }), //we can use it in js
  new HTMLPlugin() //find the html entry
]

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true,
  }, //Displaying errors on Web pages
  open: true, //start-up the dev-server open the browser immediately.
  // historyFallback: {

  // } //因为是路由单页应用，请求地址不一定是默认的index.html，Mapping different paths to index.html
  hot: true, //Update without refreshing the page.
}

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map', //help us debugging code
    module: {
      rules: [{
        test: /\.styl/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader',
        ]
      }]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(), //start the hot 
      new webpack.NoEmitOnErrorsPlugin()
    ])
  }) //merge a new config
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../src/index.js'),
      vendor: ['vue']
    },
    output:{
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [{
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: 'style-loader', //这里是将css-loader处理出来的内容包了一层js代码，Js代码就是将css代码写到html里面去
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
      }]
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      }),
    ])
  })
}

module.exports = config