const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')　//帮助我们将样式打包成单独的css文件

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'), //__dirname这个代表webpack.config.js文件所在的地址，也就是根目录
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/, //正则表达式，表明这是.vue类型的
        loader: 'vue-loader' //使用一个loader,即用vue-loader去处理.vue这样的文件类型，保证最后能输出正确的js代码
      },
      {
        test: /\.jsx$/, 
        loader: 'babel-loader'
      },
      // {
      //   test: /\.css$/, 
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      // {
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader', /*url　loader可以将我们的图片转化成base64代码，直接写在Js内容里面，而不用生成一个新的文件
                                    url-loader实际上是基于file-loader，是将url-loader包装了一层，将大小小于1024的图片
                                    编程Base64的代码放到我们Js文件里，这样做减少了http请求*/
            options: {
              limit: 1024,
              name: '[name]-aaa.[ext]' //ext是图片的扩展名如jpg等
            } //把参数传给loader，指定它的操作方式
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev? '"development"': '"production"'
        }
    }),
    new HTMLPlugin()
  ]
} //这里就是将index.js的内容，包括vue, app等打包成bundle.js并且是在浏览器中能运行出来的js代码


if (isDev) {
  config.module.rules.push({
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
  })
  config.devtool = '#cheap-module-eval-source-map'//帮助我们调试代码
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    }, //在编译中有任何错都显示到网页当中
    open: true, //启动dev　server的时候自动帮我们打开浏览器
    // historyFallback: {

    // } //因为是路由单页应用，请求地址不一定是默认的index.html，将没有做映射的地址都映射到index.html上去
    hot: true, //不刷新页面便实现更新
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(), //启动hot功能的plugin
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({
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
        'stylus-loader',
      ]
    })
  })
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css')
  )
}

module.exports = config