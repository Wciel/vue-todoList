import createApp from './create-app'
const { app, router } = createApp()
router.onReady(() => {
  app.$mount('#root')
}) // router的在这个方法只有在服务端渲染的时候才会被用到，当所有异步操作都做完了之后才会调用这个回调
