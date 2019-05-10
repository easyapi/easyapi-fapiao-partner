import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: '/partner/',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '../pages/login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "register" */ '../pages/register.vue')
    },
    {
      path: '/invoice',
      name: 'Invoice',
      component: () => import(/* webpackChunkName: "store" */ '../pages/layout/layout.vue'),
      redirect: '/invoice/enterprise-list',
      children: [
        {
          path: 'enterprise-list',
          name: 'Enterprise',
          component: () => import(/* webpackChunkName: "store" */ '../pages/invoice/enterprise/list.vue')
        },
        {
          path: 'silent',
          name: 'Silent',
          component: () => import(/* webpackChunkName: "store" */ '../pages/invoice/enterprise/silent.vue')
        },
        {
          path: 'warning',
          name: 'Warning',
          component: () => import(/* webpackChunkName: "store" */ '../pages/invoice/enterprise/warning.vue')
        },
        //服务商
        {
          path: 'provider-list',
          name: 'ProviderList',
          component: () => import(/* webpackChunkName: "store" */ '../pages/invoice/provider/list.vue')
        }
      ]
    },
  ]
})
