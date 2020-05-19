import Vue from 'vue'
import Router from 'vue-router'
import pageRoutes from './routers'
import iView from 'view-design'
import Main from '@/components/main'
import Body from '@/components/body'
import Inner from '@/components/inner'

import store from '@/store'

Vue.use(Router)
let indexRoutes = [
  // 路由demo
  // {
  //   path: '/aa',
  //   name: 'aa',
  //   component: Main,
  //   children: [
  //     {
  //       path: 'bb',
  //       name: 'bb',
  //       component: Body,
  //       children: [
  //         {
  //           path: 'cc',
  //           name: 'cc',
  //           component: Inner,
  //           children: [
  //             {
  //               path: 'dd',
  //               name: 'dd',
  //               component: () => import('@/views/key-project/index.vue')
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // }
  // 根跳转
  {
    path: '/',
    name: 'root',
    redirect: '/digital_logisticst'
  },
  {
    path: '/error_store',
    name: 'error_store',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [{
      path: 'error_store_page',
      name: 'error_store_page',
      meta: {
        icon: 'ios-bug',
        title: '错误收集'
      },
      component: () =>
                import('@/view/error-store/error-store.vue')
    }]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [{
      path: 'error_logger_page',
      name: 'error_logger_page',
      meta: {
        icon: 'ios-bug',
        title: '错误收集'
      },
      component: () =>
                import('@/view/error-page/error-logger.vue')
    }]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () =>
            import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () =>
            import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () =>
            import('@/view/error-page/404.vue')
  },
  // 组件库示例
  {
    path: '/demo',
    name: 'demo',
    component: Main,
    children: [
      {
        // path: 'body',
        path: 'page',
        name: 'demo_body',
        component: () => import('@/view/demo.vue')
        // component: Body
        // children: [
        //   {
        //     path: 'inner',
        //     name: 'demo_inner',
        //     component: Inner,
        //     children: [
        //       {
        //         path: 'page',
        //         name: 'demo_body_inner_page',
        //         component: () => import('@/view/demo.vue')
        //       }
        //     ]
        //   }
        // ]
      }
    ]
  },
  // login
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login/login.vue')
  }
]
const router = new Router({
  routes: [...indexRoutes, ...pageRoutes]
  // mode: 'history'
})

router.beforeEach((to, from, next) => {
  console.log(123)
  console.log(store.state)
  if (to.path === '/login') {
    next()
  } else {
    const token = store.state.token
    if (token === null || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})

router.afterEach(to => {
  console.log(456)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})
export default router
