const Router = require('koa-router')
const VueServerRender = require('vue-server-renderer')
const serverRender = require('./server-render')
const path = require('path')
const clientManifest = require('../../public/vue-ssr-client-manifest.json') // css与js
const fs = require('fs')
const renderer = VueServerRender.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'), // vue代码
  {
    inject: false,
    clientManifest
  }
) // 这个是可以一直复用的，因为关于renderer的信息只有一些配置项，以及这个json文件

const template = fs.readFileSync(
  path.join(__dirname, '../server.template.ejs'),
  'utf-8'
)
const pageRouter = new Router()
pageRouter.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template)
})

module.exports = pageRouter
