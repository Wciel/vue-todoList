// 把共同的基本的webpack配置放这里

const path = require('path')
const vueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'), // dirname这个代表webpack.config.js文件所在的地址，也就是根目录
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre' /* start-up eslint before all loader */
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/ // 忽略node_modules里面的js文件，不需要重新编译
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        // use: [
        //   {
        //     loader: 'url-loader', /* urlloader可以将我们的图片转化成base64代码，直接写在Js内容里面，而不用生成一个新的文件
        //                             url-loader实际上是基于file-loader，是将url-loader包装了一层，将大小小于1024的图片
        //                             编程Base64的代码放到我们Js文件里，这样做减少了http请求 */
        //     options: {
        //       limit: 1024,
        //       name: 'resources/[path][name].[hash:8].[ext]' //ext是图片的扩展名如jpg等
        //     } //把参数传给loader，指定它的操作方式
        //   }
        // ]
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'resources/[path][name].[hash:8].[ext]'
        }
      }
    ]
  }
} // 这里就是将index.js的内容，包括vue, app等打包成bundle.js并且是在浏览器中能运行出来的js代码

module.exports = config
