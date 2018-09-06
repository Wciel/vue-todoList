// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'
export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/app', // 自定义路径
    component: () => import('../views/todo/todo.vue'),
    // component: Todo,
    // props: true, // 会将id作为props传递到Todo这个组件中去，这两种方法更好，解藕，使代码复用性更高
    props: (route) => { return { id: route.query.b } }, // 使用route中的query参数，
    name: 'app', // 与前面的path命名没有关系
    meta: {
      title: 'this is app',
      description: 'ciel'
    }, // 描述路由，与路由没什么关系的东西都要放在这里面，不然会被vue忽视
    children: [
      {
        path: 'test',
        component: () => import('../views/login/login.vue')
      }
    ] // 得在todo组件下放一个router-view才能显示出来
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
    // component: Login
    // components: {
    //   default: Login,
    //   a: Todo
    // } // 在同一个router下面，有不同的router-riew
  }
] // router的基本配置, vue-router默认的使用形式是使用hash
