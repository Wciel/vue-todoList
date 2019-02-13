const Koa = require('koa')
const app = new Koa()

const pageRouter = require('./routers/dev-ssr')

const isDev = process.env.NODE_ENV === 'development'
app.use(async (ctx, next) => {
  try {
    console.log(`request width path ${ctx.path}`) // 这样就可以把所用请求进来的路径都记录下来
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = `please try again later`
    }
  } // 记录错误返回错误信息
}) /*
koa使用的是async await的写法，
所以所有中间件的调用都可以使用try catch来调用，
可以把所有的错误情况都放在最外层来处理 */

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333
app.listen(PORT, HOST, () => {
  console.log(`server is start at ${HOST} in ${PORT}`)
})
