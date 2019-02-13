const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs') // 不把文件写入到磁盘上面，直接写到内存里面
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const serverConfig = require('../../build/webpack.config.server')
const serverCompiler = webpack(serverConfig) // 将webpack跑起来
const serverRender = require('./server-render')
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs // 指定输入目录在memoryFs里面

let bundle // 用来记录webpack每次打包生成的记录文件
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log('eslinterror', err)) // 处理eslint的错误
  stats.warnings.forEach(warn => console.warn('waring', warn))
  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
}) // 每次文件改变，都重新打包

const handleSSr = async (ctx) => {
  if (!bundle) {
    ctx.body = '等一会，别急.....'
    return
  }
  const template = fs.readFileSync(
    path.join(__dirname, '../server/server.template.ejs')
  )

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data

  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest

    }) // 自动生成带有script标签的字符串，这样就可以直接填到ejs html的模板里面
  await serverRender(ctx, renderer, template)
}
const router = new Router()
router.get('*', handleSSr)

module.exports = router
