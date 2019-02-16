import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      context.meta = app.$meta()
      resolve(app)
    }) // router的在这个方法只有在服务端渲染的时候才会被用到，当所有异步操作都做完了之后才会调用这个回调
  })
}
