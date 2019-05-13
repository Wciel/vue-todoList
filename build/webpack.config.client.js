const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge') // help us merge webpack properly
const ExtractPlugin = require('extract-text-webpack-plugin')// Separate css file
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const isDev = process.env.NODE_ENV === 'development'
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }), // we can use it in js
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }), // find the html entry
  new VueClientPlugin() // 自动生成vue-ssr-client-manifest.json的文件
]
const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true
  }, // Displaying errors on Web pages
  open: true, // start-up the dev-server open the browser immediately.
  historyApiFallback: {
    index: '/index.html'
  }, // 因为是路由单页应用，请求地址不一定是默认的index.html，Mapping different paths to index.html
  hot: true // Update without refreshing the page.
}

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map', // help us debugging code
    module: {
      rules: [{
        test: /\.styl/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(), // start the hot
      new webpack.NoEmitOnErrorsPlugin()
    ])
  }) // merge a new config
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: 'vueJsFile/[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
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
      }]
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('cssStyle/styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }), // Package the vue framework file separately need the plugin
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })// separate packed the code about webpack in app
    ])
  })
}

module.exports = config
