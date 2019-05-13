const Router = require('koa-router')
const send = require('koa-send')
const staticRouter = new Router({ prefix: '/public' }) // 只有/开头的路径才会去处理
staticRouter.get('/*', async ctx => {
  await send(ctx, ctx.path)
})
module.exports = staticRouter
